# Jawab Ai — AI Auto-DM & COD Confirmation Platform

> **Comebck Pakistan — Cohort 1 · Product Challenge**
>
> Jawab AI is a tailored AI-powered social commerce assistant built for social sellers in Pakistan (focusing on Jewellery). It enables sellers to automate repeating customer queries (Price, Deliver, return policies) from uploaded spreadsheets and URLs, and handles automatic Cash-on-Delivery (COD) checkout verification.
>
> 🌐 **Landing Page:** [Squad-Deosai-Market-Research](https://cohort-1-squad-deosai.vercel.app/)
>
> 🌐 **Live Demo:** [Jawab-Ai](https://jawab-ai-production.up.railway.app/)

---

## Core Team & Division of Work 
Our squad divided ownership across product development, design systems, requirements research, and technology auditing to deliver a bulletproof MVP:

| Member | Role | Key Contributions |
|--------|------|-------------------|
| **Ermish Tabassum** | Backend Developer | Authentication and Database setup, Onboarding Flow, Rate Limiting, WhatsApp Integration, Error logs |
| **Danial Sohail** | Frontend Developer | Prototyping, Ui fixes & Finalization, CSV Parsing, Token Caching, Landing Page, Deployment |
| **Daniyal Rashid** | Quality Assurance | UI Design, Meta WhatsApp Application, Code Review, Market Research |
| **Zain Ali Khan** | AI Engineer | AI API Integration, WhatsApp API Research, Documentation|

---

## The Problem

- Pakistani social sellers spend **30 min – 2 hours/day** manually answering the same 5 questions on WhatsApp
- **83%** of sellers we interviewed have lost sales because they replied too slowly

---

## The Solution

- **WhatsApp Auto-Reply:** AI-powered replies from seller's catalogue — 24/7
- **Seller Dashboard:** Inbox, orders, and AI reply logs all in one place
- **Business Rules:** Sellers control stock, policies, and pricing
- **Easy Setup:** QR code login — no technical knowledge required

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (React + TypeScript) |
| Database | Supabase (PostgreSQL + Auth) |
| AI | OpenAI (GPT-4o-mini) |
| WhatsApp | WhatsApp Cloud API + `whatsapp-web.js` (backup) |
| Deployment | Railway |
| Styling | Tailwind CSS + shadcn/ui |

---

## 🛠️ Project Structure & Getting Started

The platform is structured as a modern Next.js workspace.

### Prerequisites
* **Node.js**: `v18.x` or higher
* **Package Manager**: `npm`

### Local Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Comebck-Pakistan/cohort-1-squad-deosai.git
   cd cohort-1-squad-deosai/squad-deosai-next
   ```
2. ** Navigate to the app**:
   ```bash
   cd squad-deosai-next
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment variables**:
   Create .env.local with:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SECRET_KEY=your_service_role_key
   OPENAI_API_KEY=your_openai_key
   ```
5. **Run the local development server**:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.
