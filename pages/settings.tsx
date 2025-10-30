import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'

interface SettingsProps {
  user: any
  setUser: (user: any) => void
  logout: () => void
}

export default function Settings({ user, setUser, logout }: SettingsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [settings, setSettings] = useState({
    fullName: '',
    preferredLanguage: 'en',
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      router.push('/auth/login')
      return
    }

    if (!user) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setSettings({
        fullName: parsedUser.fullName,
        preferredLanguage: parsedUser.preferredLanguage || 'en',
      })
    } else {
      setSettings({
        fullName: user.fullName,
        preferredLanguage: user.preferredLanguage || 'en',
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })

      if (!response.ok) {
        throw new Error('Failed to update settings')
      }

      const data = await response.json()
      
      // Update local storage and state
      localStorage.setItem('user', JSON.stringify(data.user))
      setUser(data.user)
      
      setSuccess('Settings updated successfully!')
      
      // Reload page if language changed
      if (settings.preferredLanguage !== user.preferredLanguage) {
        setTimeout(() => router.reload(), 1500)
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update settings')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Settings - CyberGuard Academy</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} logout={logout} />

        <main className="container mx-auto px-6 py-8 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Settings</h1>
            <p className="text-gray-600">Manage your account preferences</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                {success}
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Information */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Profile Information</h2>
                
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={settings.fullName}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    className="input-field bg-gray-100"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    value={user.role}
                    className="input-field bg-gray-100"
                    disabled
                  />
                </div>
              </div>

              {/* Language Preferences */}
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Language Preferences</h2>
                
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Language
                  </label>
                  <select
                    name="preferredLanguage"
                    value={settings.preferredLanguage}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिन्दी (Hindi)</option>
                    <option value="bn">বাংলা (Bengali)</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    The page will reload when you change the language
                  </p>
                </div>
              </div>

              {/* Account Statistics */}
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Account Statistics</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Level</div>
                    <div className="text-2xl font-bold text-gray-800">{user.level}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Total XP</div>
                    <div className="text-2xl font-bold text-gray-800">{user.xp}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Current Streak</div>
                    <div className="text-2xl font-bold text-gray-800">{user.streak} days</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Member Since</div>
                    <div className="text-sm font-semibold text-gray-800">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="border-t border-gray-200 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </motion.div>
        </main>
      </div>
    </>
  )
}
