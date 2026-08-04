"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  WhatsappIcon,
  AiBrain01Icon,
  WorkflowSquare01Icon,
} from "@hugeicons/core-free-icons";
import { Badge } from "@/components/ui/Badge";

type Step = {
  icon: IconSvgElement;
  title: string;
  detail: string;
  meta: string;
};

const steps: Step[] = [
  {
    icon: WhatsappIcon,
    title: "Connect",
    detail: "Connect your WhatsApp and set your business rules.",
    meta: "whatsapp integration",
  },
  {
    icon: AiBrain01Icon,
    title: "Train",
    detail: "Upload your catalogue, FAQs and store policies.",
    meta: "knowledge ingestion",
  },
  {
    icon: WorkflowSquare01Icon,
    title: "Reply",
    detail: "Jawab AI answers routine questions while keeping you in control.",
    meta: "automated responses",
  },
];

export function WorkflowSection() {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-flow='step']").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
      });

      gsap.from("[data-flow='head']", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-flow='head']", start: "top 85%" },
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} id="benefits" className="surface-dark relative py-28 text-paper font-landing">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          data-flow="head"
        >
          <div className="max-w-2xl">
            <Badge tone="teal" className="rounded-full border border-paper/15 bg-paper/10 px-4 py-1.5 text-paper">
              How it works
            </Badge>
            <h2 className="font-heading mt-5 text-4xl leading-[1.1] tracking-wide sm:text-5xl md:text-6xl">
              From question
              <br />
              <span className="text-paper/40">to answer.</span>
            </h2>
          </div>
          <p className="max-w-sm text-paper/60 sm:pb-2">
            Connect your catalog and let AI automate the routing.
          </p>
        </div>

        <div data-flow="list" className="mt-20 grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              data-flow="step"
              className="relative flex flex-col items-start p-7 rounded-2xl border border-paper/10 bg-paper/[0.03] transition-all duration-300 hover:border-paper/20 hover:bg-paper/[0.06]"
            >
              {/* Number indicator */}
              <span
                className="font-heading pointer-events-none absolute top-4 right-6 text-6xl tracking-wider text-paper/[0.04] select-none"
                aria-hidden
              >
                0{i + 1}
              </span>

              {/* Icon */}
              <span className="bg-teal text-paper border border-paper/10 flex size-12 items-center justify-center rounded-full shadow-lg">
                <HugeiconsIcon icon={step.icon} size={20} strokeWidth={1.8} />
              </span>

              {/* Text content */}
              <h3 className="font-heading mt-5 text-lg tracking-wider text-paper">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-6 text-paper/60 flex-1">
                {step.detail}
              </p>
              <span className="mt-4 inline-block rounded-md bg-paper/10 px-2.5 py-1 font-mono text-[10px] text-paper/50">
                {step.meta}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
