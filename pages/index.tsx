import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { FaShieldAlt, FaGamepad, FaGlobe, FaMobile, FaTrophy, FaUsers } from 'react-icons/fa'

export default function Home() {
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)

  const navigateWithTransition = (url: string) => {
    setIsNavigating(true)
    setTimeout(() => router.push(url), 250)
  }
  return (
    <>
      <Head>
        <title>CyberGuard Academy - Learn Cybersecurity Through Interactive Scenarios</title>
        <meta name="description" content="Transform cybersecurity education from boring PDFs to engaging, gamified learning experience" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-cyber-dark via-primary-900 to-cyber-dark">
        {/* Navigation */}
        <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaShieldAlt className="text-cyber-blue text-3xl" />
            <h1 className="text-2xl font-bold text-white">CyberGuard Academy</h1>
          </div>
          <div className="flex gap-4">
            <Link
              href="/auth/login"
              className="btn-primary"
              onClick={(e) => { e.preventDefault(); navigateWithTransition('/auth/login') }}
            >
              Login
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isNavigating ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
            transition={{ duration: isNavigating ? 0.25 : 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Learn Cybersecurity<br />
              <span className="text-cyber-gradient">Through Real-Life Scenarios</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Not Boring PDFs. Interactive stories, gamified learning, and hands-on experience
              that makes digital safety accessible and fun.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/auth/signup"
                className="btn-primary text-lg px-8 py-4"
                onClick={(e) => { e.preventDefault(); navigateWithTransition('/auth/signup') }}
              >
                🚀 Start Learning Free
              </Link>
            </div>

            {/* Animated Shield */}
            <motion.div
              className="inline-block"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <FaShieldAlt className="text-cyber-blue text-8xl opacity-50 animate-shield-pulse" />
            </motion.div>
          </motion.div>
        </section>

        {/* Statistics Counter - REMOVED */}

        {/* Key Features */}
        <section className="container mx-auto px-6 py-20">
          <h3 className="text-4xl font-bold text-white text-center mb-12">
            Why CyberGuard Academy?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaGamepad className="text-5xl text-cyber-purple" />,
                title: 'Interactive Learning Modules',
                description: 'Master cybersecurity through hands-on modules including Password Fortress, Safe Online Shopping, Phishing Forest, and more.'
              },
              {
                icon: <FaTrophy className="text-5xl text-cyber-green" />,
                title: 'Gamified Experience',
                description: 'Earn XP, unlock badges, and track your progress as you complete scenarios and master new skills.'
              },
              {
                icon: <FaShieldAlt className="text-5xl text-cyber-blue" />,
                title: 'CyberPedia Knowledge Base',
                description: 'Access comprehensive FAQs, safety tips, and glossary to deepen your understanding of cybersecurity concepts.'
              },
              {
                icon: <FaMobile className="text-5xl text-cyber-purple" />,
                title: 'Adventure Games',
                description: 'Immerse yourself in Cyber Escape Chamber and Cyberverse Chronicles - interactive games that teach security concepts.'
              },
              {
                icon: <FaGlobe className="text-5xl text-cyber-green" />,
                title: 'Simulation Zone',
                description: 'Practice real-world scenarios in a safe environment with interactive simulations and practical exercises.'
              },
              {
                icon: <FaUsers className="text-5xl text-cyber-blue" />,
                title: 'Personalized Dashboard',
                description: 'Track your learning journey, view achievements, and continue where you left off with a customized experience.'
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:border-cyber-blue transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="mb-4">{feature.icon}</div>
                <h4 className="text-2xl font-bold text-white mb-3">{feature.title}</h4>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Learning Modules Preview */}
        <section className="container mx-auto px-6 py-20">
          <h3 className="text-4xl font-bold text-white text-center mb-12">
            What You'll Learn
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                module: 'Module 1',
                title: 'Password Fortress',
                description: 'Master password security through interactive challenges. Create unbreakable passwords, enable 2FA, and protect your accounts.',
                scenarios: ['Password Creation Challenge', 'Password Reuse Trap', '2FA Setup Tutorial', 'Crack the Code Game'],
                reward: '150 XP + Password Guardian Badge',
                color: 'from-blue-600 to-purple-600'
              },
              {
                module: 'Module 2',
                title: 'Safe Online Shopping',
                description: 'Spot fake websites, identify scams, and shop safely. Learn to detect phishing, verify payment gateways, and avoid fraud.',
                scenarios: ['Fake Store Detection', 'Payment Gateway Safety', 'Review Analysis', 'Shopping Simulator'],
                reward: '150 XP + Smart Shopper Badge',
                color: 'from-green-600 to-teal-600'
              },
            ].map((module, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`bg-gradient-to-br ${module.color} rounded-xl p-8 text-white`}
              >
                <div className="text-sm font-semibold mb-2 opacity-80">{module.module}</div>
                <h4 className="text-3xl font-bold mb-4">{module.title}</h4>
                <p className="mb-6 opacity-90">{module.description}</p>
                
                <div className="mb-6">
                  <div className="text-sm font-semibold mb-3">Interactive Scenarios:</div>
                  <ul className="space-y-2">
                    {module.scenarios.map((scenario, j) => (
                      <li key={j} className="flex items-center">
                        <span className="mr-2">✓</span>
                        {scenario}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-sm font-semibold mb-1">Reward:</div>
                  <div className="font-bold">{module.reward}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-2xl p-12"
          >
            <h3 className="text-4xl font-bold text-white mb-4">
              Ready to Become a Cyber Guardian?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of learners protecting themselves online. Start your journey today—it's free!
            </p>
            <Link href="/auth/signup" className="inline-block bg-white text-primary-600 font-bold text-lg px-10 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
              Get Started Now →
            </Link>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 text-center text-gray-400 border-t border-white/10">
          <div className="mb-4">
            <FaShieldAlt className="text-cyber-blue text-4xl mx-auto mb-2" />
            <div className="text-xl font-bold text-white">CyberGuard Academy</div>
          </div>
          <p className="mb-4">Making the internet safer, one learner at a time.</p>
          <p className="text-sm">© 2025 CyberGuard Academy. All rights reserved.</p>
        </footer>
      </main>
    </>
  )
}
