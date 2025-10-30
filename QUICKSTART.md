# 🚀 Quick Start Guide - CyberGuard Academy

## Prerequisites Check ✓
- [x] Node.js 18+ installed
- [x] PostgreSQL running
- [x] Database `cyberguard` created
- [x] User `appuser` with password set

## 5-Minute Setup

### 1. Environment Already Configured ✓
Your `.env` file is ready:
```env
DATABASE_URL="postgresql://appuser:Lokenath123@localhost:5432/cyberguard?schema=public"
JWT_SECRET="Kx7mN9pQ2wR5vY8zA3bC6eF1gH4jL0nP"
JWT_EXPIRES_IN="7d"
NODE_ENV="development"
```

### 2. Database Already Set Up ✓
- ✓ Schema pushed to database
- ✓ Database seeded with content

### 3. Development Server Running ✓
The server is already running in a separate window!
- Access at: **http://localhost:3000**

## 🎯 Test the Application

### Step 1: Visit Landing Page
Open your browser and go to:
```
http://localhost:3000
```

You should see the CyberGuard Academy landing page with:
- Hero section with animated shield
- Feature cards
- Module previews

### Step 2: Create an Account
1. Click "Get Started Free" or "Sign Up"
2. Fill in the form:
   - Full Name: Your Name
   - Email: test@example.com
   - Password: Choose a strong password (8+ chars, uppercase, lowercase, number, special char)
   - Confirm Password
   - Role: Student/Professional/General User
   - Language: English/Hindi/Bengali

3. Click "Create Account"

### Step 3: Explore Dashboard
After signup, you'll be redirected to the dashboard showing:
- Welcome message with your name
- Progress cards (Streak, XP, Modules, Badges)
- Available learning modules

### Step 4: Complete a Module
1. Click on "Password Fortress" module card
2. Go through 5 scenarios:
   - Read the story
   - Interact with password checker
   - Learn about 2FA
   - Complete the quiz
3. Submit assessment
4. See confetti celebration! 🎉
5. Earn 150 XP + Badge

### Step 5: Check Your Profile
1. Click your name in the navbar → "Profile"
2. See your earned badges
3. View achievement progress

### Step 6: Update Settings
1. Click settings icon in navbar
2. Change your language
3. Update your full name
4. Save changes

## 📊 What's Available

### Learning Modules (Seeded & Ready)
1. **Password Fortress** 🔐
   - 5 scenarios
   - Interactive password analysis
   - Quiz with explanations
   - Reward: 150 XP + Password Guardian badge

2. **Safe Online Shopping** 🛒
   - 5 scenarios
   - Website legitimacy checker
   - Payment security education
   - Reward: 150 XP + Smart Shopper badge

### Gamification Features
- XP system (500 XP per level)
- 5 Badges to earn
- 3 Achievements to unlock
- Streak tracking
- Progress monitoring

## 🔑 Test Credentials (After Signup)
Create your own account or use:
- Email: Any valid email
- Password: Must meet strength requirements

## 🛠️ Development Commands

### If you need to restart:
```bash
# Stop the dev server (Ctrl+C in the terminal)
npm run dev
```

### Database operations:
```bash
# View database in Prisma Studio
npm run db:studio

# Re-seed database (if needed)
npm run db:seed

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
npm run db:seed
```

### Check database:
```bash
# Connect to PostgreSQL
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres

# List databases
\l

# Connect to cyberguard
\c cyberguard

# List tables
\dt

# Check modules
SELECT * FROM "Module";

# Exit
\q
```

## 🎮 User Journey Flow

```
Landing Page (/)
    ↓
Sign Up (/auth/signup)
    ↓
Dashboard (/dashboard)
    ↓
Module: Password Fortress (/modules/password-fortress)
    ↓ (Complete 5 scenarios)
Module Completed! (Confetti 🎉)
    ↓
Dashboard (Updated XP & Badges)
    ↓
Module: Safe Online Shopping (/modules/safe-online-shopping)
    ↓ (Complete 5 scenarios)
Module Completed! (More XP & Badges)
    ↓
Profile (/profile) - View all badges
    ↓
Settings (/settings) - Customize preferences
```

## 📱 Pages Available

- `/` - Landing page
- `/auth/signup` - Sign up
- `/auth/login` - Login
- `/dashboard` - User dashboard
- `/modules/password-fortress` - Module 1
- `/modules/safe-online-shopping` - Module 2
- `/profile` - User profile
- `/settings` - User settings

## 🐛 Troubleshooting

### Port 3000 already in use?
```bash
# Find and kill the process
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Or use a different port
npm run dev -- -p 3001
```

### Database connection error?
1. Check PostgreSQL is running:
   ```bash
   Get-Service | Where-Object {$_.Name -like "*postgres*"}
   ```

2. Verify credentials in `.env`

3. Test connection:
   ```bash
   & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U appuser -d cyberguard
   ```

### Module not loading?
```bash
# Regenerate Prisma client
npx prisma generate

# Check if data is seeded
npm run db:studio
```

## ✨ Features to Try

### In Module Learning:
- Navigate between scenarios with Previous/Next
- Answer quiz questions
- See real-time feedback
- Watch progress bar
- Experience confetti on completion

### In Dashboard:
- View progress cards
- See recent badges (if earned)
- Click on locked modules (shows locked state)
- Check XP progress to next level

### In Profile:
- View all earned badges with rarity
- Check achievement progress
- See completion statistics

### In Settings:
- Change language (page reloads)
- Update profile name
- View account stats

## 🎯 Success Indicators

✅ Application loads at http://localhost:3000
✅ You can sign up successfully
✅ Dashboard displays your name and stats
✅ Modules load with scenarios
✅ Quizzes work with feedback
✅ Badges are awarded on completion
✅ Profile shows earned badges
✅ Settings can be updated

## 🎉 You're All Set!

The application is fully functional and ready to use. Explore all features and enjoy learning about cybersecurity!

**Next Steps:**
1. Complete both modules
2. Earn all badges
3. Track your achievements
4. Customize your profile

**Need Help?**
- Check `README.md` for detailed documentation
- Check `PROJECT_STATUS.md` for implementation details
- Review code comments for understanding

---

**Happy Learning! 🛡️**
