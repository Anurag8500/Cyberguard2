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

    // Fetch all modules
    const modules = await prisma.module.findMany({
      where: { isPublished: true },
      orderBy: { order: 'asc' },
    })

    // Fetch user's progress for each module
    const moduleProgress = await prisma.moduleProgress.findMany({
      where: { userId: user.id },
    })

    // Map progress to modules
    const modulesWithProgress = modules.map((module, index) => {
      const progress = moduleProgress.find(p => p.moduleId === module.id)
      const isLocked = index > 0 && !moduleProgress.find(
        p => p.moduleId === modules[index - 1].id && 
        (p.status === 'COMPLETED' || p.status === 'PASSED')
      )

      return {
        ...module,
        progress: progress ? {
          status: progress.status,
          score: progress.score,
        } : undefined,
        isLocked,
      }
    })

    // Fetch user badges
    const userBadges = await prisma.userBadge.findMany({
      where: { userId: user.id },
      include: { badge: true },
      orderBy: { earnedAt: 'desc' },
      take: 4,
    })

    // Calculate stats
    const completedModules = moduleProgress.filter(
      p => p.status === 'COMPLETED' || p.status === 'PASSED'
    ).length

    const nextLevelXP = user.level * 500 // Example calculation

    const stats = {
      completedModules,
      totalModules: modules.length,
      totalBadges: userBadges.length,
      nextLevelXP,
    }

    const recentBadges = userBadges.map(ub => ({
      id: ub.badge.id,
      name: ub.badge.name,
      description: ub.badge.description,
      icon: ub.badge.icon,
      earnedAt: ub.earnedAt,
    }))

    return res.status(200).json({
      modules: modulesWithProgress,
      stats,
      recentBadges,
    })
  } catch (error) {
    console.error('Dashboard error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
