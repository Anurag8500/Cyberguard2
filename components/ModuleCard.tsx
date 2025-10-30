import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaLock, FaCheck, FaPlay } from 'react-icons/fa'

interface ModuleCardProps {
  module: {
    id: string
    slug: string
    title: string
    description: string
    icon: string
    xpReward: number
    order: number
  }
  progress?: {
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'PASSED'
    score?: number
  }
  isLocked?: boolean
}

export default function ModuleCard({ module, progress, isLocked = false }: ModuleCardProps) {
  const status = progress?.status || 'NOT_STARTED'
  
  const getStatusColor = () => {
    switch (status) {
      case 'COMPLETED':
      case 'PASSED':
        return 'bg-green-500'
      case 'IN_PROGRESS':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-300'
    }
  }

  const getStatusIcon = () => {
    if (isLocked) return <FaLock className="text-gray-400" />
    if (status === 'COMPLETED' || status === 'PASSED') return <FaCheck className="text-green-500" />
    return <FaPlay className="text-primary-600" />
  }

  const getStatusText = () => {
    if (isLocked) return 'Locked'
    switch (status) {
      case 'COMPLETED':
      case 'PASSED':
        return 'Completed'
      case 'IN_PROGRESS':
        return 'Continue'
      default:
        return 'Start'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={!isLocked ? { scale: 1.03 } : {}}
      className={`card ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <Link href={isLocked ? '#' : `/modules/${module.slug}`} className={isLocked ? 'pointer-events-none' : ''}>
        <div>
          <div className="flex items-start justify-between mb-4">
            <div className="text-5xl">{module.icon}</div>
            <div className="flex items-center space-x-2">
              {getStatusIcon()}
              <span className={`badge ${getStatusColor()} text-white`}>
                {getStatusText()}
              </span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-2">{module.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{module.description}</p>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              <span className="font-semibold text-cyber-blue">+{module.xpReward} XP</span>
            </div>
            {progress?.score !== undefined && (
              <div className="text-sm font-semibold text-gray-700">
                Score: {progress.score}%
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
