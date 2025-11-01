import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserSecret, FaCheckCircle, FaTimesCircle, FaTrophy, FaSkull } from 'react-icons/fa';
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
  correctAdvice: string;
}

const levels: Level[] = [
  {
    id: 1,
    title: "⚔ LEVEL 1 — The Market Breach",
    description: "You track a data thief to the bustling Shibuya Cyber Market. A street vendor grins and slides you a glowing USB stick labeled \"FREE ANTIVIRUS UPDATE.\"\n\nYou're tempted — your neural pad just flagged a minor bug.\n\nChoose wisely:",
    choices: [
      {
        text: "1️⃣ Plug it into your neural pad.",
        isCorrect: false,
        feedback: "Your neural pad glitches — screens flicker red.\n\nYour system is infected with the Shadow Worm. You collapse as red code fills your vision.\n\n💀 Mission failed: Eliminated by Malware Strike."
      },
      {
        text: "2️⃣ Run an offline scan before connecting.",
        isCorrect: true,
        feedback: "You scan first — it's a rootkit trap masked as antivirus software!\n\nYou quarantine it and retrieve a fragment of Shadow Code — a clue.\n\n\"Good instincts,\" Sensei's voice echoes. \"Curiosity killed more Guardians than blades.\""
      },
      {
        text: "3️⃣ Ignore it — walk away.",
        isCorrect: false,
        feedback: "You walk away but miss the critical clue.\n\nThe Shadow Code spreads unchecked through the network.\n\n💀 Mission failed: You lost the trail."
      }
    ],
    correctAdvice: "Core Lesson: Never trust free software from unknown sources. Always scan before executing."
  },
  {
    id: 2,
    title: "⚔ LEVEL 2 — The Phishing Scroll",
    description: "Moments later, you receive a holographic distress mail:\n\n\"Kairo! It's me, Arata. I've been captured by the Clan. Click this link to unlock the firewall seal!\"\n\nSender: arata-guardian.jp-secure.net\n\nYou feel panic rise. The link glows.\n\nYour move:",
    choices: [
      {
        text: "1️⃣ Click immediately — Sensei needs help!",
        isCorrect: false,
        feedback: "You click — your pad screams with static.\n\nA black screen appears: \"WELCOME TO THE VOID.\"\n\nYour system melts in red code fire.\n\n💀 Mission failed: Phished by KuroNoHa."
      },
      {
        text: "2️⃣ Decode the URL first.",
        isCorrect: true,
        feedback: "You isolate the URL. Domain check fails — it's a clone site!\n\nYou reverse-trace it to the Dark Net Alley, gaining a new lead.\n\n\"Well done,\" Sensei's real voice pings. \"The Clan now mimics me. Stay alert.\""
      },
      {
        text: "3️⃣ Forward the message to allies.",
        isCorrect: false,
        feedback: "You forward the phishing link to your entire network.\n\nThe Shadow Code spreads like wildfire through your allies' systems.\n\n💀 Mission failed: Network compromised."
      }
    ],
    correctAdvice: "Core Lesson: Verify sender authenticity. Check URLs before clicking. Phishing exploits urgency and emotion."
  },
  {
    id: 3,
    title: "⚔ LEVEL 3 — The Deepfake Duel",
    description: "You return to your dojo, only to find Sensei Arata already waiting — calm, silent.\n\n\"Lower your firewall, Kairo. I'll transmit the Purity Code through your neural port.\"\n\nBut something feels… off.\n\nDecision time:",
    choices: [
      {
        text: "1️⃣ Trust him — deactivate firewall.",
        isCorrect: false,
        feedback: "Firewall drops. System breach.\n\nYou're infected with mimic malware.\n\n💀 Mission failed: Corrupted by Deepfake."
      },
      {
        text: "2️⃣ Ask him to recite your secret Guardian phrase.",
        isCorrect: true,
        feedback: "You whisper, \"What is the final verse of the Guardian Oath?\"\n\nThe hologram hesitates — then glitches violently.\n\nDEEPFAKE DETECTED.\n\n\"Clever, student. They nearly had you,\" Sensei messages securely."
      },
      {
        text: "3️⃣ Attack first — he might be corrupted.",
        isCorrect: false,
        feedback: "You destroy the hologram and lose valuable trace data.\n\n💀 Mission failed: Critical data lost."
      }
    ],
    correctAdvice: "Core Lesson: Trust, but verify — even authority. Use pre-shared secrets to confirm identity."
  },
  {
    id: 4,
    title: "⚔ LEVEL 4 — The Neon Tower Breach",
    description: "At midnight, you infiltrate Neon Tower, home to the Shinsei Energy Core.\n\nAn alert flashes on the terminal:\n\n\"Critical Security Patch Available. Install Now?\"\n\nThe timer ticks — 15 seconds left.\n\nWhat do you do?",
    choices: [
      {
        text: "1️⃣ Approve the update immediately.",
        isCorrect: false,
        feedback: "City blackout. Power grid collapses.\n\n💀 Mission failed: Overwritten by Shadow Patch."
      },
      {
        text: "2️⃣ Check the digital certificate and hash signature.",
        isCorrect: true,
        feedback: "You verify the signature — mismatch!\n\nThe update was a ransomware injection meant to overload the power grid.\n\nYou block it just in time. Neo Tokyo's skyline flickers back to light.\n\n\"You saved the city's pulse, Kairo.\""
      },
      {
        text: "3️⃣ Shut down the system entirely.",
        isCorrect: false,
        feedback: "Shutdown aborts security protocols — permanent vulnerability created.\n\n💀 Mission failed: System exposed."
      }
    ],
    correctAdvice: "Core Lesson: Always verify certificates and signatures. Urgency is a hacker's weapon."
  },
  {
    id: 5,
    title: "⚔ FINAL LEVEL — The Shadow Core Showdown",
    description: "Deep inside Mount Kurobase, the Shadow Clan's fortress, you find the Black Mirror Chamber.\n\nThousands of holographic versions of yourself whisper:\n\n\"Join us, Kairo. Merge your code. Become eternal.\"\n\nAt the center pulsates the Shadow Code Core — crimson, alive.\n\nYou must choose:",
    choices: [
      {
        text: "1️⃣ Attack the Core with brute-force encryption.",
        isCorrect: false,
        feedback: "The Core absorbs your code — you become one of the whispering holograms.\n\n💀 Game Over: Assimilated by the Shadow Code."
      },
      {
        text: "2️⃣ Inject the Purity Patch developed by Sensei.",
        isCorrect: true,
        feedback: "The Purity Patch floods the system. The red code screams, dissolving into light.\n\nYou kneel as dawn breaks outside the mountain.\n\n\"Balance restored. You fought not with rage, but with reason.\"\n\n🏆 Mission Complete — You are now the Shadow Firewall Guardian."
      },
      {
        text: "3️⃣ Disconnect and flee before it consumes you.",
        isCorrect: false,
        feedback: "You flee — but Neo Tokyo burns in digital fire.\n\n💀 Game Over: The world falls to red noise."
      }
    ],
    correctAdvice: "Core Lesson: Isolation and containment beats destruction. Strategic solutions win over brute force."
  }
];

