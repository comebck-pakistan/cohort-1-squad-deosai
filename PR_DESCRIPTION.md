# Grounded CSV catalogue assistant

## Summary

- Removed the unnecessary AI Studio and prompt-optimizer workflow.
- Added a prepared jewellery catalogue CSV and a credential-free `/demo` page.
- Added deterministic answers for product price, stock, delivery charges, delivery time, and return policy.
- Added a safe seller handoff when a product is unknown, required data is missing, or uploaded sources conflict.
- Kept the OpenAI integration for broader supported questions, with evidence validation before a reply is accepted.
- Added mentor handoff notes and repeatable test questions.

## Accuracy testing completed

- [x] Necklace price: `Layered Pendant Necklace costs PKR 1,200.`
- [x] Necklace availability: `Layered Pendant Necklace is in stock.`
- [x] Delivery charges: exact value from the uploaded CSV.
- [x] Delivery time: exact value from the uploaded CSV.
- [x] Return policy: exact value from the uploaded CSV.
- [x] Unknown wallet: safe seller handoff instead of an invented answer.
- [x] TypeScript validation passed.
- [x] Focused ESLint checks passed.
- [x] Next.js production build passed.
- [x] Six live `/api/ai/demo-reply` cases passed from the clean PR branch.
- [x] `npm audit --omit=dev` reported zero production dependency vulnerabilities.

## Screenshots

Before submitting the PR, drag these files into this section so GitHub inserts the uploaded image links:

- `docs/screenshots/grounded-csv-complete-testing.png`
- `docs/screenshots/grounded-csv-safe-handoff.png`
- `docs/screenshots/grounded-csv-return-and-stock.png`

The screenshot files are also committed in `docs/screenshots/` for traceability.

## Database migration

No SQL migration file is added or changed by this PR.

For authenticated dashboard testing, the existing migration below must already be applied to Supabase:

`app/supabase/migrations/202607190001_ai_messaging.sql`

## Security and local setup

- No API key or `.env.local` file is committed.
- Copy `app/.env.example` to `app/.env.local` and add credentials privately.
- The exact-data accuracy test at `http://localhost:3000/demo` does not require an OpenAI or Supabase key.

## How to test

1. Run `cd app`.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open `http://localhost:3000/demo`.
5. Upload `app/public/sample-data/deosai_catalogue.csv`.
6. Ask the questions in `app/public/sample-data/TEST_QUESTIONS.md`.
