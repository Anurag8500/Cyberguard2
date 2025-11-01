import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaShieldAlt, FaTrophy, FaUser, FaCog, FaSignOutAlt, FaSearch, FaExclamationTriangle, FaGamepad } from 'react-icons/fa'

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
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/dashboard" 
              className={`hover:text-cyber-blue transition-colors ${router.pathname === '/dashboard' ? 'text-cyber-blue' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              href="/modules" 
              className={`hover:text-cyber-blue transition-colors ${router.pathname.startsWith('/modules') ? 'text-cyber-blue' : ''}`}
            >
              Modules
            </Link>
            <Link 
              href="/inspect-zone" 
              className={`hover:text-cyber-blue transition-colors ${router.pathname === '/inspect-zone' ? 'text-cyber-blue' : ''}`}
            >
              <FaSearch className="inline mr-1" />
              Inspect Zone
            </Link>
            <Link 
              href="/cybersos" 
              className={`hover:text-cyber-blue transition-colors ${router.pathname === '/cybersos' ? 'text-cyber-blue' : ''}`}
            >
              <FaExclamationTriangle className="inline mr-1" />
              CyberSOS
            </Link>
            <Link 
              href="/simulation-zone" 
              className={`hover:text-cyber-blue transition-colors ${router.pathname === '/simulation-zone' ? 'text-cyber-blue' : ''}`}
            >
              <FaGamepad className="inline mr-1" />
              Simulation Zone
            </Link>
            <Link 
              href="/leaderboard" 
              className={`hover:text-cyber-blue transition-colors ${router.pathname === '/leaderboard' ? 'text-cyber-blue' : ''}`}
            >
              <FaTrophy className="inline mr-1" />
              Leaderboard
            </Link>
            <Link 
              href="/profile" 
              className={`hover:text-cyber-blue transition-colors ${router.pathname === '/profile' ? 'text-cyber-blue' : ''}`}
            >
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
