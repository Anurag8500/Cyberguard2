# 🏝️ Password Island Module

## Overview
Password Island is Module -1, designed to teach users password security fundamentals through interactive, gamified experiences.

## Module Structure

### **Submodule 1: Password Basics 101**

#### Theme
Learn what makes a password weak or strong — fast, fun, and hands-on.

#### Goal
Understand password patterns, why hackers love them, and how to outsmart them.

---

### 📋 Scenarios

#### **1. The Gate's Challenge** (Interactive)
- **Type**: `INTERACTIVE` - `password_challenge`
- **Description**: Interactive password selection challenge where users identify the strongest password
- **Features**:
  - 4 password options with varying strength levels
  - Real-time crack time feedback
  - Visual emoji indicators
  - Educational insights about brute-force attacks
  - Video reference link to Computerphile

**Passwords**:
- `123456` - 0.2 seconds ⚡
- `P@ssw0rd` - 3 hours ⚠️
- `MyDog2020!` - 1 month 💪
- `G!x@82qL#n` - 100+ years 🔐 (Correct Answer)

---

#### **2. The Password Lab** (Mini Game)
- **Type**: `MINI_GAME` - `password_creator`
- **Description**: Real-time interactive password strength analyzer
- **Features**:
  - Live password strength feedback as user types
  - 4 strength levels: Weak 🔴, Medium 🟠, Strong 🟢, Fortified 🟣
  - Dynamic color-coded progress bar
  - Requirements checklist with checkmarks
  - Achievement celebration when "Fortified" level reached
  - Learning nuggets sidebar
  - Reference link to Google Safety Center

**Strength Levels**:
- **Weak (0-29%)**: "Add more characters"
- **Medium (30-59%)**: "Add symbols or numbers"
- **Strong (60-84%)**: "Nice! Mix cases + symbols!"
- **Fortified (85-100%)**: "Uncrackable Fortress!"

**Requirements**:
- Minimum 12 characters
- Uppercase letters (A-Z)
- Lowercase letters (a-z)
- Numbers (0-9)
- Special characters (!@#$%^&*)

---

#### **3. The Gatekeeper's Quiz** (Assessment)
- **Type**: `ASSESSMENT` - Enhanced MCQ format
- **Description**: 5-question assessment with hints and reference links
- **Reward**: Password Apprentice Badge 🎓 + 100 XP

**Questions**:

1. **Why is "Sattwik123" weak?**
   - Hint: Personal info = predictable pattern
   - Correct: It includes your name

2. **Password that lasts 100 years?**
   - Hint: Random and complex = uncrackable
   - Correct: `X7$!vB9@l2T#`

3. **Password leaked in breach?**
   - Hint: Act fast to prevent account takeover
   - Correct: Change that password immediately
   - Reference: Have I Been Pwned

4. **Safest combination?**
   - Hint: More length + variety = stronger
   - Correct: 16 characters mixed types

5. **Forget passwords often?**
   - Hint: Secure storage = password manager
   - Correct: Use a password manager
   - Reference: Techquickie video

---

## Technical Implementation

### Components Created

1. **`PasswordChallenge.tsx`** (`components/scenarios/`)
   - Interactive password selection challenge
   - Animated feedback with Framer Motion
   - Supports video/reference links

2. **`PasswordLab.tsx`** (`components/scenarios/`)
   - Real-time password strength analyzer
   - Dynamic scoring algorithm
   - Visual progress indicators
   - Achievement notifications

### Integration in Module Page

The module page (`pages/modules/[slug].tsx`) now handles:
- `password_challenge` type in INTERACTIVE scenarios
- Enhanced `password_creator` type in MINI_GAME scenarios
- Enhanced ASSESSMENT with hints and reference links

### Database Schema

All scenarios are stored in the `Scenario` table with:
- `type`: ScenarioType enum (INTERACTIVE, MINI_GAME, ASSESSMENT)
- `content`: JSON field containing scenario-specific data
- `order`: Defines sequence within the module

---

## Learning Outcomes

After completing Password Basics 101, users will:
1. ✅ Identify weak vs. strong passwords
2. ✅ Understand brute-force attack mechanisms
3. ✅ Create strong passwords with proper requirements
4. ✅ Know when to use password managers
5. ✅ Respond appropriately to password breaches
6. ✅ Understand the importance of 2FA

---

## Future Submodules (To Be Added)

- **Submodule 2**: Password Strength Forge
- **Submodule 3**: TBD (awaiting user specification)
- **Submodule 4**: TBD (awaiting user specification)

---

## Badge System

- **Password Apprentice** 🎓: Complete Password Basics 101
- **Password Island Master** 🏝️: Complete all Password Island submodules (Rare)

---

## XP Rewards

- **Module Completion**: 100 XP
- **Quiz Scenarios**: Individual question feedback
- **Perfect Score**: Additional achievement bonus

---

## References

1. [How Hackers Crack Your Passwords - Computerphile](https://www.youtube.com/watch?v=7U-RbOKanYs)
2. [How to Create Strong Passwords - Google Safety Center](https://safety.google/authentication/)
3. [Have I Been Pwned?](https://haveibeenpwned.com/)
4. [What is a Password Manager? - Techquickie](https://www.youtube.com/watch?v=Q0GeMSFGIgI)
