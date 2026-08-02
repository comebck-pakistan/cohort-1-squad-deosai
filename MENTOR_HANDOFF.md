# Deosai Grounded CSV Assistant — Mentor Handoff

## What I changed

I simplified the project around one reliable workflow: upload a seller-approved catalogue, ask customer-service questions, and answer only from exact uploaded facts.

### 1. Removed unnecessary AI Studio complexity

- Deleted the AI Studio dashboard page.
- Deleted the prompt-optimizer API and prompt-quality utility.
- Removed AI Studio from navigation and environment settings.
- Kept the existing Setup Playground as the single place to upload and test data.

### 2. Added a realistic CSV catalogue

- Created `app/public/sample-data/deosai_catalogue.csv`.
- Added five jewellery products with exact price, availability, description, delivery charges, delivery time, and return policy fields.
- Added a **Download sample CSV** action in **Setup → Knowledge & Data**.
- Preserved every uploaded row as approved knowledge and synced standard product fields plus extra policy metadata to Supabase.

### 3. Prevented hallucinated product and policy answers

- Added a deterministic verified-data answer path for price, stock, delivery charges, delivery time, and return policy questions.
- Product matching must identify one unique uploaded product.
- Policy answers must have one consistent non-empty value across approved sources.
- If a product is unknown, a field is missing, or sources conflict, the assistant immediately hands the conversation to the seller.
- Accepted replies include evidence IDs pointing to the exact uploaded CSV row.
- These exact-data answers require zero model tokens, so the mentor accuracy test works locally even before an API key is added.

### 4. Kept grounded AI integration for broader questions

- The OpenAI Responses API remains available for broader supported conversations.
- Structured output requires the model to mark whether a response is supported and identify valid evidence IDs.
- Server-side validation rejects unsupported replies and converts them to handoff.
- Internal fields such as supplier, margin, secrets, and private notes are filtered before model use.
- Recent conversation history is now passed correctly from the Setup Playground.

### 5. Added a repeatable accuracy test

Run the app and open `http://localhost:3000/demo`. Download/upload `app/public/sample-data/deosai_catalogue.csv`, then ask:

| Question | Expected result |
| --- | --- |
| What is the price of the necklace? | Layered Pendant Necklace costs PKR 1,200. |
| Is the necklace available? | Layered Pendant Necklace is in stock. |
| What are the delivery charges? | PKR 200 nationwide; free delivery in Lahore. |
| How long does delivery take? | 2-4 working days. |
| What is the return policy? | Exact 7-day exchange/custom-item policy from the CSV. |
| Is the leather wallet available? | Human handoff because that product is not in the CSV. |

The same questions and expected results are included in `app/public/sample-data/TEST_QUESTIONS.md`.

## Main files

- `app/public/sample-data/deosai_catalogue.csv` — prepared mentor test data
- `app/public/sample-data/TEST_QUESTIONS.md` — repeatable test guide
- `app/app/demo/page.tsx` — credential-free local CSV upload and Q&A demo
- `app/app/api/ai/demo-reply/route.ts` — bounded local exact-answer endpoint
- `app/app/dashboard/setup/page.tsx` — CSV upload and local Playground
- `app/lib/ai/verified-reply.ts` — deterministic exact-field answers and conflict checks
- `app/lib/ai/generate-reply.ts` — grounded generation, validation, and safe handoff
- `app/lib/ai/grounding.ts` — approved catalogue/knowledge retrieval
- `app/app/api/ai/reply/route.ts` — authenticated assistant endpoint

## Validation completed

- The CSV was round-trip inspected and visually rendered as a spreadsheet.
- Six accuracy cases pass: price, availability, delivery charges, delivery time, return policy, and unknown-product handoff.
- The same six cases pass through the running local `/api/ai/demo-reply` endpoint.
- TypeScript validation passes.
- Focused ESLint checks pass for the new demo and grounded-answer files.
- The Next.js production build passes with `/demo` and both AI reply endpoints included.

## How to run locally

1. Open the `app` directory.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Add real Supabase values and your own `OPENAI_API_KEY`.
5. Apply `supabase/migrations/202607190001_ai_messaging.sql`.
6. Run `npm run dev`.
7. Open `http://localhost:3000/demo` for the credential-free mentor test.
8. After adding Supabase credentials, the same flow is available in **Dashboard → Setup → Knowledge & Data**.

Real credentials are intentionally excluded from the ZIP. `.env.local` must never be sent or committed.
