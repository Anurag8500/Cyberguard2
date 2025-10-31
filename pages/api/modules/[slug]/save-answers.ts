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
    const { answers } = req.body
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

    // Update saved answers in progress
    const progress = await prisma.moduleProgress.update({
      where: {
        userId_moduleId: {
          userId: user.id,
          moduleId: module.id,
        },
      },
      data: {
        savedAnswers: answers,
      },
    })

    return res.status(200).json({
      message: 'Answers saved successfully',
      progress,
    })
  } catch (error) {
    console.error('Save answers error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
