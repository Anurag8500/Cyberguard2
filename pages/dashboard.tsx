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

  // Safe numeric fallbacks to avoid NaN in progress calculations
  const safeStreak = Number(user?.streak) || 0
  const currentXP = Number(user?.xp) || 0
  let safeNextLevelXP = Number(stats?.nextLevelXP) || 0
  if (safeNextLevelXP <= 0 || safeNextLevelXP <= currentXP) {
    // Ensure a positive, greater-than-current max to avoid NaN/Infinity and negative remaining
    safeNextLevelXP = currentXP + 500
  }
  // Ensure total modules reflects all 6 available modules
  const displayTotalModules = Math.max(Number(stats?.totalModules) || 0, 6)

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
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Welcome back, {user.fullName}! 👋
              </span>
            </h1>
            <p className="text-gray-600 text-lg">
              Continue your cybersecurity journey and level up your skills
            </p>
          </motion.div>

          {/* Resume Learning */}
          {modules?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              {(() => {
                const inProgress = modules.find((m: any) => m.progress?.status) || modules[0]
                return (
                  <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl p-6 flex items-center justify-between">
                    <div>
                      <div className="text-sm uppercase tracking-wide opacity-90">Resume Learning</div>
                      <h3 className="text-2xl font-bold">{inProgress.title}</h3>
                      <p className="text-white/90 text-sm mt-1">Continue where you left off and keep your streak alive.</p>
                    </div>
                    <a href={`/modules/${inProgress.slug}`} className="px-5 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors font-semibold">
                      Continue →
                    </a>
                  </div>
                )
              })()}
            </motion.div>
          )}


          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <ProgressCard
              title="Current Streak"
              value={safeStreak}
              max={30}
              icon={<FaFire />}
              color="text-orange-500"
              suffix=" days"
            />
            <ProgressCard
              title="Total XP"
              value={currentXP}
              max={safeNextLevelXP}
              icon={<FaStar />}
              color="text-yellow-500"
              suffix=" XP"
            />
            <ProgressCard
              title="Modules Completed"
              value={stats.completedModules}
              max={displayTotalModules}
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
              <h2 className="text-2xl font-bold mb-4">
                <span className="bg-gradient-to-r from-amber-600 to-pink-600 bg-clip-text text-transparent">🏆 Recent Achievements</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recentBadges.map((badge: any, i: number) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-xl bg-white border border-gray-200 shadow p-4 text-center"
                  >
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <h3 className="font-semibold text-sm text-gray-800">{badge.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{badge.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Learning Path removed as requested */}

          {/* Tip of the Day + Quick Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-white border border-gray-200 shadow p-6 lg:col-span-2"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">💡 Tip of the Day</h3>
              <p className="text-gray-700">
                Enable 2FA on your email first. If an attacker gets your inbox, they can reset passwords for nearly every account you own.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Keep Going! 🚀</h3>
                  <p className="text-white/90">
                    You're {safeNextLevelXP - currentXP} XP away from Level {user.level + 1}
                  </p>
                </div>
                <FaChartLine className="text-6xl opacity-60" />
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  )
}
