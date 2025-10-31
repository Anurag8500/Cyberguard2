import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  hint?: string
}

interface PhishingQuizProps {
  content: {
    title: string
    questions: QuizQuestion[]
    totalXP: number
    badge: {
      name: string
      icon: string
      description: string
    }
  }
}

export default function PhishingQuiz({ content }: PhishingQuizProps) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
  const [showResult, setShowResult] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showResult) {
      setSelectedAnswers({
        ...selectedAnswers,
        [currentQuestion]: answerIndex
      })
      setShowResult(true)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < content.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowResult(false)
    } else {
      setQuizComplete(true)
    }
  }

  const calculateScore = () => {
    let correct = 0
    content.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++
      }
    })
    return correct
  }

  const question = content.questions[currentQuestion]
  const isCorrect = selectedAnswers[currentQuestion] === question.correctAnswer

  if (quizComplete) {
    const score = calculateScore()
    const total = content.questions.length
    const percentage = (score / total) * 100

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6"
      >
        {/* Results Header */}
        <div className={`rounded-lg p-8 text-center ${
          percentage >= 80
            ? 'bg-gradient-to-r from-green-500 to-emerald-500'
            : percentage >= 60
            ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
            : 'bg-gradient-to-r from-red-500 to-pink-500'
        } text-white`}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <h2 className="text-4xl font-bold mb-2">
              {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '📚'}
            </h2>
            <h3 className="text-3xl font-bold mb-4">Quiz Complete!</h3>
            <p className="text-2xl font-semibold">
              Score: {score}/{total} ({percentage.toFixed(0)}%)
            </p>
          </motion.div>
        </div>

        {/* Badge Award */}
        {percentage >= 80 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-8 text-center text-white"
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-6xl mb-4"
            >
              {content.badge.icon}
            </motion.div>
            <h3 className="text-2xl font-bold mb-2">Badge Earned!</h3>
            <p className="text-xl font-semibold mb-2">{content.badge.name}</p>
            <p className="text-purple-200">{content.badge.description}</p>
            <div className="mt-4 pt-4 border-t border-purple-400">
              <p className="text-lg font-semibold">⭐ XP +{content.totalXP}</p>
            </div>
          </motion.div>
        )}

        {/* Review Section */}
        <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
          <h4 className="text-xl font-bold text-gray-800 mb-4">📊 Review Your Answers</h4>
          <div className="space-y-4">
            {content.questions.map((q, index) => {
              const userAnswer = selectedAnswers[index]
              const isCorrectAnswer = userAnswer === q.correctAnswer
              
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    isCorrectAnswer
                      ? 'bg-green-50 border-green-300'
                      : 'bg-red-50 border-red-300'
                  }`}
                >
                  <div className="flex items-start">
                    <span className={`text-2xl mr-3 ${
                      isCorrectAnswer ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isCorrectAnswer ? '✅' : '❌'}
                    </span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 mb-2">
                        Q{index + 1}: {q.question}
                      </p>
                      <p className={`text-sm ${
                        isCorrectAnswer ? 'text-green-700' : 'text-red-700'
                      }`}>
                        Your answer: {q.options[userAnswer]}
                      </p>
                      {!isCorrectAnswer && (
                        <p className="text-sm text-green-700 mt-1">
                          Correct answer: {q.options[q.correctAnswer]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {percentage < 80 && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <p className="text-blue-800">
              💡 Keep learning! Review the scenarios and try again to earn your badge.
            </p>
          </div>
        )}

        {/* Return to Dashboard Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center gap-2"
          >
            ← Return to Dashboard
          </button>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-6">
        <h3 className="text-2xl font-bold mb-2">🎯 {content.title}</h3>
        <div className="flex justify-between items-center">
          <p className="text-indigo-200">
            Question {currentQuestion + 1} of {content.questions.length}
          </p>
          <div className="bg-white/20 rounded-full px-4 py-1">
            <span className="font-semibold">
              {Object.keys(selectedAnswers).length}/{content.questions.length} answered
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestion + 1) / content.questions.length) * 100}%` }}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full"
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Question Card */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-lg border-2 border-gray-200 p-6"
      >
        <h4 className="text-xl font-bold text-gray-800 mb-4">{question.question}</h4>

        {/* Answer Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                selectedAnswers[currentQuestion] === index
                  ? index === question.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : showResult && index === question.correctAnswer
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-300 hover:border-indigo-400 bg-white hover:shadow-lg'
              } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
              whileHover={!showResult ? { scale: 1.02 } : {}}
              whileTap={!showResult ? { scale: 0.98 } : {}}
              disabled={showResult}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-bold text-gray-700 mr-3">
                    {String.fromCharCode(65 + index)})
                  </span>
                  <span className="text-gray-800">{option}</span>
                </div>
                {showResult && index === question.correctAnswer && (
                  <span className="text-2xl">✅</span>
                )}
                {showResult && selectedAnswers[currentQuestion] === index && index !== question.correctAnswer && (
                  <span className="text-2xl">❌</span>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`mt-4 p-4 rounded-lg ${
                isCorrect
                  ? 'bg-green-100 border border-green-300'
                  : 'bg-red-100 border border-red-300'
              }`}
            >
              <p className={`font-semibold mb-2 ${
                isCorrect ? 'text-green-800' : 'text-red-800'
              }`}>
                {isCorrect ? '✅ Correct!' : '❌ Not quite right'}
              </p>
              <p className={`text-sm ${
                isCorrect ? 'text-green-700' : 'text-red-700'
              }`}>
                {question.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Navigation */}
      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end"
        >
          <button
            onClick={handleNextQuestion}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
          >
            {currentQuestion < content.questions.length - 1 ? 'Next Question →' : 'Complete Quiz 🎉'}
          </button>
        </motion.div>
      )}
    </div>
  )
}
