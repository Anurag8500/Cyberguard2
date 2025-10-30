import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/db'
import { validateSession } from '@/lib/auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
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

    // Fetch user badges
    const userBadges = await prisma.userBadge.findMany({
      where: { userId: user.id },
      include: { badge: true },
      orderBy: { earnedAt: 'desc' },
    })

    // Fetch user achievements
    const userAchievements = await prisma.userAchievement.findMany({
      where: { userId: user.id },
      include: { achievement: true },
      orderBy: { progress: 'desc' },
    })

    // Calculate stats
    const completedModules = await prisma.moduleProgress.count({
      where: {
        userId: user.id,
        status: { in: ['COMPLETED', 'PASSED'] },
      },
    })

    const stats = {
      completedModules,
      totalBadges: userBadges.length,
      totalAchievements: userAchievements.filter((a) => a.completed).length,
    }

    const badges = userBadges.map((ub) => ({
      id: ub.badge.id,
      name: ub.badge.name,
      description: ub.badge.description,
      icon: ub.badge.icon,
      rarity: ub.badge.rarity,
      earnedAt: ub.earnedAt,
    }))

    const achievements = userAchievements.map((ua) => ({
      id: ua.achievement.id,
      name: ua.achievement.name,
      description: ua.achievement.description,
      icon: ua.achievement.icon,
      xpReward: ua.achievement.xpReward,
      progress: ua.progress,
      completed: ua.completed,
      completedAt: ua.completedAt,
    }))

    return res.status(200).json({
      badges,
      achievements,
      stats,
    })
  } catch (error) {
    console.error('Profile fetch error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
