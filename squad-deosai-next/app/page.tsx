import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { LiveThread } from "@/components/marketing/LiveThread";
import { Reveal } from "@/components/ui/Reveal";
import { Pulse } from "@/components/ui/Pulse";
import { ButtonLink } from "@/components/ui/Button";
import { research } from "@/lib/mock-data";

const fiveQuestions = [
  "What's the price?",
  "Do you deliver to my city?",
  "Is this in stock?",
  "What's your return policy?",
  "Are you open right now?",
];

const steps = [
  {
    title: "Create your account",
    body: "Sign up with your email in under a minute. No card, no setup call.",
  },
  {
    title: "Add your catalogue",
    body: "Type products in, paste a list, or upload a sheet. Set your delivery, returns and hours once.",
  },
  {
    title: "Connect WhatsApp",
    body: "Link your business number. You keep replying whenever you want — the assistant only answers what you haven't.",
  },
  {
    title: "Sleep. It replies.",
    body: "Price, delivery, stock, returns and hours answered instantly, 24/7 — and COD orders confirmed for you.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-marigold-soft blur-3xl opacity-60"
          />
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-16 pb-20 md:grid-cols-2 md:pt-24 md:pb-28">
            <div>
              <Pulse label="always on" />
              <h1 className="mt-5 font-display text-5xl leading-[1.02] tracking-tight text-ink sm:text-6xl">
                You&apos;re asleep.
                <br />
                Your shop <span className="text-teal italic">isn&apos;t.</span>
              </h1>
              <p className="mt-6 max-w-md text-lg text-ink-soft">
                Deosai answers the questions your customers actually ask —
                price, delivery, availability, returns and hours — straight from
                your own catalogue. And it confirms COD orders while you sleep.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ButtonLink href="/auth/signup" size="lg">
                  Start free
                </ButtonLink>
                <ButtonLink href="/dashboard" size="lg" variant="outline">
                  See the dashboard
                </ButtonLink>
              </div>
              <p className="mt-6 font-mono text-xs text-ink-faint">
                Built with {research.uniqueSellers} Pakistani sellers · fashion &
                jewellery
              </p>
            </div>

            <div className="flex justify-center md:justify-end">
              <LiveThread />
            </div>
          </div>
        </section>

        {/* ================= PROBLEM ================= */}
        <section id="problem" className="border-y border-line bg-card">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-widest text-marigold">
                The overnight leak
              </p>
              <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight text-ink">
                The DM comes at midnight. You reply at nine. The sale left at
                twelve-oh-one.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {[
                {
                  stat: `${research.lostSalePct}%`,
                  label:
                    "of sellers we surveyed have lost a sale because they couldn't reply fast enough.",
                },
                {
                  stat: `${research.manualReplyPct}%`,
                  label:
                    "reply to every single customer message by hand — no assistant, no shortcuts.",
                },
                {
                  stat: "Same 5",
                  label:
                    "questions, over and over: price, delivery, availability, returns, hours.",
                },
              ].map((c, i) => (
                <Reveal key={c.stat} delay={i * 80}>
                  <div className="h-full rounded-[var(--radius-card)] border border-line bg-paper p-6">
                    <p className="font-display text-4xl text-teal">{c.stat}</p>
                    <p className="mt-3 text-sm text-ink-soft">{c.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SOLUTION ================= */}
        <section className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-widest text-marigold">
                What Deosai does
              </p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-ink">
                It reads your catalogue, so it answers like you would.
              </h2>
              <p className="mt-5 text-ink-soft">
                No scripts to write. Add your products and policies once, connect
                WhatsApp, and every common question gets an instant, correct
                answer in your shop&apos;s voice. When a customer says yes,
                Deosai sends the COD confirmation automatically.
              </p>
              <ul className="mt-6 space-y-3">
                {fiveQuestions.map((q) => (
                  <li key={q} className="flex items-center gap-3 text-ink">
                    <span className="grid h-6 w-6 flex-none place-items-center rounded-full bg-live-soft text-live">
                      ✓
                    </span>
                    <span className="text-sm">{q}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-[var(--radius-card)] border border-line bg-teal p-8 text-paper">
                <Pulse label="online" />
                <p className="mt-4 font-display text-2xl leading-snug">
                  &ldquo;A bot can&apos;t replace the human touch.&rdquo;
                </p>
                <p className="mt-3 text-sm text-paper/80">
                  We heard that too. So Deosai handles the repetitive triage —
                  prices, stock, delivery — and quietly hands the real
                  conversations back to you. You stay the shop; it just stops
                  the leaks.
                </p>
                <p className="mt-6 font-mono text-xs text-paper/60">
                  — a custom-order seller we interviewed
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================= HOW IT WORKS (a real sequence) ================= */}
        <section id="how" className="border-y border-line bg-card">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <Reveal>
              <h2 className="font-display text-4xl text-ink">
                Live in an afternoon
              </h2>
              <p className="mt-3 max-w-md text-ink-soft">
                Four steps, in order. Most sellers finish before their evening
                rush.
              </p>
            </Reveal>
            <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 80} as="li">
                  <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-paper p-6">
                    <span className="font-mono text-sm text-marigold">
                      0{i + 1}
                    </span>
                    <h3 className="mt-3 font-display text-lg text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ================= PROOF ================= */}
        <section id="proof" className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-marigold">
              Not a hunch
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight text-ink">
              We asked {research.surveyResponses} sellers and sat down with four
              more before writing a line of code.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { k: `${research.usefulPct}%`, v: "call a catalogue-aware assistant very or extremely useful" },
              { k: `${research.openToTestingPct}%`, v: "were open to testing an early version" },
              { k: research.modalPrice, v: "the price most sellers would happily pay per month" },
              { k: research.largestSeller, v: "one brand still doing this by hand, with zero after-hours cover" },
            ].map((c, i) => (
              <Reveal key={c.k} delay={i * 70}>
                <div className="h-full rounded-[var(--radius-card)] border border-line bg-card p-6">
                  <p className="font-display text-3xl text-teal">{c.k}</p>
                  <p className="mt-3 text-sm text-ink-soft">{c.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="mx-auto max-w-6xl px-5 pb-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-teal px-8 py-16 text-center text-paper">
              <div
                aria-hidden
                className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-live/25 blur-3xl"
              />
              <div className="relative">
                <h2 className="mx-auto max-w-xl font-display text-4xl leading-tight">
                  Stop losing the midnight sale.
                </h2>
                <p className="mx-auto mt-4 max-w-md text-paper/80">
                  Add your catalogue, connect WhatsApp, and let Deosai take the
                  night shift. Free while we&apos;re in early access.
                </p>
                <div className="mt-8 flex justify-center">
                  <ButtonLink href="/auth/signup" size="lg" variant="accent">
                    Start free
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
