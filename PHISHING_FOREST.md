# 🌲 Module 2: Phishing Forest

## Overview
**Theme:** Every click can lead to treasure… or a trap.  
**Goal:** Learn to detect malicious links and identify safe vs suspicious URLs by observing patterns and hidden tricks.

---

## 🌲 Submodule 1: Link Decoder – "Unmask the URL"

### Scenario 1: The Hover Test

**Type:** Interactive Choice  
**XP Reward:** 50

#### Content:
**Situation:**  
You get this message:

> "Congrats! You've won an iPhone 15! Claim your prize now: https://apple.freegift-event.com"

**Task:**  
Before clicking, hover (or long-press) to preview the real link destination.

**Real Link Reveals:**
```
http://fake-apple.gifts.ru/login.php
```

**Question:** What do you do?

**Options:**
- A) Click and claim the gift
- B) Report and delete ✅
- C) Forward to friends
- D) Bookmark it for later

**Correct Answer:** B) Report and delete

**Tip:**  
Good! Always hover before clicking — the real URL never lies.

---

### Scenario 2: Link Match Challenge

**Type:** Interactive Table  
**XP Reward:** 80

#### Content:
You see these links — mark which are safe or suspicious 👇

| Link | Safe or Suspicious? | Why |
|------|---------------------|-----|
| https://accounts.google.com/security | ✅ Safe | Official Google domain |
| http://google.security-login.net | ❌ Suspicious | Extra words after real name |
| https://www.sbi.co.in/securebanking | ✅ Safe | Verified .co.in domain |
| https://sbi-login-support.cc | ❌ Suspicious | Fake "support" site |
| https://paypal.com.verify-account.org | ❌ Suspicious | Misleading subdomain |

**Tip:**  
Always read domains right-to-left — real domain sits just before .com or .in.

---

### Scenario 3: Sneaky Short Links

**Type:** Interactive Choice  
**XP Reward:** 40

#### Content:
**Situation:**  
You receive a WhatsApp message:

> "Your courier is pending. Track here 👉 bit.ly/xyzTrackNow"

**Task:** What's your first move?

**Options:**
- A) Click directly
- B) Expand short link using a URL checker ✅
- C) Forward to courier service
- D) Ignore

**Correct Answer:** B) Expand short link using a URL checker

**Tip:**  
Correct! Use sites like checkshorturl.com to preview shortened links.

---

### Quick Watch
📺 **YouTube:** "How to Check if a Link is Safe Before Clicking" (2:45)  
**Link:** https://www.youtube.com/watch?v=example

---

## Final Quiz: "Decode the Web"

**Total Questions:** 5  
**Total XP:** 250  
**Badge:** "Link Decoder" 🔗

### Quiz Questions

#### Q1: Which domain is real?
**Options:**
- A) google.support-login.net
- B) accounts.google.com ✅
- C) google.loginapp.org
- D) googlefree.com

**Correct Answer:** B) accounts.google.com  
**Explanation:** The real Google domain is accounts.google.com. The others add extra words or use suspicious TLDs.

---

#### Q2: What's the first step before clicking a link?
**Options:**
- A) Hover to preview ✅
- B) Trust your instinct
- C) Screenshot it
- D) Click immediately

**Correct Answer:** A) Hover to preview  
**Explanation:** Hovering reveals the real destination URL before you click, helping you avoid phishing sites.

---

#### Q3: Which domain is suspicious?
**Options:**
- A) https://paytm.com/secure
- B) https://secure-paytm-payment.cc ✅
- C) https://www.paytm.in
- D) https://paytm.com/settings

**Correct Answer:** B) https://secure-paytm-payment.cc  
**Explanation:** ".cc" domains and extra hyphens often indicate fake sites. Real Paytm uses .com or .in.  
**Hint:** ".cc" or ".info" sites are often fake.

---

#### Q4: Why are shortened links risky?
**Options:**
- A) Hide full destination ✅
- B) Faster loading
- C) Look cleaner
- D) Safer to use

**Correct Answer:** A) Hide full destination  
**Explanation:** Shortened links (like bit.ly) hide the real URL, making it easy for attackers to disguise malicious sites.

---

#### Q5: What's a good defense against link scams?
**Options:**
- A) Use URL preview tools ✅
- B) Disable browser
- C) Click from messages
- D) Guess if safe

**Correct Answer:** A) Use URL preview tools  
**Explanation:** URL preview tools and link checkers help you see the real destination before clicking.

---

## Success Message

✅ **Result:**
- **Score:** 5/5
- **XP Earned:** +250
- **Badge Unlocked:** "Link Decoder" 🔗

💬 **Message:**  
"You now see what lies beneath every link!"

---

## Database Schema

### Module Structure
```javascript
{
  slug: "phishing-forest",
  title: "🌲 Phishing Forest",
  description: "Learn to detect malicious links and identify safe vs suspicious URLs",
  order: 2,
  xpReward: 420,
  icon: "🌲",
  isPublished: true
}
```

