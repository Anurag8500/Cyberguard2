import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowLeft, FaArrowRight, FaCheck, FaTrophy } from 'react-icons/fa'
import Navbar from '@/components/Navbar'
import Confetti from 'react-confetti'

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
  const [moduleCompleted, setModuleCompleted] = useState(false)
  const [score, setScore] = useState(0)

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
    }
  }

  const handlePrevious = () => {
    if (currentScenarioIndex > 0) {
      setCurrentScenarioIndex(currentScenarioIndex - 1)
      setShowResults(false)
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
    setShowResults(true)

    // If this is the last scenario, complete the module
    if (currentScenarioIndex === scenarios.length - 1) {
      await completeModule(calculatedScore)
    }
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
        setModuleCompleted(true)
        
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

      {moduleCompleted && (
        <Confetti
          width={typeof window !== 'undefined' ? window.innerWidth : 300}
          height={typeof window !== 'undefined' ? window.innerHeight : 200}
          recycle={false}
          numberOfPieces={500}
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
                          {currentScenario.content.hints.map((hint: string, i: number) => (
                            <li key={i}>• {hint}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
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
                  {currentScenario.content.questions.map((question: any, qIdx: number) => (
                    <div key={qIdx} className="border border-gray-200 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-800 mb-4">
                        {qIdx + 1}. {question.question}
                      </h3>
                      <div className="space-y-3">
                        {question.options.map((option: string, oIdx: number) => {
                          const isSelected = answers[currentScenarioIndex]?.[qIdx] === oIdx
                          const isCorrect = oIdx === question.correct
                          const showAnswer = showResults

                          return (
                            <button
                              key={oIdx}
                              onClick={() => !showResults && handleAnswerSelect(qIdx, oIdx)}
                              disabled={showResults}
                              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                                showAnswer && isCorrect
                                  ? 'border-green-500 bg-green-50'
                                  : showAnswer && isSelected && !isCorrect
                                  ? 'border-red-500 bg-red-50'
                                  : isSelected
                                  ? 'border-primary-500 bg-primary-50'
                                  : 'border-gray-200 hover:border-primary-300'
                              } ${showResults ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                              <span className="flex items-center">
                                <span className="w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center">
                                  {showAnswer && isCorrect && '✓'}
                                  {showAnswer && isSelected && !isCorrect && '✗'}
                                </span>
                                {option}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                      {showResults && (
                        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm text-blue-800">
                            <strong>Explanation:</strong> {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}

                  {!showResults && (
                    <button
                      onClick={handleSubmitAssessment}
                      className="btn-primary w-full"
                      disabled={
                        Object.keys(answers[currentScenarioIndex] || {}).length !==
                        currentScenario.content.questions.length
                      }
                    >
                      Submit Assessment
                    </button>
                  )}

                  {showResults && (
                    <div className="text-center">
                      <div className="card bg-gradient-to-r from-primary-600 to-cyber-blue text-white">
                        <FaTrophy className="text-6xl mx-auto mb-4" />
                        <h3 className="text-3xl font-bold mb-2">
                          Score: {score}%
                        </h3>
                        <p className="text-white/90">
                          {score >= 80
                            ? '🎉 Excellent work! You\'ve mastered this topic!'
                            : score >= 60
                            ? '👍 Good job! Keep practicing to improve.'
                            : '💪 Keep learning! Review the material and try again.'}
                        </p>
                      </div>
                    </div>
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
                  {moduleCompleted ? 'Return to Dashboard' : 'Complete Module'}
                </button>
              )
            )}
          </div>

          {/* Completion Modal */}
          {moduleCompleted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-2xl p-8 max-w-md text-center"
              >
                <FaTrophy className="text-6xl text-yellow-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Module Completed! 🎉
                </h2>
                <p className="text-gray-600 mb-4">
                  You've earned {module.xpReward} XP!
                </p>
                <p className="text-xl font-semibold text-primary-600 mb-6">
                  Final Score: {score}%
                </p>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="btn-primary w-full"
                >
                  Return to Dashboard
                </button>
              </motion.div>
            </motion.div>
          )}
        </main>
      </div>
    </>
  )
}
