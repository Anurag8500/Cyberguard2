import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Password {
  text: string
  crackTime: string
  crackTimeSeconds: number
  emoji: string
  isCorrect: boolean
  explanation: string
}

interface PasswordChallengeProps {
  content: {
    theme: string
    instructions: string
    hint: string
    passwords: Password[]
    miniInsight: string
    videoLink?: {
      title: string
      url: string
      source: string
    }
  }
}

export default function PasswordChallenge({ content }: PasswordChallengeProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [showResults, setShowResults] = useState(false)

  const handlePasswordClick = (index: number) => {
    if (!showResults) {
      setSelectedIndex(index)
      setShowResults(true)
    }
  }

  return (
    <div className="space-y-6">
      {/* Theme Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg p-6 text-center">
        <h3 className="text-2xl font-bold mb-2">🎮 {content.theme}</h3>
        <p className="text-purple-100">{content.instructions}</p>
        <p className="text-sm text-purple-200 mt-2">💡 {content.hint}</p>
      </div>

      {/* Password Options */}
      <div className="grid grid-cols-1 gap-4">
        {content.passwords.map((password, index) => (
          <motion.button
            key={index}
            onClick={() => handlePasswordClick(index)}
            className={`relative p-6 rounded-lg border-2 transition-all text-left ${
              selectedIndex === index
                ? password.isCorrect
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
                : showResults
                ? password.isCorrect
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-300 bg-gray-50'
                : 'border-gray-300 hover:border-primary-400 bg-white hover:shadow-lg'
            } ${showResults ? 'cursor-default' : 'cursor-pointer'}`}
            whileHover={!showResults ? { scale: 1.02 } : {}}
            whileTap={!showResults ? { scale: 0.98 } : {}}
          >
            <div className="flex items-center justify-between mb-3">
              <code className="text-xl font-mono font-bold bg-gray-100 px-3 py-1 rounded">
                {password.text}
              </code>
              {showResults && <span className="text-3xl">{password.emoji}</span>}
            </div>
            
            <AnimatePresence>
              {showResults && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">Crack Time:</span>
                    <span className={`text-lg font-bold ${
                      password.isCorrect ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {password.crackTime}
                    </span>
                  </div>
                  
                  <div className={`p-3 rounded mt-2 ${
                    selectedIndex === index
                      ? password.isCorrect 
                        ? 'bg-green-100 border border-green-300' 
                        : 'bg-red-100 border border-red-300'
                      : 'bg-gray-100 border border-gray-300'
                  }`}>
                    <p className={`text-sm ${
                      selectedIndex === index
                        ? password.isCorrect ? 'text-green-800' : 'text-red-800'
                        : 'text-gray-700'
                    }`}>
                      {password.explanation}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* Mini Insight */}
      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg"
        >
          <h4 className="font-bold text-blue-900 mb-2 flex items-center">
            📘 Mini-Insight
          </h4>
          <p className="text-blue-800 mb-4">{content.miniInsight}</p>
          
          {content.videoLink && (
            <a
              href={content.videoLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              🔗 Watch: {content.videoLink.title} ({content.videoLink.source})
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </motion.div>
      )}

      {/* Result Message */}
      {showResults && selectedIndex !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-center p-6 rounded-lg ${
            content.passwords[selectedIndex].isCorrect
              ? 'bg-gradient-to-r from-green-500 to-emerald-500'
              : 'bg-gradient-to-r from-orange-500 to-red-500'
          } text-white`}
        >
          <p className="text-2xl font-bold">
            {content.passwords[selectedIndex].isCorrect
              ? '✅ Correct! You identified the strongest password!'
              : '❌ Not quite! Try to think about length and randomness.'}
          </p>
        </motion.div>
      )}
    </div>
  )
}
