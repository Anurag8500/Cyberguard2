import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LinkDecoderProps {
  content: {
    scenario: number
    theme: string
    situation?: string
    task: string
    links?: Array<{
      url: string
      isSafe: boolean
      reason: string
    }>
    realLink?: string
    options?: Array<{
      text: string
      isCorrect: boolean
      explanation: string
    }>
    message?: string
    correctAnswer?: string
    tip: string
    xpReward: number
  }
  scenarioIndex?: number
  savedAnswer?: number | null
  savedLinkReveals?: { [key: number]: boolean }
  onAnswerSelect?: (scenarioIndex: number, answer: number) => void
  onLinkRevealChange?: (scenarioIndex: number, reveals: { [key: number]: boolean }) => void
}

export default function LinkDecoder({ 
  content, 
  scenarioIndex = 0,
  savedAnswer = null,
  savedLinkReveals = {},
  onAnswerSelect,
  onLinkRevealChange 
}: LinkDecoderProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(savedAnswer)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(savedAnswer !== null)
  const [linkReveals, setLinkReveals] = useState<{ [key: number]: boolean }>(savedLinkReveals)

  const handleOptionClick = (index: number) => {
    if (!showResults) {
      setSelectedOption(index)
      setShowResults(true)
      if (onAnswerSelect) {
        onAnswerSelect(scenarioIndex, index)
      }
    }
  }

  const toggleLinkReveal = (index: number) => {
    const newReveals = {
      ...linkReveals,
      [index]: !linkReveals[index]
    }
    setLinkReveals(newReveals)
    if (onLinkRevealChange) {
      onLinkRevealChange(scenarioIndex, newReveals)
    }
  }

  // Scenario 1: Hover Test
  if (content.scenario === 1) {
    return (
      <div className="space-y-6">
        {/* Theme Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-2">🔍 {content.theme}</h3>
          <p className="text-green-100">{content.situation}</p>
        </div>

        {/* Message Display */}
        <div className="bg-gray-100 border-l-4 border-yellow-500 p-6 rounded-r-lg">
          <p className="text-gray-800 mb-4 font-medium">{content.message}</p>
          
          {/* Hoverable Link */}
          <div className="relative">
            <button
              onMouseEnter={() => setHoveredLink(content.realLink || '')}
              onMouseLeave={() => setHoveredLink(null)}
              className="text-blue-600 underline hover:text-blue-800 transition-colors"
            >
              https://apple.freegift-event.com
            </button>
            
            <AnimatePresence>
              {hoveredLink && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 bg-red-100 border-2 border-red-500 rounded-lg p-3 shadow-lg z-10 min-w-[300px]"
                >
                  <p className="text-sm font-semibold text-red-800">🚨 Real destination:</p>
                  <code className="text-red-700 font-mono text-sm break-all">
                    {hoveredLink}
                  </code>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Task */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-300">
          <p className="font-semibold text-blue-900 mb-2">📋 {content.task}</p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {content.options?.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleOptionClick(index)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                selectedOption === index
                  ? option.isCorrect
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : showResults && option.isCorrect
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-300 hover:border-primary-400 bg-white hover:shadow-lg'
              } ${showResults ? 'cursor-default' : 'cursor-pointer'}`}
              whileHover={!showResults ? { scale: 1.02 } : {}}
              whileTap={!showResults ? { scale: 0.98 } : {}}
            >
              <div className="flex items-start">
                <span className="font-bold text-gray-700 mr-3">
                  {String.fromCharCode(65 + index)})
                </span>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{option.text}</p>
                  {showResults && selectedOption === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className={`mt-2 text-sm ${
                        option.isCorrect ? 'text-green-700' : 'text-red-700'
                      }`}
                    >
                      {option.explanation}
                    </motion.p>
                  )}
                </div>
                {showResults && option.isCorrect && (
                  <span className="text-2xl ml-2">✅</span>
                )}
              </div>
            </motion.button>
          ))}
        </div>

      </div>
    )
  }

  // Scenario 2: Link Match Challenge
  if (content.scenario === 2) {
    return (
      <div className="space-y-6">
        {/* Theme Header */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-2">🔗 {content.theme}</h3>
          <p className="text-orange-100">{content.task}</p>
        </div>

        {/* Links Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-3 text-left">Link</th>
                <th className="border border-gray-300 p-3 text-center">Safe or Suspicious?</th>
                <th className="border border-gray-300 p-3 text-left">Why</th>
              </tr>
            </thead>
            <tbody>
              {content.links?.map((link, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${
                    linkReveals[index]
                      ? link.isSafe
                        ? 'bg-green-50'
                        : 'bg-red-50'
                      : 'bg-white hover:bg-gray-50'
                  } transition-colors`}
                >
                  <td className="border border-gray-300 p-3">
                    <code className="text-sm font-mono break-all">{link.url}</code>
                  </td>
                  <td className="border border-gray-300 p-3 text-center">
                    <button
                      onClick={() => toggleLinkReveal(index)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        linkReveals[index]
                          ? link.isSafe
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                      }`}
                    >
                      {linkReveals[index]
                        ? link.isSafe
                          ? '✅ Safe'
                          : '❌ Suspicious'
                        : 'Reveal'}
                    </button>
                  </td>
                  <td className="border border-gray-300 p-3">
                    <AnimatePresence>
                      {linkReveals[index] && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`text-sm ${
                            link.isSafe ? 'text-green-800' : 'text-red-800'
                          }`}
                        >
                          {link.reason}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    )
  }

  // Scenario 3: Short Links
  if (content.scenario === 3) {
    return (
      <div className="space-y-6">
        {/* Theme Header */}
        <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-2">⚠️ {content.theme}</h3>
          <p className="text-yellow-100">{content.situation}</p>
        </div>

        {/* Message Display */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
          <p className="text-gray-800 font-medium">{content.message}</p>
        </div>

        {/* Task */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-300">
          <p className="font-semibold text-blue-900 mb-2">📋 {content.task}</p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {content.options?.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleOptionClick(index)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                selectedOption === index
                  ? option.isCorrect
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : showResults && option.isCorrect
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-300 hover:border-primary-400 bg-white hover:shadow-lg'
              } ${showResults ? 'cursor-default' : 'cursor-pointer'}`}
              whileHover={!showResults ? { scale: 1.02 } : {}}
              whileTap={!showResults ? { scale: 0.98 } : {}}
            >
              <div className="flex items-start">
                <span className="font-bold text-gray-700 mr-3">
                  {String.fromCharCode(65 + index)})
                </span>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{option.text}</p>
                  {showResults && selectedOption === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className={`mt-2 text-sm ${
                        option.isCorrect ? 'text-green-700' : 'text-red-700'
                      }`}
                    >
                      {option.explanation}
                    </motion.p>
                  )}
                </div>
                {showResults && option.isCorrect && (
                  <span className="text-2xl ml-2">✅</span>
                )}
              </div>
            </motion.button>
          ))}
        </div>

      </div>
    )
  }

  return null
}
