import { motion } from 'framer-motion'

interface ProgressCardProps {
  title: string
  value: number
  max: number
  icon: React.ReactNode
  color: string
  suffix?: string
}

export default function ProgressCard({
  title,
  value,
  max,
  icon,
  color,
  suffix = '',
}: ProgressCardProps) {
  const percentage = (value / max) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
          <p className="text-3xl font-bold text-gray-800 mt-1">
            {value}{suffix}
            <span className="text-sm text-gray-500 font-normal ml-2">/ {max}{suffix}</span>
          </p>
        </div>
        <div className={`text-4xl ${color}`}>{icon}</div>
      </div>
      <div className="progress-bar">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full ${color.replace('text-', 'bg-')} transition-all duration-500`}
        />
      </div>
      <p className="text-xs text-gray-500 mt-2">{percentage.toFixed(0)}% complete</p>
    </motion.div>
  )
}
