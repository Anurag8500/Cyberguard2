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
    const { slug } = req.query
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

    // Fetch scenarios
    const scenarios = await prisma.scenario.findMany({
      where: { moduleId: module.id },
      orderBy: { order: 'asc' },
    })

    // Fetch user's progress
    const progress = await prisma.moduleProgress.findUnique({
      where: {
        userId_moduleId: {
          userId: user.id,
          moduleId: module.id,
        },
      },
    })

    // Create progress if it doesn't exist
    if (!progress) {
      await prisma.moduleProgress.create({
        data: {
          userId: user.id,
          moduleId: module.id,
          status: 'IN_PROGRESS',
          currentScenario: 0,
        },
      })
    }

    return res.status(200).json({
      module,
      scenarios,
      progress,
    })
  } catch (error) {
    console.error('Module fetch error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
