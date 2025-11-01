import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { FaExternalLinkAlt, FaLink, FaFileAlt, FaEnvelope, FaCommentAlt, FaLock, FaShieldAlt, FaSearch } from 'react-icons/fa'
import Navbar from '@/components/Navbar'

interface InspectZoneProps {
  user: any
  setUser: (user: any) => void
  logout: () => void
}

interface InspectCard {
  title: string
  description: string
  url: string
  icon: JSX.Element
  color: string
}

export default function InspectZone({ user, setUser, logout }: InspectZoneProps) {
  const router = useRouter()

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
  }, [])

  const inspectTools: InspectCard[] = [
    {
      title: 'URL Checker',
      description: 'Scans any website link against dozens of antivirus engines and threat intelligence sources.',
      url: 'https://nordvpn.com/link-checker/',
      icon: <FaLink className="text-4xl" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'File Checker',
      description: 'Safely uploads and analyzes suspicious files for malware using multiple antivirus scanners.',
      url: 'https://www.virustotal.com/gui/home/upload',
      icon: <FaFileAlt className="text-4xl" />,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Credential Leak Checker',
      description: 'Checks if your email address or username has appeared in any known public data breaches.',
      url: 'https://haveibeenpwned.com/',
      icon: <FaShieldAlt className="text-4xl" />,
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'SMS Checker',
      description: 'Uses an AI-powered tool to check the content of a text message for known scam or phishing tactics.',
      url: 'https://www.f-secure.com/en/text-message-checker',
      icon: <FaCommentAlt className="text-4xl" />,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Email Header Analyzer',
      description: 'Pastes and decodes an email\'s hidden technical header to reveal its true origin and server route.',
      url: 'https://toolbox.googleapps.com/apps/messageheader/',
      icon: <FaEnvelope className="text-4xl" />,
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Website SSL/Certificate Checker',
      description: 'Analyzes a website\'s HTTPS configuration for security quality, expiration, and vulnerabilities.',
      url: 'https://www.ssllabs.com/ssltest/',
      icon: <FaLock className="text-4xl" />,
      color: 'from-cyan-500 to-cyan-600'
    }
  ]

  const handleCardClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
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
        <title>Inspect Zone - CyberGuard Academy</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <Navbar user={user} logout={logout} />

        <main className="container mx-auto px-6 py-12">
          {/* Hero Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="inline-block mb-4"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-cyber-blue rounded-full blur-2xl opacity-30 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-primary-600 to-cyber-blue text-white p-6 rounded-full shadow-2xl">
                  <FaSearch className="text-5xl" />
                </div>
              </div>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-extrabold mb-4"
            >
              <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-cyber-blue bg-clip-text text-transparent">
                Inspect Zone
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Powerful security tools to verify links, files, emails, and more. 
              <span className="font-semibold text-primary-600"> Stay safe online!</span>
            </motion.p>
          </motion.div>

          {/* Cards Grid with Enhanced Design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {inspectTools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                onClick={() => handleCardClick(tool.url)}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Background Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Icon Container */}
                <div className="relative p-6 pb-4">
                  <motion.div 
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`bg-gradient-to-br ${tool.color} text-white rounded-2xl p-5 mb-4 inline-flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
                  >
                    {tool.icon}
                  </motion.div>
                  
                  {/* Title with External Link Icon */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors">
                      {tool.title}
                    </h3>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="text-primary-600"
                    >
                      <FaExternalLinkAlt className="text-lg" />
                    </motion.div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                
                {/* Bottom Border Accent */}
                <div className={`h-1 bg-gradient-to-r ${tool.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Info Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="relative overflow-hidden rounded-3xl shadow-2xl"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-purple-600 to-cyber-blue"></div>
            <div className="absolute inset-0 opacity-20">
              <motion.div
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                className="w-full h-full"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '50px 50px',
                }}
              />
            </div>
            
            {/* Content */}
            <div className="relative p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <motion.div 
                  animate={{ 
                    rotate: [0, 5, -5, 5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                  className="text-6xl md:text-7xl"
                >
                  🛡️
                </motion.div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Stay Vigilant & Stay Safe!
                  </h3>
                  <p className="text-white/90 text-lg leading-relaxed">
                    These tools help you verify suspicious content before interacting with it. 
                    Always think twice before clicking links, downloading files, or sharing sensitive information.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">🔒 Safe Browsing</span>
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">✅ Verified Tools</span>
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">⚡ Instant Check</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </>
  )
}
