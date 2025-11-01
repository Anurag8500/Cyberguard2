import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationTriangle, FaShieldAlt, FaCheckCircle, FaTimesCircle, FaLock, FaTrophy, FaYoutube } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

interface Choice {
  text: string;
  isCorrect: boolean;
  feedback: string;
}

interface Level {
  id: number;
  title: string;
  description: string;
  choices: Choice[];
  hint: string;
  videoTitle?: string;
  videoUrl?: string;
}

const levels: Level[] = [
  {
    id: 1,
    title: "LEVEL 1 — The Awakening",
    description: "The emergency console flashes:\n\n\"Unauthorized login attempts detected on main admin panel.\"\n\nYou must act fast.",
    choices: [
      {
        text: "A) Reset the admin password using your date of birth.",
        isCorrect: false,
        feedback: "Weak password detected. Hacker bypassed in 2 seconds. Alarm intensifies."
      },
      {
        text: "B) Enable multi-factor authentication (MFA) and lock login for 10 min.",
        isCorrect: true,
        feedback: "Firewall syncs — attack paused for 10 minutes."
      }
    ],
    hint: "MFA is your first wall against brute-force breaches.",
    videoTitle: "How Multi-Factor Authentication Works",
    videoUrl: "https://www.youtube.com/watch?v=lEHhivPJQ5w"
  },
  {
    id: 2,
    title: "LEVEL 2 — The Phantom File",
    description: "A suspicious USB drive titled \"Urgent_Data_Backup\" blinks on your desk.\nYou remember — no one was working this late.",
    choices: [
      {
        text: "A) Plug it in to check if it has recovery keys.",
        isCorrect: false,
        feedback: "Malware floods system — USB drops ransomware payload."
      },
      {
        text: "B) Scan it in the sandbox environment first.",
        isCorrect: true,
        feedback: "Sandbox report: Trojan detected, quarantined successfully."
      }
    ],
    hint: "Never plug unknown devices — they're the hacker's favorite gateway.",
    videoTitle: "How USB Malware Works",
    videoUrl: "https://www.youtube.com/watch?v=PMFbeLcY6Fo"
  },
  {
    id: 3,
    title: "LEVEL 3 — The Email Trap",
    description: "Two urgent emails arrive simultaneously:\n\n1️⃣ \"Payroll Update Required — Verify Credentials Immediately\"\n2️⃣ \"Security Patch from IT — Manual installation required\"",
    choices: [
      {
        text: "A) Open Email 1.",
        isCorrect: false,
        feedback: "Phishing link redirects you to a fake bank page."
      },
      {
        text: "B) Verify Email 2's sender via internal directory first.",
        isCorrect: true,
        feedback: "Legit IT mail confirmed. Patch halts further phishing attempts."
      }
    ],
    hint: "Real IT teams never ask for credentials by mail.",
    videoTitle: "What is Phishing? - Kaspersky",
    videoUrl: "https://www.youtube.com/watch?v=5yfbcQw0hLY"
  },
  {
    id: 4,
    title: "LEVEL 4 — The Firewall Forge",
    description: "You reach the network control terminal.\nFirewall rules have been tampered with. Traffic spikes by 400%.",
    choices: [
      {
        text: "A) Turn off the firewall — maybe it's malfunctioning.",
        isCorrect: false,
        feedback: "DDoS flood overwhelms your system — you lose network control."
      },
      {
        text: "B) Check logs, block suspicious ports, and enable intrusion detection.",
        isCorrect: true,
        feedback: "Rules rebuilt. Malicious IPs blocked. Network stabilizing."
      }
    ],
    hint: "Firewalls aren't to be turned off — fix from inside.",
    videoTitle: "Firewalls Explained in 3 Minutes",
    videoUrl: "https://www.youtube.com/watch?v=kDEX1HXybrU"
  },
  {
    id: 5,
    title: "LEVEL 5 — The Data Dilemma",
    description: "Ransom note pops up:\n\n\"Decrypt or lose everything. 4 minutes left.\"\n\nYou spot three options on-screen.",
    choices: [
      {
        text: "A) Pay the ransom using crypto.",
        isCorrect: false,
        feedback: "Payment sent. Files stay locked. Hacker disappears."
      },
      {
        text: "B) Initiate backup recovery from offline storage.",
        isCorrect: true,
        feedback: "Restoring system from shadow backup — success!"
      },
      {
        text: "C) Call your manager for instructions.",
        isCorrect: false,
        feedback: "No response — phones jammed."
      }
    ],
    hint: "Offline backups are your insurance policy against ransomware.",
    videoTitle: "The Single Best Defense Against Ransomware",
    videoUrl: "https://www.youtube.com/watch?v=MATFMcB6vcE"
  },
  {
    id: 6,
    title: "LEVEL 6 — The Deepfake Intruder",
    description: "A video message from your \"CTO\" appears:\n\n\"Disable all security for maintenance. I'll handle it.\"\n\nBut something feels… off.",
    choices: [
      {
        text: "A) Follow orders — he's the CTO.",
        isCorrect: false,
        feedback: "Deepfake confirmed too late — attacker gains admin control."
      },
      {
        text: "B) Cross-check the voice pattern and last login.",
        isCorrect: true,
        feedback: "Voice mismatch. Account flagged. Deepfake neutralized."
      }
    ],
    hint: "Deepfakes mimic authority — always verify identities digitally.",
    videoTitle: "Deepfake Scams Explained - BBC Click",
    videoUrl: "https://www.youtube.com/watch?v=MTEgxaT1O9E"
  },
  {
    id: 7,
    title: "LEVEL 7 — Final Lockdown",
    description: "All systems restored — but one last lock seals the exit.\n\n\"Only those with cyber wisdom can escape.\"\n\nYou must choose your final move:",
    choices: [
      {
        text: "A) Restart all systems at once.",
        isCorrect: false,
        feedback: "Malware reboots with system — full re-encryption begins."
      },
      {
        text: "B) Audit network logs for hidden persistence.",
        isCorrect: true,
        feedback: "Hidden script found and deleted. Network cleared. Doors unlock."
      },
      {
        text: "C) Disconnect power immediately.",
        isCorrect: false,
        feedback: "Hard shutdown corrupts safe backups."
      }
    ],
    hint: "Panic opens doors. Awareness closes them.",
    videoTitle: "",
    videoUrl: ""
  }
];

