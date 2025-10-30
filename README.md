# 🛡️ CyberGuard Academy

**Transform cybersecurity education from boring PDFs to an engaging, gamified learning experience.**

---

## 🎯 Project Overview

CyberGuard Academy is an interactive cybersecurity awareness platform that makes digital safety accessible and fun for students and internet users through:

- **Interactive story-based learning modules**
- **Gamified progress tracking with badges and rewards**
- **Real-world scenario simulations**
- **Multi-language support** (Hindi, Bengali, English, etc.)
- **Mobile-friendly** design

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- SMTP email service (Gmail, SendGrid, etc.)

### Installation

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**

Copy `.env.example` to `.env` and configure:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/cyberguard"
JWT_SECRET="your-secret-key"
EMAIL_HOST="smtp.gmail.com"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
```

3. **Initialize database:**

```bash
npx prisma db push
npx prisma db seed # (Optional: seed initial data)
```

4. **Run development server:**

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 📁 Project Structure

```
cyberguard-academy/
├── pages/
│   ├── api/          # API routes
│   │   ├── auth/     # Authentication endpoints
│   │   ├── modules/  # Learning modules
│   │   └── user/     # User management
│   ├── auth/         # Auth pages (login, signup)
│   ├── dashboard/    # User dashboard
│   ├── modules/      # Learning module pages
│   └── index.tsx     # Landing page
├── components/
│   ├── auth/         # Auth components
│   ├── modules/      # Module components
│   ├── gamification/ # Badges, XP, achievements
│   └── shared/       # Reusable components
├── lib/
│   ├── db.ts         # Prisma client
│   ├── auth.ts       # Auth utilities
│   ├── email.ts      # Email service
│   └── validation.ts # Zod schemas
├── prisma/
│   └── schema.prisma # Database schema
└── styles/
    └── globals.css   # Global styles
