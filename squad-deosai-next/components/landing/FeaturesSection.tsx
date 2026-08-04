"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ShieldIcon,
  CheckmarkCircle02Icon,
  DatabaseIcon,
  EyeIcon,
  WhatsappIcon,
  WalletIcon,
} from "@hugeicons/core-free-icons";
import { Badge } from "@/components/ui/Badge";
import { useReveal } from "./use-reveal";
import { cn } from "@/lib/utils";

export function FeaturesSection() {
  const scope = useReveal<HTMLElement>();

  return (
    <section ref={scope} id="features" className="relative py-28 sm:py-36 font-landing">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl" data-reveal>
          <Badge
            tone="teal"
            className="rounded-full border border-teal/15 bg-teal-soft px-4 py-1.5 text-teal"
          >
            Features
          </Badge>
          <h2 className="font-heading mt-5 text-4xl leading-[1.1] tracking-wide text-ink sm:text-5xl md:text-6xl">
            Automation.
            <br />
            <span className="text-outline">Without losing control.</span>
          </h2>
          <p className="mt-5 max-w-xl text-ink-soft">
            Keep complete oversight of customer communications while letting AI handle routine queries.
          </p>
        </div>

        {/* Bento grid */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {/* Cell 1 — human in the loop */}
          <div data-reveal className="md:col-span-2">
            <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:shadow-[0_24px_60px_-24px_rgba(0,167,199,0.3)] sm:p-9">
              <span className="flex size-11 items-center justify-center rounded-xl border border-teal/20 bg-teal-soft text-teal">
                <HugeiconsIcon icon={CheckmarkCircle02Icon} size={22} strokeWidth={1.8} />
              </span>
              <h3 className="font-heading mt-5 text-xl tracking-wider text-ink sm:text-2xl">
                Human Handoff
              </h3>
              <p className="mt-3 max-w-md text-[15px] leading-7 text-ink-soft">
                Review and approve AI draft replies, or take over customer chats at any time.
              </p>
              {/* mini approval queue mock */}
              <div className="mt-6 space-y-2.5">
                {[
                  ["Confirm Gold Hoops order · Rs. 1,900", "Approve"],
                  ["Customer asks for custom size/design", "Take Over"],
                ].map(([label, action]) => (
                  <div
                     key={label}
                     className="flex items-center justify-between rounded-xl border border-line bg-surface/40 px-4 py-3 text-sm"
                  >
                    <span className="text-ink-soft">{label}</span>
                    <span className={cn(
                      "px-3 py-1 text-xs font-medium rounded-md shadow-sm",
                      action === "Approve" ? "bg-teal text-paper" : "bg-ink-soft text-paper"
                    )}>{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cell 2 — Guardrails */}
          <div data-reveal data-reveal-delay="0.08">
            <div className="group h-full overflow-hidden rounded-2xl border border-line bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:shadow-[0_24px_60px_-24px_rgba(0,167,199,0.3)]">
              <span className="flex size-11 items-center justify-center rounded-xl border border-teal/20 bg-teal-soft text-teal">
                <HugeiconsIcon icon={ShieldIcon} size={22} strokeWidth={1.8} />
              </span>
              <h3 className="font-heading mt-5 text-xl tracking-wider text-ink">
                Tasks & Rules
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-ink-soft">
                Define strict guidelines and business instructions the AI must follow for every chat.
              </p>
              <div className="mt-6 rounded-xl bg-surface/60 p-3.5 font-mono text-[11px] leading-5 text-ink-soft">
                <span className="text-[#059669]">✓ follow</span> catalogue pricing
                <br />
                <span className="text-[#059669]">✓ restrict</span> return claims
                <br />
                <span className="text-[#059669]">✓ apply</span> delivery charges
              </div>
            </div>
          </div>

          {/* Cell 3 — Grounded catalog */}
          <div data-reveal>
            <div className="group h-full overflow-hidden rounded-2xl border border-line bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:shadow-[0_24px_60px_-24px_rgba(0,167,199,0.3)]">
              <span className="flex size-11 items-center justify-center rounded-xl border border-teal/20 bg-teal-soft text-teal">
                <HugeiconsIcon icon={DatabaseIcon} size={22} strokeWidth={1.8} />
              </span>
              <h3 className="font-heading mt-5 text-xl tracking-wider text-ink">
                Knowledge Base
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-ink-soft">
                Upload your Excel catalogues, policies, and FAQs to ground AI answers with absolute safety.
              </p>
            </div>
          </div>

          {/* Cell 4 — WhatsApp (wide cell) */}
          <div data-reveal data-reveal-delay="0.08" className="md:col-span-2">
            <div className="group flex h-full flex-col justify-between gap-6 overflow-hidden rounded-2xl border border-line bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:shadow-[0_24px_60px_-24px_rgba(0,167,199,0.3)] sm:flex-row sm:items-center sm:p-9">
              <div className="max-w-md">
                <span className="flex size-11 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366]">
                  <HugeiconsIcon icon={WhatsappIcon} size={22} strokeWidth={1.8} />
                </span>
                <h3 className="font-heading mt-5 text-xl tracking-wider text-ink sm:text-2xl">
                  COD Confirmations
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-ink-soft">
                  Automatically ask customers to verify their cash-on-delivery address and order details before shipping.
                </p>
              </div>
              <div className="font-heading shrink-0 text-right">
                <div className="text-5xl tracking-wide text-teal-bright sm:text-6xl">COD</div>
                <div className="mt-1 text-xs tracking-widest text-ink-soft uppercase">
                  auto-confirm
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
