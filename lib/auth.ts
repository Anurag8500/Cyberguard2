import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from './db'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

export interface JWTPayload {
  userId: string
  email: string
}

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// JWT token management
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    return null
  }
}

// Session management
export async function createSession(userId: string): Promise<string> {
  const token = generateToken({ userId, email: '' })
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7) // 7 days

  await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  })

  return token
}

export async function validateSession(token: string) {
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  })

  if (!session || session.expiresAt < new Date()) {
    return null
  }

  return session.user
}

export async function deleteSession(token: string): Promise<void> {
  await prisma.session.delete({ where: { token } }).catch(() => {})
}

// OTP generation for password reset
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Password validation
export interface PasswordStrength {
  isValid: boolean
  score: number
  feedback: string[]
}

export function validatePasswordStrength(password: string): PasswordStrength {
  const feedback: string[] = []
  let score = 0

  if (password.length >= 8) {
    score += 1
  } else {
    feedback.push('Password must be at least 8 characters long')
  }

  if (/[A-Z]/.test(password)) {
    score += 1
  } else {
    feedback.push('Add at least one uppercase letter')
  }

  if (/[a-z]/.test(password)) {
    score += 1
  } else {
    feedback.push('Add at least one lowercase letter')
  }

  if (/[0-9]/.test(password)) {
    score += 1
  } else {
    feedback.push('Add at least one number')
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1
  } else {
    feedback.push('Add at least one special character')
  }

  return {
    isValid: score === 5,
    score,
    feedback,
  }
}

// Rate limiting helper
const loginAttempts = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(email: string): boolean {
  const now = Date.now()
  const attempts = loginAttempts.get(email)

  if (!attempts || attempts.resetAt < now) {
    loginAttempts.set(email, { count: 1, resetAt: now + 15 * 60 * 1000 }) // 15 minutes
    return true
  }

  if (attempts.count >= 5) {
    return false
  }

  attempts.count++
  return true
}

export function resetRateLimit(email: string): void {
  loginAttempts.delete(email)
}
