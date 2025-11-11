import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaBriefcase, FaHeart, FaUserSecret, FaGamepad, FaShoppingCart, FaHeadset, FaArrowUp, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

interface Section {
  slug: string;
  title: string;
  icon: React.ElementType;
  immediate: string[];
  safe: string[];
}

const sections: Section[] = [
  {
    slug: 'financial',
    title: 'Financial & UPI Frauds',
    icon: FaMoneyBillWave,
    immediate: [
      'Call your bank helpline and freeze your account.',
      'Dial 1930 or report instantly on cybercrime.gov.in.',
      'Take screenshots of the fraudulent message or transaction.',
      'Change your UPI PIN and passwords right away.',
    ],
    safe: [
      'Always verify payment requests before scanning QR codes.',
      'Never share OTP, PIN, or CVV — even with "bank officials."',
      'Use only official banking apps and double-check URLs.',
      'Turn on SMS/email alerts for every transaction.',
    ],
  },
  {
    slug: 'job',
    title: 'Job & Employment Scams',
    icon: FaBriefcase,
    immediate: [
      'Stop all communication with the scam recruiter.',
      'Save emails, chats, or payment receipts as evidence.',
      'Report fake listings on cybercrime.gov.in.',
      'Change passwords if you shared personal data.',
    ],
    safe: [
      'Never pay for job applications or interviews.',
      'Verify emails — genuine firms use official domains (e.g., @infosys.com).',
      'Research companies before applying.',
      'Don’t share Aadhaar, PAN, or bank details online.',
    ],
  },
  {
    slug: 'matrimonial',
    title: 'Matrimonial & Dating Frauds',
    icon: FaHeart,
    immediate: [
      'Block and report the suspicious account.',
      'Save chats, screenshots, or payment proofs.',
      'File a report on cybercrime.gov.in for extortion or threats.',
      'Inform family or trusted friends immediately.',
    ],
    safe: [
      'Keep chats within verified platforms only.',
      'Don’t share photos or transfer money early in conversation.',
      'Verify identities through video calls or social profiles.',
      'Stay alert to emotional manipulation or “emergency” stories.',
    ],
  },
  {
    slug: 'social-media',
    title: 'Social Media & Impersonation Scams',
    icon: FaUserSecret,
    immediate: [
      'Don’t engage with or click suspicious links.',
      'Report and block fake or impersonating profiles.',
      'Take screenshots as evidence.',
      'Change passwords and enable 2FA (Two-Factor Authentication).',
    ],
    safe: [
      'Verify follower or friend profiles before sharing info.',
      'Avoid posting personal or financial details publicly.',
      'Check privacy settings regularly.',
      'Ignore “giveaway” or “urgent help” messages.',
    ],
  },
  {
    slug: 'gaming',
    title: 'Online Gaming & Gambling Scams',
    icon: FaGamepad,
    immediate: [
      'Exit the suspicious game or app immediately.',
      'Report fraudulent apps on the Play Store/App Store.',
      'Block linked payment cards or wallets.',
      'Contact 1930 if money is lost.',
    ],
    safe: [
      'Avoid games that demand real-money deposits.',
      'Use a separate wallet for gaming payments.',
      'Never share banking info in chatrooms.',
      'Play only verified and age-appropriate games.',
    ],
  },
  {
    slug: 'ecommerce',
    title: 'Fake E-Commerce & Shopping Scams',
    icon: FaShoppingCart,
    immediate: [
      'Cancel pending payments and block your card.',
      'Contact your bank or payment app support.',
      'Save order pages, receipts, and messages.',
      'Report the fraud on cybercrime.gov.in.',
    ],
    safe: [
      'Shop only on secure (HTTPS) and verified websites.',
      'Check seller reviews and site authenticity.',
      'Prefer Cash on Delivery for new sites.',
      'Be skeptical of “too good to be true” offers.',
    ],
  },
  {
    slug: 'tech-support',
    title: 'Tech Support & Remote Access Scams',
    icon: FaHeadset,
    immediate: [
      'Disconnect from Wi-Fi or mobile data instantly.',
      'Uninstall any remote-control apps (AnyDesk, TeamViewer).',
      'Change all passwords and scan for malware.',
      'File a complaint on cybercrime.gov.in.',
    ],
    safe: [
      'Ignore unsolicited calls claiming to be “tech support.”',
      'Never give remote access to unknown people.',
      'Keep antivirus updated and active.',
      'Contact customer service via official websites only.',
    ],
  },
];

export default function SafetyTipsPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      setProgress(pct);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const jumpLinks = useMemo(() => sections.map(s => ({ slug: s.slug, title: s.title })), []);

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.35 } }),
  };

  const handleBackToCyberpedia = () => {
    router.push('/cyberpedia');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />

      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-40 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>


      <main ref={containerRef} className="container mx-auto px-6 py-10">
        {/* Intro */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="max-w-5xl mx-auto mb-10"
          id="top"
        >
          <button
            onClick={handleBackToCyberpedia}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 mb-6 transition-colors"
          >
            <FaArrowLeft />
            <span className="font-semibold">Back to Cyberpedia</span>
          </button>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Cyber Safety Tips</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-medium">"Two steps to safety — Respond right. Stay prepared."</p>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 max-w-7xl mx-auto">
          {/* Placards */}
          <div className="space-y-6">
            {sections.map((s, idx) => (
              <motion.section
                id={s.slug}
                key={s.slug}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-2xl bg-white shadow-xl border border-slate-200 overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg">
                      <s.icon className="text-2xl" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800">{s.title}</h2>
                  </div>

                  {/* What to do immediately */}
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
                      <h3 className="text-lg md:text-xl font-semibold text-red-600">What to Do Immediately</h3>
                    </div>
                    <ul className="list-disc pl-6 space-y-1 text-slate-700">
                      {s.immediate.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* How to stay safe */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                      <h3 className="text-lg md:text-xl font-semibold text-emerald-600">How to Stay Safe</h3>
                    </div>
                    <ul className="list-disc pl-6 space-y-1 text-slate-700">
                      {s.safe.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://cybercrime.gov.in"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow hover:shadow-lg transition-shadow"
                    >
                      Report Scam <FaExternalLinkAlt />
                    </a>
                    <a href="#top" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
                      <FaArrowUp /> Back to Top
                    </a>
                  </div>
                </div>
              </motion.section>
            ))}

            {/* Footer Note */}
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white shadow-xl border border-slate-200 p-6 md:p-8"
            >
              <p className="text-lg md:text-xl text-slate-800 font-semibold mb-2">
                “Act fast. Think smart. Report early — every second counts in cyber safety.”
              </p>
              <p className="text-sm text-slate-500">Last Updated: November 2025 · Verified by CyberDost</p>
            </motion.section>
          </div>

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block sticky top-24 h-[calc(100vh-8rem)]">
            <div className="rounded-2xl bg-white shadow-xl border border-slate-200 p-4">
              <h4 className="text-sm font-bold text-slate-600 mb-3">Quick Navigation</h4>
              <ul className="space-y-2">
                {jumpLinks.map(link => (
                  <li key={link.slug}>
                    <a href={`#${link.slug}`} className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100">
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
