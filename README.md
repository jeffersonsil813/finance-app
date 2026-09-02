# Finance

A personal finance management SaaS with a financial overview dashboard, transaction management (income and expenses), AI-powered financial analysis, and a user profile area. Fully responsive, with custom JWT-based authentication.

**Live demo:** [Add your deployment link here]

![Dashboard preview](./public/dashboard-page.png)

## ✨ Features

- **Full authentication** — sign up and login with encrypted passwords (bcrypt) and JWT-based sessions stored in an `httpOnly` cookie
- **Financial dashboard** — total balance, monthly income and expenses, percentage comparison with the previous month, income vs. expenses chart (6-month view), and expense breakdown by category (donut chart)
- **Transactions** — list with search, filter by type (All / Income / Expenses), total in/out summary, creation and editing through a single reusable modal
- **AI analysis** — generates insights on spending patterns, saving trends, and personalized recommendations based on the current month's data, powered by the Google SDK
- **Profile** — edit name and email, change password, logout
- **Responsive** — adapted navigation for mobile (bottom tab bar) and desktop

## 🛠️ Tech Stack

**Framework & Language**

- [Next.js](https://nextjs.org/) (App Router)
- TypeScript

**Database**

- [Prisma ORM](https://www.prisma.io/)
- [Neon](https://neon.tech/) (serverless PostgreSQL)

**UI**

- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide React](https://lucide.dev/) (icons)
- [Motion](https://motion.dev/) (animations)
- [Recharts](https://recharts.org/) (charts)
- [React Hot Toast](https://react-hot-toast.com/) (alerts)

**Forms & Validation**

- [Formik](https://formik.org/)
- [Zod](https://zod.dev/)

**Data & State**

- [TanStack Query](https://tanstack.com/query)

**Authentication**

- [bcrypt](https://www.npmjs.com/package/bcrypt) — password hashing
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) — token generation and validation, stored in an `httpOnly` cookie

**Artificial Intelligence**

- Google SDK — intelligent financial analysis generation

## 📸 Screens

| Login                             | Sign Up                                |
| --------------------------------- | -------------------------------------- |
| ![Login](./public/login-page.png) | ![Sign up](./public/register-page.png) |

| Dashboard                                 | Transactions                                    |
| ----------------------------------------- | ----------------------------------------------- |
| ![Dashboard](./public/dashboard-page.png) | ![Transactions](./public/transactions-page.png) |

| Profile (Desktop)                             | Profile (Mobile)                               |
| --------------------------------------------- | ---------------------------------------------- |
| ![Profile desktop](./public/profile-page.png) | ![Profile mobile](./public/profile-mobile.png) |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL instance (recommended: [Neon](https://neon.tech/))
- A Google API key (for the AI analysis feature)

### 1. Clone the repository

```bash
git clone https://github.com/jeffersonsil813/finance-app.git
cd finance-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# Authentication
JWT_SECRET="your-secret-key-here"

# AI (Google SDK)
GOOGLE_GENERATIVE_AI_API_KEY="your-google-api-key"
```

### 4. Run Prisma migrations

```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Start the development server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/              # Login and sign up
│   ├── (protected)/         # Dashboard, transactions, profile
│   ├── api/                 # Route handlers (API)
│   ├── globals.css
│   ├── icon.svg
│   ├── layout.tsx
│   └── query-provider.tsx   # TanStack Query provider
├── components/
│   ├── ui/                  # shadcn/ui components
│   └── ...                  # Domain components (transaction-modal, etc.)
├── hooks/                   # Custom hooks
├── lib/                     # Utilities, API client, constants
├── schemas/                 # Validation schemas (Zod)
├── services/                # API call layer
└── proxy.ts                 # Auth/route protection middleware

prisma/
├── schema.prisma            # Database models
└── generated/                # Generated Prisma Client
```

## 🔐 Authentication

The authentication flow works as follows:

1. On sign up, the user's password is hashed with **bcrypt** before being persisted
2. On login, credentials are validated and a **JWT** is generated
3. The token is stored in an **`httpOnly`** cookie, preventing client-side JavaScript access and mitigating XSS attacks
4. Protected routes validate the token on every request before granting access to the data

## 🤖 AI Analysis

Based on the selected month's transaction data, the user can generate an intelligent analysis that highlights spending patterns, saving trends, and personalized recommendations, using the Google SDK to process the data and return the insights.

## 📄 License

This project is licensed under the MIT License.

---

Built by [Jefferson Silva](https://github.com/jeffersonsil813)
