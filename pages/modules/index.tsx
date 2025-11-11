import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCubes, FaKey, FaUserSecret, FaUserShield, FaShieldAlt, FaSearch, FaLock } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

interface ModulesIndexProps {
  user: any
  setUser: (user: any) => void
  logout: () => void
}

const modulesList = [
  {
    id: 1,
    title: 'Password Island',
    slug: 'password-island',
    description: 'Master strong passwords and passphrases.',
    icon: FaKey,
    gradient: 'from-emerald-500 to-teal-500',
    bgGradient: 'from-emerald-50 to-teal-50',
  },
  {
    id: 2,
    title: 'Phishing Forest',
    slug: 'phishing-forest',
    description: 'Spot and stop phishing traps.',
    icon: FaUserSecret,
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
  },
  {
    id: 3,
    title: 'Privacy Tower',
    slug: 'privacy-tower',
    description: 'Control your data and digital footprint.',
    icon: FaUserShield,
    gradient: 'from-indigo-500 to-purple-500',
    bgGradient: 'from-indigo-50 to-purple-50',
    locked: true,
  },
  {
    id: 4,
    title: 'Firewall Forge',
    slug: 'firewall-forge',
    description: 'Build barriers against cyber threats.',
    icon: FaShieldAlt,
    gradient: 'from-orange-500 to-amber-500',
    bgGradient: 'from-orange-50 to-amber-50',
    locked: true,
  },
  {
    id: 5,
    title: 'Social Sleuth Street',
    slug: 'social-sleuth-street',
    description: 'Investigate profiles and spot impersonation.',
    icon: FaSearch,
    gradient: 'from-rose-500 to-pink-500',
    bgGradient: 'from-rose-50 to-pink-50',
    locked: true,
  },
  {
    id: 6,
    title: 'Encryption Lab',
    slug: 'encryption-lab',
    description: 'Lock down communications with encryption.',
    icon: FaLock,
    gradient: 'from-sky-500 to-violet-500',
    bgGradient: 'from-sky-50 to-violet-50',
    locked: true,
  },
];

export default function ModulesIndex({ user, setUser, logout }: ModulesIndexProps) {
  const router = useRouter();

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

  const handleModuleClick = (slug: string, title: string, locked?: boolean) => {
    if (locked) return;
    router.push(`/modules/${slug}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navbar user={user} logout={logout} />

      <main className="container mx-auto px-6 py-12">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-2xl opacity-40 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 rounded-full shadow-2xl">
                <FaCubes className="text-6xl" />
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-extrabold mb-4"
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              📦 Modules
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-gray-700"
          >
            Structured lessons to turn knowledge into your strongest firewall.
          </motion.p>
        </motion.div>

        {/* Modules Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {modulesList.map((mod, index) => (
            <motion.div
              key={mod.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleModuleClick(mod.slug, mod.title, (mod as any).locked)}
              className={`cursor-pointer ${(mod as any).locked ? 'pointer-events-none opacity-60' : ''}`}
            >
              <div className={`relative bg-gradient-to-br ${mod.bgGradient} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-200 hover:border-gray-300`}>
                {/* Icon */}
                <div className={`bg-gradient-to-r ${mod.gradient} p-6 flex justify-center items-center`}>
                  <mod.icon className="text-6xl text-white" />
                </div>
                {/* Content */}
                <div className="p-6 flex flex-col justify-between h-48">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {mod.id}. {mod.title}
                  </h3>
                  <p className="text-gray-600 text-lg font-medium leading-tight">
                    {mod.description}
                  </p>
                </div>
                {/* CTA */}
                <div className={`bg-gradient-to-r ${mod.gradient} px-6 py-3 text-center`}>
                  <span className="text-white font-bold text-lg">
                    {(mod as any).locked ? 'Locked' : 'Start Module →'}
                  </span>
                </div>
                {(mod as any).locked && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                    <motion.div animate={{ scale: [1, 1.06, 1], opacity: [0.95, 1, 0.95] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} className="flex items-center gap-2 text-white font-semibold bg-white/10 px-4 py-2 rounded-full border border-white/30">
                      <FaLock className="text-white" /> Locked
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
