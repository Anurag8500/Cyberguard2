import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowLeft, FaArrowRight, FaCheck, FaTrophy } from 'react-icons/fa'
import Navbar from '@/components/Navbar'
import Confetti from 'react-confetti'
import PasswordChallenge from '@/components/scenarios/PasswordChallenge'
import PasswordLab from '@/components/scenarios/PasswordLab'

interface ModuleDetailProps {
  user: any
  setUser: (user: any) => void
  logout: () => void
}

export default function ModuleDetail({ user, setUser, logout }: ModuleDetailProps) {
  const router = useRouter()
  const { slug } = router.query
  const [loading, setLoading] = useState(true)
  const [module, setModule] = useState<any>(null)
  const [scenarios, setScenarios] = useState<any[]>([])
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0)
  const [answers, setAnswers] = useState<any>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [showScoreConfetti, setShowScoreConfetti] = useState(false)
  const [showScorePopup, setShowScorePopup] = useState(false)

  useEffect(() => {
    if (!slug) return

    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/auth/login')
      return
    }

    if (!user) {
      const userData = localStorage.getItem('user')
      if (userData) setUser(JSON.parse(userData))
    }

    fetchModuleData(token, slug as string)
  }, [slug])

  const fetchModuleData = async (token: string, moduleSlug: string) => {
    try {
      const response = await fetch(`/api/modules/${moduleSlug}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })

      if (!response.ok) throw new Error('Failed to fetch module')

      const data = await response.json()
      setModule(data.module)
      setScenarios(data.scenarios)
      setCurrentScenarioIndex(data.progress?.currentScenario || 0)
    } catch (error) {
      console.error('Error fetching module:', error)
      router.push('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleNext = () => {
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1)
      setShowResults(false)
      // Scroll to top of page
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevious = () => {
    if (currentScenarioIndex > 0) {
      setCurrentScenarioIndex(currentScenarioIndex - 1)
      setShowResults(false)
      // Scroll to top of page
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setAnswers({
      ...answers,
      [currentScenarioIndex]: {
        ...answers[currentScenarioIndex],
        [questionIndex]: answerIndex,
      },
    })
  }

  const handleSubmitAssessment = async () => {
    const currentScenario = scenarios[currentScenarioIndex]
    const questions = currentScenario.content.questions
    const currentAnswers = answers[currentScenarioIndex] || {}

    let correct = 0
    questions.forEach((q: any, idx: number) => {
      if (currentAnswers[idx] === q.correct) correct++
    })

    const calculatedScore = Math.round((correct / questions.length) * 100)
    setScore(calculatedScore)
    
    // Show popup first with confetti
    setShowScorePopup(true)
    setShowScoreConfetti(true)

    // If this is the last scenario, complete the module
    if (currentScenarioIndex === scenarios.length - 1) {
      await completeModule(calculatedScore)
    }
  }
  
  const handleCloseScorePopup = () => {
    setShowScorePopup(false)
    setShowScoreConfetti(false)
    setShowResults(true)
    // Scroll to top to review answers
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const completeModule = async (finalScore: number) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/modules/${slug}/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          score: finalScore,
          timeSpent: Math.floor(Date.now() / 1000), // Simplified
        }),
      })

      if (response.ok) {
        const data = await response.json()
        
        // Update user data
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user))
          setUser(data.user)
        }
      }
    } catch (error) {
      console.error('Error completing module:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading module...</p>
        </div>
      </div>
    )
  }

  if (!module || scenarios.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} logout={logout} />
        <div className="container mx-auto px-6 py-8 text-center">
          <p className="text-gray-600">Module not found</p>
        </div>
      </div>
    )
  }

  const currentScenario = scenarios[currentScenarioIndex]
  const progress = ((currentScenarioIndex + 1) / scenarios.length) * 100

  return (
    <>
      <Head>
        <title>{module.title} - CyberGuard Academy</title>
      </Head>

      {/* Quiz score confetti */}
      {showScoreConfetti && showScorePopup && (
        <Confetti
          width={typeof window !== 'undefined' ? window.innerWidth : 300}
          height={typeof window !== 'undefined' ? window.innerHeight : 200}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
        />
      )}

      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} logout={logout} />

        <main className="container mx-auto px-6 py-8 max-w-4xl">
          {/* Module Header */}
          <div className="mb-6">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center text-primary-600 hover:text-primary-700 mb-4"
            >
              <FaArrowLeft className="mr-2" />
              Back to Dashboard
            </button>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {module.icon} {module.title}
            </h1>
            <p className="text-gray-600">{module.description}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>
                Scenario {currentScenarioIndex + 1} of {scenarios.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="progress-bar h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-primary-500 to-cyber-blue"
              />
            </div>
          </div>

          {/* Scenario Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScenarioIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="card mb-6"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {currentScenario.title}
              </h2>

              {/* Story Type */}
              {currentScenario.type === 'STORY' && (
                <div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {currentScenario.content.story}
                  </p>
                  {currentScenario.content.learningPoints && (
                    <div className="bg-cyber-blue/10 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-800 mb-3">
                        🎯 Key Learning Points:
                      </h3>
                      <ul className="space-y-2">
                        {currentScenario.content.learningPoints.map((point: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <FaCheck className="text-cyber-blue mt-1 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Interactive Type */}
              {currentScenario.type === 'INTERACTIVE' && (
                <div>
                  {currentScenario.content.type === 'password_challenge' && (
                    <PasswordChallenge content={currentScenario.content} />
                  )}
                  
                  {currentScenario.content.type === 'password_analysis' && (
                    <div className="space-y-4">
                      {currentScenario.content.passwords.map((pwd: any, i: number) => (
                        <div key={i} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <code className="text-lg font-mono bg-gray-100 px-3 py-1 rounded">
                              {pwd.text}
                            </code>
                            <span
                              className={`badge ${
                                pwd.strength === 'weak'
                                  ? 'bg-red-500'
                                  : pwd.strength === 'medium'
                                  ? 'bg-yellow-500'
                                  : pwd.strength === 'strong'
                                  ? 'bg-blue-500'
                                  : 'bg-green-500'
                              } text-white`}
                            >
                              {pwd.strength}
                            </span>
                          </div>
                          {pwd.issues.length > 0 && (
                            <div className="text-sm text-red-600">
                              Issues: {pwd.issues.join(', ')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Mini Game Type */}
              {currentScenario.type === 'MINI_GAME' && (
                <div>
                  {currentScenario.content.type === 'password_creator' && (
                    currentScenario.content.theme ? (
                      <PasswordLab content={currentScenario.content} />
                    ) : (
                      <div>
                        <div className="bg-primary-50 rounded-lg p-6 mb-4">
                          <h3 className="font-semibold mb-3">Requirements:</h3>
                          <ul className="space-y-1 text-sm">
                            <li>✓ At least {currentScenario.content.requirements.minLength} characters</li>
                            <li>✓ Uppercase letters</li>
                            <li>✓ Lowercase letters</li>
                            <li>✓ Numbers</li>
                            <li>✓ Special characters</li>
                          </ul>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <h4 className="font-semibold text-yellow-800 mb-2">💡 Hints:</h4>
                          <ul className="space-y-1 text-sm text-yellow-700">
                            {currentScenario.content.hints?.map((hint: string, i: number) => (
                              <li key={i}>• {hint}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )
                  )}

                  {currentScenario.content.type === 'website_comparison' && (
                    <div className="space-y-4">
                      {currentScenario.content.websites.map((site: any, i: number) => (
                        <div
                          key={i}
                          className={`border-2 rounded-lg p-6 ${
                            site.isLegit
                              ? 'border-green-300 bg-green-50'
                              : 'border-red-300 bg-red-50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <code className="text-lg font-mono">{site.url}</code>
                            <span
                              className={`badge ${
                                site.isLegit ? 'bg-green-500' : 'bg-red-500'
                              } text-white`}
                            >
                              {site.isLegit ? '✓ Legitimate' : '✗ Fake'}
                            </span>
                          </div>
                          <div className="text-sm">
                            <strong>Reasons:</strong>
                            <ul className="mt-2 space-y-1">
                              {site.reasons.map((reason: string, j: number) => (
                                <li key={j}>• {reason}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Assessment Type */}
              {currentScenario.type === 'ASSESSMENT' && (
                <div className="space-y-6">
                  {/* Quiz Header for Password Island */}
                  {currentScenario.content.theme && (
                    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden">
                      {/* Decorative elements */}
                      <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                      </div>
                      
                      <div className="relative z-10">
                        <div className="text-5xl mb-4">🎮</div>
                        <h3 className="text-3xl font-bold mb-3 drop-shadow-lg">{currentScenario.content.theme}</h3>
                        <p className="text-purple-100 text-lg mb-4">{currentScenario.content.format}</p>
                        {currentScenario.content.badge && (
                          <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-xl p-4 inline-block border border-white/30">
                            <p className="text-lg font-semibold flex items-center justify-center gap-2">
                              🎯 Earn: "{currentScenario.content.badge.name}" {currentScenario.content.badge.icon}
                            </p>
                            <p className="text-sm text-purple-200 mt-1">+{currentScenario.content.badge.xp} XP</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {currentScenario.content.questions.map((question: any, qIdx: number) => (
                    <motion.div 
                      key={qIdx} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: qIdx * 0.1 }}
                      className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                          {qIdx + 1}
                        </div>
                        <h3 className="font-semibold text-gray-800 text-lg flex-1">
                          {question.question}
                        </h3>
                      </div>
                      {question.hint && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4 rounded">
                          <p className="text-sm text-yellow-800 flex items-center gap-2">
                            <span className="text-lg">💡</span>
                            <span><strong>Hint:</strong> {question.hint}</span>
                          </p>
                        </div>
                      )}
                      <div className="space-y-3">
                        {question.options.map((option: string, oIdx: number) => {
                          const isSelected = answers[currentScenarioIndex]?.[qIdx] === oIdx
                          const isCorrect = oIdx === question.correct
                          const showAnswer = showResults

                          return (
                            <motion.button
                              key={oIdx}
                              onClick={() => !showResults && handleAnswerSelect(qIdx, oIdx)}
                              disabled={showResults}
                              whileHover={!showResults ? { scale: 1.01, x: 4 } : {}}
                              whileTap={!showResults ? { scale: 0.99 } : {}}
                              className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium ${
                                showAnswer && isCorrect
                                  ? 'border-green-500 bg-green-50 shadow-md'
                                  : showAnswer && isSelected && !isCorrect
                                  ? 'border-red-500 bg-red-50 shadow-md'
                                  : isSelected
                                  ? 'border-purple-500 bg-purple-50 shadow-md'
                                  : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50/50 hover:shadow'
                              } ${showResults ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                              <span className="flex items-center gap-3">
                                <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm ${
                                  showAnswer && isCorrect
                                    ? 'border-green-500 bg-green-500 text-white'
                                    : showAnswer && isSelected && !isCorrect
                                    ? 'border-red-500 bg-red-500 text-white'
                                    : isSelected
                                    ? 'border-purple-500 bg-purple-500'
                                    : 'border-gray-400'
                                }`}>
                                  {showAnswer && isCorrect && '✓'}
                                  {showAnswer && isSelected && !isCorrect && '✗'}
                                  {!showAnswer && isSelected && <div className="w-3 h-3 bg-white rounded-full"></div>}
                                </span>
                                <span className="flex-1">{option}</span>
                              </span>
                            </motion.button>
                          )
                        })}
                      </div>
                      {showResults && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-r-lg"
                        >
                          <p className="text-sm text-blue-900 leading-relaxed">
                            <strong className="text-blue-700">ℹ️ Explanation:</strong> {question.explanation}
                          </p>
                          {question.referenceLink && (
                            <a
                              href={question.referenceLink.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm mt-3 hover:underline"
                            >
                              🔗 {question.referenceLink.title}
                              {question.referenceLink.source && ` (${question.referenceLink.source})`}
                              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}

                  {!showResults && (
                    <motion.button
                      onClick={handleSubmitAssessment}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      disabled={
                        Object.keys(answers[currentScenarioIndex] || {}).length !==
                        currentScenario.content.questions.length
                      }
                    >
                      <span className="flex items-center justify-center gap-2 text-lg">
                        <FaCheck />
                        Submit Assessment
                      </span>
                    </motion.button>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentScenarioIndex === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaArrowLeft className="inline mr-2" />
              Previous
            </button>

            {currentScenarioIndex < scenarios.length - 1 ? (
              <button
                onClick={handleNext}
                className="btn-primary"
                disabled={
                  currentScenario.type === 'ASSESSMENT' && !showResults
                }
              >
                Next
                <FaArrowRight className="inline ml-2" />
              </button>
            ) : (
              showResults && (
                <button
                  onClick={() => router.push('/dashboard')}
                  className="btn-primary"
                >
                  <FaTrophy className="inline mr-2" />
                  Complete Module
                </button>
              )
            )}
          </div>

          {/* Score Popup */}
          {showScorePopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-gradient-to-br from-black/70 via-purple-900/30 to-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="bg-white rounded-3xl p-10 max-w-lg w-full text-center shadow-2xl relative overflow-hidden"
              >
                {/* Animated Background Gradients */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20"
                  />
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.3, 1],
                      rotate: [0, -90, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full blur-3xl opacity-20"
                  />
                </div>

                <div className="relative z-10">
                  {/* Trophy Animation */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', delay: 0.2, duration: 0.8 }}
                  >
                    <FaTrophy className="text-7xl text-yellow-500 mx-auto mb-6 drop-shadow-lg" />
                  </motion.div>
                  
                  <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                    Quiz Completed!
                  </h2>
                  <p className="text-gray-600 text-lg mb-8">Here's how you did:</p>
                  
                  {/* Score Circle */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.4, duration: 0.6 }}
                    className="mx-auto w-48 h-48 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 flex items-center justify-center text-white shadow-2xl mb-8 relative"
                  >
                    <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
                      <span className="text-6xl font-extrabold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {score}%
                      </span>
                    </div>
                  </motion.div>
                  
                  {/* Performance Message */}
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-lg font-medium text-gray-700 mb-8"
                  >
                    {score >= 80
                      ? '🎉 Outstanding! You\'re a cybersecurity master!'
                      : score >= 60
                      ? '👍 Great job! You\'re on the right track!'
                      : '💪 Good effort! Review the material to improve.'}
                  </motion.p>
                  
                  <motion.button
                    onClick={handleCloseScorePopup}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all text-lg"
                  >
                    Review My Answers →
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

        </main>
      </div>
    </>
  )
}
