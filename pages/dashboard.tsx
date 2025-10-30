import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { FaFire, FaTrophy, FaStar, FaBook, FaChartLine } from 'react-icons/fa'
import Navbar from '@/components/Navbar'
import ProgressCard from '@/components/ProgressCard'
import ModuleCard from '@/components/ModuleCard'

interface DashboardProps {
  user: any
  setUser: (user: any) => void
  logout: () => void
}

export default function Dashboard({ user, setUser, logout }: DashboardProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<any>(null)

  useEffect(() => {
    // Redirect if not logged in
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      router.push('/auth/login')
      return
    }

    if (!user) {
      setUser(JSON.parse(userData))
    }

    // Fetch dashboard data
    fetchDashboardData(token)
  }, [])

  const fetchDashboardData = async (token: string) => {
    try {
      const response = await fetch('/api/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data')
      }

      const data = await response.json()
      setDashboardData(data)
    } catch (error) {
      console.error('Error fetching dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !user || !dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const { modules, stats, recentBadges } = dashboardData

  return (
    <>
      <Head>
        <title>Dashboard - CyberGuard Academy</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} logout={logout} />

        <main className="container mx-auto px-6 py-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Welcome back, {user.fullName}! 👋
            </h1>
            <p className="text-gray-600">
              Continue your cybersecurity journey and level up your skills
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <ProgressCard
              title="Current Streak"
              value={user.streak}
              max={30}
              icon={<FaFire />}
              color="text-orange-500"
              suffix=" days"
            />
            <ProgressCard
              title="Total XP"
              value={user.xp}
              max={stats.nextLevelXP}
              icon={<FaStar />}
              color="text-yellow-500"
              suffix=" XP"
            />
            <ProgressCard
              title="Modules Completed"
              value={stats.completedModules}
              max={stats.totalModules}
              icon={<FaBook />}
              color="text-green-500"
            />
            <ProgressCard
              title="Badges Earned"
              value={stats.totalBadges}
              max={50}
              icon={<FaTrophy />}
              color="text-purple-500"
            />
          </div>

          {/* Recent Badges */}
          {recentBadges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">🏆 Recent Achievements</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recentBadges.map((badge: any, i: number) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="card text-center"
                  >
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <h3 className="font-semibold text-sm text-gray-800">{badge.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Continue Learning */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 Your Learning Path</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module: any, i: number) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  progress={module.progress}
                  isLocked={module.isLocked}
                />
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card bg-gradient-to-r from-primary-600 to-cyber-blue text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Keep Going! 🚀</h3>
                <p className="text-white/90">
                  You're {stats.nextLevelXP - user.xp} XP away from Level {user.level + 1}
                </p>
              </div>
              <FaChartLine className="text-6xl opacity-50" />
            </div>
          </motion.div>
        </main>
      </div>
    </>
  )
}
