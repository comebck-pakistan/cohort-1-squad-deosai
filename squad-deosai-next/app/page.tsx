import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { HeroOrbit } from "@/components/marketing/HeroOrbit";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { research } from "@/lib/mock-data";
import {
  IconCheck,
  IconStar,
  IconChevronDown,
  IconArrowRight,
  IconBolt,
  IconHand,
  IconWhatsApp,
  IconInstagram,
  IconMessenger,
  IconGlobe,
} from "@/components/marketing/icons";

const sellers = [
  "StickerMania",
  "Jewellery with Maheen",
  "Meher Handmade",
  "Zara Threads",
  "The Kajal Co.",
  "Noor Attire",
  "Bagh Ceramics",
  "Rung Studio",
];

const stats = [
  {
    value: `${research.lostSalePct}%`,
    label: "of sellers have lost a sale to a slow reply",
    tag: "Why we exist",
    featured: true,
  },
  {
    value: `${research.manualReplyPct}%`,
    label: "handle every single message themselves today",
    tag: "The grind",
  },
  {
    value: `${research.usefulPct}%`,
    label: "want a catalogue-aware assistant on WhatsApp",
    tag: "The pull",
  },
  {
    value: `${research.openToTestingPct}%`,
    label: "were open to testing an early Deosai",
    tag: "The trust",
  },
];

const answerPoints = [
  "Price, stock & delivery areas",
  "Returns policy & shop hours",
  "Urdu, Roman Urdu & English",
];

const featureCards = [
  {
    title: "Confirms COD orders while you're offline",
    body: "When a customer says yes, Deosai sends the Cash-on-Delivery confirmation and logs the order for you — even at 3 AM.",
  },
  {
    title: "Hands the real conversations back to you",
    body: "Anything outside your catalogue is never guessed. It's flagged “needs you”, so you step in exactly when it matters.",
  },
];

const channels = [
  { icon: IconWhatsApp, name: "WhatsApp" },
  { icon: IconInstagram, name: "Instagram" },
  { icon: IconMessenger, name: "Messenger" },
  { icon: IconGlobe, name: "Urdu · Roman" },
];

const testimonials = [
  {
    initial: "K",
    name: "Khadija",
    shop: "StickerMania",
    quote:
      "I missed one DM at night and lost two sure customers. Now the price goes out the second someone asks — even at 2 AM.",
  },
  {
    initial: "M",
    name: "Maheen",
    shop: "Jewellery with Maheen",
    quote:
      "The same “is this available?” ten times a day. Deosai answers it now, so I only pick up when someone's ready to order.",
  },
  {
    initial: "S",
    name: "Sana",
    shop: "Zara Threads",
    quote:
      "It replies in Roman Urdu exactly the way I do. Customers can't tell it isn't me typing.",
  },
  {
    initial: "N",
    name: "Noor",
    shop: "Noor Attire",
    quote:
      "COD confirmations used to slip overnight. Now every order is logged by morning, ready to pack.",
  },
  {
    initial: "B",
    name: "Bushra",
    shop: "Bagh Ceramics",
    quote:
      "Setup took one afternoon. No developer, no website — I just pasted my catalogue and connected WhatsApp.",
  },
  {
    initial: "R",
    name: "Rabia",
    shop: "Rung Studio",
    quote:
      "When something's unclear it hands the chat to me instead of guessing. That trust is why I kept it on.",
  },
];

