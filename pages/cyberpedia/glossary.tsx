import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShieldAlt, FaUserSecret, FaKey, FaDatabase, FaSpider, FaBrain, FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

interface Zone {
  id: number;
  emoji: string;
  title: string;
  theme: string;
  color: string;
  bgGradient: string;
  borderColor: string;
  icon: any;
  terms: Term[];
}

interface Term {
  name: string;
  title?: string;
  meaning: string;
  example: string;
  defenseTip: string;
  defenseTip2?: string;
  relatedWords: string[];
  relatedConcepts?: RelatedConcept[];
  videoUrl?: string;
  videoTitle?: string;
}

interface RelatedConcept {
  name: string;
  description: string;
}

const zones: Zone[] = [
  {
    id: 1,
    emoji: '🧱',
    title: 'The Wall',
    theme: 'Barriers & Protection',
    color: 'blue',
    bgGradient: 'from-blue-50 to-cyan-50',
    borderColor: 'border-blue-500',
    icon: FaShieldAlt,
    terms: [
      {
        name: 'Firewall',
        title: 'FIREWALL: THE DIGITAL BORDER GUARD',
        meaning: 'A Firewall is a security system that constantly monitors and filters network traffic to block unauthorized access and prevent digital threats from entering your computer or network.',
        example: 'Imagine a bouncer at an exclusive club. They have a strict guest list (security rules). Any data packet that isn\'t on the list or tries to sneak past gets instantly rejected. They keep the good traffic moving and the bad traffic out.',
        defenseTip: 'Your computer (Windows/macOS) has a built-in Software Firewall. Your home Wi-Fi router also has a Hardware Firewall. Both must be ON. Disabling either leaves a critical, open hole.',
        defenseTip2: 'A firewall works on rules. Never click \'Allow Access\' for an unknown application pop-up. If you don\'t know the program, it shouldn\'t be allowed past the gate.',
        relatedWords: ['Network Security', 'Traffic Filter', 'Security Barrier'],
        relatedConcepts: [
          {
            name: 'Port',
            description: 'The digital "doorway" a program uses to communicate. A firewall controls which doors are open.'
          },
          {
            name: 'Inbound Traffic',
            description: 'Data trying to come in to your computer from the internet.'
          },
          {
            name: 'Packet Filtering',
            description: 'The specific process a firewall uses to inspect and decide (Allow or Deny) on each piece of data passing through.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=kDEX1HXybrU',
        videoTitle: 'Firewall Explained Simply'
      },
      {
        name: 'Antivirus',
        title: 'ANTIVIRUS: THE DIGITAL IMMUNE SYSTEM',
        meaning: 'Antivirus is a software program designed to detect, prevent, and remove all forms of malicious software (known as malware), including viruses, worms, and Trojans, from your device.',
        example: 'Think of Antivirus as your device\'s immune system. It constantly monitors your files (like blood cells) and scans new arrivals. It uses a database of signatures (known DNA) to recognize and neutralize threats, often isolating or \'quarantining\' the bad files before they can infect your whole system.',
        defenseTip: 'Your Antivirus is only as good as its last update. It must frequently download new signatures to recognize the latest viruses. Always enable automatic updates.',
        defenseTip2: 'Do not rely on Real-Time Protection alone. Schedule a Full System Scan at least once a month when you\'re not using your computer, so it can check every file thoroughly.',
        relatedWords: ['Malware Protection', 'Security Software', 'Threat Detection'],
        relatedConcepts: [
          {
            name: 'Malware',
            description: 'Parent term for all malicious software.'
          },
          {
            name: 'Quarantine',
            description: 'The safe, isolated area where Antivirus holds suspicious files.'
          },
          {
            name: 'Signature',
            description: 'The digital fingerprint of a known virus that the software looks for.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=jWE-OZjlg4A',
        videoTitle: 'Antivirus Guide for Beginners: Do You Even Need It?'
      },
      {
        name: 'VPN (Virtual Private Network)',
        title: 'VPN: THE PRIVATE ENCRYPTED TUNNEL',
        meaning: 'A Virtual Private Network (VPN) creates an encrypted tunnel between your device and the internet. It hides your original IP address and encrypts all your incoming and outgoing data, ensuring privacy and anonymity.',
        example: 'When you use the regular internet, your data is like a postcard (unencrypted) sent by mail (ISP). When you use a VPN, your data is put inside a private, armored jet (the encrypted tunnel) that takes off from a distant, hidden runway (the VPN server\'s location). Nobody can see what\'s inside or where you truly came from.',
        defenseTip: 'Always enable your VPN before connecting to any public Wi-Fi (cafes, airports, hotels). These networks are easily monitored by hackers, but a VPN renders your traffic unreadable.',
        defenseTip2: 'Choose a reputable VPN that enforces a strict \'No-Logs\' policy. If a VPN keeps a record of your activity, it defeats the purpose of privacy.',
        relatedWords: ['Encryption', 'Privacy Tool', 'Secure Tunnel'],
        relatedConcepts: [
          {
            name: 'Encryption',
            description: 'The process of scrambling data into an unreadable code.'
          },
          {
            name: 'IP Address',
            description: 'Your device\'s unique identifier/location marker on the internet.'
          },
          {
            name: 'No-Logs Policy',
            description: 'The VPN provider\'s guarantee not to record your activity.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=WVDQEoe6ZWY',
        videoTitle: 'What is a VPN? Explained Simply for Beginners'
      },
      {
        name: 'Encryption',
        title: 'ENCRYPTION: THE SECRET CODE LOCK',
        meaning: 'Encryption is the process of transforming readable information (plaintext) into an unreadable, scrambled format (ciphertext) using a secret key, ensuring that only authorized parties can decode and access the original data.',
        example: 'Imagine your private message is a diary entry. Encryption puts that entry into a special lockbox and throws away the key. Only the intended recipient has the matching decryption key to unlock the box and read the original message. If anyone else intercepts the box, they only see gibberish.',
        defenseTip: 'Always ensure the website address starts with https:// (Hypertext Transfer Protocol Secure). The \'s\' means the data moving between you and the website is encrypted.',
        defenseTip2: 'Enable Whole Disk Encryption (like BitLocker on Windows or FileVault on Mac). If your laptop is lost or stolen, its hard drive contents will remain scrambled and worthless to thieves.',
        relatedWords: ['Data Protection', 'Cipher', 'Secure Communication'],
        relatedConcepts: [
          {
            name: 'Ciphertext',
            description: 'The unreadable, scrambled version of the original message.'
          },
          {
            name: 'Public Key / Private Key',
            description: 'The two unique, mathematically linked keys used in secure communication.'
          },
          {
            name: 'TLS/SSL',
            description: 'The standard protocols that use encryption to secure web traffic.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=2oXKjPwBSUk',
        videoTitle: 'Cryptography Basics: Intro to Cybersecurity'
      },
      {
        name: 'Proxy Server',
        title: 'PROXY SERVER: THE INTERNET MIDDLEMAN',
        meaning: 'A Proxy Server is an intermediary computer that sits between your device and the internet. It intercepts your web request, makes the connection on your behalf, and relays the response back, masking your original IP address.',
        example: 'Instead of calling a company directly, you call the Receptionist (Proxy). You tell them what you need. The Receptionist calls the person, gets the answer, and calls you back. The company only sees the Receptionist\'s phone number, not yours. This helps with identity masking and traffic filtering.',
        defenseTip: 'Proxies are excellent for Content Filtering. Companies or schools use them to block access to malicious or distracting websites. If your proxy blocks a site, respect the policy as it\'s often a defense mechanism.',
        defenseTip2: 'Know that a Proxy is NOT a full VPN. While a good Proxy masks your IP, it typically does not encrypt all your data like a VPN does. For true security, use a VPN; for basic masking or content access, a proxy may suffice.',
        relatedWords: ['IP Masking', 'Content Filter', 'Intermediary Server'],
        relatedConcepts: [
          {
            name: 'IP Address',
            description: 'The unique number the Proxy hides on your behalf.'
          },
          {
            name: 'Caching',
            description: 'The process of storing copies of websites to speed up repeat visits—a common Proxy function.'
          },
          {
            name: 'Forward Proxy / Reverse Proxy',
            description: 'Two major types—one protects the client, the other protects the server.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=5cPIukqXe5w',
        videoTitle: 'What is a Proxy Server?'
      }
    ]
  },
  {
    id: 2,
    emoji: '🕵',
    title: 'The Trap Room',
    theme: 'Scams & Tricks',
    color: 'red',
    bgGradient: 'from-red-50 to-orange-50',
    borderColor: 'border-red-500',
    icon: FaUserSecret,
    terms: [
      {
        name: 'Phishing',
        title: 'PHISHING: THE BAIT-AND-SWITCH EMAIL',
        meaning: 'Phishing is a type of social engineering where an attacker attempts to trick you into revealing sensitive information (like passwords or credit card numbers) by impersonating a trustworthy entity in an email or message.',
        example: 'A Phishing attack is like getting a fake phone call from your bank claiming your account is locked and asking you to \'verify\' your details right now. The threat creates urgency and fear to bypass your logic and steal your credentials.',
        defenseTip: 'NEVER click a link in a suspicious email. Instead, hover your mouse over the link to reveal the real URL. If the address looks different from the company\'s official site, it\'s a scam.',
        defenseTip2: 'If you receive an urgent alert from a bank or service, do not reply to the email. Open a new browser window and type the company\'s official website address yourself to log in and check your account.',
        relatedWords: ['Email Scam', 'Social Engineering', 'Credential Theft'],
        relatedConcepts: [
          {
            name: 'Spear Phishing',
            description: 'A targeted Phishing attack against a specific individual.'
          },
          {
            name: 'Vishing',
            description: 'Phishing conducted via voice/phone calls.'
          },
          {
            name: 'Social Engineering',
            description: 'The umbrella term for manipulating people into taking action.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=K8-J344u7Wk',
        videoTitle: 'Phishing Attacks Explained for Beginners'
      },
      {
        name: 'Smishing',
        title: 'SMISHING: THE TEXT MESSAGE TRAP',
        meaning: 'Smishing is a variation of phishing that uses SMS (text messages) to deliver the bait. Attackers send texts about urgent deliveries, tax refunds, or password resets that include a link designed to steal your data or install malware.',
        example: 'Smishing is like getting a fake parking violation text asking you to click and pay a small fine immediately. Because texts feel more personal and urgent than email, you\'re more likely to click the link without thinking.',
        defenseTip: 'Never click links from unknown or strange numbers, especially those claiming to be from a government agency, bank, or parcel delivery company.',
        defenseTip2: 'If the text claims to be urgent (like a bank fraud alert), call the company back using the official phone number listed on their website or your statement, not the number that sent the text.',
        relatedWords: ['SMS Scam', 'Text Phishing', 'Mobile Threat'],
        relatedConcepts: [
          {
            name: 'Phishing',
            description: 'The core, email-based deception technique.'
          },
          {
            name: 'Malware',
            description: 'The harmful software often delivered by smishing links.'
          },
          {
            name: 'Text Spam',
            description: 'Unsolicited, bulk text messages, often containing smishing attempts.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=M5-C5k7qT3c',
        videoTitle: 'How to Spot a Smishing Text Message'
      },
      {
        name: 'Catfishing',
        title: 'CATFISHING: THE FAKE ONLINE IDENTITY',
        meaning: 'Catfishing is the act of creating a fake online persona to deceive someone, typically to exploit them for financial gain, psychological manipulation, or to engage in romance scams.',
        example: 'It\'s like meeting someone at a masquerade ball who seems charming and wealthy but never takes off the mask, and always has an excuse to avoid meeting in person or turning on a video camera. The person you see is a complete invention.',
        defenseTip: 'Use a tool like Google Image Search to perform a reverse image lookup on their profile pictures. If the photos are of a model, celebrity, or appear on dozens of different profiles, it\'s a catfish.',
        defenseTip2: 'NEVER send money, gift cards, or crypto to an online contact you have never met in person, especially if they have an urgent, dramatic financial emergency.',
        relatedWords: ['Romance Scam', 'Identity Fraud', 'Online Deception'],
        relatedConcepts: [
          {
            name: 'Impersonation',
            description: 'The act of fraudulently pretending to be another person.'
          },
          {
            name: 'Romance Scam',
            description: 'A type of Catfishing where the goal is financial theft through emotional manipulation.'
          },
          {
            name: 'Digital Footprint',
            description: 'The trail of data left by online activity—catfish profiles often have a very small or inconsistent one.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=G8H9-H1X-d4',
        videoTitle: 'How to Spot a Romance Scam (Catfishing)'
      },
      {
        name: 'Deepfake',
        title: 'DEEPFAKE: THE FAKE REALITY',
        meaning: 'A Deepfake is synthetic media—usually video or audio—that has been manipulated or generated using deep learning AI to make it appear as though a person said or did something they never actually did.',
        example: 'It\'s like a ventriloquist who has perfected their craft so well that you cannot detect they are talking for the dummy, but in this case, the \'dummy\' is a digital copy of a real person. The AI makes the speech and facial movements look seamless.',
        defenseTip: 'Watch for visual glitches: poor lip synchronization, unnatural blinking, strange lighting, or blurry edges around the face. AI is improving, but these \'tells\' can still exist.',
        defenseTip2: 'If you receive a shocking or urgent message via video/audio from a family member or your boss, do not act immediately. Use a secondary, trusted channel (like calling them on the phone) to verify the request.',
        relatedWords: ['AI Manipulation', 'Synthetic Media', 'Video Fraud'],
        relatedConcepts: [
          {
            name: 'Synthetic Media',
            description: 'The umbrella term for AI-generated video, audio, or images.'
          },
          {
            name: 'Generative AI',
            description: 'The class of artificial intelligence used to create Deepfakes.'
          },
          {
            name: 'Vishing',
            description: 'Can be enhanced by Deepfake audio to impersonate voices.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=MTEgxaT1O9E',
        videoTitle: 'How Deepfakes Are Getting Realistic'
      },
      {
        name: 'Spoofing',
        title: 'SPOOFING: THE FALSE IDENTIFIER',
        meaning: 'Spoofing is the malicious act of disguising a communication source to look like a trustworthy or familiar source. This can include faking an email sender address, IP address, caller ID, or even a website URL.',
        example: 'It\'s like receiving a call that shows your neighbor\'s number on the caller ID, but when you answer, it\'s a telemarketer. The scammer is using software to \'spoof\' the number you see to gain your trust and get you to pick up.',
        defenseTip: 'For suspicious emails, go beyond the \'From\' name. If you can view the full email header, look for the actual sender\'s server address; a legitimate company won\'t send mail from a personal Gmail or hotmail account.',
        defenseTip2: 'If a website or bank call looks legitimate, verify the true identity through another method. For websites, look for the \'padlock\' icon and check the full URL for subtle spelling errors.',
        relatedWords: ['Identity Masking', 'Caller ID Fraud', 'Email Forgery'],
        relatedConcepts: [
          {
            name: 'Phishing',
            description: 'The delivery method often used after Spoofing the sender.'
          },
          {
            name: 'Domain Name',
            description: 'The part of the website or email address that can be spoofed or slightly altered.'
          },
          {
            name: 'DNS',
            description: 'The system attackers can sometimes manipulate to spoof a website address.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=5yfbcQw0hLY',
        videoTitle: 'How Spoofing Works and How to Defend'
      }
    ]
  },
  {
    id: 3,
    emoji: '🔑',
    title: 'The Lockbox',
    theme: 'Authentication',
    color: 'yellow',
    bgGradient: 'from-yellow-50 to-amber-50',
    borderColor: 'border-yellow-500',
    icon: FaKey,
    terms: [
      {
        name: '2FA / MFA',
        title: '2FA/MFA: THE DOUBLE CHECK',
        meaning: '2FA (Two-Factor Authentication) and MFA (Multi-Factor Authentication) require you to provide two or more different forms of verification from separate categories (e.g., something you know + something you have) to prove your identity before granting access.',
        example: 'A standard password is one key for a door. 2FA is like using that key (something you know) and then requiring a second layer like a keycard or fingerprint (something you have or something you are). If a hacker steals your password, they are stopped cold at the second security checkpoint.',
        defenseTip: 'Always prefer Authenticator Apps (like Google Authenticator or Authy) over SMS text messages for your codes. SMS codes can be intercepted by sophisticated attackers, making them less secure than app-generated codes.',
        defenseTip2: 'Enable 2FA on your most critical accounts first: Email (the key to everything), Social Media, and Financial Sites.',
        relatedWords: ['MFA', 'Multi-Factor Authentication', 'Extra Security Layer'],
        relatedConcepts: [
          {
            name: 'Password',
            description: 'The first factor you know.'
          },
          {
            name: 'Token',
            description: 'The physical device or app that generates the second factor.'
          },
          {
            name: 'Biometrics',
            description: 'A verification factor based on something you are, like a fingerprint.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=lEHhivPJQ5w',
        videoTitle: 'Multi-Factor Authentication Explained'
      },
      {
        name: 'Passphrase',
        title: 'PASSPHRASE: THE MEMORABLE PASSWORD',
        meaning: 'A Passphrase is a security measure based on a sequence of random, unrelated words (a short sentence) rather than a single, complex word. Its strength comes from its length, which dramatically increases the time required for a hacker to guess it.',
        example: 'A complex password like P@$$w0rd! is like a 7-digit code that computers can brute-force easily. A passphrase like Correct Horse Battery Staple is 28 characters long. While easy for you to remember, it creates a sequence so long that a computer would take billions of years to crack.',
        defenseTip: 'Your passphrase must be a sequence of random words (e.g., dog-piano-sun-chair). Do not use common song lyrics or quotes, as these are often in hackers\' dictionaries.',
        defenseTip2: 'Adding minor capitalization or symbols between the words (e.g., purple!rain*cloud) can increase strength, but the length of the words is always the primary factor.',
        relatedWords: ['Password Security', 'Long Password', 'Random Words'],
        relatedConcepts: [
          {
            name: 'Password Strength',
            description: 'The measure of time required to crack a password.'
          },
          {
            name: 'Brute Force Attack',
            description: 'The method hackers use to guess every possible combination.'
          },
          {
            name: 'Entropy',
            description: 'The mathematical measure of randomness and unpredictability in a password.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=3NjQ9b3pgIg',
        videoTitle: 'Creating Strong Passwords and Passphrases'
      },
      {
        name: 'Token',
        title: 'TOKEN: THE ONE-TIME KEY',
        meaning: 'A Token is a physical device or a software application that generates a One-Time Password (OTP) or code used as a second factor in authentication. These codes are often time-sensitive and expire quickly.',
        example: 'A traditional key (password) can be copied forever. A Token is like a self-destructing, single-use ticket. Once the code is entered, it\'s useless, and a new one is instantly generated. This means even if a hacker sees your code, it will be invalid by the time they try to use it.',
        defenseTip: 'If you use an authenticator app, ensure you keep a backup of the \'seed\' key (a long recovery code provided during setup) in a safe, offline place like a physical safe. If you lose your phone, this key is the only way to recover your tokens.',
        defenseTip2: 'For extremely high-value accounts (like crypto wallets), consider using a Hardware Token (like a YubiKey). This physically-secured key is virtually impossible for remote hackers to steal.',
        relatedWords: ['OTP', 'Authenticator', 'Security Key'],
        relatedConcepts: [
          {
            name: '2FA / MFA',
            description: 'Tokens are the most common second factor.'
          },
          {
            name: 'OTP (One-Time Password)',
            description: 'The code generated by the Token.'
          },
          {
            name: 'Time-Based OTP (TOTP)',
            description: 'The most common type, where the code changes every 30-60 seconds.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=p4v3H6Uj60o',
        videoTitle: 'How Security Tokens Keep You Safe'
      },
      {
        name: 'Password Manager',
        title: 'PASSWORD MANAGER: THE DIGITAL KEYRING',
        meaning: 'A Password Manager is an encrypted application that securely stores all your unique login credentials and often includes features to generate complex, random passwords and automatically fill them into websites, requiring you to only remember one Master Password.',
        example: 'It is a digital safe that holds hundreds of complex, unique keys. You only need one key—your Master Password—to unlock the safe. This allows you to use a different, highly complex password for every single website without having to write any of them down.',
        defenseTip: 'Your Master Password is the most important one you own. It must be a long, unique passphrase and protected by 2FA/MFA. If the master key is lost, you lose access to everything.',
        defenseTip2: 'Use the manager\'s built-in password health auditor to find and replace any old, weak, or reused passwords. Aim for 100% unique credentials.',
        relatedWords: ['Credential Storage', 'Password Vault', 'Auto-fill'],
        relatedConcepts: [
          {
            name: 'Master Password',
            description: 'The single, high-security password that unlocks the Manager.'
          },
          {
            name: 'Encryption',
            description: 'The method used to secure the data stored inside the Manager.'
          },
          {
            name: 'Autofill',
            description: 'The feature that automatically inserts your credentials, preventing keylogging theft.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=Fj-y5kM4nE4',
        videoTitle: 'Why You Need a Password Manager'
      },
      {
        name: 'CAPTCHA',
        title: 'CAPTCHA: THE HUMAN TEST',
        meaning: 'A CAPTCHA (Completely Automated Public Turing test to tell Computers and Humans Apart) is a challenge-response test used on websites to determine whether the user is a human or an automated bot attempting to access or spam the system.',
        example: 'If a club (website) is worried about a huge crowd of robots rushing the door (spam/bots), they hire a security guard (CAPTCHA) to ask one quick, simple question that only a regular person would know the answer to, like \'Which photo shows a bus?\'',
        defenseTip: 'Modern CAPTCHAs often look blurry or skewed; this is intentional. Don\'t worry if you take a moment or two—it\'s designed to be trivially easy for humans but computationally hard for a machine.',
        defenseTip2: 'If you are constantly facing complex CAPTCHAs, it may be because a VPN or Proxy is masking your IP as suspicious. Log in to your favorite sites without the VPN first, or use a trusted VPN service.',
        relatedWords: ['Bot Detection', 'Human Verification', 'Turing Test'],
        relatedConcepts: [
          {
            name: 'Bot',
            description: 'A software program designed to perform automated tasks, often malicious ones.'
          },
          {
            name: 'Turing Test',
            description: 'The academic concept of distinguishing a human from a machine.'
          },
          {
            name: 'Denial of Service (DoS)',
            description: 'An attack CAPTCHAs help prevent, where bots overload a service.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=K3fGzG71LFI',
        videoTitle: 'How CAPTCHA Works to Stop Bots'
      }
    ]
  },
  {
    id: 4,
    emoji: '🧬',
    title: 'The Data Vault',
    theme: 'Privacy & Data',
    color: 'green',
    bgGradient: 'from-green-50 to-emerald-50',
    borderColor: 'border-green-500',
    icon: FaDatabase,
    terms: [
      {
        name: 'PII',
        title: 'PII: YOUR UNIQUE DIGITAL DNA',
        meaning: 'PII (Personally Identifiable Information) is any data that can be used to directly or indirectly identify a specific person. It is your most valuable asset to an attacker because it allows for identity theft and account takeover.',
        example: 'A password is one key. Your PII (Social Security Number, birthday, and full legal name) is the Master Key Set that can unlock everything: your bank account, your medical records, and your new credit cards. This data must be guarded at all costs.',
        defenseTip: 'Go through your online accounts and minimize the PII you provide. If a site only needs your name and email, do not give it your phone number or birthday.',
        defenseTip2: 'If you receive an email or call asking for sensitive PII (like your Social Security Number), NEVER provide it. Legit organizations already have this data and won\'t request it via unsecured communication.',
        relatedWords: ['Personal Data', 'Identity Info', 'Private Information'],
        relatedConcepts: [
          {
            name: 'Identity Theft',
            description: 'The crime committed when PII is compromised.'
          },
          {
            name: 'Data Breach',
            description: 'The event that exposes large amounts of PII.'
          },
          {
            name: 'HIPAA / GDPR',
            description: 'Regulations designed to protect PII.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=TVotn0DSywo',
        videoTitle: 'What Is Personally Identifiable Information?'
      },
      {
        name: 'Metadata',
        title: 'METADATA: THE DATA ABOUT THE DATA',
        meaning: 'Metadata is structured information that describes, explains, or locates another information resource. For photos and documents, this includes hidden details like the time, date, and GPS location where the file was created.',
        example: 'Your personal letter is the data. But the postmarked envelope—which has the sender\'s address, the time of mailing, and a tracking barcode—is the metadata. Even if the letter is encrypted, anyone can read the envelope details to track you.',
        defenseTip: 'Before uploading a photo, video, or sensitive document to a public website, use a metadata scrubbing tool to remove GPS location, device type, and author information.',
        defenseTip2: 'Turn off GPS location services for your camera app. Most photos shared online don\'t need to broadcast the exact spot where they were taken.',
        relatedWords: ['Hidden Data', 'File Information', 'EXIF Data'],
        relatedConcepts: [
          {
            name: 'Digital Footprint',
            description: 'Metadata contributes heavily to your passive footprint.'
          },
          {
            name: 'GPS',
            description: 'The technology that provides location metadata for photos.'
          },
          {
            name: 'EXIF',
            description: 'The specific format used to store metadata in image files.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=MfDRuVsv9rY',
        videoTitle: 'Why Metadata Matters'
      },
      {
        name: 'Cookies',
        title: 'COOKIES: THE WEBSITE MEMORY FILES',
        meaning: 'Cookies are small text files placed on your computer by a website you visit. They are used for three main purposes: session management (keeping you logged in), personalization (remembering preferences), and tracking.',
        example: 'There are two types: First-Party Cookies are like a club wristband that says \'This person is allowed in\' (useful). Third-Party Cookies are like a tiny spy hired by an advertiser who follows you from club to club to record everything you look at (not private).',
        defenseTip: 'Regularly clear your browser\'s cookies and cache, or set your browser to automatically clear them upon closing. This wipes out the trackers and temporary login files.',
        defenseTip2: 'When you see the \'Accept Cookies\' banner, always select \'Manage Settings\' and decline Third-Party/Tracking Cookies. Only accept the strictly \'Necessary\' cookies.',
        relatedWords: ['Tracking', 'Web Storage', 'Browser Data'],
        relatedConcepts: [
          {
            name: 'Third-Party Cookie',
            description: 'The type primarily used for advertising and long-term tracking.'
          },
          {
            name: 'Browser',
            description: 'The application that stores and sends the cookies.'
          },
          {
            name: 'Cache',
            description: 'Temporary files, separate from cookies, that also speed up browsing.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=_l2-iZrogDg',
        videoTitle: 'Internet Cookies Explained In The Simplest Way'
      },
      {
        name: 'Cloud Storage',
        title: 'CLOUD STORAGE: THE VIRTUAL HARD DRIVE',
        meaning: 'Cloud Storage is the practice of storing digital data in logical pools across multiple third-party servers, usually operated by a hosting company, rather than directly on your local computer\'s hard drive.',
        example: 'It is like putting your files into a safety deposit box at a highly secure bank. The bank (the cloud provider) handles the physical security, but you are still responsible for your own lock and key (password and 2FA). The security is shared between you and the provider.',
        defenseTip: 'The single biggest cloud security risk is a weak password. Protect your cloud account (Google Drive, Dropbox, iCloud) with a unique, strong password and 2FA/MFA.',
        defenseTip2: 'Regularly review your sharing settings. Ensure sensitive documents are not accidentally set to \'Public\' or \'Anyone with the link can edit.\'',
        relatedWords: ['Online Storage', 'Remote Files', 'Data Backup'],
        relatedConcepts: [
          {
            name: 'Encryption',
            description: 'The necessary protection for data stored in the Cloud.'
          },
          {
            name: 'Shared Responsibility Model',
            description: 'The concept that both the user and the provider are responsible for security.'
          },
          {
            name: '2FA / MFA',
            description: 'Crucial authentication methods for Cloud accounts.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=zR271wR0Kow',
        videoTitle: 'How to secure your cloud environment'
      },
      {
        name: 'Digital Footprint',
        title: 'DIGITAL FOOTPRINT: YOUR ONLINE SHADOW',
        meaning: 'Your Digital Footprint is the entire trail of data you leave behind from your online activities—including everything you post (active) and everything collected about you (passive), forming a lasting record of your identity.',
        example: 'Once you step on a social media site or make a public comment, that data is like a footprint left in wet cement. It hardens, and it\'s almost impossible to erase completely. Every new action simply adds a new footprint to the permanent trail.',
        defenseTip: 'Set social media profiles to Private. Do a \'Google Yourself\' check annually to see what information about you is publicly available, and remove old, embarrassing, or unprofessional posts.',
        defenseTip2: 'Be deliberate about your metadata and cookie settings. The less personal information you share passively, the smaller and harder-to-track your footprint becomes.',
        relatedWords: ['Online Presence', 'Data Trail', 'Internet History'],
        relatedConcepts: [
          {
            name: 'Passive Footprint',
            description: 'Data collected without your direct action, like IP logs and cookies.'
          },
          {
            name: 'Active Footprint',
            description: 'Data you intentionally post, like comments and photos.'
          },
          {
            name: 'Privacy Policy',
            description: 'The document that outlines how a site will use or share your footprint.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=ixxb4BWCBwY',
        videoTitle: 'What Is a Digital Footprint?'
      }
    ]
  },
  {
    id: 5,
    emoji: '🕸',
    title: 'The Shadow Net',
    theme: 'Advanced Threats',
    color: 'purple',
    bgGradient: 'from-purple-50 to-pink-50',
    borderColor: 'border-purple-500',
    icon: FaSpider,
    terms: [
      {
        name: 'Malware',
        title: 'MALWARE: THE DIGITAL SICKNESS',
        meaning: 'Malware (a shortened term for malicious software) is any type of software specifically designed to damage, disrupt, or gain unauthorized access to a computer system or steal data. It is the umbrella term for viruses, worms, Trojans, and ransomware.',
        example: 'Malware is like a particularly bad flu. It gets into your system, replicates itself (like a virus), can cause your system to malfunction (like ransomware), and its goal is always to make you sick and steal your energy (data).',
        defenseTip: 'Maintain a constantly updated Antivirus solution. This software is specifically designed to recognize, block, and remove known malware signatures before they execute.',
        defenseTip2: 'If a file or program seems suspicious, use an online tool or feature (often called a Sandbox) to open it in an isolated, secure environment. If it proves malicious, it cannot infect your main system.',
        relatedWords: ['Virus', 'Malicious Software', 'Cyber Threat'],
        relatedConcepts: [
          {
            name: 'Antivirus',
            description: 'The primary defense tool against malware.'
          },
          {
            name: 'Ransomware',
            description: 'A specific, highly damaging type of malware.'
          },
          {
            name: 'Trojan Horse',
            description: 'The deceptive delivery mechanism for much malware.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=n8mbzU0X2nQ',
        videoTitle: 'How Malware Works: The Basics'
      },
      {
        name: 'Botnet',
        title: 'BOTNET: THE ARMY OF ZOMBIE DEVICES',
        meaning: 'A Botnet is a network of internet-connected devices (often infected personal computers, phones, or IoT devices) that have been secretly compromised with malware, allowing an attacker to remotely control the entire group to launch large-scale attacks.',
        example: 'Each infected device is a \'zombie\' or \'bot\' that the attacker (the \'bot-herder\') can manipulate simultaneously. The entire purpose of the army is to overwhelm a single target (like a website or server) with requests, known as a DDoS attack.',
        defenseTip: 'Change the default password on all new \'smart\' devices (routers, webcams, smart TVs). Botnet attackers frequently target these devices because users neglect their security.',
        defenseTip2: 'Keep your Operating System (OS) and all applications updated. Botnets often rely on known vulnerabilities in old software to gain initial access.',
        relatedWords: ['Zombie Network', 'Bot Army', 'Compromised Devices'],
        relatedConcepts: [
          {
            name: 'DDoS (Distributed Denial of Service)',
            description: 'The massive attack often launched by a botnet.'
          },
          {
            name: 'IoT (Internet of Things)',
            description: 'The category of devices frequently co-opted into botnets.'
          },
          {
            name: 'Zombie/Bot',
            description: 'The individual infected device within the network.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=F_Yv2y5QcI0',
        videoTitle: 'Botnets Explained Simply'
      },
      {
        name: 'Worm',
        title: 'WORM: THE SELF-REPLICATING INVADER',
        meaning: 'A Worm is a self-replicating type of malware that does not need to attach to an existing program to spread. It uses network connections and vulnerabilities to reproduce itself across systems without any human interaction.',
        example: 'Unlike a traditional virus (which needs a user to open an infected file), a Worm is like an airborne virus. It can pass directly from one unpatched computer to the next through the air (network), causing rapid and widespread epidemics.',
        defenseTip: 'Ensure your Firewall is active. Many worms rely on open network ports and vulnerabilities that the firewall can monitor and block before the worm enters your machine.',
        defenseTip2: 'Be vigilant about critical security patches. Many of the most famous worms (like WannaCry) exploited a single vulnerability that had a patch available.',
        relatedWords: ['Self-Replicating', 'Network Threat', 'Automated Malware'],
        relatedConcepts: [
          {
            name: 'Vulnerability',
            description: 'The flaw in software that a worm exploits to spread.'
          },
          {
            name: 'Virus',
            description: 'Requires a host program to attach to; a worm does not.'
          },
          {
            name: 'Network Segmentation',
            description: 'Dividing a network to slow or prevent a worm\'s spread.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=n8mbzU0X2nQ',
        videoTitle: 'Viruses vs. Worms Explained'
      },
      {
        name: 'Trojan Horse',
        title: 'TROJAN HORSE: THE DECEPTIVE GIFT',
        meaning: 'A Trojan Horse is a type of deceptive malware that disguises itself as legitimate, useful software (like a game, a file cleaner, or a PDF reader) to trick a user into downloading and executing it. Once run, the malicious payload is unleashed.',
        example: 'It\'s a digital version of the ancient Greek trick: a beautiful gift basket (the fake app) delivered to your computer. Once you open it and invite it in, the hidden, malicious soldiers (the malware) jump out and attack your system.',
        defenseTip: 'Only download software from official, verified sources (e.g., the official Microsoft Store, Google Play Store, or App Store). Avoid third-party websites offering \'free\' or \'cracked\' versions of paid software.',
        defenseTip2: 'When installing, carefully review the permissions the application requests. If a simple calculator app asks for access to your camera and contacts, it\'s likely a Trojan.',
        relatedWords: ['Disguised Malware', 'Fake Software', 'Deceptive Program'],
        relatedConcepts: [
          {
            name: 'Malware',
            description: 'The type of software a Trojan often carries.'
          },
          {
            name: 'Backdoor',
            description: 'The secret opening a Trojan often creates for remote access.'
          },
          {
            name: 'Social Engineering',
            description: 'The psychological trick used to convince the victim to run the Trojan.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=PMFbeLcY6Fo',
        videoTitle: 'How a Trojan Horse Attack Works'
      },
      {
        name: 'Ransomware',
        title: 'RANSOMWARE: THE DIGITAL HOSTAGE',
        meaning: 'Ransomware is malicious software that encrypts a victim\'s files, rendering them inaccessible. The attacker then demands a ransom payment (usually in cryptocurrency) in exchange for the decryption key.',
        example: 'It\'s like coming to work and finding all your office cabinets have been fitted with new, unbreakable locks by a thief. The thief demands money to mail you the key. If you don\'t pay, all your files remain locked forever.',
        defenseTip: 'Maintain frequent, offline, segmented backups. If a ransomware attack occurs, you can wipe your system clean and restore your files without paying the ransom.',
        defenseTip2: 'Never open attachments from unknown senders, as Phishing and Smishing are the primary ways ransomware is delivered to your device.',
        relatedWords: ['Encryption Attack', 'Data Hostage', 'Crypto Malware'],
        relatedConcepts: [
          {
            name: 'Encryption',
            description: 'The legitimate tool used maliciously by ransomware.'
          },
          {
            name: 'Backup',
            description: 'The essential defense that neutralizes the ransomware threat.'
          },
          {
            name: 'Cryptocurrency',
            description: 'The preferred, untraceable payment method demanded by attackers.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=MATFMcB6vcE',
        videoTitle: 'Ransomware Explained'
      }
    ]
  },
  {
    id: 6,
    emoji: '🧠',
    title: 'The Mind Zone',
    theme: 'Human Psychology',
    color: 'orange',
    bgGradient: 'from-orange-50 to-yellow-50',
    borderColor: 'border-orange-500',
    icon: FaBrain,
    terms: [
      {
        name: 'Social Engineering',
        title: 'SOCIAL ENGINEERING: THE HUMAN HACK',
        meaning: 'Social Engineering is the use of psychological manipulation to trick people into performing actions or divulging confidential information. It is the art of deception, focusing on the human error rather than the software bug.',
        example: 'A Social Engineer is a digital con artist. They don\'t try to hack the lock (Firewall); they trick the guard (the human user) into opening the door for them. Phishing, Vishing, and Smishing are all delivery methods for social engineering.',
        defenseTip: 'When you feel pressured, curious, or fearful by a message, that is the social engineering trap. Always pause, disconnect, and use a separate method (like a phone call) to verify the source\'s identity.',
        defenseTip2: 'Recognize the four main psychological levers: Authority, Scarcity, Reciprocity, and Fear. If a message uses any of these, consider it highly suspicious.',
        relatedWords: ['Manipulation', 'Psychological Trick', 'Human Hacking'],
        relatedConcepts: [
          {
            name: 'Phishing',
            description: 'The most common delivery method for social engineering.'
          },
          {
            name: 'Authority Bias',
            description: 'The psychological principle that manipulates us.'
          },
          {
            name: 'Human Factor',
            description: 'The acknowledgment that people are the weak link in security.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=lc7scxvKQOo',
        videoTitle: 'Social Engineering: The Human Element'
      },
      {
        name: 'Authority Bias',
        title: 'AUTHORITY BIAS: THE BOSS\'S ORDER',
        meaning: 'The Authority Bias is the psychological tendency to obey or trust figures perceived as being in a position of power (a CEO, a police officer, or a senior IT administrator), even if the request seems illogical or suspicious.',
        example: 'A scammer sends an email disguised as your CEO, urgently demanding you transfer funds or provide passwords. You comply immediately because the order comes from the top, bypassing your usual security checks.',
        defenseTip: 'Never execute high-risk requests (like transferring money or changing passwords) based only on an email or text. Always verify the order by calling the \'authority figure\' back on their known, official phone line.',
        defenseTip2: 'If a \'boss\' contacts you outside of normal work channels (e.g., via a personal cell number you\'ve never used), treat the request as highly suspicious.',
        relatedWords: ['Obedience', 'Power Manipulation', 'Executive Fraud'],
        relatedConcepts: [
          {
            name: 'Whaling',
            description: 'A highly targeted Phishing attack against a high-profile target like a CEO.'
          },
          {
            name: 'Impersonation',
            description: 'The core deceptive act used to leverage Authority Bias.'
          },
          {
            name: 'Executive Fraud',
            description: 'The crime committed using this bias.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=K8-J344u7Wk',
        videoTitle: 'The Psychology of Authority'
      },
      {
        name: 'Reciprocity Trick',
        title: 'RECIPROCITY TRICK: THE OBLIGATION FEELING',
        meaning: 'The Reciprocity Trick is a psychological tactic where an attacker first gives you something perceived as valuable, making you feel an unconscious obligation to return the favor by giving them what they want (usually data or money).',
        example: 'It\'s like receiving a \'free gift\' in the mail (a calendar, a small check, or a free scan). You didn\'t ask for it, but when the scammer calls asking for a small \'donation\' or to \'confirm details,\' you feel obliged to comply because they were \'nice\' first.',
        defenseTip: 'If a request follows an unsolicited \'gift,\' recognize the obligation trap. Politely acknowledge the gift, but forcefully refuse the request for personal information or action.',
        defenseTip2: 'Be highly critical of the \'gift.\' If it is a free, unknown software download, remember the Trojan Horse principle—the gift itself is the trap.',
        relatedWords: ['Obligation', 'Gift Trap', 'Psychological Leverage'],
        relatedConcepts: [
          {
            name: 'Social Engineering',
            description: 'The broader category of psychological hacks.'
          },
          {
            name: 'Con Artist',
            description: 'One who uses manipulation for profit.'
          },
          {
            name: 'Baiting',
            description: 'Offering a tempting gift to entice a user to initiate contact.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=PMFbeLcY6Fo',
        videoTitle: 'The Reciprocity Principle'
      },
      {
        name: 'Scarcity Trap',
        title: 'SCARCITY TRAP: THE LIMITED-TIME OFFER',
        meaning: 'The Scarcity Trap is the psychological tactic of creating a false sense of urgency or limited availability (\'Only 5 minutes left!\') to force a victim to act quickly without time to think, verify, or question the source.',
        example: 'It is the digital equivalent of a clock counting down to zero. The scammer says, \'Your account will be deleted in 10 minutes if you don\'t click this link.\' This panic causes you to ignore all other Phishing red flags.',
        defenseTip: 'If any message contains a countdown, time limit, or extreme consequence (like service deletion or fine), assume it is a scam. Legitimate organizations do not operate this way.',
        defenseTip2: 'If a source truly needs your action, they will have other ways to communicate. Close the email/text and log directly into the official website to check for genuine alerts.',
        relatedWords: ['Urgency', 'Time Pressure', 'FOMO Attack'],
        relatedConcepts: [
          {
            name: 'Urgency',
            description: 'The key emotional state created by the trap.'
          },
          {
            name: 'Emotional Hacking',
            description: 'The use of feelings like fear or excitement to prompt action.'
          },
          {
            name: 'Phishing',
            description: 'The typical delivery method for Scarcity threats.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=5yfbcQw0hLY',
        videoTitle: 'The Scarcity Principle in Psychology'
      },
      {
        name: 'Fear Appeal',
        title: 'FEAR APPEAL: THE ALARMIST THREAT',
        meaning: 'A Fear Appeal is a rhetorical or visual tactic designed to convince the victim that a dire consequence (a virus infection, arrest, or financial ruin) is imminent, unless they take the specific, instructed action immediately.',
        example: 'It\'s the aggressive, full-screen pop-up on your computer that screams, \'WARNING! YOUR COMPUTER IS INFECTED WITH 17 VIRUSES! CLICK HERE TO CLEAN NOW!\' This fear-mongering attempts to make you panic-click the link that installs the malware itself.',
        defenseTip: 'NEVER click buttons on a pop-up warning that appears in your web browser. Legitimate antivirus and operating system warnings do not appear as full-screen browser overlays.',
        defenseTip2: 'If a browser-based Fear Appeal appears, do not interact with the page at all. Force-close your web browser (using Task Manager or a similar method) and then run a scan with your installed Antivirus.',
        relatedWords: ['Scare Tactics', 'Panic Inducement', 'Alarmist Message'],
        relatedConcepts: [
          {
            name: 'Ransomware',
            description: 'Often uses fear to force a victim to pay the ransom.'
          },
          {
            name: 'Scareware',
            description: 'Malware disguised as a security utility or cleaner.'
          },
          {
            name: 'Psychological Hack',
            description: 'The focus of the entire Mind Zone.'
          }
        ],
        videoUrl: 'https://www.youtube.com/watch?v=n8mbzU0X2nQ',
        videoTitle: 'How Fear Manipulates Your Decisions'
      }
    ]
  }
];

export default function CyberGlossary() {
  const router = useRouter();
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);

  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const findZoneBySlug = (slug?: string) => zones.find(z => slugify(z.title) === slug);
  const findTermBySlug = (slug?: string) => {
    for (const z of zones) {
      const t = z.terms.find(term => slugify(term.name) === slug);
      if (t) return { z, t };
    }
    return null;
  };

  useEffect(() => {
    if (!router.isReady) return;
    const { zone, term } = router.query as { zone?: string; term?: string };

    if (zone) {
      const z = findZoneBySlug(Array.isArray(zone) ? zone[0] : zone);
      if (z) setSelectedZone(z);
    }

    if (term) {
      const found = findTermBySlug(Array.isArray(term) ? term[0] : term);
      if (found) {
        setSelectedZone(found.z);
        setSelectedTerm(found.t);
      }
    }
  }, [router.isReady, router.query]);

  const handleZoneClick = (zone: Zone) => {
    setSelectedZone(zone);
    setSelectedTerm(null);
  };

  const handleBackToZones = () => {
    setSelectedZone(null);
    setSelectedTerm(null);
  };

  const handleTermClick = (term: Term) => {
    setSelectedTerm(term);
  };

  const handleBackToTerms = () => {
    setSelectedTerm(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navbar />
      
      <main className="container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              📖 Cyber Glossary
            </span>
          </h1>
          <p className="text-2xl font-bold text-gray-700">
            "Decode cybersecurity — one term at a time."
          </p>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            Understand, not memorize — every term comes with meaning, example, defense tip, and related words.
          </p>
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {!selectedZone ? (
            // Zones Grid
            <motion.div
              key="zones"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
              {zones.map((zone, index) => (
                <motion.div
                  key={zone.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleZoneClick(zone)}
                  className="cursor-pointer"
                >
                  <div className={`bg-gradient-to-br ${zone.bgGradient} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-4 ${zone.borderColor}`}>
                    <div className="p-8">
                      <div className="flex items-center justify-center mb-4">
                        <span className="text-6xl">{zone.emoji}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">
                        {zone.title}
                      </h3>
                      <p className="text-lg text-gray-600 text-center mb-4">
                        {zone.theme}
                      </p>
                      <div className="bg-white/50 rounded-lg px-4 py-2 text-center">
                        <span className="text-sm font-semibold text-gray-700">
                          {zone.terms.length} Terms • Tap to Decode
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : !selectedTerm ? (
            // Terms List
            <motion.div
              key="terms"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="max-w-5xl mx-auto"
            >
              <button
                onClick={handleBackToZones}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 mb-6 transition-colors"
              >
                <FaArrowLeft />
                <span className="font-semibold">Back to Zones</span>
              </button>

              <div className={`bg-gradient-to-br ${selectedZone.bgGradient} rounded-2xl shadow-2xl p-8 mb-8 border-4 ${selectedZone.borderColor}`}>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-6xl">{selectedZone.emoji}</span>
                  <div>
                    <h2 className="text-4xl font-black text-gray-800">{selectedZone.title}</h2>
                    <p className="text-xl text-gray-600">{selectedZone.theme}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {selectedZone.terms.map((term, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleTermClick(term)}
                    className="cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border-2 border-gray-200 hover:border-blue-400"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-gray-800">{term.name}</h3>
                      <span className="text-blue-600 font-semibold">Tap to Learn →</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            // Term Detail
            <motion.div
              key="term-detail"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="max-w-4xl mx-auto"
            >
              <button
                onClick={handleBackToTerms}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 mb-6 transition-colors"
              >
                <FaArrowLeft />
                <span className="font-semibold">Back to {selectedZone.title}</span>
              </button>

              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-blue-500">
                <div className={`bg-gradient-to-r ${selectedZone.bgGradient} p-8 border-b-4 ${selectedZone.borderColor}`}>
                  <div className="flex items-center space-x-4">
                    <span className="text-5xl">{selectedZone.emoji}</span>
                    <div>
                      <h2 className="text-4xl font-black text-gray-800 uppercase">
                        {selectedTerm.title || selectedTerm.name}
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  {/* Section I: Core Definition */}
                  <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                    <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center">
                      <span className="text-2xl mr-2">📘</span>
                      WHAT IT DECODES: Traffic Control
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">{selectedTerm.meaning}</p>
                  </div>

                  {/* Section II: The Analogy */}
                  <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                    <h3 className="text-xl font-bold text-purple-800 mb-3 flex items-center">
                      <span className="text-2xl mr-2">💡</span>
                      THE REAL-WORLD MENTAL MODEL: The Bouncer
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed italic">{selectedTerm.example}</p>
                  </div>

                  {/* Section III: Practical Defense */}
                  <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                    <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center">
                      <span className="text-2xl mr-2">🛡️</span>
                      STAY SECURE: Your 2-Step Checklist
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-sm font-bold text-green-700 mb-2">✓ Actionable Step 1 (The Double-Check):</p>
                        <p className="text-lg text-gray-700 leading-relaxed">{selectedTerm.defenseTip}</p>
                      </div>
                      {selectedTerm.defenseTip2 && (
                        <div className="bg-white rounded-lg p-4">
                          <p className="text-sm font-bold text-green-700 mb-2">✓ Actionable Step 2 (Rule Awareness):</p>
                          <p className="text-lg text-gray-700 leading-relaxed">{selectedTerm.defenseTip2}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Section IV: Vocabulary Builder - Related Concepts */}
                  {selectedTerm.relatedConcepts && selectedTerm.relatedConcepts.length > 0 && (
                    <div className="bg-cyan-50 rounded-xl p-6 border-2 border-cyan-200">
                      <h3 className="text-xl font-bold text-cyan-800 mb-4 flex items-center">
                        <span className="text-2xl mr-2">🔗</span>
                        LEVEL UP YOUR VOCAB: Related Concepts
                      </h3>
                      <div className="space-y-3">
                        {selectedTerm.relatedConcepts.map((concept, idx) => (
                          <div
                            key={idx}
                            className="bg-white rounded-lg p-4 border-l-4 border-cyan-500 hover:shadow-md transition-shadow"
                          >
                            <h4 className="text-lg font-bold text-gray-800 mb-2">{concept.name}</h4>
                            <p className="text-gray-600">{concept.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Section V: Video Deep Dive */}
                  {selectedTerm.videoUrl && selectedTerm.videoTitle && (
                    <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                      <h3 className="text-xl font-bold text-red-800 mb-3 flex items-center">
                        <span className="text-2xl mr-2">▶️</span>
                        VIDEO DEEP DIVE: See It In Action
                      </h3>
                      <p className="text-lg text-gray-700 leading-relaxed mb-4">
                        Want a visual explanation? This highly-rated, beginner-friendly video covers how firewalls monitor traffic, the difference between hardware and software, and their role in network security.
                      </p>
                      <a
                        href={selectedTerm.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-3 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-colors shadow-lg hover:shadow-xl"
                      >
                        <span className="text-2xl">▶️</span>
                        <span>Watch: {selectedTerm.videoTitle}</span>
                      </a>
                    </div>
                  )}

                  {/* Related Words (if no related concepts) */}
                  {(!selectedTerm.relatedConcepts || selectedTerm.relatedConcepts.length === 0) && (
                    <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
                      <h3 className="text-xl font-bold text-yellow-800 mb-3 flex items-center">
                        <span className="text-2xl mr-2">🔗</span>
                        Related terms:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedTerm.relatedWords.map((word, idx) => (
                          <span
                            key={idx}
                            className="bg-yellow-200 text-yellow-900 px-4 py-2 rounded-full font-semibold text-sm"
                          >
                            {word}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
