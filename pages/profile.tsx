import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { FaTrophy, FaStar, FaFire, FaMedal, FaChartLine } from 'react-icons/fa'
import Navbar from '@/components/Navbar'

interface ProfileProps {
  user: any
  setUser: (user: any) => void
  logout: () => void
}

export default function Profile({ user, setUser, logout }: ProfileProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [profileData, setProfileData] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      router.push('/auth/login')
      return
    }

    if (!user) {
      setUser(JSON.parse(userData))
    }

    fetchProfileData(token)
  }, [])

  const fetchProfileData = async (token: string) => {
    try {
      const response = await fetch('/api/profile', {
        headers: { 'Authorization': `Bearer ${token}` },
      })

      if (!response.ok) throw new Error('Failed to fetch profile')

      const data = await response.json()
      setProfileData(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !user || !profileData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  const { badges, achievements, stats } = profileData

  return (
    <>
      <Head>
        <title>Profile - CyberGuard Academy</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} logout={logout} />

        <main className="container mx-auto px-6 py-8">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card mb-8"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-cyber-blue flex items-center justify-center text-white text-5xl font-bold">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  {user.fullName}
                </h1>
                <p className="text-gray-600 mb-4">{user.email}</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-500" />
                    <span className="font-semibold">Level {user.level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaTrophy className="text-purple-500" />
                    <span className="font-semibold">{user.xp} XP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaFire className="text-orange-500" />
                    <span className="font-semibold">{user.streak} Day Streak</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card text-center"
            >
              <FaChartLine className="text-5xl text-blue-500 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-gray-800">{stats.completedModules}</h3>
              <p className="text-gray-600">Modules Completed</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card text-center"
            >
              <FaMedal className="text-5xl text-yellow-500 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-gray-800">{stats.totalBadges}</h3>
              <p className="text-gray-600">Badges Earned</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card text-center"
            >
              <FaTrophy className="text-5xl text-green-500 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-gray-800">{stats.totalAchievements}</h3>
              <p className="text-gray-600">Achievements</p>
            </motion.div>
          </div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🏆 My Badges</h2>
            {badges.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {badges.map((badge: any, i: number) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="card text-center hover:shadow-xl transition-shadow"
                  >
                    <div className="text-5xl mb-2">{badge.icon}</div>
                    <h3 className="font-semibold text-sm text-gray-800">{badge.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
                    <span
                      className={`badge mt-2 ${
                        badge.rarity === 'LEGENDARY'
                          ? 'bg-yellow-500'
                          : badge.rarity === 'EPIC'
                          ? 'bg-purple-500'
                          : badge.rarity === 'RARE'
                          ? 'bg-blue-500'
                          : 'bg-gray-500'
                      } text-white text-xs`}
                    >
                      {badge.rarity}
                    </span>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="card text-center py-12">
                <p className="text-gray-500">No badges earned yet. Complete modules to earn badges!</p>
              </div>
            )}
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">⭐ Achievements</h2>
            {achievements.length > 0 ? (
              <div className="space-y-4">
                {achievements.map((achievement: any, i: number) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="card"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{achievement.icon}</div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {achievement.name}
                            {achievement.completed && (
                              <span className="ml-2 text-green-500">✓</span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                          <p className="text-xs text-primary-600 mt-1">
                            +{achievement.xpReward} XP
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-800">
                          {achievement.progress}%
                        </div>
                        <div className="w-32 progress-bar mt-2">
                          <div
                            className="h-full bg-green-500"
                            style={{ width: `${achievement.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="card text-center py-12">
                <p className="text-gray-500">No achievements yet. Keep learning!</p>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </>
  )
}
