# 🛡️ CyberGuard Academy

Interactive, story-driven cybersecurity education with gamified learning, simulations, and multilingual support.

---

## **Overview**

- **Purpose:** Teach real-world digital safety through narrative modules, simulations, and short assessments.
- **Audience:** Students, educators, and general users seeking practical cybersecurity awareness.
- **Highlights:** Story-based learning, XP and badges, mini-games, and a multilingual Cyberpedia.

---

## **Tech Stack**

- **Framework:** `Next.js` (React + SSR/SSG)
- **Language:** `TypeScript`
- **Styling:** `Tailwind CSS`
- **Database & ORM:** `PostgreSQL` + `Prisma`
- **Authentication:** JWT-based sessions, secure password hashing (`bcrypt`)
- **Email / Notifications:** SMTP (via a library such as `nodemailer`)
- **i18n:** `next-i18next` for translations
- **Bundler / Tooling:** Vercel-compatible Next.js setup, `npm` scripts
- **Linting / Formatting:** ESLint (project scripts)

---

## **Features**

- **Interactive Modules:** Story-driven lessons with scenarios and checkpoints.
- **Assessments & Quizzes:** Short quizzes to validate learning with immediate feedback.
- **Gamification:** XP, levels, badges, achievements and progress tracking.
- **Mini-Games:** Browser games to practice concepts in an engaging way.
- **Module Progress Tracking:** Progress saved per-user in the database.
- **User Accounts:** Signup, login, logout, password reset via time-bound OTPs.
- **Email Integration:** Email for signup verification and password reset.
- **Multilingual Support:** Translations for `en`, `hi`, and `bn`.
- **Admin / API Endpoints:** RESTful API routes for modules, user profile, dashboard and settings.

---

## **Repository Structure (key files & folders)**

- **`pages/`**: Next.js pages and API routes
  - `pages/api/auth/*` : Auth endpoints (`signup`, `login`, `logout`, `forgot-password`, `reset-password`)
  - `pages/modules/[slug].tsx` : Module content pages
- **`components/`**: Reusable UI components (cards, navbar, progress components)
- **`lib/`**: Core utilities and services (`auth.ts`, `db.ts`, `email.ts`, `validation.ts`)
- **`prisma/`**: Prisma schema and seed scripts (`schema.prisma`, `seed.ts`)
- **`locales/`**: i18n translation files (`en`, `hi`, `bn`)
- **`styles/`**: Global Tailwind CSS files

Refer to the project root for additional configuration files: `next.config.js`, `tailwind.config.js`, and `next-i18next.config.js`.

---

## **API Endpoints (examples)**

- `POST /api/auth/signup` — create user account
- `POST /api/auth/login` — authenticate and create session
- `POST /api/auth/logout` — end session
- `POST /api/auth/forgot-password` — request OTP for reset
- `POST /api/auth/reset-password` — reset password with OTP
- `GET /api/dashboard` — user dashboard data
- `GET /api/modules/[slug]` — module data
- `POST /api/modules/[slug]/save-answers` — save module answers/progress

---

## **Environment Variables**

Ensure these are set in `.env` or in your deployment settings:

- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — Secret used to sign JWTs
- `JWT_EXPIRES_IN` — JWT expiry (e.g., `7d`)
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD`, `EMAIL_FROM` — SMTP credentials
- `NEXT_PUBLIC_APP_URL` — Public application URL (used in emails)

Add any other provider keys your deployment requires.

---

## **Getting Started (Development)**

1. Install dependencies:

```powershell
npm install
```

2. Copy example env and edit values:

```powershell
copy .env.example .env
# then edit .env in an editor
```

3. Initialize the database (Prisma):

```powershell
npm run db:push   # apply schema
npm run db:seed   # optional seed data
npm run db:studio # optional Prisma Studio
```

4. Start the dev server:

```powershell
npm run dev
# open http://localhost:3000
```

---

## **Scripts**

- `npm run dev` — start development server
- `npm run build` — build for production
- `npm run start` — run production server
- `npm run lint` — run linters
- `npm run db:push` — push Prisma schema
- `npm run db:seed` — seed database

---

## **Deployment**

- Deploy to Vercel or any Node.js hosting provider that supports Next.js.
- Add environment variables in the deployment dashboard (Vercel environment settings).
- Set `NEXT_PUBLIC_APP_URL` to your production URL.

---

## **Contributing**

- **Fork** the repo
- **Create** a branch `feat/your-feature` or `fix/your-bug`
- **Commit** with descriptive messages
- **Run** `npm run lint` before opening a PR
- **Open** a Pull Request for review

Please follow existing code style and keep changes focused and minimal.

---

## **License**

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## **Contact & Support**

- **Issues:** Use the GitHub Issues tab
- **Email:** support@cyberguard.academy

Thank you for contributing to CyberGuard Academy — together we make the internet safer.
