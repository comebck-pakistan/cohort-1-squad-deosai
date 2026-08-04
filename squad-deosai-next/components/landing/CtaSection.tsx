"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { ButtonLink } from "@/components/ui/Button";
import { useReveal } from "./use-reveal";

export function CtaSection() {
  const scope = useReveal<HTMLElement>();

  return (
    <section ref={scope} className="px-4 pb-28 sm:px-6 font-landing">
      <div
        data-reveal
        className="surface-dark relative mx-auto max-w-7xl overflow-hidden rounded-3xl px-6 py-20 sm:px-12 sm:py-28"
      >
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-paper/50 uppercase">
            Automate routine chats
          </p>
          <h2 className="font-heading mt-6 text-4xl leading-[1.08] tracking-wide text-paper sm:text-6xl md:text-7xl">
            Ready to automate
            <br />
            <span className="bg-gradient-to-r from-teal-bright to-accent bg-clip-text text-transparent">
              your customer support?
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-paper/65">
            Spend less time answering repetitive messages and more time growing your business.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="/auth/signup" size="lg" className="bg-teal text-paper hover:bg-teal-bright h-12 px-7 text-base">
              Request Early Access
              <HugeiconsIcon icon={ArrowRight02Icon} size={18} strokeWidth={2} />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
