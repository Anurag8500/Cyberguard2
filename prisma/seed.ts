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
