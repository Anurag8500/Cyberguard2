import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import ZoneLinker from '../../components/ZoneLinker';

interface FAQItem {
  question: string;
  answer: string | JSX.Element;
  category: string;
}

const faqData: FAQItem[] = [
  // REPORTING A CYBERCRIME
  {
    category: "🔐 REPORTING A CYBERCRIME",
    question: "I think I've been scammed online! What should I do first?",
    answer: (
      <div>
        <p>You can report any cybercrime on the <strong>National Cyber Crime Reporting Portal</strong> — a Government of India initiative. You can report:</p>
        <ul className="list-disc ml-6 mt-2 mb-2">
          <li>💰 Online financial frauds</li>
          <li>💻 Hacking, Ransomware, cryptocurrency scams</li>
          <li>📱 Mobile or social media crimes</li>
          <li>👶 Child abuse or sexually explicit content</li>
        </ul>
        <p>💡 You can even report sexual abuse content anonymously — no personal info needed.</p>
        <p>🔗 Visit Portal → <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">cybercrime.gov.in</a></p>
        <p className="text-sm text-gray-600 italic mt-2">Related Zone: <ZoneLinker>🕵 The Trap Room (Fraud)</ZoneLinker>, <ZoneLinker>🕸 The Shadow Net (Malware)</ZoneLinker></p>
      </div>
    )
  },
  {
    category: "🔐 REPORTING A CYBERCRIME",
    question: "What should I do if I see a child abuse video or image online?",
    answer: (
      <div>
        <p>That's CSEAM. Do NOT share or forward it (a crime under Section 67(B) of the IT Act). Instead, take a screenshot (if safe), note the URL, and report it directly on the portal.</p>
        <p className="text-sm text-gray-600 italic mt-2">Related Zone: <ZoneLinker>🧠 The Mind Zone (Ethics)</ZoneLinker></p>
      </div>
    )
  },
  {
    category: "🔐 REPORTING A CYBERCRIME",
    question: "Can I get harmful or fake content removed from social media?",
    answer: (
      <div>
        <p>Yes. Most social platforms let you report harmful content directly:</p>
        <ul className="list-disc ml-6 mt-2 mb-2">
          <li>📘 Facebook</li>
          <li>📸 Instagram</li>
          <li>▶️ YouTube</li>
          <li>🕊️ X (Twitter)</li>
        </ul>
        <p>They'll review and remove content that violates their community rules.</p>
        <p className="text-sm text-gray-600 italic mt-2">Related Zone: <ZoneLinker>🕵 The Trap Room (Impersonation)</ZoneLinker></p>
      </div>
    )
  },
  {
    category: "🔐 REPORTING A CYBERCRIME",
    question: "What types of cybercrimes can I report on the portal?",
    answer: (
      <div>
        <p>There are two categories:</p>
        <p className="mt-2">1️⃣ Crimes Against Women/Children (Sexual exploitation, CSEAM)</p>
        <p className="mb-2">2️⃣ Other Cybercrimes (Fraud, hacking, Phishing, Ransomware, crypto scams, etc.)</p>
        <p>🔗 <a href="https://cybercrime.gov.in/Webform/Accept.aspx" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Report a Complaint</a></p>
        <p className="text-sm text-gray-600 italic mt-2">Related Zone: <ZoneLinker>🕵 The Trap Room</ZoneLinker>, <ZoneLinker>🕸 The Shadow Net</ZoneLinker></p>
      </div>
    )
  },
  {
    category: "🔐 REPORTING A CYBERCRIME",
    question: "Do I have to register before filing a complaint?",
    answer: (
      <div>
        <p>Yes, you have two choices:</p>
        <ul className="list-disc ml-6 mt-2 mb-2">
          <li>🕵 Report Anonymously (for sexual/child-related crimes)</li>
          <li>📱 Report & Track (register with your name, phone, and email for status updates)</li>
        </ul>
        <p>💡 You'll get an OTP (valid 30 mins) for verification. "Report & Track" ensures faster response.</p>
        <p className="text-sm text-gray-600 italic mt-2">Related Zone: <ZoneLinker>🔑 The Lockbox (2FA / OTP)</ZoneLinker></p>
      </div>
    )
  },
  {
    category: "🔐 REPORTING A CYBERCRIME",
    question: "Which State or UT should I select while reporting a complaint?",
    answer: "Choose the State/UT where the incident occurred. If you're unsure, pick your current residence. This helps the right cyber police jurisdiction act quickly."
  },
  {
    category: "🔐 REPORTING A CYBERCRIME",
    question: "What if the scammer is from another country?",
    answer: "You can still report it. Indian cyber police will coordinate with international agencies for further investigation."
  },

  // EVIDENCE & TRACKING
  {
    category: "📜 EVIDENCE & TRACKING",
    question: "What kind of proof should I collect before filing a report?",
    answer: (
      <div>
        <p>Keep all possible evidence, like:</p>
        <ul className="list-disc ml-6 mt-2 mb-2">
          <li>💳 Bank or card statements</li>
          <li>✉️ Emails or chat screenshots</li>
          <li>📸 Photos, videos, or website URLs</li>
          <li>🔗 Transaction IDs</li>
          <li>📞 Fraud call numbers</li>
        </ul>
        <p>💡 Uploading these files ensures faster verification by authorities.</p>
        <p className="text-sm text-gray-600 italic mt-2">Related Zone: <ZoneLinker>🧬 The Data Vault (Digital Footprint)</ZoneLinker></p>
      </div>
    )
  },
  {
    category: "📜 EVIDENCE & TRACKING",
    question: "What is a Hash Value and why does it matter?",
    answer: (
      <div>
        <p>A Hash Value is a digital fingerprint given to your uploaded file (photo, video, document). It ensures your evidence cannot be altered or tampered with after submission.</p>
        <p className="text-sm text-gray-600 italic mt-2">Related Zone: <ZoneLinker>🧬 The Data Vault (Integrity)</ZoneLinker></p>
      </div>
    )
  },
  {
    category: "📜 EVIDENCE & TRACKING",
    question: "What happens after I submit my complaint?",
    answer: (
      <div>
        <p>It's automatically sent to the right State/UT cyber unit. You'll receive an acknowledgment ID via SMS & email. You can track the progress anytime.</p>
        <p>🔗 <a href="https://cybercrime.gov.in/Webform/TrackStatus.aspx" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Check Status</a></p>
      </div>
    )
  },
  {
    category: "📜 EVIDENCE & TRACKING",
    question: "How can I track my complaint later?",
    answer: "1) Log in to the portal.<br>2) Click \"Check Status.\"<br>3) Enter your complaint ID.<br>You'll see progress updates directly."
  },
  {
    category: "📜 EVIDENCE & TRACKING",
    question: "Can I withdraw my complaint?",
    answer: "Cases related to Women/Child-related cases cannot be withdrawn. Other Cybercrimes can be withdrawn before becoming an FIR. Review all details carefully before submitting."
  },
  {
    category: "📜 EVIDENCE & TRACKING",
    question: "What happens if I file a false complaint?",
    answer: "Providing fake or misleading information is punishable under IPC. Always give correct info — even small details like emails or URLs can help police trace the criminal."
  }
];

