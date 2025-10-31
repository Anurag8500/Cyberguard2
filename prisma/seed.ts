import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Delete old modules and related data
  await prisma.scenario.deleteMany({})
  await prisma.moduleProgress.deleteMany({})
  await prisma.module.deleteMany({})
  console.log('🗑️ Old modules deleted')

  // Create Module -1: Password Island
  const passwordIsland = await prisma.module.upsert({
    where: { slug: 'password-island' },
    update: {},
    create: {
      slug: 'password-island',
      title: 'Password Island',
      description: 'Learn what makes a password weak or strong through fast, fun, and hands-on challenges. Understand password patterns, why hackers love them, and how to outsmart them.',
      order: -1,
      xpReward: 100,
      icon: '🏝️',
      isPublished: true,
    },
  })

  console.log('✅ Password Island module created')

  // Create Module 2: Phishing Forest
  const phishingForest = await prisma.module.upsert({
    where: { slug: 'phishing-forest' },
    update: {},
    create: {
      slug: 'phishing-forest',
      title: 'Phishing Forest',
      description: 'Learn to detect malicious links and identify safe vs suspicious URLs by observing patterns and hidden tricks.',
      order: 2,
      xpReward: 420,
      icon: '🌲',
      isPublished: true,
    },
  })

  console.log('✅ Phishing Forest module created')

  // Create Badges
  const badges = [
    {
      slug: 'password-apprentice',
      name: 'Password Apprentice',
      description: 'Completed Password Basics 101',
      icon: '🎓',
      category: 'MODULE_COMPLETION' as const,
      rarity: 'COMMON' as const,
    },
    {
      slug: 'password-island-master',
      name: 'Password Island Master',
      description: 'Completed all Password Island modules',
      icon: '🏝️',
      category: 'MODULE_COMPLETION' as const,
      rarity: 'RARE' as const,
    },
    {
      slug: 'first-steps',
      name: 'First Steps',
      description: 'Completed your first module',
      icon: '👣',
      category: 'ACHIEVEMENT' as const,
      rarity: 'COMMON' as const,
    },
    {
      slug: 'week-warrior',
      name: 'Week Warrior',
      description: '7-day login streak',
      icon: '⚡',
      category: 'STREAK' as const,
      rarity: 'RARE' as const,
    },
    {
      slug: 'month-master',
      name: 'Month Master',
      description: '30-day login streak',
      icon: '🔥',
      category: 'STREAK' as const,
      rarity: 'EPIC' as const,
    },
    {
      slug: 'link-decoder',
      name: 'Link Decoder',
      description: 'You now see what lies beneath every link!',
      icon: '🔗',
      category: 'MODULE_COMPLETION' as const,
      rarity: 'COMMON' as const,
    },
  ]

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { slug: badge.slug },
      update: {},
      create: badge,
    })
  }

  console.log('✅ Badges created')

  // Create Achievements
  const achievements = [
    {
      slug: 'quick-learner',
      name: 'Quick Learner',
      description: 'Complete a module in under 30 minutes',
      icon: '⚡',
      xpReward: 50,
      requirement: { type: 'module_completion_time', value: 1800 },
    },
    {
      slug: 'perfect-score',
      name: 'Perfect Score',
      description: 'Score 100% on any module',
      icon: '💯',
      xpReward: 100,
      requirement: { type: 'module_score', value: 100 },
    },
    {
      slug: 'dedicated-learner',
      name: 'Dedicated Learner',
      description: 'Complete 5 modules',
      icon: '📚',
      xpReward: 200,
      requirement: { type: 'modules_completed', value: 5 },
    },
  ]

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { slug: achievement.slug },
      update: {},
      create: achievement,
    })
  }

  console.log('✅ Achievements created')

  // Create Scenarios for Password Island - Submodule 1: Password Basics 101
  const passwordIslandScenarios = [
    // Scenario 1: The Gate's Challenge
    {
      moduleId: passwordIsland.id,
      title: 'The Gate\'s Challenge',
      description: 'You arrive at the Island Gate. A glowing panel asks you to set a password to enter.',
      order: 1,
      type: 'INTERACTIVE' as const,
      content: {
        type: 'password_challenge',
        theme: 'The Gate of Guessers',
        instructions: 'Tap on the password that would take the longest to crack.',
        hint: 'Think: longer, random, mixed case, symbols.',
        passwords: [
          {
            text: '123456',
            crackTime: '0.2 seconds',
            crackTimeSeconds: 0.2,
            emoji: '⚡',
            isCorrect: false,
            explanation: 'Simple numeric sequences are cracked instantly by brute-force tools.',
          },
          {
            text: 'P@ssw0rd',
            crackTime: '3 hours',
            crackTimeSeconds: 10800,
            emoji: '⚠️',
            isCorrect: false,
            explanation: 'Common words with predictable substitutions are still weak.',
          },
          {
            text: 'MyDog2020!',
            crackTime: '1 month',
            crackTimeSeconds: 2592000,
            emoji: '💪',
            isCorrect: false,
            explanation: 'Personal information is predictable. Better, but hackers can guess this.',
          },
          {
            text: 'G!x@82qL#n',
            crackTime: '100+ years',
            crackTimeSeconds: 3153600000,
            emoji: '🔐',
            isCorrect: true,
            explanation: 'Random characters with mixed case, numbers, and symbols create an uncrackable fortress!',
          },
        ],
        miniInsight: 'Hackers use brute-force tools that try every possible combo. The longer and more random your password, the harder it is to crack.',
        videoLink: {
          title: 'How Hackers Crack Your Passwords',
          url: 'https://www.youtube.com/watch?v=7U-RbOKanYs',
          source: 'Computerphile',
        },
      },
    },
    // Scenario 2: The Password Lab
    {
      moduleId: passwordIsland.id,
      title: 'The Password Lab',
      description: 'The lab console gives feedback live as you type.',
      order: 2,
      type: 'MINI_GAME' as const,
      content: {
        type: 'password_creator',
        theme: 'INTERACTIVE PLAY',
        instructions: 'Create a sample password — system reacts in real time.',
        goal: 'Get at least one password rated "Fortified."',
        tip: 'Try 12+ chars with upper, lower, numbers, and symbols.',
        strengthLevels: [
          {
            level: 'weak',
            color: 'red',
            emoji: '🔴',
            feedback: 'Add more characters',
            minScore: 0,
          },
          {
            level: 'medium',
            color: 'orange',
            emoji: '🟠',
            feedback: 'Add symbols or numbers',
            minScore: 30,
          },
          {
            level: 'strong',
            color: 'green',
            emoji: '🟢',
            feedback: 'Nice! Mix cases + symbols!',
            minScore: 60,
          },
          {
            level: 'fortified',
            color: 'purple',
            emoji: '🟣',
            feedback: 'Uncrackable Fortress!',
            minScore: 85,
          },
        ],
        requirements: {
          minLength: 12,
          requireUppercase: true,
          requireLowercase: true,
          requireNumbers: true,
          requireSpecialChars: true,
        },
        learningNuggets: [
          'Never reuse the same password across sites.',
          'Avoid birthdays, names, pets.',
          'Use passphrases instead of passwords.',
          'Use a password manager for safety.',
          'Enable 2FA whenever possible.',
        ],
        referenceLink: {
          title: 'How to Create Strong Passwords',
          url: 'https://safety.google/authentication/',
          source: 'Google Safety Center',
        },
      },
    },
    // Scenario 3: The Gatekeeper's Quiz
    {
      moduleId: passwordIsland.id,
      title: 'The Gatekeeper\'s Quiz',
      description: 'Earn your "Password Apprentice" badge',
      order: 3,
      type: 'ASSESSMENT' as const,
      content: {
        theme: 'FINAL CHALLENGE',
        format: 'MCQ (mix of logic & real-life mini-scenarios)',
        badge: {
          name: 'Password Apprentice',
          icon: '🎓',
          xp: 100,
        },
        questions: [
          {
            question: 'You create Sattwik123. It\'s easy to remember. Why is it weak?',
            options: [
              'It uses letters',
              'It includes your name',
              'It\'s too long',
              'It uses numbers',
            ],
            correct: 1,
            hint: 'Personal info = predictable pattern.',
            explanation: 'Passwords containing personal information like names are easily guessed by hackers who can find this information on social media.',
          },
          {
            question: 'You\'re told to make a password that lasts 100 years. Which is best?',
            options: [
              'mypassword',
              'SuperStrongPassword123!',
              'X7$!vB9@l2T#',
              'Mybirthday@1999',
            ],
            correct: 2,
            hint: 'Random and complex = uncrackable.',
            explanation: 'Completely random combinations of uppercase, lowercase, numbers, and symbols are the hardest to crack.',
          },
          {
            question: 'Your password was leaked in a breach. What should you do first?',
            options: [
              'Ignore it',
              'Change only if you get hacked',
              'Change that password immediately',
              'Complain on social media',
            ],
            correct: 2,
            hint: 'Act fast to prevent account takeover.',
            explanation: 'Change your password immediately and enable 2FA. Also change it on any other sites where you used the same password.',
            referenceLink: {
              title: 'Have I Been Pwned? – Check Leaks',
              url: 'https://haveibeenpwned.com/',
            },
          },
          {
            question: 'Which combination is safest?',
            options: [
              '8 lowercase letters',
              '12 uppercase letters',
              '16 characters mixed types',
              '10 numbers',
            ],
            correct: 2,
            hint: 'More length + variety = stronger.',
            explanation: 'Length combined with character variety (upper, lower, numbers, symbols) creates exponentially more possible combinations.',
          },
          {
            question: 'If you forget passwords often, what\'s the best approach?',
            options: [
              'Write in notebook',
              'Save in phone notes',
              'Use a password manager',
              'Ask a friend to remember',
            ],
            correct: 2,
            hint: 'Secure storage = password manager.',
            explanation: 'Password managers securely encrypt and store all your passwords, requiring you to remember only one master password.',
            referenceLink: {
              title: 'What is a Password Manager?',
              url: 'https://www.youtube.com/watch?v=Q0GeMSFGIgI',
              source: 'Techquickie',
            },
          },
        ],
      },
    },
  ]

  for (const scenario of passwordIslandScenarios) {
    await prisma.scenario.create({
      data: scenario,
    })
  }

  console.log('✅ Password Island - Submodule 1 scenarios created')

  // Create Scenarios for Phishing Forest - Submodule 1: Link Decoder
  const phishingForestScenarios = [
    // Scenario 1: The Hover Test
    {
      moduleId: phishingForest.id,
      title: '🔍 The Hover Test',
      description: 'Learn to preview links before clicking',
      order: 1,
      type: 'INTERACTIVE' as const,
      content: {
        scenario: 1,
        theme: 'The Hover Test',
        situation: 'Before clicking, hover (or long-press) to preview the real link destination.',
        message: 'Congrats! You\'ve won an iPhone 15! Claim your prize now:',
        realLink: 'http://fake-apple.gifts.ru/login.php',
        task: 'Question: What do you do?',
        options: [
          { text: 'Click and claim the gift', isCorrect: false, explanation: 'Never click suspicious links!' },
          { text: 'Report and delete', isCorrect: true, explanation: 'Correct! Always verify before clicking.' },
          { text: 'Forward to friends', isCorrect: false, explanation: 'Don\'t spread potential threats!' },
          { text: 'Bookmark it for later', isCorrect: false, explanation: 'This is still unsafe!' },
        ],
        tip: 'Good! Always hover before clicking — the real URL never lies.',
        xpReward: 50,
      },
    },
    // Scenario 2: Link Match Challenge
    {
      moduleId: phishingForest.id,
      title: '🔗 Link Match Challenge',
      description: 'Identify safe and suspicious URLs',
      order: 2,
      type: 'INTERACTIVE' as const,
      content: {
        scenario: 2,
        theme: 'Link Match Challenge',
        task: 'You see these links — mark which are safe or suspicious 👇',
        links: [
          { url: 'https://accounts.google.com/security', isSafe: true, reason: 'Official Google domain' },
          { url: 'http://google.security-login.net', isSafe: false, reason: 'Extra words after real name' },
          { url: 'https://www.sbi.co.in/securebanking', isSafe: true, reason: 'Verified .co.in domain' },
          { url: 'https://sbi-login-support.cc', isSafe: false, reason: 'Fake "support" site' },
          { url: 'https://paypal.com.verify-account.org', isSafe: false, reason: 'Misleading subdomain' },
        ],
        tip: 'Always read domains right-to-left — real domain sits just before .com or .in.',
        xpReward: 80,
      },
    },
    // Scenario 3: Sneaky Short Links
    {
      moduleId: phishingForest.id,
      title: '⚠️ Sneaky Short Links',
      description: 'Learn to handle shortened URLs safely',
      order: 3,
      type: 'INTERACTIVE' as const,
      content: {
        scenario: 3,
        theme: 'Sneaky Short Links',
        situation: 'You receive a WhatsApp message:',
        message: 'Your courier is pending. Track here 👉 bit.ly/xyzTrackNow',
        task: 'What\'s your first move?',
        options: [
          { text: 'Click directly', isCorrect: false, explanation: 'Never click shortened links blindly!' },
          { text: 'Expand short link using a URL checker', isCorrect: true, explanation: 'Perfect! Always preview shortened URLs.' },
          { text: 'Forward to courier service', isCorrect: false, explanation: 'Don\'t forward suspicious links!' },
          { text: 'Ignore', isCorrect: false, explanation: 'Better to verify and report if it\'s a scam.' },
        ],
        tip: 'Correct! Use sites like checkshorturl.com to preview shortened links.',
        xpReward: 40,
      },
    },
    // Scenario 4: Final Quiz - Decode the Web
    {
      moduleId: phishingForest.id,
      title: '🎯 Final Quiz - Decode the Web',
      description: 'Test your phishing detection skills',
      order: 4,
      type: 'ASSESSMENT' as const,
      content: {
        title: 'Decode the Web',
        questions: [
          {
            question: 'Which domain is real?',
            options: [
              'google.support-login.net',
              'accounts.google.com',
              'google.loginapp.org',
              'googlefree.com',
            ],
            correctAnswer: 1,
            explanation: 'The real Google domain is accounts.google.com. The others add extra words or use suspicious TLDs.',
          },
          {
            question: 'What\'s the first step before clicking a link?',
            options: [
              'Hover to preview',
              'Trust your instinct',
              'Screenshot it',
              'Click immediately',
            ],
            correctAnswer: 0,
            explanation: 'Hovering reveals the real destination URL before you click, helping you avoid phishing sites.',
          },
          {
            question: 'Which domain is suspicious?',
            options: [
              'https://paytm.com/secure',
              'https://secure-paytm-payment.cc',
              'https://www.paytm.in',
              'https://paytm.com/settings',
            ],
            correctAnswer: 1,
            explanation: '".cc" domains and extra hyphens often indicate fake sites. Real Paytm uses .com or .in.',
          },
          {
            question: 'Why are shortened links risky?',
            options: [
              'Hide full destination',
              'Faster loading',
              'Look cleaner',
              'Safer to use',
            ],
            correctAnswer: 0,
            explanation: 'Shortened links (like bit.ly) hide the real URL, making it easy for attackers to disguise malicious sites.',
          },
          {
            question: 'What\'s a good defense against link scams?',
            options: [
              'Use URL preview tools',
              'Disable browser',
              'Click from messages',
              'Guess if safe',
            ],
            correctAnswer: 0,
            explanation: 'URL preview tools and link checkers help you see the real destination before clicking.',
          },
        ],
        totalXP: 250,
        badge: {
          name: 'Link Decoder',
          icon: '🔗',
          description: 'You now see what lies beneath every link!',
        },
      },
    },
  ]

  for (const scenario of phishingForestScenarios) {
    await prisma.scenario.create({
      data: scenario,
    })
  }

  console.log('✅ Phishing Forest - Submodule 1 scenarios created')
  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
