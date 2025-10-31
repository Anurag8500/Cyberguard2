import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { FaCheck } from 'react-icons/fa'

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
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
      xp?: number
    }
  }
  answers: { [key: number]: number }
  onAnswerSelect: (questionIndex: number, answerIndex: number) => void
  showResults: boolean
  onSubmit?: () => void
  xpAlreadyEarned?: boolean
}

export default function PhishingQuiz({ content, answers, onAnswerSelect, showResults, onSubmit, xpAlreadyEarned = false }: PhishingQuizProps) {
  const router = useRouter()
  
  // Calculate score
  const calculateScore = () => {
    let correct = 0
    content.questions.forEach((question, idx) => {
      if (answers[idx] === question.correctAnswer) correct++
    })
    return {
      correct,
      total: content.questions.length,
      percentage: Math.round((correct / content.questions.length) * 100)
    }
  }
  
  const scoreData = showResults ? calculateScore() : null

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <div className="text-5xl mb-4">🎯</div>
          <h3 className="text-3xl font-bold mb-3 drop-shadow-lg">{content.title}</h3>
          <p className="text-purple-100 text-lg mb-4">5 Questions - Test Your Knowledge</p>
          <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-xl p-4 inline-block border border-white/30">
            <p className="text-lg font-semibold flex items-center justify-center gap-2">
              🎯 Earn: "{content.badge.name}" {content.badge.icon}
            </p>
            <p className="text-sm text-purple-200 mt-1">+{content.totalXP} XP</p>
          </div>
        </div>
      </div>

      {/* Questions */}
      {content.questions.map((question, qIdx) => (
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

          <div className="space-y-3">
            {question.options.map((option, oIdx) => {
              const isSelected = answers[qIdx] === oIdx
              const isCorrect = oIdx === question.correctAnswer
              const showAnswer = showResults

              return (
                <motion.button
                  key={oIdx}
                  onClick={() => !showResults && onAnswerSelect(qIdx, oIdx)}
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
            </motion.div>
          )}
        </motion.div>
      ))}

      {/* Score Summary - Only show after submitting */}
      {showResults && scoreData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`rounded-2xl p-8 text-center shadow-xl ${
            scoreData.percentage >= 80
              ? 'bg-gradient-to-br from-green-500 via-emerald-500 to-green-600'
              : scoreData.percentage >= 60
              ? 'bg-gradient-to-br from-yellow-500 via-orange-500 to-yellow-600'
              : 'bg-gradient-to-br from-red-500 via-pink-500 to-red-600'
          } text-white`}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
          >
            <h2 className="text-5xl font-bold mb-3">
              {scoreData.percentage >= 80 ? '🎉' : scoreData.percentage >= 60 ? '👍' : '📚'}
            </h2>
            <h3 className="text-3xl font-bold mb-4">Assessment Complete!</h3>
            <p className="text-2xl font-semibold mb-2">
              Score: {scoreData.correct}/{scoreData.total} ({scoreData.percentage}%)
            </p>
            <p className="text-lg opacity-90">
              {scoreData.percentage >= 80
                ? '🎉 Outstanding! You\'re a phishing detection expert!'
                : scoreData.percentage >= 60
                ? '👍 Great job! You\'re getting the hang of it!'
                : '💪 Keep learning! Review the explanations below.'}
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Badge Award */}
      {showResults && scoreData && scoreData.percentage === 100 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-center text-white shadow-xl"
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-7xl mb-4"
          >
            {content.badge.icon}
          </motion.div>
          <h3 className="text-3xl font-bold mb-2">
            {xpAlreadyEarned ? 'Badge Already Earned!' : 'Badge Earned!'}
          </h3>
          <p className="text-2xl font-semibold mb-2">{content.badge.name}</p>
          <p className="text-purple-100 text-lg">{content.badge.description}</p>
          <div className="mt-4 pt-4 border-t border-purple-400">
            <p className="text-xl font-semibold">
              {xpAlreadyEarned ? (
                <>✓ XP Already Awarded (200 XP)</>
              ) : (
                <>⭐ XP +200</>
              )}
            </p>
            {xpAlreadyEarned && (
              <p className="text-sm text-purple-200 mt-2">
                Badges are only awarded once per module
              </p>
            )}
          </div>
        </motion.div>
      )}

      {/* Submit Button - Only show before submitting */}
      {!showResults && (
        <motion.button
          onClick={onSubmit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          disabled={Object.keys(answers).length !== content.questions.length}
        >
          <span className="flex items-center justify-center gap-2 text-lg">
            <FaCheck />
            Submit Assessment
          </span>
        </motion.button>
      )}

    </div>
  )
}
