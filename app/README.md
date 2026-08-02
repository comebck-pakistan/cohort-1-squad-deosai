# Deosai

Deosai is a grounded WhatsApp commerce assistant for Pakistani social sellers. Sellers upload approved catalogue data, and the assistant answers product and policy questions from those exact facts.

## CSV catalogue flow

For a credential-free local test, open `http://localhost:3000/demo`.

1. Download the prepared sample CSV, then upload it on the demo page.
2. Ask the listed price, availability, delivery, and return questions.
3. Confirm that an unknown product produces a seller handoff.

For the authenticated workflow:

1. Sign in and open **Dashboard → Setup → Knowledge & Data**.
2. Download the prepared sample CSV or upload your own CSV/Excel catalogue.
3. Use the Setup Playground to ask about product price, availability, delivery charges, delivery time, or return policy.
4. The assistant answers only when the requested field is present and unambiguous.
5. Missing, unknown, or conflicting facts trigger a human handoff instead of a guessed answer.

The included sample is available at `public/sample-data/deosai_catalogue.csv`. Expected mentor questions are listed in `public/sample-data/TEST_QUESTIONS.md`.

## Accuracy design

- Required catalogue and policy questions use a deterministic verified-data path.
- Answers copy exact price, stock, delivery, and return fields from uploaded rows.
- Every accepted answer includes internal evidence metadata identifying the uploaded row.
- Exact-data answers use zero model tokens and work locally without an AI key.
- Broader supported questions can use the OpenAI Responses API with strict structured output and evidence validation.
- Unsupported questions always use the configured seller handoff message.

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Add your real Supabase values and `OPENAI_API_KEY` to `.env.local`.
4. Apply `supabase/migrations/202607190001_ai_messaging.sql` to Supabase.
5. Keep `WHATSAPP_PROVIDER=dummy` for local development.
6. Run `npm run dev`.
7. Open `http://localhost:3000`.

The public accuracy demo at `http://localhost:3000/demo` works without credentials. Supabase credentials are required for sign-in, saved seller data, and the authenticated dashboard. An OpenAI key is required only for broader model-generated replies.

Never commit or send `.env.local`. It is ignored by Git and excluded from the mentor ZIP.

## Validation

```bash
npx tsc --noEmit
npx eslint app/demo/page.tsx app/api/ai/demo-reply/route.ts lib/ai/verified-reply.ts lib/ai/generate-reply.ts
npm run build
```

The focused lint command covers the new demo and grounded-answer implementation. The repository-wide lint command still reports older issues in unrelated starter pages.
