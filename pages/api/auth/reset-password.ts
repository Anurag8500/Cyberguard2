import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/db'
import { hashPassword } from '@/lib/auth'
import { resetPasswordSchema } from '@/lib/validation'
import { ZodError } from 'zod'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Validate request body
    const validatedData = resetPasswordSchema.parse(req.body)

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
      include: { passwordResets: true },
    })

    if (!user) {
      return res.status(400).json({ error: 'Invalid reset request' })
    }

    // Find valid OTP
    const validReset = user.passwordResets.find(
      (reset) =>
        reset.otp === validatedData.otp &&
        !reset.used &&
        reset.expiresAt > new Date()
    )

    if (!validReset) {
      return res.status(400).json({ error: 'Invalid or expired OTP' })
    }

    // Hash new password
    const hashedPassword = await hashPassword(validatedData.newPassword)

    // Update password and mark OTP as used
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          failedLoginAttempts: 0,
          accountLockedUntil: null,
        },
      }),
      prisma.passwordReset.update({
        where: { id: validReset.id },
        data: { used: true },
      }),
      // Delete all sessions (force re-login)
      prisma.session.deleteMany({
        where: { userId: user.id },
      }),
    ])

    return res.status(200).json({
      message: 'Password reset successful. Please login with your new password.',
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors,
      })
    }

    console.error('Reset password error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
