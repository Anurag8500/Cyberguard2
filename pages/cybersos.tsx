import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaExternalLinkAlt, FaCopy, FaCheckCircle, FaExclamationTriangle, FaShieldAlt, FaBolt } from 'react-icons/fa'
import Navbar from '@/components/Navbar'

interface CyberSOSProps {
  user: any
  setUser: (user: any) => void
  logout: () => void
}

export default function CyberSOS({ user, setUser, logout }: CyberSOSProps) {
  const router = useRouter()
  const [copiedText, setCopiedText] = useState<string>('')

  useEffect(() => {
    // Redirect if not logged in
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      router.push('/auth/login')
      return
    }

    if (!user) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(label)
    setTimeout(() => setCopiedText(''), 2000)
  }

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>CyberSOS - Rescue Command Centre</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <Navbar user={user} logout={logout} />

        <main className="container mx-auto px-6 py-12">
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
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
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-full blur-2xl opacity-40 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-red-600 to-orange-600 text-white p-8 rounded-full shadow-2xl">
                  <FaExclamationTriangle className="text-6xl" />
                </div>
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-extrabold mb-4"
            >
              <span className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                🚨 CyberSOS 🚨
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-gray-700"
            >
              Rescue Command Centre
            </motion.p>
          </motion.div>

          {/* Mandatory Tip Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-6 shadow-xl border-4 border-yellow-500"
          >
            <div className="flex items-start space-x-4">
              <FaShieldAlt className="text-4xl text-white flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">🧭 Mandatory Tip</h3>
                <p className="text-white text-lg font-medium">
                  Always use official websites (with .gov.in or verified sources). Never share OTPs, passwords, or PINs while reporting an incident.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section 1: DirectLine */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-4xl mr-3">🔗</span>
                DirectLine (Report links & portals)
              </h2>

              {/* Emergency Reporting & Financial Fraud */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-red-600 mb-4">1. Emergency Reporting & Financial Fraud</h3>
                
                <div className="space-y-6">
                  {/* Report Cybercrimes */}
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border-l-4 border-red-500">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">A. Report Cybercrimes (General/Financial Loss)</h4>
                    <p className="text-gray-600 mb-3 text-base">India's official national portal for lodging cybercrime complaints, especially if financial loss is involved.</p>
                    <button
                      onClick={() => openLink('https://www.cybercrime.gov.in')}
                      className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center space-x-2 shadow-lg"
                    >
                      <FaExternalLinkAlt />
                      <span>Visit Site</span>
                    </button>
                  </div>

                  {/* National Cyber Crime Helpline */}
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border-l-4 border-red-500">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">B. National Cyber Crime Helpline</h4>
                    <p className="text-gray-600 mb-3 text-base">The 24/7 dedicated helpline for quick reporting of financial cyber fraud.</p>
                    <div className="flex items-center space-x-4">
                      <div className="bg-white px-6 py-3 rounded-lg font-mono text-2xl font-bold text-red-600 shadow-md">
                        <FaPhone className="inline mr-2" />
                        1930
                      </div>
                      <button
                        onClick={() => copyToClipboard('1930', 'helpline')}
                        className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors flex items-center space-x-2 shadow-lg"
                      >
                        {copiedText === 'helpline' ? <FaCheckCircle /> : <FaCopy />}
                        <span>{copiedText === 'helpline' ? 'Copied!' : 'Copy Number'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Online Payment Fraud Help */}
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border-l-4 border-red-500">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">C. Online Payment Fraud Help</h4>
                    <p className="text-gray-600 mb-2 text-base"><strong>Crucial Step:</strong> Contact your bank immediately to report and initiate fund reversal for UPI/Wallet fraud.</p>
                    <p className="text-base text-gray-500 italic">Note: Use NPCI's UPI fraud helpline via your bank's support channels.</p>
                  </div>
                </div>
              </div>

              {/* Proactive & Technical Reporting */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">2. Proactive & Technical Reporting</h3>
                
                <div className="space-y-6">
                  {/* Phishing/Scam Reporting */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-l-4 border-blue-500">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">A. Phishing/Scam Reporting (Email)</h4>
                    <p className="text-gray-600 mb-3 text-base">Official government channel for forwarding suspicious emails for analysis.</p>
                    <div className="flex items-center space-x-4">
                      <div className="bg-white px-6 py-3 rounded-lg font-mono text-lg text-blue-600 shadow-md break-all">
                        <FaEnvelope className="inline mr-2" />
                        report@phishing.gov.in
                      </div>
                      <button
                        onClick={() => copyToClipboard('report@phishing.gov.in', 'phishing-email')}
                        className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors flex items-center space-x-2 shadow-lg"
                      >
                        {copiedText === 'phishing-email' ? <FaCheckCircle /> : <FaCopy />}
                        <span>{copiedText === 'phishing-email' ? 'Copied!' : 'Copy Email'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Technical Incident Reporting */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-l-4 border-blue-500">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">B. Technical Incident Reporting (CERT-In Priority)</h4>
                    <p className="text-gray-600 mb-3 text-base">High-priority email for reporting severe incidents, data breaches, or vulnerabilities to India's national CSIRT.</p>
                    <div className="flex items-center space-x-4">
                      <div className="bg-white px-6 py-3 rounded-lg font-mono text-lg text-blue-600 shadow-md break-all">
                        <FaEnvelope className="inline mr-2" />
                        incident@cert-in.org.in
                      </div>
                      <button
                        onClick={() => copyToClipboard('incident@cert-in.org.in', 'cert-email')}
                        className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors flex items-center space-x-2 shadow-lg"
                      >
                        {copiedText === 'cert-email' ? <FaCheckCircle /> : <FaCopy />}
                        <span>{copiedText === 'cert-email' ? 'Copied!' : 'Copy Email'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Suspected Fraud SMS/WhatsApp */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-l-4 border-blue-500">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">C. Suspected Fraud SMS/WhatsApp (No Loss)</h4>
                    <p className="text-gray-600 mb-3 text-base">The official Chakshu portal to report deceptive communications (SMS, call, WhatsApp) before financial loss occurs (prevention focus).</p>
                    <button
                      onClick={() => openLink('https://sancharsaathi.gov.in/sfc/')}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-lg"
                    >
                      <FaExternalLinkAlt />
                      <span>Visit Site</span>
                    </button>
                  </div>

                  {/* Major Incident Reporting */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-l-4 border-blue-500">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">D. Major Incident Reporting (CERT-In)</h4>
                    <p className="text-gray-600 mb-3 text-base">India's national nodal agency for reporting technical security incidents, data breaches, and vulnerabilities.</p>
                    <button
                      onClick={() => openLink('https://www.cert-in.org.in/')}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-lg"
                    >
                      <FaExternalLinkAlt />
                      <span>Visit Site</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Specialized Reporting & Regulatory Channels */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-purple-600 mb-4">3. Specialized Reporting & Regulatory Channels</h3>
                
                <div className="space-y-6">
                  {/* Non-Banking Financial Fraud */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-500">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">A. Non-Banking Financial Fraud</h4>
                    <p className="text-lg font-semibold text-gray-700 mb-2">RBI Sachet Portal (Investment & Deposit Fraud):</p>
                    <p className="text-gray-600 mb-3 text-base">Centralized portal by the RBI to file complaints against illegal/unauthorized collection of deposits, investment fraud, and bogus financial schemes (like Ponzi schemes) often promoted via phishing.</p>
                    <button
                      onClick={() => openLink('https://sachet.rbi.org.in/')}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center space-x-2 shadow-lg"
                    >
                      <FaExternalLinkAlt />
                      <span>Visit Site</span>
                    </button>
                  </div>

                  {/* Consumer Fraud */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-500">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">B. Consumer Fraud & Grievances</h4>
                    <p className="text-lg font-semibold text-gray-700 mb-2">National Consumer Helpline (NCH):</p>
                    <p className="text-gray-600 mb-3 text-base">Government portal for consumers to register grievances against fraudulent products, services, or unfair trade practices (useful if a scam involves the purchase of a defective/fake item).</p>
                    <button
                      onClick={() => openLink('https://consumerhelpline.gov.in/')}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center space-x-2 shadow-lg"
                    >
                      <FaExternalLinkAlt />
                      <span>Visit Site</span>
                    </button>
                  </div>

                  {/* Email Authentication */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-500">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">C. Email Authentication/Domain Abuse</h4>
                    <p className="text-lg font-semibold text-gray-700 mb-2">Report Domain/Brand Abuse:</p>
                    <p className="text-gray-600 mb-3 text-base">Report instances where a domain name is impersonating a major brand or organization for phishing (forwarding the phishing email to the Anti-Phishing Working Group).</p>
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="bg-white px-6 py-3 rounded-lg font-mono text-lg text-purple-600 shadow-md break-all">
                        <FaEnvelope className="inline mr-2" />
                        reportphishing@apwg.org
                      </div>
                      <button
                        onClick={() => copyToClipboard('reportphishing@apwg.org', 'apwg-email')}
                        className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors flex items-center space-x-2 shadow-lg"
                      >
                        {copiedText === 'apwg-email' ? <FaCheckCircle /> : <FaCopy />}
                        <span>{copiedText === 'apwg-email' ? 'Copied!' : 'Copy Email'}</span>
                      </button>
                    </div>
                    <p className="text-base text-gray-500 italic">Note: This is a global non-governmental organization widely used by security vendors and ISPs to track and mitigate phishing attacks.</p>
                  </div>
                </div>
              </div>

              {/* General Security & Awareness */}
              <div>
                <h3 className="text-2xl font-bold text-green-600 mb-4">4. General Security & Awareness</h3>
                
                <div className="space-y-6">
                  {/* Social Media Issues */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-500">
                    <h4 className="text-xl font-bold text-gray-800 mb-4">A. 📱 Social Media Issues Reporting Links</h4>
                    
                    <div className="space-y-4">
                      {/* Facebook/Instagram */}
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h5 className="text-lg font-bold text-gray-800 mb-2">Facebook / Instagram (Meta Abuse Center)</h5>
                        <p className="text-gray-600 mb-3 text-base">Use the main Facebook/Meta Help Center to report accounts engaging in impersonation, harassment, or abuse across both platforms.</p>
                        <button
                          onClick={() => openLink('https://www.facebook.com/help/report/')}
                          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-lg"
                        >
                          <FaExternalLinkAlt />
                          <span>Visit Site</span>
                        </button>
                      </div>

                      {/* X (Twitter) */}
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h5 className="text-lg font-bold text-gray-800 mb-2">X (Twitter) Reporting Form</h5>
                        <p className="text-gray-600 mb-3 text-base">Direct link to X's main reporting forms for security, safety, and privacy issues, including impersonation.</p>
                        <button
                          onClick={() => openLink('https://help.twitter.com/forms/general')}
                          className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors flex items-center space-x-2 shadow-lg"
                        >
                          <FaExternalLinkAlt />
                          <span>Visit Site</span>
                        </button>
                      </div>

                      {/* LinkedIn */}
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h5 className="text-lg font-bold text-gray-800 mb-2">LinkedIn (Impersonation)</h5>
                        <p className="text-gray-600 mb-3 text-base">Specific link for reporting accounts that are impersonating you or another person/organization professionally.</p>
                        <button
                          onClick={() => openLink('https://www.linkedin.com/help/linkedin/ask/li-impersonation')}
                          className="px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center space-x-2 shadow-lg"
                        >
                          <FaExternalLinkAlt />
                          <span>Visit Site</span>
                        </button>
                      </div>

                      {/* WhatsApp */}
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h5 className="text-lg font-bold text-gray-800 mb-2">WhatsApp (Abuse/Scam Contact)</h5>
                        <p className="text-gray-600 mb-3 text-base">The official contact page for reporting abuse, spam, or scams happening via WhatsApp messaging.</p>
                        <button
                          onClick={() => openLink('https://www.whatsapp.com/contact/')}
                          className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2 shadow-lg"
                        >
                          <FaExternalLinkAlt />
                          <span>Visit Site</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Security Tools */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-500">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">B. Security Tools & Alerts Hub</h4>
                    <p className="text-gray-600 mb-3 text-base">Government-run Cyber Swachhta Kendra providing malware alerts, security best practices, and free anti-malware tools.</p>
                    <button
                      onClick={() => openLink('https://www.csk.gov.in/')}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2 shadow-lg"
                    >
                      <FaExternalLinkAlt />
                      <span>Visit Site</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 2: Immediate Response Guide - Continued in next message due to length */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-6 flex items-center">
                <FaBolt className="text-4xl mr-3 text-yellow-500" />
                Immediate Response Guide (What to Do NOW)
              </h2>

              {/* Response Guide Content - will continue in edit */}
              <div className="space-y-8">
                {/* Cyber Financial Fraud */}
                <div>
                  <h3 className="text-2xl font-bold text-red-600 mb-4">A. Cyber Financial Fraud (Money Lost)</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-600">
                      <h4 className="text-xl font-bold text-red-700 mb-3">Step 1: 🚨 Act Instantly (The Golden Hour)</h4>
                      <ul className="space-y-2 text-gray-700 text-base">
                        <li className="flex items-start">
                          <span className="font-bold mr-2">•</span>
                          <span>Immediately call the <strong className="text-red-600">National Cyber Crime Helpline: 1930</strong>. This starts the process of freezing fraudulent transactions across banks and payment platforms.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-bold mr-2">•</span>
                          <span>Keep the line open and follow the instructions to get a complaint number.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-600">
                      <h4 className="text-xl font-bold text-orange-700 mb-3">Step 2: 🏦 Notify Your Financial Institution</h4>
                      <ul className="space-y-2 text-gray-700 text-base">
                        <li className="flex items-start">
                          <span className="font-bold mr-2">•</span>
                          <span>Call your bank, UPI provider, or wallet company immediately (do not use a number from a suspicious message).</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-bold mr-2">•</span>
                          <span>Inform them of the unauthorized transaction and request an immediate block on the card/account and a lien on the transferred funds.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-600">
                      <h4 className="text-xl font-bold text-yellow-700 mb-3">Step 3: 📝 File a Formal Complaint</h4>
                      <ul className="space-y-2 text-gray-700 text-base">
                        <li className="flex items-start">
                          <span className="font-bold mr-2">•</span>
                          <span>Within 24 hours, formally register the full complaint on the National Cyber Crime Reporting Portal: <a href="https://www.cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://www.cybercrime.gov.in</a></span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-bold mr-2">•</span>
                          <span>Upload all evidence: screenshots of the SMS, transaction messages, and bank statements.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-600">
                      <h4 className="text-xl font-bold text-green-700 mb-3">Step 4: 💾 Preserve All Evidence</h4>
                      <p className="text-gray-700 text-base">Do not delete any emails, SMS, call logs, or screenshots related to the fraud, as this is needed for the FIR and investigation.</p>
                    </div>
                  </div>
                </div>

                {/* Phishing/Scam Attempt */}
                <div>
                  <h3 className="text-2xl font-bold text-blue-600 mb-4">B. Phishing/Scam Attempt (Data Entered or Link Clicked)</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-600">
                      <h4 className="text-xl font-bold text-blue-700 mb-3">If you shared a password/OTP:</h4>
                      <ul className="space-y-2 text-gray-700 text-base">
                        <li className="flex items-start">
                          <span className="font-bold text-red-600 mr-2">Priority 1:</span>
                          <span>Change the password for the compromised account immediately, then change it on ALL other accounts that used the same password.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-bold text-red-600 mr-2">Priority 2:</span>
                          <span>Enable Two-Factor Authentication (2FA/MFA) on all critical accounts (Email, Banking, Social Media).</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-6 border-l-4 border-purple-600">
                      <h4 className="text-xl font-bold text-purple-700 mb-3">If you downloaded a file/clicked a suspicious link:</h4>
                      <ul className="space-y-2 text-gray-700 text-base">
                        <li className="flex items-start">
                          <span className="font-bold mr-2">•</span>
                          <span><strong>Isolate Device:</strong> Immediately disconnect the device (PC/mobile) from the internet (turn off Wi-Fi and mobile data).</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-bold mr-2">•</span>
                          <span><strong>Scan System:</strong> Run a full scan using updated antivirus/anti-malware software.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-indigo-50 rounded-xl p-6 border-l-4 border-indigo-600">
                      <h4 className="text-xl font-bold text-indigo-700 mb-3">If you received a suspicious message (but did not click):</h4>
                      <ul className="space-y-2 text-gray-700 text-base">
                        <li className="flex items-start">
                          <span className="font-bold mr-2">•</span>
                          <span>Forward the suspicious email to the relevant authority (incident@cert-in.org.in or report@phishing.gov.in).</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-bold mr-2">•</span>
                          <span>Delete the email or SMS from your inbox and trash/deleted folders.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Data Breach Notifications */}
                <div>
                  <h3 className="text-2xl font-bold text-purple-600 mb-4">C. Handling Data Breach Notifications</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-xl p-6 border-l-4 border-purple-600">
                      <ul className="space-y-3 text-gray-700 text-base">
                        <li className="flex items-start">
                          <span className="font-bold mr-2">1.</span>
                          <span><strong>Verify the Source:</strong> If an organization notifies you of a data breach, independently verify the notification's authenticity (check their official website or call them directly).</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-bold mr-2">2.</span>
                          <span><strong>Change Passwords:</strong> Change the password for the account involved in the breach, and any other account where you used the same password.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-bold mr-2">3.</span>
                          <span><strong>Monitor Accounts:</strong> Monitor your bank statements, credit score, and all linked accounts for any unauthorized activity over the next several weeks.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </main>
      </div>
    </>
  )
}
