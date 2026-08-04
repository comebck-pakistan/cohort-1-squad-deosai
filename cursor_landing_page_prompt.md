# Prompt for Cursor: Squad Deosai Research Landing Page

Copy everything below the line into Cursor's chat/composer. Attach `research_data.json`
and `research_findings.md` to the same message (see "Files to attach" at the bottom
of this file for why).

---

You are building a single-page, static landing site that presents our startup
squad's user research findings to program mentors. The audience is mentors doing
a fast repo review — the page needs to be scannable in under 2 minutes but reward
someone who scrolls further with real depth and one genuinely interactive moment.

## What we're building

**Squad Deosai** — "The Social-Commerce Support Agent." We're building an
Instagram/WhatsApp DM AI tool for Pakistani social sellers (fashion, jewellery)
that auto-answers the 5 most common customer questions (price, delivery,
availability, returns, business hours) from the seller's own catalogue and
policies, and auto-sends a COD confirmation message when an order is placed.

All research data (survey stats, interview summaries, benchmarks, waitlist) is in
the attached `research_data.json` — treat it as the single source of truth. Do
not invent or round numbers beyond what's in that file. The attached
`research_findings.md` has the full narrative write-up if you need context or
exact quotes for the interview cards.

## Tech stack

- Plain HTML + CSS + vanilla JS. No build step, no framework, no npm install —
  this needs to run by opening `index.html` directly and by GitHub Pages with
  zero config.
- Use Chart.js via CDN for charts.
- Single `index.html` file is fine (inline `<style>` and `<script>`), or split
  into `index.html` / `styles.css` / `script.js` if that's cleaner — your call,
  but keep it dependency-light either way.
- Fully responsive (mobile-first breakpoints); mentors may open this on a phone.

## Structure & navigation

Sticky top nav with smooth-scroll anchor links to each section. Sections, in order:

1. **Hero** — product name, one-line pitch, the target-user statement, and 3–4
   headline stat chips (e.g. "83% have lost a sale to a slow reply", "12 sellers
   surveyed", "6 confirmed early testers"). A subtle CTA button linking down to
   the interactive demo.
2. **The Problem** — the core problem statement, framed visually (not just a
   paragraph — consider a simple before/after or a timeline of a seller's day
   showing DM interruptions).
3. **Research Methodology** — the two tracks (12-response survey + 4 in-depth
   interviews), dates, and the reconciliation note that AP Crafts overlaps both
   tracks (15 unique sellers total, not 16). Keep this section short and honest,
   not salesy.
4. **Survey Results** — this is the data-heavy section. Render real charts (bar
   or donut) from `research_data.json` for: daily inquiry volume, time spent
   replying, lost-sale frequency, perceived usefulness, first automation
   priority, willingness to pay, price point, and testing interest. Pair every
   chart with a one-line takeaway pulled from the data, not filler text.
5. **Interview Highlights** — 4 cards, one per interviewee (StickerMania,
   AP Crafts, Jewellery with Maheen, ZayZaiwar). Each card: business name, a
   short quote, their reply time, their first-automation-choice, and a status
   badge (Confirmed tester / Maybe / Open to contact). Visually distinguish the
   AP Crafts card as the "counter-signal" — it matters that mentors see we're
   not hiding the pushback.
6. **The Interactive Demo** ⭐ — this is the "make the mentor stop scrolling"
   moment. Build a working, client-side-only chat widget mockup styled like an
   Instagram/WhatsApp DM thread. Pre-load a tiny fictional catalogue (3–4
   products with price, stock status, a delivery policy, a return policy, and
   business hours) directly in the JS. Give the visitor a few clickable quick-
   reply buttons matching the real top customer questions from the data
   ("What's the price?", "Do you deliver outside the city?", "Is this in
   stock?", "What's your return policy?", "Are you open right now?") plus a free
   text input. Typing/clicking triggers a simulated "AI seller" typing indicator
   and then a reply generated from the local catalogue data (simple keyword
   matching is fine — this does not need a real LLM call). End the flow with a
   simulated COD confirmation message being auto-sent once a fake "order" is
   placed, to demonstrate the second half of the wedge. Label it clearly as a
   product concept demo, not live data.
7. **Cross-Cutting Findings** — the reply-speed-vs-lost-sales pattern (Maheen &
   Shamoon reply fast, zero lost sales; StickerMania replies slow, lost 2 sales)
   as a simple visual comparison, plus 2–3 bullet takeaways for the wedge.
8. **Early Access Waitlist & Benchmarks** — a compact table or stat strip of the
   benchmark numbers, and the waitlist status per contact.
9. **Next Steps** — short bulleted roadmap (from `research_findings.md`'s
   "Gaps & Next Steps" section).
10. **Footer** — squad name, program name, and a note that full source data
    (survey sheet + interview doc) lives in the repo, with a placeholder link
    you can update.

## Visual direction

- Modern, clean, startup-credible — not a generic Bootstrap template. Think
  confident sans-serif type, generous whitespace, a restrained color palette
  (pick one deep accent color plus neutrals — a warm terracotta, deep teal, or
  navy would all fit a Pakistani social-commerce/fashion-jewellery product
  without being literal about it).
- Use subtle motion: fade/slide-in on scroll for sections, an animated count-up
  for the headline stat chips, and a real typing-indicator animation in the
  chat demo. Keep it tasteful — no parallax gimmicks, no autoplay video.
- Charts should share one consistent color system with the rest of the page.
- Make sure every number displayed traces back to `research_data.json` — if you
  need a number that isn't there, pull it from `research_findings.md` instead of
  inventing one.

## Deliverables

- `index.html` (+ `styles.css` / `script.js` if split)
- Make sure it's ready to serve as-is via GitHub Pages (relative paths only, no
  absolute local file paths).
- Briefly tell me at the end which file(s) you created and how to preview it
  locally (e.g. `open index.html` or a one-line static server command).

---

## Files to attach in Cursor

Attach these two files to the prompt message above:

1. **`research_data.json`** — structured survey stats, interview data, and
   benchmarks. This is what the charts and demo catalogue should be built from,
   so Cursor doesn't have to guess or fabricate numbers.
2. **`research_findings.md`** — the full narrative report (idea recap, interview
   write-ups, cross-findings, gaps/next steps) for context, quotes, and prose
   Cursor can pull from.

You don't need to attach the original `.xlsx` or `.docx` — Cursor works best
with plain text, and everything in those files that's relevant to the landing
page is already extracted into the two files above. If you later want to open
the project as a full folder in Cursor (recommended), just drop both files into
the project root before running the prompt — Cursor will pick them up from
context automatically, and you won't need to attach them manually each time.
