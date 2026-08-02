import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { LiveThread } from "@/components/marketing/LiveThread";
import { Reveal } from "@/components/ui/Reveal";
import { Pulse } from "@/components/ui/Pulse";
import { ButtonLink } from "@/components/ui/Button";
import { research } from "@/lib/mock-data";

const features = [
  {
    title: "Real-time answers",
    description: "Instant responses to product, delivery, and refund questions with zero manual typing.",
  },
  {
    title: "Automated COD confirmations",
    description: "Reduce order leakage by confirming cash-on-delivery requests automatically.",
  },
  {
    title: "Built for scale",
    description: "Deploy across multiple catalogues, teams, and WhatsApp numbers without extra setup.",
  },
  {
    title: "Trustworthy operations",
    description: "Enterprise-grade controls, audit-ready logs, and instant handoff for any exception.",
  },
];

const workflow = [
  {
    step: "Connect",
    label: "WhatsApp & catalogue synced in minutes.",
  },
  {
    step: "Observe",
    label: "Live message traffic and alerts in one dashboard.",
  },
  {
    step: "Automate",
    label: "Auto-reply the routine and keep the important conversations human.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="bg-surface text-ink">
        <section className="relative overflow-hidden bg-surface pb-12">
          {/* Animated Background Orbs */}
          <div className="orb w-[500px] h-[500px] bg-teal-soft top-[-10%] left-[-10%] animate-float" />
          <div className="orb w-[600px] h-[600px] bg-accent-soft bottom-[-20%] right-[-10%] animate-float-delayed" />
          
          <div className="mx-auto max-w-7xl px-5 py-24 lg:py-32 relative z-10">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-8">
                <Reveal delay={0}>
                  <div className="inline-flex items-center gap-3 rounded-full border border-teal/20 bg-white/70 px-4 py-2 text-sm text-teal shadow-sm glass-panel hover-glow">
                    <Pulse label="24/7 AI Assistant" tone="live" />
                    <span className="font-medium">Trusted by top Pakistani sellers</span>
                  </div>
                </Reveal>
                
                <Reveal delay={100} as="h1" className="max-w-3xl text-5xl font-display font-semibold tracking-tight text-ink sm:text-6xl/tight">
                  <span className="text-gradient">Never miss a DM again</span>
                  <br />
                  your WhatsApp store runs 24/7.
                </Reveal>
                
                <Reveal delay={200} as="p" className="max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
                  Empower your social selling with an AI assistant that instantly answers price inquiries, confirms COD orders, and keeps your operations flowing seamlessly around the clock.
                </Reveal>
                
                <Reveal delay={300} className="flex flex-wrap gap-4">
                  <ButtonLink href="/auth/signup" size="lg" className="bg-teal text-paper hover:bg-teal-bright shadow-xl shadow-teal/20 hover-glow">
                    Start your pilot
                  </ButtonLink>
                  <ButtonLink href="/dashboard" size="lg" variant="outline" className="border-teal text-teal hover:bg-teal-soft hover-glow">
                    View dashboard
                  </ButtonLink>
                </Reveal>
                
                <Reveal delay={400} className="grid gap-4 sm:grid-cols-3 pt-6">
                  {[
                    { value: "94%", label: "Resolution rate" },
                    { value: "1.8s", label: "Avg response" },
                    { value: "24/7", label: "Uptime guarantee" },
                  ].map((item) => (
                    <div key={item.value} className="rounded-[var(--radius-card)] border border-white/40 bg-white/60 p-5 shadow-sm glass-panel hover-glow cursor-default transition-all duration-300">
                      <p className="text-3xl font-semibold text-teal">{item.value}</p>
                      <p className="mt-2 text-sm font-medium text-ink-soft">{item.label}</p>
                    </div>
                  ))}
                </Reveal>
              </div>

              <Reveal delay={300} className="relative">
                <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-tr from-accent-soft to-teal-soft blur-3xl opacity-70 animate-float-delayed" />
                <div className="relative overflow-hidden rounded-[2.25rem] border border-white/60 bg-card glass-card shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                  <div className="px-6 py-5 border-b border-line bg-white/90 backdrop-blur-md">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-teal font-semibold">Live Demo</p>
                        <p className="mt-1 text-sm font-semibold text-ink">WhatsApp interaction</p>
                      </div>
                      <Pulse label="real-time" />
                    </div>
                  </div>
                  <div className="p-6 bg-[#efeae2]/30">
                    <LiveThread />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="product" className="mx-auto max-w-7xl px-5 py-24">
          <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-6">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-teal">Core capabilities</p>
              <h2 className="text-4xl font-display font-semibold text-ink sm:text-5xl">
                Engineered for teams that need clarity without complexity.
              </h2>
              <p className="max-w-xl text-lg leading-8 text-ink-soft">
                Deosai combines AI-powered conversation automation with performance monitoring, so your operations stay efficient and every customer interaction lands correctly.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <Reveal key={feature.title} className="glass-panel rounded-[var(--radius-card)] border border-line p-6 shadow-sm">
                  <p className="font-mono text-xs uppercase tracking-[0.32em] text-teal">Feature</p>
                  <h3 className="mt-4 text-xl font-semibold text-ink">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">{feature.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="benefits" className="border-t border-line bg-surface-strong">
          <div className="mx-auto max-w-7xl px-5 py-24">
            <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div className="space-y-6">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-teal">How it works</p>
                <h2 className="text-4xl font-display font-semibold text-ink sm:text-5xl">
                  Turn every routine request into a high-confidence reply.
                </h2>
                <p className="max-w-xl text-lg leading-8 text-ink-soft">
                  Keep the escalations for the human team while the assistant handles price checks, availability, delivery estimates, and COD confirmations automatically.
                </p>
              </div>
              <div className="grid gap-4">
                {workflow.map((item, index) => (
                  <Reveal key={item.step} delay={index * 80} className="rounded-[var(--radius-card)] border border-line bg-white/85 p-6 shadow-sm glass-panel">
                    <div className="flex items-center justify-between gap-3">
                      <div className="rounded-2xl bg-teal p-3 text-white">{index + 1}</div>
                      <p className="text-sm uppercase tracking-[0.25em] text-teal/80">{item.step}</p>
                    </div>
                    <p className="mt-4 text-lg font-semibold text-ink">{item.label}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="metrics" className="mx-auto max-w-7xl px-5 py-24">
          <div className="rounded-[2rem] border border-line bg-card glass-card p-10 shadow-2xl">
            <div className="grid gap-8 lg:grid-cols-3 lg:items-end">
              <div className="lg:col-span-2">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-teal">Performance highlights</p>
                <h2 className="mt-3 text-4xl font-display font-semibold text-ink sm:text-5xl">
                  Live operations metrics for the teams who need them.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-soft">
                  Track output, alerts, and efficiency in one elegant control center built for clarity and fast action.
                </p>
              </div>
              <div className="space-y-4 rounded-[1.5rem] border border-line bg-surface p-5">
                <div>
                  <p className="text-3xl font-semibold text-teal">94.2%</p>
                  <p className="text-sm text-ink-soft">Operational uptime</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-teal">128</p>
                  <p className="text-sm text-ink-soft">Active units</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {[
                {
                  title: "Real-time alerts",
                  value: "3 critical",
                  tone: "attention",
                },
                {
                  title: "Avg. response time",
                  value: "1.8s",
                  tone: "teal",
                },
                {
                  title: "Workflow accuracy",
                  value: "99.1%",
                  tone: "neutral",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-[var(--radius-card)] border border-line bg-white/85 p-6 shadow-sm glass-panel">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm uppercase tracking-[0.25em] text-ink-soft">{item.title}</p>
                    <span className={item.tone === "attention" ? "text-marigold" : item.tone === "teal" ? "text-teal" : "text-ink-soft"}>
                      {item.value}
                    </span>
                  </div>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-surface-strong">
                    <div className="h-full rounded-full bg-gradient-to-r from-teal to-accent" style={{ width: item.value === "3 critical" ? "55%" : item.value === "1.8s" ? "82%" : "98%" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
