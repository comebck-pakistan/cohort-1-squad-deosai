# 🤖 Deosai — AI Auto-DM & COD Confirmation Platform

> **Comebck Pakistan — Cohort 1 · Product Challenge**
>
> Deosai is a tailored AI-powered social commerce assistant built for social sellers in Pakistan (focusing on Jewellery and Fashion brands). It enables sellers to automate repeating customer queries (price, shipping, return policies) from uploaded spreadsheets and URLs, and handles automatic Cash-on-Delivery (COD) checkout verification.
>
> 🌐 **Landing Page:** [cohort-1-squad-deosai.vercel.app](https://cohort-1-squad-deosai.vercel.app/)

---

## 👥 Core Team & Division of Work

Our squad divided ownership across product development, design systems, requirements research, and technology auditing to deliver a bulletproof MVP:

### 💻 Danial Sohail & Ermish Tabassum
* **Authentication & Database Sync**: Implemented secure session management, automatic profile synchronization, client-side role guards for secured views, and bulletproof `localStorage` database fallbacks.
* **Spreadsheet & Catalog Parser**: Integrated client-side parsing using `PapaParse` and `SheetJS (xlsx)` to ingest product catalogs instantly. Created a full spreadsheet-like table editor where sellers can edit, delete, add rows, and filter cells.
* **Branded Interface & Workflows**: Designed the core frontend dashboard matching the warm paper, deep teal, and marigold aesthetics. Implemented the setup builder tabs, order logs, live chat testing playground, and secure admin control dashboards.

### 🔍 Zain Ali Khan
* **R&D & Market Validation**: Led customer interviews, processed seller surveys, and engineered platform requirements. Validated the jewellery and fashion segments to refine target workflows.

### 🧠 Daniyal Rashid
* **AI Orchestration Research**: Investigated open-source agent (e.g. Gemma, Qwen etc) and API blueprints to connect parsed catalog data to Meta Cloud APIs and WhatsApp Business accounts.

---

## 🚀 Key Features

* **Interactive Setup Wizard**: Dynamic prompts, preset builder guidelines, negative constraints, and tone of voice configurations (including Pivotal Hinglish / Roman Urdu support).
* **Grid Spreadsheet Editor**: Directly edit, search, and update uploaded Excel (.xlsx, .xls) and CSV (.csv) catalogs inside the browser.
* **Live Playground Simulator**: Instant sandbox chat simulation where sellers can text the bot to verify prompt behaviors, brand memory constraints, and catalog matching.
* **Order Tracking Center**: Dedicated dashboard monitoring pending, confirmed, and cancelled Cash-on-Delivery checkouts.
* **Secure Admin Control Panel**: Dedicated directory panel `/admin` for the Deosai team to monitor sellers, verify catalog listings, and connect Meta WhatsApp Cloud configurations.

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
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the local development server**:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

---

> **Every squad member must contribute commits.** Build in the open, ship the proof. 🚀
