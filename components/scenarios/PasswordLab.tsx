import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Confetti from 'react-confetti'

interface StrengthLevel {
  level: string
  color: string
  emoji: string
  feedback: string
  minScore: number
}

interface PasswordLabProps {
  content: {
    theme: string
    instructions: string
    goal: string
    tip: string
    strengthLevels: StrengthLevel[]
    requirements: {
      minLength: number
      requireUppercase: boolean
      requireLowercase: boolean
      requireNumbers: boolean
      requireSpecialChars: boolean
    }
    learningNuggets: string[]
    referenceLink?: {
      title: string
      url: string
      source: string
    }
  }
}

export default function PasswordLab({ content }: PasswordLabProps) {
  const [password, setPassword] = useState('')
  const [score, setScore] = useState(0)
  const [currentLevel, setCurrentLevel] = useState<StrengthLevel>(content.strengthLevels[0])
  const [checks, setChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    numbers: false,
    specialChars: false,
  })
  const [achievedFortified, setAchievedFortified] = useState(false)

  useEffect(() => {
    analyzePassword(password)
  }, [password])

  const analyzePassword = (pwd: string) => {
    // Check requirements
    const newChecks = {
      length: pwd.length >= content.requirements.minLength,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      numbers: /[0-9]/.test(pwd),
      specialChars: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
    }
    setChecks(newChecks)

    // Calculate score
    let newScore = 0
    
    // Length scoring (up to 40 points)
    if (pwd.length >= 12) newScore += 40
    else if (pwd.length >= 8) newScore += 20
    else if (pwd.length >= 6) newScore += 10
    
    // Character variety (up to 60 points)
    if (newChecks.uppercase) newScore += 15
    if (newChecks.lowercase) newScore += 15
    if (newChecks.numbers) newScore += 15
    if (newChecks.specialChars) newScore += 15

    setScore(newScore)

    // Determine current level
    const level = [...content.strengthLevels]
      .reverse()
      .find(l => newScore >= l.minScore) || content.strengthLevels[0]
    
    setCurrentLevel(level)

    // Check if fortified level achieved
    if (level.level === 'fortified' && !achievedFortified) {
      setAchievedFortified(true)
    }
  }

  const getCheckIcon = (passed: boolean) => {
    return passed ? '✅' : '⬜'
  }

  return (
    <div className="space-y-6">
      {/* Confetti for achieving fortified */}
      {achievedFortified && (
        <Confetti
          width={typeof window !== 'undefined' ? window.innerWidth : 300}
          height={typeof window !== 'undefined' ? window.innerHeight : 200}
          recycle={false}
          numberOfPieces={300}
          gravity={0.3}
        />
      )}
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg p-6 text-center">
        <h3 className="text-2xl font-bold mb-2">⚙️ {content.theme}</h3>
        <p className="text-cyan-100">{content.instructions}</p>
        <p className="text-sm font-semibold text-cyan-200 mt-2">🎯 Goal: {content.goal}</p>
        <p className="text-sm text-cyan-200 mt-1">💡 {content.tip}</p>
      </div>

      {/* Password Input */}
      <div className="card bg-white p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Try Creating Your Password:
        </label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type your password here..."
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all font-mono text-lg"
        />
        
        {/* Real-time Feedback */}
        {password && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Password Strength:</span>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{currentLevel.emoji}</span>
                <span 
                  className="font-bold text-lg capitalize"
                  style={{ color: currentLevel.color }}
                >
                  {currentLevel.level}
                </span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 0.3 }}
                className="h-full rounded-full"
                style={{ 
                  backgroundColor: currentLevel.color,
                  boxShadow: `0 0 10px ${currentLevel.color}40`
                }}
              />
            </div>
            
            {/* Feedback */}
            <motion.p
              key={currentLevel.feedback}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-sm font-medium"
              style={{ color: currentLevel.color }}
            >
              💬 {currentLevel.feedback}
            </motion.p>
          </motion.div>
        )}
      </div>

      {/* Requirements Checklist */}
      <div className="card bg-gray-50 p-6">
        <h4 className="font-semibold text-gray-800 mb-3">Password Requirements:</h4>
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="text-xl mr-2">{getCheckIcon(checks.length)}</span>
            <span className={checks.length ? 'text-green-600' : 'text-gray-600'}>
              At least {content.requirements.minLength} characters
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-xl mr-2">{getCheckIcon(checks.uppercase)}</span>
            <span className={checks.uppercase ? 'text-green-600' : 'text-gray-600'}>
              Uppercase letters (A-Z)
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-xl mr-2">{getCheckIcon(checks.lowercase)}</span>
            <span className={checks.lowercase ? 'text-green-600' : 'text-gray-600'}>
              Lowercase letters (a-z)
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-xl mr-2">{getCheckIcon(checks.numbers)}</span>
            <span className={checks.numbers ? 'text-green-600' : 'text-gray-600'}>
              Numbers (0-9)
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-xl mr-2">{getCheckIcon(checks.specialChars)}</span>
            <span className={checks.specialChars ? 'text-green-600' : 'text-gray-600'}>
              Special characters (!@#$%^&*)
            </span>
          </div>
        </div>
      </div>

      {/* Achievement Banner */}
      {achievedFortified && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-6 text-center"
        >
          <div className="text-4xl mb-2">🎉</div>
          <h4 className="text-2xl font-bold mb-1">Mission Accomplished!</h4>
          <p className="text-purple-100">You've created an Uncrackable Fortress password!</p>
        </motion.div>
      )}

      {/* Quick Learn Nuggets */}
      <div className="card bg-yellow-50 border border-yellow-200 p-6">
        <h4 className="font-semibold text-yellow-900 mb-3 flex items-center">
          🔍 Quick Learn Nuggets:
        </h4>
        <ul className="space-y-2">
          {content.learningNuggets.map((nugget, index) => (
            <li key={index} className="flex items-start">
              <span className="text-yellow-600 mr-2">•</span>
              <span className="text-yellow-900 text-sm">{nugget}</span>
            </li>
          ))}
        </ul>
        
        {content.referenceLink && (
          <a
            href={content.referenceLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-yellow-700 hover:text-yellow-800 font-medium mt-4"
          >
            🔗 {content.referenceLink.title} ({content.referenceLink.source})
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}
