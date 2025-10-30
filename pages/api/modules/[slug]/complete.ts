import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/db'
import { validateSession } from '@/lib/auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { slug } = req.query
    const { score, timeSpent } = req.body
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const user = await validateSession(token)
    if (!user) {
      return res.status(401).json({ error: 'Invalid or expired session' })
    }

    // Fetch module
    const module = await prisma.module.findUnique({
      where: { slug: slug as string },
    })

    if (!module) {
      return res.status(404).json({ error: 'Module not found' })
    }

    // Update or create module progress
    const progress = await prisma.moduleProgress.upsert({
      where: {
        userId_moduleId: {
          userId: user.id,
          moduleId: module.id,
        },
      },
      update: {
        status: score >= 60 ? 'COMPLETED' : 'PASSED',
        score,
        timeSpent,
        completedAt: new Date(),
        attempts: {
          increment: 1,
        },
      },
      create: {
        userId: user.id,
        moduleId: module.id,
        status: score >= 60 ? 'COMPLETED' : 'PASSED',
        score,
        timeSpent,
        completedAt: new Date(),
        attempts: 1,
      },
    })

    // Award XP to user
    const newXp = user.xp + module.xpReward
    const newLevel = Math.floor(newXp / 500) + 1

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        xp: newXp,
        level: newLevel,
      },
    })

    // Check if this is the user's first module completion
    const completedModules = await prisma.moduleProgress.count({
      where: {
        userId: user.id,
        status: { in: ['COMPLETED', 'PASSED'] },
      },
    })

    // Award badges
    const badgesToAward = []

    // First module badge
    if (completedModules === 1) {
      const firstStepsBadge = await prisma.badge.findUnique({
        where: { slug: 'first-steps' },
      })
      if (firstStepsBadge) {
        badgesToAward.push(firstStepsBadge.id)
      }
    }

    // Module-specific badge
    const moduleBadgeSlug =
      module.slug === 'password-fortress'
        ? 'password-guardian'
        : module.slug === 'safe-online-shopping'
        ? 'smart-shopper'
        : null

    if (moduleBadgeSlug) {
      const moduleBadge = await prisma.badge.findUnique({
        where: { slug: moduleBadgeSlug },
      })
      if (moduleBadge) {
        badgesToAward.push(moduleBadge.id)
      }
    }

    // Award perfect score badge
    if (score === 100) {
      const perfectScoreBadge = await prisma.badge.findUnique({
        where: { slug: 'perfect-score' },
      })
      // This would be an achievement, not a badge in our schema
      // But we can check for it anyway
    }

    // Create user badges (if not already awarded)
    for (const badgeId of badgesToAward) {
      await prisma.userBadge.upsert({
        where: {
          userId_badgeId: {
            userId: user.id,
            badgeId,
          },
        },
        update: {},
        create: {
          userId: user.id,
          badgeId,
        },
      })
    }

    // Check and update achievements
    const achievements = await prisma.achievement.findMany()
    
    for (const achievement of achievements) {
      const req = achievement.requirement as any

      let shouldAward = false
      let progressValue = 0

      if (req.type === 'module_score' && score >= req.value) {
        shouldAward = true
        progressValue = 100
      } else if (req.type === 'modules_completed') {
        progressValue = (completedModules / req.value) * 100
        shouldAward = completedModules >= req.value
      } else if (req.type === 'module_completion_time' && timeSpent <= req.value) {
        shouldAward = true
        progressValue = 100
      }

      if (progressValue > 0) {
        await prisma.userAchievement.upsert({
          where: {
            userId_achievementId: {
              userId: user.id,
              achievementId: achievement.id,
            },
          },
          update: {
            progress: Math.min(progressValue, 100),
            completed: shouldAward,
            completedAt: shouldAward ? new Date() : undefined,
          },
          create: {
            userId: user.id,
            achievementId: achievement.id,
            progress: Math.min(progressValue, 100),
            completed: shouldAward,
            completedAt: shouldAward ? new Date() : undefined,
          },
        })

        // Award achievement XP
        if (shouldAward) {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              xp: { increment: achievement.xpReward },
            },
          })
        }
      }
    }

    return res.status(200).json({
      message: 'Module completed successfully',
      progress,
      user: {
        ...updatedUser,
        xp: updatedUser.xp,
        level: updatedUser.level,
      },
      badgesAwarded: badgesToAward.length,
    })
  } catch (error) {
    console.error('Module completion error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
