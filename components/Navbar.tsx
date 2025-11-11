import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaShieldAlt, FaUser, FaCog, FaSignOutAlt, FaSearch, FaExclamationTriangle, FaGamepad, FaBook } from 'react-icons/fa'

interface NavbarProps {
  user: any
  logout: () => void
}

export default function Navbar({ user, logout }: NavbarProps) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token')
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      logout()
    }
  }

  return (
    <nav className="bg-gradient-to-r from-primary-900 to-cyber-dark text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <FaShieldAlt className="text-cyber-blue text-3xl" />
            <span className="text-2xl font-bold">CyberGuard Academy</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-2">
            <Link 
              href="/dashboard" 
              className={`px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors ${router.pathname === '/dashboard' ? 'text-cyber-blue bg-white/10' : ''}`}
            >
              {"📊\uFE0E"} Dashboard
            </Link>
            <Link 
              href="/modules" 
              className={`px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors ${router.pathname.startsWith('/modules') ? 'text-cyber-blue bg-white/10' : ''}`}
            >
              <FaBook className="inline mr-1" />
              Modules
            </Link>
            <Link 
              href="/simulation-zone" 
              className={`px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors ${router.pathname === '/simulation-zone' ? 'text-cyber-blue bg-white/10' : ''}`}
            >
              <FaGamepad className="inline mr-1" />
              Simulation Zone
            </Link>
            <Link 
              href="/cyberpedia" 
              className={`px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors ${router.pathname === '/cyberpedia' ? 'text-cyber-blue bg-white/10' : ''}`}
            >
              {"🛡\uFE0E"} CyberPedia
            </Link>
            <Link 
              href="/inspect-zone" 
              className={`px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors ${router.pathname === '/inspect-zone' ? 'text-cyber-blue bg-white/10' : ''}`}
            >
              <FaSearch className="inline mr-1" />
              Inspect Zone
            </Link>
            <Link 
              href="/cybersos" 
              className={`px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors ${router.pathname === '/cybersos' ? 'text-cyber-blue bg-white/10' : ''}`}
            >
              <FaExclamationTriangle className="inline mr-1" />
              CyberSOS
            </Link>
            <Link 
              href="/profile" 
              className={`px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors ${router.pathname === '/profile' ? 'text-cyber-blue bg-white/10' : ''}`}
            >
              <FaUser className="inline mr-1" />
              Profile
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-4">
                <div className="text-right hidden md:block">
                  <div className="text-sm font-semibold">{user.fullName}</div>
                  <div className="text-xs text-cyber-blue">
                    Level {user.level} • {user.xp} XP
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    href="/settings"
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <FaCog className="text-xl" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <FaSignOutAlt className="text-xl" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
