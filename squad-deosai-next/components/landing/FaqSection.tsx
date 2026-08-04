"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { useReveal } from "./use-reveal";

const faqs = [
  {
    q: "What is Jawab AI?",
    a: "Jawab AI is an automated assistant that answers WhatsApp messages for your business using your custom product catalogue and store policies.",
  },
  {
    q: "Who is it for?",
    a: "It is built for Pakistani social commerce sellers, jewelry brands, and clothing stores managing high volumes of customer DMs.",
  },
  {
    q: "Can I keep my WhatsApp number?",
    a: "Yes. You connect your existing business WhatsApp number directly so customers continue chatting with the brand they recognize.",
  },
  {
    q: "How does it know my products?",
    a: "You upload a CSV/Excel sheet of your catalogue or paste your product text. Jawab AI only answers using information from this uploaded data.",
  },
  {
    q: "Will AI answer everything?",
    a: "No. It only replies to simple, routine questions like prices, stock, or delivery rates. Complex inquiries are flagged for your manual reply.",
  },
  {
    q: "How much will it cost?",
    a: "The early access pilot is completely free. Future starter plans will cost between Rs. 500 to Rs. 1,000 per month.",
  },
];

export function FaqSection() {
  const scope = useReveal<HTMLElement>();

  return (
    <section ref={scope} id="faq" className="relative py-28 sm:py-36 font-landing">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          {/* Sticky intro column */}
          <div data-reveal>
            <div className="lg:sticky lg:top-32">
              <Badge
                tone="teal"
                className="rounded-full border border-teal/15 bg-teal-soft px-4 py-1.5 text-teal"
              >
                FAQ
              </Badge>
              <h2 className="font-heading mt-5 text-4xl leading-[1.1] tracking-wide text-ink sm:text-5xl md:text-6xl">
                Frequently
                <br />
                <span className="text-outline">Asked.</span>
              </h2>
              <p className="mt-5 max-w-sm text-ink-soft">
                Answers to the most common questions about Jawab AI.
              </p>
              <ButtonLink href="/auth/signup" className="bg-teal text-paper mt-8 h-11 border-0 px-6">
                Request Early Access
                <HugeiconsIcon icon={ArrowRight02Icon} size={16} strokeWidth={2} />
              </ButtonLink>
            </div>
          </div>

          {/* Numbered accordion */}
          <div data-reveal data-reveal-delay="0.1">
            <Accordion className="w-full border-0 space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={faq.q}
                  value={`item-${i}`}
                  className="rounded-2xl border border-line bg-card px-6 transition-colors duration-300 last:border-b data-[state=open]:border-teal/30 sm:px-8"
                >
                  <AccordionTrigger className="gap-5 py-6 hover:no-underline">
                    <span className="flex items-baseline gap-5 text-left">
                      <span className="font-mono text-sm text-teal">0{i + 1}</span>
                      <span className="font-heading text-base tracking-wide text-ink sm:text-lg">
                        {faq.q}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-7 pl-9 text-[15px] leading-7 text-ink-soft">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