const faqs = [
  {
    q: "What if a customer asks something outside my catalogue?",
    a: "Deosai never guesses. It tells the customer you'll check personally and flags the chat as “needs you”, so you can jump in and reply yourself.",
  },
  {
    q: "Does it work in Urdu and Roman Urdu?",
    a: "Yes. It understands and replies in Urdu, Roman Urdu and English, matching the way your customer writes to you.",
  },
  {
    q: "Can I turn it off during a live sale?",
    a: "Anytime, with one tap. You can also just start replying yourself and Deosai quietly steps back for that conversation.",
  },
  {
    q: "What happens to orders it can't confirm?",
    a: "Nothing ships on a wrong assumption. Anything unclear is handed straight to you, clearly marked, so you make the final call.",
  },
  {
    q: "Do I need a website or any tech setup?",
    a: "No. If you sell through Instagram DMs and WhatsApp, you're ready. Most sellers are live in a single afternoon.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden bg-green text-white">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-32 md:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28">
            <Reveal>
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[13px] font-medium tracking-tight text-white backdrop-blur">
                For Instagram &amp; WhatsApp sellers
              </span>

              <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.4rem]">
                Answer every DM. Even while you sleep.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed tracking-tight text-primary-50">
                Deosai reads your own catalogue and instantly answers the five
                questions every customer asks — price, delivery, stock, returns
                and hours — in your shop&apos;s voice, and confirms
                Cash-on-Delivery orders while you&apos;re offline.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ButtonLink href="/auth/signup" variant="white" size="lg">
                  Start free
                  <IconArrowRight className="h-5 w-5" />
                </ButtonLink>
                <a
                  href="#how"
                  className="inline-flex h-13 items-center gap-1.5 rounded-full border border-white/30 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  See how it works
                </a>
              </div>

              <p className="mt-5 font-mono text-xs text-primary-100">
                Free during early access · no card required
              </p>
            </Reveal>

            <Reveal delay={120} className="flex justify-center lg:justify-end">
              <HeroOrbit />
            </Reveal>
          </div>
        </section>

        {/* ================= SOCIAL PROOF ================= */}
        <section className="border-b border-hairline bg-snow py-12">
          <p className="text-center font-mono text-[11px] uppercase tracking-widest text-slate-faint">
            Built with {research.uniqueSellers} Pakistani fashion &amp; jewellery sellers
          </p>
          <div className="marquee-mask mt-6 flex overflow-hidden">
            <div className="marquee-track flex shrink-0 items-center gap-12 pr-12">
              {[...sellers, ...sellers].map((s, i) => (
                <span
                  key={`${s}-${i}`}
                  className="whitespace-nowrap font-display text-lg font-bold text-slate-faint/80"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ================= WHY DEOSAI (stats) ================= */}
        <section id="why" className="bg-snow">
          <div className="mx-auto max-w-6xl px-5 py-24">
            <Reveal className="grid gap-8 md:grid-cols-2 md:items-end">
              <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-coal sm:text-5xl">
                Built with real sellers, for the way they actually sell
              </h2>
              <p className="text-lg leading-relaxed tracking-tight text-slate">
                We surveyed {research.surveyResponses} sellers and sat down with
                four of them. The same story kept coming up — the sale doesn&apos;t
                die from bad products, it dies from a slow reply.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.tag} delay={i * 70}>
                  <div
                    className={
                      s.featured
                        ? "flex h-full flex-col justify-between rounded-3xl bg-green p-7 text-white"
                        : "flex h-full flex-col justify-between rounded-3xl border border-hairline bg-mist p-7"
                    }
                  >
                    <p
                      className={
                        s.featured
                          ? "font-display text-5xl font-bold tracking-[-0.03em] text-white"
                          : "font-display text-5xl font-bold tracking-[-0.03em] text-coal"
                      }
                    >
                      {s.value}
                    </p>
                    <p
                      className={
                        s.featured
                          ? "mt-3 text-sm leading-snug text-primary-50"
                          : "mt-3 text-sm leading-snug text-slate"
                      }
                    >
                      {s.label}
                    </p>
                    <span
                      className={
                        s.featured
                          ? "mt-6 inline-flex w-fit rounded-full bg-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white"
                          : "mt-6 inline-flex w-fit rounded-full bg-forest px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white"
                      }
                    >
                      {s.tag}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FEATURE SPLIT (learns your shop) ================= */}
        <section id="how" className="border-t border-hairline bg-snow">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-24 lg:grid-cols-2">
            <Reveal>
              <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-coal sm:text-[2.6rem]">
                Learns your shop. Answers in your voice.
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed tracking-tight text-slate">
                Add your products and policies once. Deosai answers the questions
                that fill your inbox — warmly, correctly, and exactly the way you
                would type them.
              </p>
              <ul className="mt-7 flex flex-col gap-3">
                {answerPoints.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-[15px] font-medium text-coal">
                    <span className="grid h-6 w-6 flex-none place-items-center rounded-full bg-green-soft text-green-deep">
                      <IconCheck className="h-3.5 w-3.5" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <ButtonLink href="/auth/signup" size="lg" className="mt-9">
                Start free
                <IconArrowRight className="h-5 w-5" />
              </ButtonLink>
            </Reveal>

            {/* catalogue reply mockup */}
            <Reveal delay={120}>
              <div className="rounded-[2rem] border border-hairline bg-mist p-6 sm:p-10">
                <div className="mx-auto w-full max-w-sm rounded-3xl border border-hairline bg-snow p-2 shadow-[0_30px_70px_-40px_rgba(11,17,15,0.5)]">
                  <div className="flex items-center gap-3 rounded-[1.4rem] bg-forest px-4 py-3 text-snow">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-green font-display text-sm font-bold text-snow">
                      M
                    </span>
                    <div className="leading-tight">
                      <p className="text-sm font-semibold">Meher Handmade</p>
                      <p className="font-mono text-[11px] text-primary-100">auto-replying · 2:47 AM</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2.5 px-3 py-4">
                    <div className="max-w-[80%] self-start rounded-2xl rounded-bl-md bg-mist px-3.5 py-2 text-sm text-coal">
                      Aoa, price of the gold hoops? 😍
                    </div>
                    <div className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-green px-3.5 py-2 text-left text-sm text-snow">
                      Wa alaikum assalam! The Gold-tone Hoops are Rs. 1,900 — only
                      a few left. Reserve a pair?
                    </div>
                    <div className="max-w-[85%] self-end rounded-2xl rounded-br-md border border-green-tint bg-green-soft px-3.5 py-2 text-left text-sm text-coal">
                      <span className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-green-deep">
                        COD confirmation · sent for you
                      </span>
                      Order confirmed ✅ Gold-tone Hoops · Rs. 1,900 · COD Lahore.
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================= TWO FEATURE CARDS ================= */}
        <section className="border-t border-hairline bg-snow">
          <div className="mx-auto max-w-6xl px-5 py-24">
            <Reveal>
              <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-coal sm:text-5xl">
                Everything the night shift needs
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {featureCards.map((c, i) => (
                <Reveal key={c.title} delay={i * 90}>
                  <div className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-hairline bg-mist">
                    <div className="flex items-center justify-center px-8 pt-10">
                      <div className="w-full max-w-xs rounded-2xl border border-hairline bg-snow p-4 shadow-[0_24px_50px_-34px_rgba(11,17,15,0.55)]">
                        {i === 0 ? (
                          <>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-green-deep">
                              <IconBolt className="h-3 w-3" /> COD confirmed
                            </span>
                            <p className="mt-3 text-sm text-coal">
                              Order confirmed &amp; logged for you at
                              <span className="font-semibold"> 2:48 AM</span>.
                            </p>
                            <div className="mt-3 flex items-center justify-between rounded-xl bg-mist px-3 py-2 text-xs text-slate">
                              <span>Gold-tone Hoops</span>
                              <span className="font-semibold text-coal">Rs. 1,900</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-forest px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white">
                              <IconHand className="h-3 w-3" /> Needs you
                            </span>
                            <p className="mt-3 text-sm text-coal">
                              &ldquo;Can you make this in a custom size?&rdquo;
                            </p>
                            <p className="mt-3 rounded-xl bg-mist px-3 py-2 text-xs text-slate">
                              Flagged for you — Deosai won&apos;t guess.
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-coal">
                        {c.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-slate">
                        {c.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= INTEGRATIONS (green) ================= */}
        <section className="bg-snow">
          <div className="mx-auto max-w-6xl px-5 pb-24">
            <Reveal>
              <div className="banner-stripes grid gap-12 overflow-hidden rounded-[2.5rem] bg-forest px-8 py-14 text-white sm:px-14 lg:grid-cols-2 lg:items-center">
                <div>
                  <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-[2.6rem]">
                    Works where you already sell
                  </h2>
                  <p className="mt-5 max-w-md text-lg leading-relaxed tracking-tight text-primary-50">
                    No new app for your customers to learn. Deosai plugs into the
                    channels you already use and speaks the way Pakistan actually
                    types.
                  </p>
                  <ButtonLink
                    href="/auth/signup"
                    variant="white"
                    size="lg"
                    className="mt-8"
                  >
                    Connect your channels
                    <IconArrowRight className="h-5 w-5" />
                  </ButtonLink>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2">
                  {channels.map((c) => (
                    <div
                      key={c.name}
                      className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
                    >
                      <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-forest">
                        <c.icon className="h-6 w-6" />
                      </span>
                      <span className="text-sm font-semibold text-white">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section id="proof" className="border-t border-hairline bg-snow">
          <div className="mx-auto max-w-6xl px-5 py-24">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-coal sm:text-5xl">
                Loved by the sellers who tested it
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed tracking-tight text-slate">
                {research.uniqueSellers} Pakistani fashion and jewellery sellers,
                {" "}{research.surveyResponses} in a survey and four in long
                interviews. Here&apos;s what they told us.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t, i) => (
                <Reveal key={t.shop} delay={(i % 3) * 80}>
                  <figure className="flex h-full flex-col rounded-3xl border border-hairline bg-mist p-7">
                    <div className="flex items-center gap-1 text-green">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <IconStar key={s} className="h-4 w-4" />
                      ))}
                    </div>
                    <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-coal">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-hairline pt-5">
                      <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-green font-display font-bold text-snow">
                        {t.initial}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-coal">{t.name}</p>
                        <p className="text-xs text-slate-faint">{t.shop}</p>
                      </div>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PRICING ================= */}
        <section id="pricing" className="border-t border-hairline bg-mist">
          <div className="mx-auto max-w-6xl px-5 py-24">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-coal sm:text-5xl">
                Free while we&apos;re in early access
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed tracking-tight text-slate">
                No card, no commitment. Cost shouldn&apos;t be the reason you keep
                losing the midnight sale.
              </p>
            </Reveal>

            <Reveal className="mt-14">
              <div className="mx-auto max-w-md overflow-hidden rounded-[2rem] border border-green bg-snow shadow-[0_40px_90px_-50px_rgba(18,45,39,0.6)]">
                <div className="banner-stripes bg-forest px-8 py-7 text-snow">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-primary-100">
                    Early access
                  </span>
                  <p className="mt-3 font-display text-5xl font-bold tracking-[-0.03em]">
                    Free
                    <span className="ml-2 align-middle text-base font-normal text-primary-100">
                      / while in early access
                    </span>
                  </p>
                </div>
                <div className="px-8 py-8">
                  <ul className="flex flex-col gap-3">
                    {[
                      "Full catalogue-aware auto-replies",
                      "Automatic COD order confirmations",
                      "Urdu, Roman Urdu & English",
                      "Jump in or switch off anytime",
                      "No card required to start",
                    ].map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm text-coal">
                        <span className="grid h-5 w-5 flex-none place-items-center rounded-full bg-green-soft text-green-deep">
                          <IconCheck className="h-3.5 w-3.5" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink href="/auth/signup" size="lg" className="mt-8 w-full">
                    Start free
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section id="faq" className="border-t border-hairline bg-snow">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-coal sm:text-[2.6rem]">
                Frequently asked questions
              </h2>
              <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-slate">
                The things sellers actually ask us before they switch Deosai on.
              </p>
              <ButtonLink href="/auth/signup" variant="outline" size="lg" className="mt-8">
                Talk to us
              </ButtonLink>
            </Reveal>

            <div className="flex flex-col gap-3">
              {faqs.map((item, i) => (
                <Reveal key={item.q} delay={i * 50}>
                  <details
                    className="group rounded-2xl border border-hairline bg-mist px-6 py-4 [&_summary::-webkit-details-marker]:hidden"
                    open={i === 0}
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-1 font-display text-lg font-semibold tracking-[-0.01em] text-coal">
                      {item.q}
                      <IconChevronDown className="h-5 w-5 flex-none text-green-deep transition-transform duration-200 group-open:rotate-180" />
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-slate">{item.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= BANNER ================= */}
        <section className="bg-snow">
          <div className="mx-auto max-w-6xl px-5 pb-24">
            <Reveal>
              <div className="banner-stripes relative overflow-hidden rounded-[2.5rem] bg-forest px-8 py-16 text-center text-white sm:py-20">
                <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-5xl">
                  Stop losing the midnight sale
                </h2>
                <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed tracking-tight text-primary-50">
                  Add your catalogue, connect WhatsApp, and let Deosai take the
                  night shift. Free during early access — no card required.
                </p>
                <div className="mt-8 flex justify-center">
                  <ButtonLink href="/auth/signup" variant="white" size="lg">
                    Start free
                    <IconArrowRight className="h-5 w-5" />
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
