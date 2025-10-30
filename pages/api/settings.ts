import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/db'
import { validateSession } from '@/lib/auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const user = await validateSession(token)
    if (!user) {
      return res.status(401).json({ error: 'Invalid or expired session' })
    }

    const { fullName, preferredLanguage } = req.body

    // Update user settings
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        fullName: fullName || user.fullName,
        preferredLanguage: preferredLanguage || user.preferredLanguage,
      },
    })

    return res.status(200).json({
      message: 'Settings updated successfully',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        role: updatedUser.role,
        level: updatedUser.level,
        xp: updatedUser.xp,
        streak: updatedUser.streak,
        preferredLanguage: updatedUser.preferredLanguage,
        createdAt: updatedUser.createdAt,
      },
    })
  } catch (error) {
    console.error('Settings update error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