```

---

## 🔐 Authentication Flow

### Sign Up
- User provides: name, email, password, role, language preference
- Password strength validation (8+ chars, upper/lower/numbers/special)
- Account creation with hashed password (bcrypt)
- Automatic session creation
- JWT token returned

### Login
- Email + password authentication
- Rate limiting: max 5 attempts per 15 minutes
- Account lockout after 5 failed attempts
- Streak tracking (consecutive daily logins)
- Session management with JWT

### Password Reset
1. User requests reset with email
2. 6-digit OTP sent via email (valid 15 minutes)
3. User enters OTP + new password
4. All sessions invalidated (force re-login)

---

## 📚 Learning Modules

### Module 1: Password Fortress

**Topics Covered:**
- Strong password creation
- Password reuse dangers
- Two-factor authentication
- Password managers
- Security questions

**Interactive Scenarios:**
1. Password Creation Challenge
2. Password Reuse Trap
3. Security Question Weakness
4. 2FA Setup Tutorial
5. Password Manager Introduction

**Mini-Games:**
- Crack the Code (attacker perspective)
- Password Strength Battle
- Memory Test (mnemonic techniques)

**Assessment:** 80% required to pass

**Rewards:** 150 XP + "Password Guardian" badge

### Module 2: Safe Online Shopping

**Topics Covered:**
- Identifying fake e-commerce sites
- Secure payment gateways
- Fake reviews detection
- Deal verification
- Safe peer-to-peer transactions

**Interactive Scenarios:**
1. Too Good To Be True Deals
2. Fake Payment Gateways
3. Unsecure Checkout Detection
4. Fake Reviews Analysis
5. Counterfeit Product Identification
6. Advance Payment Scams
7. COD Safety Guidelines

**Interactive Tools:**
- Website Scanner
- Price Comparison Tool
- Review Analyzer

**Assessment:** Multi-part evaluation with 80% passing

**Rewards:** 150 XP + "Smart Shopper" badge

---

## 🎮 Gamification System

### Experience Points (XP)
- Complete modules: 100-200 XP
- Daily challenges: 25-50 XP
- Perfect scores: +50 bonus XP
- Help others: 10 XP per answer
- Daily login: 5 XP

### Levels
- Level 1-10: Cyber Novice
- Level 11-25: Digital Defender
- Level 26-40: Security Guardian
- Level 41-50: Cyber Master

### Badges
- **Module Completion:** Password Guardian, Smart Shopper, etc.
- **Streak Badges:** 7-Day Streak, 30-Day Streak, 100-Day Streak
- **Achievement Badges:** Perfect Score, Early Bird, Night Owl
- **Helper Badges:** Helper Hero (50+ community answers)
- **Cultural Badges:** Diwali Safety Champion, etc.

### Daily Challenges
- Short 2-3 minute scenarios
- Random cybersecurity topics
- Bonus XP for completion
- Streak contribution

### Leaderboards
- Weekly rankings
- Monthly rankings
- All-time rankings
- Regional leaderboards
- Privacy controls (opt-in/opt-out)

---

## 🌍 Multilingual Support

**Supported Languages:**
- English (default)
- Hindi (हिन्दी)
- Bengali (বাংলা)
- More coming soon...

Language can be selected during signup and changed in user settings.

---

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with OTP

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `GET /api/user/progress` - Get learning progress
- `GET /api/user/badges` - Get earned badges
- `GET /api/user/achievements` - Get achievements

### Modules
- `GET /api/modules` - List all modules
- `GET /api/modules/[id]` - Get module details
- `POST /api/modules/[id]/start` - Start module
- `POST /api/modules/[id]/complete` - Complete scenario
- `POST /api/modules/[id]/assess` - Submit assessment

### Gamification
- `GET /api/gamification/leaderboard` - Get rankings
- `GET /api/gamification/daily-challenge` - Get today's challenge
- `POST /api/gamification/daily-challenge` - Complete challenge

---

## 🔒 Security Features

### Password Security
- Bcrypt hashing (12 rounds)
- Strength validation
- No plain-text storage
- Secure password reset flow

### Session Management
- JWT-based authentication
- 7-day session expiry
- Secure HTTP-only cookies
- Token blacklisting on logout

### Rate Limiting
- Login attempts: 5 per 15 minutes
- Account lockout mechanism
- CAPTCHA integration ready

### Data Protection
- Input validation (Zod schemas)
- SQL injection prevention (Prisma ORM)
- XSS protection
- CSRF tokens (Next.js built-in)

---

## 🎨 Design System

### Colors
- Primary Blue: `#2563eb`
- Cyber Blue: `#00d4ff`
- Cyber Purple: `#b537f2`
- Cyber Green: `#39ff14`
- Dark: `#0a0e27`

### Animations
- Float animation for hero elements
- Shield pulse for security icons
- Fade-in for page transitions
- Progress bar animations

### Components
- Buttons: `.btn-primary`, `.btn-secondary`
- Inputs: `.input-field`
- Cards: `.card`
- Badges: `.badge`
- Progress bars: `.progress-bar`

---

## 📱 Responsive Design

- **Mobile:** 320px - 767px
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px+

All pages and modules fully responsive and touch-friendly.

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

---

## 📦 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Docker

```bash
# Build image
docker build -t cyberguard-academy .

# Run container
docker run -p 3000:3000 cyberguard-academy
```

### Environment Variables for Production

Ensure all variables in `.env.example` are set in your deployment platform.

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 👥 Team

Built with ❤️ for making the internet safer for everyone.

---

## 🆘 Support

For issues and questions:
- GitHub Issues: [Create an issue]
- Email: support@cyberguard.academy
- Documentation: [Full docs]

---

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Authentication system
- ✅ Module 1: Password Fortress
- ✅ Module 2: Safe Online Shopping
- ✅ Gamification basics

### Phase 2 (Next)
- Module 3: Social Engineering Defense
- Module 4: Safe Social Media
- Module 5: Device Security
- Community forum

### Phase 3 (Future)
- Mobile app (React Native)
- AI-powered personalized learning
- Corporate training packages
- Certification programs

---

## 📊 Statistics

- **2 Complete Learning Modules**
- **15+ Interactive Scenarios**
- **Comprehensive Gamification**
- **3 Language Support**
- **Mobile-First Design**

---

**Made with 🛡️ by the CyberGuard Academy Team**
"# Cyberguard1" 
