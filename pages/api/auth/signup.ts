import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/db'
import { hashPassword, createSession } from '@/lib/auth'
import { signupSchema } from '@/lib/validation'
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
    const validatedData = signupSchema.parse(req.body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' })
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password)

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        fullName: validatedData.fullName,
        role: validatedData.role,
        preferredLanguage: validatedData.preferredLanguage,
        streak: 0,
        level: 1,
        xp: 0,
      },
    })

    // Create session
    const token = await createSession(user.id)

    // Update last login date
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginDate: new Date() },
    })

    // Return success with token
    return res.status(201).json({
      message: 'Account created successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        level: user.level,
        xp: user.xp,
      },
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors,
      })
    }

    console.error('Signup error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
