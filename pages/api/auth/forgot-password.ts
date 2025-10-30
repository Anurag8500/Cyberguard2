import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/db'
import { generateOTP } from '@/lib/auth'
import { sendPasswordResetEmail } from '@/lib/email'
import { forgotPasswordSchema } from '@/lib/validation'
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
    const validatedData = forgotPasswordSchema.parse(req.body)

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    // Always return success to prevent email enumeration
    if (!user) {
      return res.status(200).json({
        message: 'If your email is registered, you will receive a password reset code',
      })
    }

    // Generate OTP
    const otp = generateOTP()
    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + 15) // 15 minutes

    // Delete any existing password resets for this user
    await prisma.passwordReset.deleteMany({
      where: { userId: user.id },
    })

    // Create password reset record
    await prisma.passwordReset.create({
      data: {
        userId: user.id,
        otp,
        expiresAt,
      },
    })

    // Send email
    await sendPasswordResetEmail(user.email, otp)

    return res.status(200).json({
      message: 'If your email is registered, you will receive a password reset code',
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors,
      })
    }

    console.error('Forgot password error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
