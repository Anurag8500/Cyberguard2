import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaShieldAlt, FaEye, FaEyeSlash } from 'react-icons/fa'

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      // Store token and user data
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Login - CyberGuard Academy</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-cyber-dark via-primary-900 to-cyber-dark flex items-center justify-center p-6">
        <div className="grid md:grid-cols-2 max-w-6xl w-full gap-8 items-center">
          {/* Left Side - Illustration */}
          <div className="hidden md:block text-white">
            <FaShieldAlt className="text-8xl text-cyber-blue mb-6 animate-shield-pulse" />
            <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-xl text-gray-300 mb-6">
              Continue your cybersecurity learning journey
            </p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="text-cyber-green mr-2">✓</span>
                Track your progress and achievements
              </li>
              <li className="flex items-center">
                <span className="text-cyber-green mr-2">✓</span>
                Compete on global leaderboards
              </li>
              <li className="flex items-center">
                <span className="text-cyber-green mr-2">✓</span>
                Complete daily challenges
              </li>
              <li className="flex items-center">
                <span className="text-cyber-green mr-2">✓</span>
                Unlock exclusive badges
              </li>
            </ul>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Login</h1>
              <p className="text-gray-600">Enter your credentials to continue</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="input-field pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Remember me</span>
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-primary-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="text-primary-600 font-semibold hover:underline">
                  Sign up
                </Link>
              </p>
            </div>

            {/* Social login removed per request */}
          </div>
        </div>
      </main>
    </>
  )
}