export default function CyberEscapeChamber() {
  const router = useRouter();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [failureMessage, setFailureMessage] = useState('');

  const handleStartGame = () => {
    setShowIntro(false);
  };

  const handleChoiceSelect = (choiceIndex: number) => {
    const level = levels[currentLevel];
    const choice = level.choices[choiceIndex];
    
    setSelectedChoice(choiceIndex);
    setIsCorrect(choice.isCorrect);
    setShowFeedback(true);

    if (!choice.isCorrect) {
      // Wrong choice - show failure modal after brief delay
      setTimeout(() => {
        setFailureMessage(choice.feedback);
        setShowFailureModal(true);
      }, 2000);
    }
    // For correct choice, don't auto-advance - wait for button click
  };

  const handleNextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setSelectedChoice(null);
      setShowFeedback(false);
    } else {
      setGameComplete(true);
    }
  };

  const handleReturnToZone = () => {
    router.push('/simulation-zone');
  };

  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black text-white">
        <Navbar />
        <main className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            {/* Alarm Header */}
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="bg-red-600 text-white text-center py-4 rounded-t-2xl border-4 border-red-700 shadow-2xl"
            >
              <FaExclamationTriangle className="inline text-4xl mb-2" />
              <h2 className="text-3xl font-black">⚠ SYSTEM UNDER ATTACK — RANSOMWARE ACTIVE ⚠</h2>
            </motion.div>

            <div className="bg-gray-800 rounded-b-2xl shadow-2xl p-8 border-4 border-gray-700">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-5xl font-black mb-6 text-center">
                  <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                    🔒 CYBER ESCAPE CHAMBER
                  </span>
                </h1>
                <h2 className="text-3xl font-bold text-red-400 mb-6 text-center">
                  ESCAPE THE BREACH
                </h2>

                <div className="space-y-4 text-lg leading-relaxed mb-8">
                  <p className="font-semibold text-yellow-400">Setting:</p>
                  <p>You are <span className="text-cyan-400 font-bold">Aarav</span>, the night security analyst at <span className="font-bold">TechShield Corp</span>.</p>
                  
                  <p>It's <span className="text-red-400 font-bold">2:14 AM</span>. The office is dark, silent — except for the beeping alarms from the main server vault.</p>
                  
                  <p className="text-red-400 font-bold text-xl text-center py-4 bg-black/50 rounded-lg">
                    You're locked inside until the breach is contained.
                  </p>
                  
                  <p className="text-yellow-400">Each wrong move brings you closer to total data loss.</p>
                  
                  <p className="text-2xl font-bold text-center text-cyan-400 mt-6">
                    Can you survive the cyber lockdown?
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartGame}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 rounded-xl text-2xl font-bold shadow-lg hover:shadow-2xl transition-all"
                >
                  🚨 START MISSION
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-black text-white">
        <Navbar />
        <main className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaTrophy className="text-9xl text-yellow-400 mx-auto mb-6" />
            </motion.div>
            
            <h1 className="text-6xl font-black mb-6 text-yellow-400">
              🏁 YOU ESCAPED THE CYBER LOCKDOWN
            </h1>
            
            <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl mb-8">
              <h2 className="text-4xl font-bold text-green-400 mb-4">
                🎉 Badge Earned: "Master Defender"
              </h2>
              
              <div className="text-2xl space-y-4 mt-6">
                <p className="text-cyan-400 font-bold">💬 Moral:</p>
                <p className="text-xl italic">Panic opens doors. Awareness closes them.</p>
                <p className="text-lg">Your composure and knowledge restored the fortress of data.</p>
              </div>
            </div>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReturnToZone}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 rounded-xl text-2xl font-bold shadow-lg hover:shadow-2xl transition-all"
              >
                🎮 Return to Simulation Zone
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl text-2xl font-bold shadow-lg hover:shadow-2xl transition-all"
              >
                🔄 Play Again
              </motion.button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  const level = levels[currentLevel];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black text-white">
      <Navbar />
      
      <main className="container mx-auto px-6 py-12">
        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">Progress</span>
            <span className="text-sm font-semibold">Level {currentLevel + 1} / {levels.length}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentLevel + 1) / levels.length) * 100}%` }}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full"
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <motion.div
          key={currentLevel}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border-4 border-red-600">
            {/* Level Title */}
            <h2 className="text-4xl font-black mb-6 text-red-400">
              {level.title}
            </h2>

            {/* Description */}
            <div className="bg-black/50 rounded-xl p-6 mb-6 border-2 border-gray-700">
              <p className="text-xl whitespace-pre-line leading-relaxed">
                {level.description}
              </p>
            </div>

            {/* Choices */}
            <div className="space-y-4 mb-6">
              <p className="text-2xl font-bold text-yellow-400 mb-4">➡ Choices:</p>
              {level.choices.map((choice, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: selectedChoice === null ? 1.02 : 1 }}
                  whileTap={{ scale: selectedChoice === null ? 0.98 : 1 }}
                  onClick={() => selectedChoice === null && handleChoiceSelect(index)}
                  disabled={selectedChoice !== null}
                  className={`w-full text-left p-6 rounded-xl text-lg font-semibold transition-all border-2 ${
                    selectedChoice === index
                      ? isCorrect
                        ? 'bg-green-600 border-green-400'
                        : 'bg-red-600 border-red-400'
                      : selectedChoice === null
                      ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-cyan-400'
                      : 'bg-gray-800 border-gray-700 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{choice.text}</span>
                    {selectedChoice === index && (
                      <span>
                        {isCorrect ? (
                          <FaCheckCircle className="text-3xl text-white" />
                        ) : (
                          <FaTimesCircle className="text-3xl text-white" />
                        )}
                      </span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {showFeedback && selectedChoice !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`rounded-xl p-6 mb-6 border-2 ${
                    isCorrect
                      ? 'bg-green-900/50 border-green-400'
                      : 'bg-red-900/50 border-red-400'
                  }`}
                >
                  <p className="text-xl font-bold mb-2">
                    {isCorrect ? '✅ Correct!' : '❌ Wrong Choice!'}
                  </p>
                  <p className="text-lg mb-4">{level.choices[selectedChoice].feedback}</p>
                  
                  {/* Next Level Button - Only show for correct answers */}
                  {isCorrect && (
                    <motion.button
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextLevel}
                      className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 rounded-xl text-xl font-bold shadow-lg hover:shadow-2xl transition-all"
                    >
                      {currentLevel < levels.length - 1 ? '➡️ Next Level' : '🏁 Complete Mission'}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hint & Video */}
            <div className="bg-blue-900/30 border-2 border-blue-500 rounded-xl p-6">
              <p className="text-lg">
                <span className="font-bold text-yellow-400">🧠 Hint:</span> {level.hint}
              </p>
              {level.videoUrl && level.videoTitle && (
                <a
                  href={level.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <FaYoutube className="text-2xl" />
                  <span className="font-semibold">Watch: {level.videoTitle}</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </main>

      {/* Failure Modal */}
      <AnimatePresence>
        {showFailureModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-6"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-gray-900 border-4 border-red-600 rounded-2xl p-8 max-w-2xl w-full shadow-2xl"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <FaTimesCircle className="text-8xl text-red-500 mx-auto mb-6" />
                </motion.div>
                
                <h2 className="text-4xl font-black text-red-400 mb-4">
                  MISSION FAILED
                </h2>
                
                <div className="bg-black/50 rounded-xl p-6 mb-6">
                  <p className="text-xl font-semibold text-white mb-4">
                    {failureMessage}
                  </p>
                  <p className="text-lg text-gray-300">
                    💡 <span className="font-bold">Learning Opportunity:</span> {level.hint}
                  </p>
                </div>

                {level.videoUrl && level.videoTitle && (
                  <a
                    href={level.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-6 inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition-colors"
                  >
                    <FaYoutube className="text-2xl" />
                    <span className="font-semibold">Learn More: {level.videoTitle}</span>
                  </a>
                )}

                <div className="space-y-4 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReturnToZone}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 rounded-xl text-xl font-bold shadow-lg hover:shadow-2xl transition-all"
                  >
                    🎮 Return to Simulation Zone
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.reload()}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl text-xl font-bold shadow-lg hover:shadow-2xl transition-all"
                  >
                    🔄 Try Again
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