export default function CyberpediaFAQs() {
  const router = useRouter();
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(faqData.map(item => item.category)))];

  const filteredFAQs = selectedCategory === 'All' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  const toggleFAQ = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  useEffect(() => {
    // Close all FAQs when category changes
    setOpenItems([]);
  }, [selectedCategory]);

  const handleBackToCyberpedia = () => {
    router.push('/cyberpedia');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navbar />
      
      <motion.main 
        className="container mx-auto px-6 py-12 max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={handleBackToCyberpedia}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 mb-6 transition-colors"
          >
            <FaArrowLeft />
            <span className="font-semibold">Back to Cyberpedia</span>
          </button>
          <div className="text-center">
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
                <span className="text-6xl">❓</span>
              </div>
            </div>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Frequent FAQs
            </span>
          </h1>
          
          <p className="text-2xl font-bold text-gray-700">
            "Ask. Learn. Stay Secure."
          </p>
        </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="mb-8 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-400 hover:shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex-1">
                  <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full mr-3">
                    {faq.category.split(' ')[1]}
                  </span>
                  <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                </div>
                <span className={`text-2xl font-bold text-blue-600 transition-transform duration-300 ${
                  openItems.includes(index) ? 'rotate-45' : ''
                }`}>
                  +
                </span>
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: openItems.includes(index) ? 'auto' : 0,
                  opacity: openItems.includes(index) ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-4 border-t border-gray-100">
                  <div className="pt-4 text-gray-700 leading-relaxed">
                    {typeof faq.answer === 'string' ? (
                      <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    ) : (
                      faq.answer
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Info */}
        <motion.div 
          className="mt-12 text-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-lg font-semibold text-gray-800">
            💡 Still have questions? Check out our <a href="/cyberpedia/glossary" className="text-blue-600 hover:text-blue-800 underline">Cyber Glossary</a> or <a href="/cyberpedia/safety-tips" className="text-blue-600 hover:text-blue-800 underline">Safety Tips</a> for more information.
          </p>
        </motion.div>
      </motion.main>
    </div>
  );
}