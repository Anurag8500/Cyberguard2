import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGamepad, FaLock, FaUserSecret, FaNetworkWired, FaSearch, FaBug } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

interface SimulationZoneProps {
  user: any
  setUser: (user: any) => void
  logout: () => void
}

const games = [
  {
    id: 1,
    title: 'Cyber Escape Chamber',
    description: 'Crack codes, solve clues, escape fast.',
    icon: FaLock,
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
  },
  {
    id: 2,
    title: 'CyberVerse Chronicles: Heroes Rewired',
    description: 'Be the hero, fight digital villains.',
    icon: FaUserSecret,
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
  },
  {
    id: 3,
    title: 'Protocol ShadowLock',
    description: 'Decrypt chains, unlock hidden cyber secrets.',
    icon: FaNetworkWired,
    gradient: 'from-indigo-500 to-purple-500',
    bgGradient: 'from-indigo-50 to-purple-50',
    locked: true,
  },
  {
    id: 4,
    title: 'Operation BlackTrace',
    description: 'Trace hackers, solve cyber crime mysteries.',
    icon: FaSearch,
    gradient: 'from-red-500 to-orange-500',
    bgGradient: 'from-red-50 to-orange-50',
    locked: true,
  },
  {
    id: 5,
    title: 'Project ZeroCode',
    description: 'Infiltrate networks, patch vulnerabilities, win.',
    icon: FaNetworkWired,
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-50 to-emerald-50',
    locked: true,
  },
  {
    id: 6,
    title: 'Project ZeroCode',
    description: 'Debug systems, find the ghost hacker.',
    icon: FaBug,
    gradient: 'from-yellow-500 to-orange-500',
    bgGradient: 'from-yellow-50 to-orange-50',
    locked: true,
  },
];

export default function SimulationZone({ user, setUser, logout }: SimulationZoneProps) {
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
  
  const handleGameClick = (gameId: number, gameTitle: string) => {
    // Route to specific game pages
    if (gameId === 1) {
      router.push('/games/cyber-escape-chamber');
    } else if (gameId === 2) {
      router.push('/games/cyberverse-chronicles');
    } else {
      // Placeholder for other games - will be implemented later
      alert(`${gameTitle} - Coming Soon!\n\nGame instructions will be added in the next update.`);
    }
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
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="inline-block mb-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-2xl opacity-40 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 text-white p-8 rounded-full shadow-2xl">
                <FaGamepad className="text-6xl" />
              </div>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-extrabold mb-4"
          >
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              🎮 Simulation Zone
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-gray-700"
          >
            A playground of cyber missions — decode, defend, and defeat digital dangers.
          </motion.p>
        </motion.div>

        {/* Games Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleGameClick(game.id, game.title)}
              className={`cursor-pointer ${game.locked ? 'pointer-events-none opacity-60' : ''}`}
            >
              <div className={`relative bg-gradient-to-br ${game.bgGradient} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-200 hover:border-gray-300`}>
                <div className={`bg-gradient-to-r ${game.gradient} p-6 flex justify-center items-center`}>
                  <game.icon className="text-6xl text-white" />
                </div>
                
                <div className="p-6 flex flex-col justify-between h-48">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {game.id}. {game.title}
                  </h3>
                  <p className="text-gray-600 text-lg font-medium leading-tight">
                    {game.description}
                  </p>
                </div>
                
                <div className={`bg-gradient-to-r ${game.gradient} px-6 py-3 text-center`}>
                  <span className="text-white font-bold text-lg">
                    {game.locked ? 'Locked' : 'Launch Mission →'}
                  </span>
                </div>
                {game.locked && (
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

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-6 text-center border-2 border-indigo-200"
        >
          <p className="text-lg font-semibold text-gray-700">
            💡 <span className="font-bold">Pro Tip:</span> Each simulation tests different cybersecurity skills. 
            Complete all missions to become a cyber defender!
          </p>
        </motion.div>
      </main>
    </div>
  );
}
