import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/db'
import {
  verifyPassword,
  createSession,
  checkRateLimit,
  resetRateLimit,
} from '@/lib/auth'
import { loginSchema } from '@/lib/validation'
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
    const validatedData = loginSchema.parse(req.body)

    // Check rate limit
    if (!checkRateLimit(validatedData.email)) {
      return res.status(429).json({
        error: 'Too many login attempts. Please try again in 15 minutes.',
      })
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Check if account is locked
    if (user.accountLockedUntil && user.accountLockedUntil > new Date()) {
      return res.status(403).json({
        error: 'Account is temporarily locked due to multiple failed login attempts',
      })
    }

    // Verify password
    const isValid = await verifyPassword(validatedData.password, user.password)

    if (!isValid) {
      // Increment failed attempts
      const failedAttempts = user.failedLoginAttempts + 1
      const updateData: any = { failedLoginAttempts: failedAttempts }

      // Lock account after 5 failed attempts
      if (failedAttempts >= 5) {
        const lockUntil = new Date()
        lockUntil.setMinutes(lockUntil.getMinutes() + 15)
        updateData.accountLockedUntil = lockUntil
      }

      await prisma.user.update({
        where: { id: user.id },
        data: updateData,
      })

      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Reset failed attempts on successful login
    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: 0,
        accountLockedUntil: null,
        lastLoginDate: new Date(),
      },
    })

    // Reset rate limit
    resetRateLimit(validatedData.email)

    // Update streak
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const lastLogin = user.lastLoginDate ? new Date(user.lastLoginDate) : null
    let streak = user.streak

    if (lastLogin) {
      lastLogin.setHours(0, 0, 0, 0)
      const daysDiff = Math.floor(
        (today.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24)
      )

      if (daysDiff === 1) {
        // Consecutive day
        streak += 1
      } else if (daysDiff > 1) {
        // Streak broken
        streak = 1
      }
      // Same day login doesn't change streak
    } else {
      streak = 1
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { streak },
    })

    // Create session
    const token = await createSession(user.id)

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        level: user.level,
        xp: user.xp,
        streak,
        preferredLanguage: user.preferredLanguage,
        avatarName: user.avatarName,
        avatarStyle: user.avatarStyle,
      },
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors,
      })
    }

    console.error('Login error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
