"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { useReveal } from "./use-reveal";

export function PricingSection() {
  const scope = useReveal<HTMLElement>();

  return (
    <section ref={scope} id="pricing" className="relative py-28 sm:py-36 font-landing border-t border-line bg-paper/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center" data-reveal>
          <Badge
            tone="teal"
            className="rounded-full border border-teal/15 bg-teal-soft px-4 py-1.5 text-teal"
          >
            Pricing
          </Badge>
          <h2 className="font-heading mt-5 text-4xl leading-[1.1] tracking-wide text-ink sm:text-5xl md:text-6xl">
            Start free.
            <br />
            <span className="text-outline">Upgrade later.</span>
          </h2>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-14 grid gap-8 max-w-3xl mx-auto md:grid-cols-2">
          {/* Card 1 — Early Access */}
          <div data-reveal className="h-full">
            <div className="group h-full flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:shadow-[0_24px_60px_-24px_rgba(0,167,199,0.3)]">
              <div>
                <h3 className="font-heading text-lg tracking-wider text-ink-soft">
                  Early Access
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-heading text-4xl tracking-tight text-ink sm:text-5xl">Free</span>
                  <span className="text-sm text-ink-faint">7–14 day pilot</span>
                </div>

                <ul className="mt-8 space-y-4">
                  {[
                    "Guided onboarding",
                    "WhatsApp setup",
                    "Product catalogue",
                    "FAQ upload",
                    "Dashboard",
                    "Priority support",
                  ].map((feat) => (
                    <li key={feat} className="flex items-center gap-3 text-sm text-ink-soft">
                      <span className="text-teal shrink-0">
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} strokeWidth={1.8} />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <ButtonLink href="/auth/signup" size="lg" className="w-full bg-teal text-paper hover:bg-teal-bright text-center justify-center">
                  Request Early Access
                </ButtonLink>
              </div>
            </div>
          </div>

          {/* Card 2 — Starter */}
          <div data-reveal data-reveal-delay="0.08" className="h-full">
            <div className="group h-full flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:shadow-[0_24px_60px_-24px_rgba(0,167,199,0.3)] opacity-95">
              <div>
                <h3 className="font-heading text-lg tracking-wider text-ink-soft">
                  Starter
                </h3>
                <div className="mt-4 flex flex-col gap-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-4xl tracking-tight text-ink sm:text-5xl">Coming Soon</span>
                  </div>
                  <span className="text-xs font-semibold text-teal mt-1">Expected pricing: Rs. 500–1,000/month</span>
                </div>

                <p className="mt-8 text-sm leading-6 text-ink-soft">
                  Everything from Early Access plus future platform updates.
                </p>
              </div>

              <div className="mt-8">
                <ButtonLink href="/auth/signup" size="lg" variant="outline" className="w-full border-teal/30 text-ink-soft hover:bg-teal-soft/10 text-center justify-center pointer-events-none">
                  Coming Soon
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-center text-xs text-ink-faint" data-reveal>
          Final pricing may vary based on WhatsApp costs and future platform features.
        </p>
      </div>
    </section>
  );
}