### Scenario 1 (Hover Test)
```javascript
{
  type: "INTERACTIVE",
  title: "🔍 The Hover Test",
  description: "Learn to preview links before clicking",
  order: 1,
  content: {
    scenario: 1,
    theme: "The Hover Test",
    situation: "Before clicking, hover (or long-press) to preview the real link destination.",
    message: "Congrats! You've won an iPhone 15! Claim your prize now:",
    realLink: "http://fake-apple.gifts.ru/login.php",
    task: "Question: What do you do?",
    options: [
      { text: "Click and claim the gift", isCorrect: false, explanation: "Never click suspicious links!" },
      { text: "Report and delete", isCorrect: true, explanation: "Correct! Always verify before clicking." },
      { text: "Forward to friends", isCorrect: false, explanation: "Don't spread potential threats!" },
      { text: "Bookmark it for later", isCorrect: false, explanation: "This is still unsafe!" }
    ],
    tip: "Good! Always hover before clicking — the real URL never lies.",
    xpReward: 50
  }
}
```

### Scenario 2 (Link Match Challenge)
```javascript
{
  type: "INTERACTIVE",
  title: "🔗 Link Match Challenge",
  description: "Identify safe and suspicious URLs",
  order: 2,
  content: {
    scenario: 2,
    theme: "Link Match Challenge",
    task: "You see these links — mark which are safe or suspicious 👇",
    links: [
      { url: "https://accounts.google.com/security", isSafe: true, reason: "Official Google domain" },
      { url: "http://google.security-login.net", isSafe: false, reason: "Extra words after real name" },
      { url: "https://www.sbi.co.in/securebanking", isSafe: true, reason: "Verified .co.in domain" },
      { url: "https://sbi-login-support.cc", isSafe: false, reason: "Fake 'support' site" },
      { url: "https://paypal.com.verify-account.org", isSafe: false, reason: "Misleading subdomain" }
    ],
    tip: "Always read domains right-to-left — real domain sits just before .com or .in.",
    xpReward: 80
  }
}
```

### Scenario 3 (Sneaky Short Links)
```javascript
{
  type: "INTERACTIVE",
  title: "⚠️ Sneaky Short Links",
  description: "Learn to handle shortened URLs safely",
  order: 3,
  content: {
    scenario: 3,
    theme: "Sneaky Short Links",
    situation: "You receive a WhatsApp message:",
    message: "Your courier is pending. Track here 👉 bit.ly/xyzTrackNow",
    task: "What's your first move?",
    options: [
      { text: "Click directly", isCorrect: false, explanation: "Never click shortened links blindly!" },
      { text: "Expand short link using a URL checker", isCorrect: true, explanation: "Perfect! Always preview shortened URLs." },
      { text: "Forward to courier service", isCorrect: false, explanation: "Don't forward suspicious links!" },
      { text: "Ignore", isCorrect: false, explanation: "Better to verify and report if it's a scam." }
    ],
    tip: "Correct! Use sites like checkshorturl.com to preview shortened links.",
    xpReward: 40
  }
}
```

### Scenario 4 (Final Quiz)
```javascript
{
  type: "ASSESSMENT",
  title: "🎯 Final Quiz - Decode the Web",
  description: "Test your phishing detection skills",
  order: 4,
  content: {
    title: "Decode the Web",
    questions: [
      {
        question: "Which domain is real?",
        options: [
          "google.support-login.net",
          "accounts.google.com",
          "google.loginapp.org",
          "googlefree.com"
        ],
        correctAnswer: 1,
        explanation: "The real Google domain is accounts.google.com. The others add extra words or use suspicious TLDs."
      },
      {
        question: "What's the first step before clicking a link?",
        options: [
          "Hover to preview",
          "Trust your instinct",
          "Screenshot it",
          "Click immediately"
        ],
        correctAnswer: 0,
        explanation: "Hovering reveals the real destination URL before you click, helping you avoid phishing sites."
      },
      {
        question: "Which domain is suspicious?",
        options: [
          "https://paytm.com/secure",
          "https://secure-paytm-payment.cc",
          "https://www.paytm.in",
          "https://paytm.com/settings"
        ],
        correctAnswer: 1,
        explanation: "'.cc' domains and extra hyphens often indicate fake sites. Real Paytm uses .com or .in.",
        hint: "'.cc' or '.info' sites are often fake."
      },
      {
        question: "Why are shortened links risky?",
        options: [
          "Hide full destination",
          "Faster loading",
          "Look cleaner",
          "Safer to use"
        ],
        correctAnswer: 0,
        explanation: "Shortened links (like bit.ly) hide the real URL, making it easy for attackers to disguise malicious sites."
      },
      {
        question: "What's a good defense against link scams?",
        options: [
          "Use URL preview tools",
          "Disable browser",
          "Click from messages",
          "Guess if safe"
        ],
        correctAnswer: 0,
        explanation: "URL preview tools and link checkers help you see the real destination before clicking."
      }
    ],
    totalXP: 250,
    badge: {
      name: "Link Decoder",
      icon: "🔗",
      description: "You now see what lies beneath every link!"
    }
  }
}
```

---

## Implementation Notes

### Components Used
1. **LinkDecoder.tsx** - Handles Scenarios 1, 2, and 3
2. **PhishingQuiz.tsx** - Handles the final quiz (Scenario 4)

### Features
- Interactive hover-to-reveal link inspection
- Table-based link classification
- Multiple choice questions with instant feedback
- Progressive quiz with score tracking
- Badge rewards for completion
- XP system integration

### Total XP Available
- Scenario 1: 50 XP
- Scenario 2: 80 XP
- Scenario 3: 40 XP
- Final Quiz: 250 XP
- **Total: 420 XP**