const coreLessons = [
  "→ Always verify sources before acting.",
  "→ Trust, but verify — even authority.",
  "→ Check authenticity via certificates.",
  "→ Isolation beats destruction in containment.",
  "→ Never act under urgency or emotion."
];

export default function CyberVerseChronicles() {
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
      setTimeout(() => {
        setFailureMessage(choice.feedback);
        setShowFailureModal(true);
      }, 2000);
    }
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
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-black text-white">
        <Navbar />
        <main className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-gray-900 to-purple-900 rounded-2xl shadow-2xl p-8 border-4 border-purple-500">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="flex justify-center mb-6"
                >
                  <FaUserSecret className="text-8xl text-cyan-400" />
                </motion.div>

                <h1 className="text-5xl font-black mb-4 text-center">
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    CyberVerse Chronicles
                  </span>
                </h1>
                <h2 className="text-3xl font-bold text-purple-400 mb-8 text-center">
                  Heroes Rewired
                </h2>

                <div className="bg-black/50 rounded-xl p-6 mb-6 border-2 border-cyan-500">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4">🌆 INTRO: "Neo Tokyo, Year 2075"</h3>
                  <div className="space-y-4 text-lg leading-relaxed">
                    <p>Neon lights hum. The sky is crimson. You are <span className="text-cyan-400 font-bold">Kairo</span>, last apprentice of the <span className="font-bold text-purple-400">Code Guardians</span> — a secret ninja order sworn to protect the Shinsei Network, the digital backbone of Neo Tokyo.</p>
                    
                    <p className="text-yellow-400 italic">Your Sensei, Master Arata, sends an encrypted message:</p>
                    
                    <p className="text-center text-xl text-red-400 font-bold bg-black/70 py-4 rounded-lg">
                      "Kairo, the Shadow Code stirs again. Trust nothing — not even my voice."
                    </p>
                    
                    <p className="text-2xl font-bold text-center text-cyan-400 mt-6">
                      Your mission begins. ⚡
                    </p>
                  </div>
                </div>

                <div className="bg-purple-900/30 border-2 border-purple-500 rounded-xl p-6 mb-6">
                  <p className="text-lg text-yellow-400 font-semibold">
                    ⚠️ Warning: Every wrong choice can end your mission. Choose wisely, Guardian.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartGame}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl text-2xl font-bold shadow-lg hover:shadow-2xl transition-all"
                >
                  ⚡ BEGIN MISSION
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
      <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-orange-900 to-black text-white">
        <Navbar />
        <main className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaTrophy className="text-9xl text-yellow-400 mx-auto mb-6" />
            </motion.div>
            
            <h1 className="text-6xl font-black mb-6 text-yellow-400">
              🏆 MISSION COMPLETE
            </h1>
            
            <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl mb-8 border-4 border-yellow-500">
              <h2 className="text-4xl font-bold text-cyan-400 mb-4">
                Shadow Firewall Guardian
              </h2>
              
              <p className="text-2xl text-gray-300 mb-6 italic">
                "You are now the protector of Neo Tokyo's digital realm."
              </p>

              <div className="bg-black/50 rounded-xl p-6 mt-6">
                <h3 className="text-2xl font-bold text-purple-400 mb-4">💡 Core Lessons Earned:</h3>
                <div className="text-left space-y-2">
                  {coreLessons.map((lesson, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="text-lg text-cyan-300"
                    >
                      {lesson}
                    </motion.p>
                  ))}
                </div>
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
                🔄 Replay Story
              </motion.button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  const level = levels[currentLevel];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-black text-white">
      <Navbar />
      
      <main className="container mx-auto px-6 py-12">
        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-cyan-400">Story Progress</span>
            <span className="text-sm font-semibold text-cyan-400">Level {currentLevel + 1} / {levels.length}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentLevel + 1) / levels.length) * 100}%` }}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 h-3 rounded-full"
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
          <div className="bg-gradient-to-br from-gray-900 to-purple-900 rounded-2xl shadow-2xl p-8 border-4 border-purple-500">
            {/* Level Title */}
            <h2 className="text-4xl font-black mb-6 text-purple-400">
              {level.title}
            </h2>

            {/* Description */}
            <div className="bg-black/50 rounded-xl p-6 mb-6 border-2 border-cyan-500">
              <p className="text-xl whitespace-pre-line leading-relaxed">
                {level.description}
              </p>
            </div>

            {/* Choices */}
            <div className="space-y-4 mb-6">
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
                      ? 'bg-gray-800 border-purple-600 hover:bg-gray-700 hover:border-cyan-400'
                      : 'bg-gray-900 border-gray-700 opacity-50'
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
                    {isCorrect ? '✅ Correct Choice!' : '❌ Wrong Choice!'}
                  </p>
                  <p className="text-lg mb-4 whitespace-pre-line">{level.choices[selectedChoice].feedback}</p>
                  
                  {isCorrect && (
                    <>
                      <div className="bg-black/50 rounded-lg p-4 mb-4">
                        <p className="text-cyan-400 font-semibold">{level.correctAdvice}</p>
                      </div>
                      <motion.button
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextLevel}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl text-xl font-bold shadow-lg hover:shadow-2xl transition-all"
                      >
                        {currentLevel < levels.length - 1 ? '➡️ Continue Story' : '🏁 Complete Mission'}
                      </motion.button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
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
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-6"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-gradient-to-br from-red-900 to-black border-4 border-red-600 rounded-2xl p-8 max-w-2xl w-full shadow-2xl"
            >
              <div className="text-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{ duration: 0.5, repeat: 2 }}
                >
                  <FaSkull className="text-8xl text-red-500 mx-auto mb-6" />
                </motion.div>
                
                <h2 className="text-4xl font-black text-red-400 mb-4">
                  MISSION FAILED
                </h2>
                
                <div className="bg-black/70 rounded-xl p-6 mb-6 border-2 border-red-500">
                  <p className="text-xl font-semibold text-white whitespace-pre-line">
                    {failureMessage}
                  </p>
                </div>

                <div className="bg-purple-900/50 rounded-xl p-4 mb-6 border-2 border-purple-500">
                  <p className="text-lg text-cyan-300">
                    💡 <span className="font-bold">Learn:</span> {level.correctAdvice}
                  </p>
                </div>

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
                    🔄 Restart Mission
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
