import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaShieldAlt, FaEye, FaEyeSlash } from 'react-icons/fa'

export default function Signup() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'STUDENT',
    preferredLanguage: 'en',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: [] as string[] })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const checkPasswordStrength = (password: string) => {
    const feedback: string[] = []
    let score = 0

    if (password.length >= 8) score++
    else feedback.push('At least 8 characters')

    if (/[A-Z]/.test(password)) score++
    else feedback.push('One uppercase letter')

    if (/[a-z]/.test(password)) score++
    else feedback.push('One lowercase letter')

    if (/[0-9]/.test(password)) score++
    else feedback.push('One number')

    if (/[^A-Za-z0-9]/.test(password)) score++
    else feedback.push('One special character')

    setPasswordStrength({ score, feedback })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (name === 'password') {
      checkPasswordStrength(value)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (passwordStrength.score < 5) {
      setError('Password is not strong enough')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed')
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

  const getStrengthColor = () => {
    if (passwordStrength.score <= 2) return 'bg-red-500'
    if (passwordStrength.score <= 3) return 'bg-yellow-500'
    if (passwordStrength.score === 4) return 'bg-blue-500'
    return 'bg-green-500'
  }

  const getStrengthText = () => {
    if (passwordStrength.score <= 2) return 'Weak'
    if (passwordStrength.score <= 3) return 'Medium'
    if (passwordStrength.score === 4) return 'Strong'
    return 'Very Strong'
  }

  return (
    <>
      <Head>
        <title>Sign Up - CyberGuard Academy</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-cyber-dark via-primary-900 to-cyber-dark flex items-center justify-center p-6">
        <div className="grid md:grid-cols-2 max-w-6xl w-full gap-8 items-center">
          {/* Left Side - Illustration */}
          <div className="hidden md:block text-white">
            <FaShieldAlt className="text-8xl text-cyber-blue mb-6 animate-shield-pulse" />
            <h2 className="text-4xl font-bold mb-4">Join CyberGuard Academy</h2>
            <p className="text-xl text-gray-300 mb-6">
              Start your journey to becoming a cybersecurity expert through interactive learning.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="text-cyber-green mr-2">✓</span>
                Interactive scenario-based learning
              </li>
              <li className="flex items-center">
                <span className="text-cyber-green mr-2">✓</span>
                Earn badges and track progress
              </li>
              <li className="flex items-center">
                <span className="text-cyber-green mr-2">✓</span>
                Learn at your own pace
              </li>
              <li className="flex items-center">
                <span className="text-cyber-green mr-2">✓</span>
                Available in multiple languages
              </li>
            </ul>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
              <p className="text-gray-600">Start learning cybersecurity for free</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Enter your full name"
                />
              </div>

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
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Password Strength:</span>
                      <span className="text-xs font-semibold">{getStrengthText()}</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className={`h-full ${getStrengthColor()} transition-all duration-300`}
                        style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                      />
                    </div>
                    {passwordStrength.feedback.length > 0 && (
                      <div className="mt-2 text-xs text-gray-600">
                        Need: {passwordStrength.feedback.join(', ')}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="input-field pr-12"
                    placeholder="Re-enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    I am a
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="STUDENT">Student</option>
                    <option value="PROFESSIONAL">Professional</option>
                    <option value="GENERAL_USER">General User</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    name="preferredLanguage"
                    value={formData.preferredLanguage}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिन्दी (Hindi)</option>
                    <option value="bn">বাংলা (Bengali)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary-600 font-semibold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
