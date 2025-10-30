import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create Modules
  const module1 = await prisma.module.upsert({
    where: { slug: 'password-fortress' },
    update: {},
    create: {
      slug: 'password-fortress',
      title: 'Password Fortress',
      description: 'Master password security through interactive challenges. Create unbreakable passwords, enable 2FA, and protect your accounts.',
      order: 1,
      xpReward: 150,
      icon: '🔐',
      isPublished: true,
    },
  })

  const module2 = await prisma.module.upsert({
    where: { slug: 'safe-online-shopping' },
    update: {},
    create: {
      slug: 'safe-online-shopping',
      title: 'Safe Online Shopping',
      description: 'Spot fake websites, identify scams, and shop safely. Learn to detect phishing, verify payment gateways, and avoid fraud.',
      order: 2,
      xpReward: 150,
      icon: '🛒',
      isPublished: true,
    },
  })

  console.log('✅ Modules created')

  // Create Badges
  const badges = [
    {
      slug: 'password-guardian',
      name: 'Password Guardian',
      description: 'Completed Password Fortress module',
      icon: '🛡️',
      category: 'MODULE_COMPLETION' as const,
      rarity: 'COMMON' as const,
    },
    {
      slug: 'smart-shopper',
      name: 'Smart Shopper',
      description: 'Completed Safe Online Shopping module',
      icon: '🛍️',
      category: 'MODULE_COMPLETION' as const,
      rarity: 'COMMON' as const,
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

  // Create Scenarios for Module 1: Password Fortress
  const module1Scenarios = [
    {
      moduleId: module1.id,
      title: 'Welcome to Password Security',
      description: 'Learn the basics of password security',
      order: 1,
      type: 'STORY' as const,
      content: {
        story: 'Meet Alex, a college student who just created accounts on multiple websites using the same password: "password123". Let\'s learn why this is dangerous and how to create strong, unique passwords.',
        learningPoints: [
          'Why password reuse is dangerous',
          'Common password attacks',
          'Principles of strong passwords',
        ],
      },
    },
    {
      moduleId: module1.id,
      title: 'Password Strength Checker',
      description: 'Learn to identify weak passwords',
      order: 2,
      type: 'INTERACTIVE' as const,
      content: {
        type: 'password_analysis',
        passwords: [
          { text: 'password123', strength: 'weak', issues: ['Common word', 'Too simple', 'No special characters'] },
          { text: 'P@ssw0rd!', strength: 'medium', issues: ['Common pattern', 'Predictable substitutions'] },
          { text: 'Tr0ub4dor&3', strength: 'strong', issues: [] },
          { text: 'correct-horse-battery-staple', strength: 'very strong', issues: [] },
        ],
      },
    },
    {
      moduleId: module1.id,
      title: 'Create Your Strong Password',
      description: 'Practice creating strong passwords',
      order: 3,
      type: 'MINI_GAME' as const,
      content: {
        type: 'password_creator',
        requirements: {
          minLength: 12,
          requireUppercase: true,
          requireLowercase: true,
          requireNumbers: true,
          requireSpecialChars: true,
        },
        hints: [
          'Use a passphrase (e.g., "Coffee-Sunrise-Mountain-42!")',
          'Mix random words with numbers and symbols',
          'Avoid personal information',
        ],
      },
    },
    {
      moduleId: module1.id,
      title: 'Two-Factor Authentication',
      description: 'Learn about 2FA and why it matters',
      order: 4,
      type: 'STORY' as const,
      content: {
        story: 'Even with a strong password, accounts can be compromised. Two-Factor Authentication (2FA) adds an extra layer of security.',
        learningPoints: [
          'What is 2FA',
          'Types of 2FA (SMS, authenticator apps, hardware keys)',
          'When to use 2FA',
        ],
      },
    },
    {
      moduleId: module1.id,
      title: 'Final Assessment',
      description: 'Test your password security knowledge',
      order: 5,
      type: 'ASSESSMENT' as const,
      content: {
        questions: [
          {
            question: 'Which password is the strongest?',
            options: ['password123', 'P@ssw0rd', 'MyDog123!', 'Tr0ub4dor&3-Xkcd-2024'],
            correct: 3,
            explanation: 'Longer passwords with random elements are stronger than short, predictable ones.',
          },
          {
            question: 'Is it safe to reuse passwords across different websites?',
            options: ['Yes, if the password is strong', 'No, never', 'Only for unimportant sites', 'Yes, with 2FA enabled'],
            correct: 1,
            explanation: 'Password reuse is dangerous because if one site is breached, all your accounts are at risk.',
          },
          {
            question: 'What is the best type of 2FA?',
            options: ['SMS codes', 'Email codes', 'Authenticator app', 'Security question'],
            correct: 2,
            explanation: 'Authenticator apps are more secure than SMS as they cannot be intercepted.',
          },
        ],
      },
    },
  ]

  for (const scenario of module1Scenarios) {
    await prisma.scenario.create({
      data: scenario,
    })
  }

  console.log('✅ Module 1 scenarios created')

  // Create Scenarios for Module 2: Safe Online Shopping
  const module2Scenarios = [
    {
      moduleId: module2.id,
      title: 'The Fake Website Trap',
      description: 'Learn to identify fake shopping websites',
      order: 1,
      type: 'STORY' as const,
      content: {
        story: 'Sarah found an amazing deal on a designer handbag for 80% off. But is the website legitimate? Let\'s learn the warning signs.',
        learningPoints: [
          'Checking website URLs carefully',
          'Looking for HTTPS and padlock icons',
          'Identifying too-good-to-be-true deals',
        ],
      },
    },
    {
      moduleId: module2.id,
      title: 'Spot the Fake Store',
      description: 'Interactive game to identify fake websites',
      order: 2,
      type: 'MINI_GAME' as const,
      content: {
        type: 'website_comparison',
        websites: [
          {
            url: 'https://www.amazon.com',
            isLegit: true,
            reasons: ['Official domain', 'HTTPS secure', 'Verified badge'],
          },
          {
            url: 'http://amazn-deals.net',
            isLegit: false,
            reasons: ['Misspelled domain', 'No HTTPS', 'Suspicious subdomain'],
          },
        ],
      },
    },
    {
      moduleId: module2.id,
      title: 'Payment Gateway Security',
      description: 'Learn to verify secure payment methods',
      order: 3,
      type: 'INTERACTIVE' as const,
      content: {
        type: 'payment_analysis',
        scenarios: [
          {
            method: 'Credit card on HTTPS site',
            safe: true,
            explanation: 'Credit cards offer fraud protection and HTTPS encrypts data',
          },
          {
            method: 'Wire transfer to unknown seller',
            safe: false,
            explanation: 'Wire transfers are irreversible and offer no buyer protection',
          },
        ],
      },
    },
    {
      moduleId: module2.id,
      title: 'Reading Reviews & Red Flags',
      description: 'Learn to spot fake reviews',
      order: 4,
      type: 'STORY' as const,
      content: {
        story: 'Not all 5-star reviews are genuine. Learn to identify fake reviews and red flags.',
        learningPoints: [
          'Spotting generic or overly positive reviews',
          'Checking review dates and patterns',
          'Looking for verified purchase badges',
        ],
      },
    },
    {
      moduleId: module2.id,
      title: 'Final Shopping Safety Quiz',
      description: 'Test your online shopping safety knowledge',
      order: 5,
      type: 'ASSESSMENT' as const,
      content: {
        questions: [
          {
            question: 'What should you check first when visiting a shopping website?',
            options: ['Product reviews', 'HTTPS and valid domain', 'Shipping costs', 'Return policy'],
            correct: 1,
            explanation: 'Always verify the website is legitimate before entering any information.',
          },
          {
            question: 'Which payment method offers the most buyer protection?',
            options: ['Wire transfer', 'Credit card', 'Cash on delivery', 'Cryptocurrency'],
            correct: 1,
            explanation: 'Credit cards offer fraud protection and allow chargebacks for unauthorized transactions.',
          },
          {
            question: 'A deal seems too good to be true. What should you do?',
            options: ['Buy immediately before it ends', 'Research the seller and reviews', 'Share with friends', 'Enter your card details'],
            correct: 1,
            explanation: 'If a deal seems too good to be true, it probably is. Always research before purchasing.',
          },
        ],
      },
    },
  ]

  for (const scenario of module2Scenarios) {
    await prisma.scenario.create({
      data: scenario,
    })
  }

  console.log('✅ Module 2 scenarios created')
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
