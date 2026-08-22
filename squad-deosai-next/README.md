# 🤖 Jawab AI — WhatsApp Auto-DM Platform

This is the main Next.js application for Jawab AI — an AI-powered WhatsApp agent for Pakistani social sellers.

---

## 🚀 Quick Start (For Developers)

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create `.env.local` in the root of this folder:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SECRET_KEY=your_service_role_key
OPENAI_API_KEY=your_openai_key
```

### 3. Run development server

```bash
npm run dev
```

### 4. Open http://localhost:3000

---

## 🧪 How Sellers Use Jawab AI

### Step 1: Sign Up

Create an account with email + password.

### Step 2: Onboarding

Complete the 7-step onboarding flow:

1. **Business Profile** — Store name, category, WhatsApp number
2. **Import Catalogue** — Upload CSV/Excel with products
3. **Store Policies** — Delivery charges, delivery time, return policy
4. **AI Personality** — Agent name, tone, language
5. **Connect WhatsApp (optional)** — Scan QR to link your number or go to dashboard

### Step 3: Dashboard

- **AI Studio:** Test your AI agent with real messages
- **Setup:** Manage catalogue, policies, and business rules
- **Inbox:** View all customer conversations and reply manually
- **Orders:** Track COD order confirmations

### Step 4: WhatsApp Auto-Reply

Once connected, Jawab AI automatically replies to customer messages 24/7 using your catalogue and business rules.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (React + TypeScript) |
| Styling | Tailwind CSS + shadcn/ui |
| Database | Supabase (PostgreSQL + Auth) |
| AI | OpenAI (GPT-4o-mini) |
| WhatsApp | WhatsApp Cloud API + `whatsapp-web.js` |

---

## 📁 Folder Structure

```text
squad-deosai-next/
├── app/
│   ├── api/           → API routes (AI, WhatsApp, Auth)
│   ├── auth/          → Login / Signup pages
│   ├── dashboard/     → Dashboard pages (Inbox, Orders, Setup)
│   └── onboarding/    → Onboarding flow (7 steps)
├── lib/
│   ├── ai/            → AI logic, grounding, token caching
│   ├── supabase/      → Supabase client (admin + browser)
│   └── whatsapp/      → WhatsApp integration (QR, auto-reply)
├── components/        → Reusable UI components
├── public/            → Static assets
└── supabase/          → Database migrations
```

---

## 🔧 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run start:worker` | Run WhatsApp worker (standalone) |
| `npm run lint` | Run ESLint |

---

## 🧪 Features

- ✅ WhatsApp auto-reply (AI-powered)
- ✅ CSV/Excel catalogue upload
- ✅ Seller dashboard with inbox and orders
- ✅ Business rules (stock, policies, pricing)
- ✅ QR code login — no technical knowledge required
- ✅ AI reply logging for review
