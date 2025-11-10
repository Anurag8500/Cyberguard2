import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaShieldAlt, FaQuestionCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

const sections = [
  {
    id: 1,
    title: 'Cyber Glossary',
    description: 'Cyber terms made simple.',
    icon: FaBook,
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
    route: '/cyberpedia/glossary'
  },
  {
    id: 2,
    title: 'Cyber Safety Tips',
    description: 'Stay smart, stop scams.',
    icon: FaShieldAlt,
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-50 to-emerald-50',
    route: '/cyberpedia/safety-tips'
  },
  {
    id: 3,
    title: 'Frequent FAQs',
    description: 'Quick answers. Safe actions.',
    icon: FaQuestionCircle,
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
    route: '/cyberpedia/faqs'
  }
];

export default function CyberPedia() {
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);

  const handleSectionClick = (route: string) => {
    // Route to specific sections
    if (route === '/cyberpedia/glossary') {
      router.push('/cyberpedia/glossary');
    } else if (route === '/cyberpedia/faqs') {
      // Smooth exit animation before navigating to static FAQs page
      setLeaving(true);
      setTimeout(() => router.push('/faq.html'), 280);
    } else if (route === '/cyberpedia/safety-tips') {
      // Smooth exit animation before navigating to Safety Tips page
      setLeaving(true);
      setTimeout(() => router.push('/cyberpedia/safety-tips'), 280);
    } else {
      // Placeholder for other sections - will be implemented later
      alert('Coming Soon!\n\nThis section is under development.');
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: 0.25 }}
    >
      <Navbar />
      
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
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="inline-block mb-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-2xl opacity-40 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 rounded-full shadow-2xl">
                <FaBook className="text-6xl" />
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
              📚 CYBERPEDIA
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-gray-700"
          >
            "Learn. Decode. Stay Secure."
          </motion.p>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto mb-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 shadow-xl border-2 border-blue-300"
        >
          <p className="text-lg font-semibold text-gray-800 text-center">
            💡 Your one-stop knowledge hub for all things cybersecurity. From definitions to safety practices — learn at your own pace.
          </p>
        </motion.div>

        {/* Sections Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSectionClick(section.route)}
              className="cursor-pointer"
            >
              <div className={`bg-gradient-to-br ${section.bgGradient} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-200 hover:border-gray-300 h-full`}>
                {/* Icon Section */}
                <div className={`bg-gradient-to-r ${section.gradient} p-8 flex justify-center items-center`}>
                  <section.icon className="text-7xl text-white" />
                </div>
                
                {/* Content Section */}
                <div className="p-6 flex flex-col justify-between h-48">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 text-lg font-medium">
                      {section.description}
                    </p>
                  </div>
                  
                  {/* Action Button */}
                  <div className={`bg-gradient-to-r ${section.gradient} px-4 py-3 rounded-xl text-center mt-4`}>
                    <span className="text-white font-bold text-lg">
                      Explore →
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Info Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="max-w-4xl mx-auto mt-12 bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-200"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            🎯 Why CyberPedia?
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl mb-2">📖</div>
              <h4 className="font-bold text-gray-800 mb-2">Simplified Learning</h4>
              <p className="text-gray-600">Complex terms explained in simple words</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🛡️</div>
              <h4 className="font-bold text-gray-800 mb-2">Practical Tips</h4>
              <p className="text-gray-600">Real-world safety advice you can use daily</p>
            </div>
            <div>
              <div className="text-4xl mb-2">❓</div>
              <h4 className="font-bold text-gray-800 mb-2">Quick Answers</h4>
              <p className="text-gray-600">Instant solutions to common security questions</p>
            </div>
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
}
