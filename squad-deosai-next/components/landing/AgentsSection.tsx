"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  AiBrain01Icon,
  AiChat02Icon,
  InvoiceIcon,
  PackageIcon,
  BookOpen01Icon,
  ArrowRight02Icon,
} from "@hugeicons/core-free-icons";
import { Badge } from "@/components/ui/Badge";
import { useReveal } from "./use-reveal";

type WorkflowDef = {
  icon: IconSvgElement;
  name: string;
  blurb: string;
  tools: string[];
};

const workflows: WorkflowDef[] = [
  {
    icon: AiChat02Icon,
    name: "Real-time replies",
    blurb: "Answer common product and policy questions automatically.",
    tools: ["pricing check", "stock check", "delivery estimate"],
  },
  {
    icon: InvoiceIcon,
    name: "COD confirmations",
    blurb: "Confirm eligible cash-on-delivery orders before dispatch.",
    tools: ["address extraction", "COD record", "route check"],
  },
  {
    icon: PackageIcon,
    name: "Human handoff",
    blurb: "Complex conversations always come back to you.",
    tools: ["live chat", "manual override", "notifications"],
  },
  {
    icon: BookOpen01Icon,
    name: "Activity overview",
    blurb: "Track replies, confirmations and conversations waiting for review.",
    tools: ["performance analytics", "response speed", "conversion rate"],
  },
];

export function AgentsSection() {
  const scope = useReveal<HTMLElement>();

  return (
    <section ref={scope} id="product" className="relative py-28 sm:py-36 font-landing">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" data-reveal>
          <div className="max-w-xl">
            <Badge
              tone="teal"
              className="rounded-full border border-teal/15 bg-teal-soft px-4 py-1.5 text-teal"
            >
              One Dashboard.
            </Badge>
            <h2 className="font-heading mt-5 text-4xl leading-[1.1] tracking-wide text-ink sm:text-5xl md:text-6xl">
              Every conversation,
              <br />
              <span className="text-outline">in one place.</span>
            </h2>
          </div>
          <p className="max-w-sm text-ink-soft sm:pb-2">
            Jawab AI connects directly to your business WhatsApp to centralize customer chats, automate replies, and flag messages that need human review.
          </p>
        </div>

        {/* Command center hub */}
        <div className="mt-14 flex items-center gap-4" data-reveal>
          <div className="bg-teal text-paper flex items-center gap-3 px-5 py-3 rounded-xl shadow-md">
            <HugeiconsIcon icon={AiBrain01Icon} size={22} strokeWidth={1.8} />
            <div className="text-left">
              <div className="font-heading text-sm tracking-wider">Command Center</div>
              <div className="text-xs text-paper/85">observes · alerts · automates</div>
            </div>
          </div>
          <div className="h-px flex-1 bg-line" aria-hidden />
          <span className="font-mono text-xs text-ink-soft">routes to ↓</span>
        </div>

        {/* Index rows */}
        <div className="mt-8">
          {workflows.map((flow, i) => (
            <div key={flow.name} data-reveal data-reveal-delay={i * 0.06}>
              <div className="group relative cursor-default overflow-hidden border-t border-line last:border-b">
                {/* fill that slides up on hover */}
                <div
                  className="absolute inset-0 translate-y-full bg-teal transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0"
                  aria-hidden
                />
                <div className="relative flex flex-col gap-4 px-2 py-9 transition-colors duration-300 sm:flex-row sm:items-center sm:gap-8 sm:px-4">
                  <span className="font-mono text-sm text-teal-bright transition-colors duration-300 group-hover:text-paper/60">
                    0{i + 1}
                  </span>
                  <div className="flex items-center gap-4 sm:w-[40%]">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-teal/20 bg-teal-soft text-teal transition-colors duration-300 group-hover:border-paper/20 group-hover:bg-paper/10 group-hover:text-paper">
                      <HugeiconsIcon icon={flow.icon} size={22} strokeWidth={1.8} />
                    </span>
                    <h3 className="font-heading text-2xl tracking-wide text-ink transition-colors duration-300 group-hover:text-paper sm:text-3xl">
                      {flow.name}
                    </h3>
                  </div>
                  <div className="flex-1">
                    <p className="max-w-md text-sm leading-6 text-ink-soft transition-colors duration-300 group-hover:text-paper/70">
                      {flow.blurb}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {flow.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-md bg-surface px-2 py-0.5 font-mono text-[11px] text-ink-soft transition-colors duration-300 group-hover:bg-paper/10 group-hover:text-paper/70"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="hidden size-11 items-center justify-center rounded-full border border-line text-ink-soft transition-all duration-300 group-hover:-rotate-45 group-hover:border-paper/30 group-hover:text-paper sm:flex">
                    <HugeiconsIcon icon={ArrowRight02Icon} size={18} strokeWidth={2} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
