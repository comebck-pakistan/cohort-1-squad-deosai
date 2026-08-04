"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  WhatsappIcon,
  AiBrain01Icon,
  CheckmarkCircle02Icon,
  PackageIcon,
  InvoiceIcon,
  ArrowRight02Icon,
  ChartLineData01Icon,
  ShieldIcon,
  SentIcon,
  Refresh01Icon,
  DatabaseIcon,
} from "@hugeicons/core-free-icons";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils";

type Stage = "idle" | "typing" | "approved";

function ChatBubble({
  side,
  time,
  ticks,
  highlight,
  children,
  ...rest
}: {
  side: "in" | "out";
  time: string;
  ticks?: boolean;
  highlight?: boolean;
  children: React.ReactNode;
} & Record<string, unknown>) {
  return (
    <div
      {...rest}
      className={cn("flex w-full", side === "out" ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "relative max-w-[82%] rounded-2xl px-4 pt-2.5 pb-5 text-[14px] leading-6 shadow-sm",
          side === "out"
            ? "rounded-br-md bg-teal text-paper"
            : "rounded-bl-md border border-line bg-card-strong text-ink",
          highlight && "bg-live-soft text-ink border-live/30"
        )}
      >
        {children}
        <span
          className={cn(
            "absolute right-3 bottom-1.5 flex items-center gap-1 font-mono text-[9.5px]",
            side === "out" ? "text-paper/60" : "text-ink-soft/70"
          )}
        >
          {time}
          {ticks && <span className="text-[10px] tracking-[-0.18em] text-teal-bright">✓✓</span>}
        </span>
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex justify-end">
      <div className="rounded-2xl rounded-br-md bg-teal px-4 py-3.5">
        <span className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-1.5 animate-bounce rounded-full bg-paper/50"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

export function HeroSection() {
  const scope = useRef<HTMLElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const [stage, setStage] = useState<Stage>("idle");

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out", duration: 0.9 } })
        .from("[data-hero='badge']", { y: 24, opacity: 0 })
        .from("[data-hero='line']", { y: 80, opacity: 0, stagger: 0.12, duration: 1 }, "-=0.5")
        .from("[data-hero='sub']", { y: 28, opacity: 0 }, "-=0.6")
        .from("[data-hero='cta']", { y: 20, opacity: 0 }, "-=0.65")
        .from("[data-hero='preview']", { y: 80, opacity: 0, duration: 1.2 }, "-=0.5")
        .from(
          "[data-hero='bubble']",
          { y: 16, opacity: 0, stagger: 0.12, duration: 0.5 },
          "-=0.6"
        );

      gsap.to("[data-hero='orbit']", {
        y: -12,
        repeat: -1,
        yoyo: true,
        duration: 2.6,
        ease: "sine.inOut",
      });

      gsap.to("[data-hero='hint']", {
        y: -6,
        repeat: -1,
        yoyo: true,
        duration: 0.7,
        ease: "sine.inOut",
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  // subtle 3D tilt following the cursor over the window
  useEffect(() => {
    const el = windowRef.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const qx = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
    const qy = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
    gsap.set(el, { transformPerspective: 1400 });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      qx(x * 4);
      qy(y * -4);
    };
    const onLeave = () => {
      qx(0);
      qy(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // pop in newly arrived chat content + keep the thread scrolled to the bottom
  useEffect(() => {
    if (stage === "idle") return;
    gsap.from("[data-hero='pop']", {
      y: 18,
      opacity: 0,
      scale: 0.95,
      duration: 0.45,
      ease: "back.out(1.7)",
      stagger: 0.1,
    });
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [stage]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const approve = () => {
    if (stage !== "idle") return;
    setStage("typing");
    timerRef.current = window.setTimeout(() => setStage("approved"), 1100);
  };

  const replay = () => setStage("idle");

  return (
    <section ref={scope} className="relative pt-40 pb-24 sm:pt-48 overflow-hidden font-landing">
      <div className="bg-grid absolute inset-x-0 top-0 h-[80vh]" aria-hidden />

      <div className="relative mx-auto max-w-8xl px-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
          <div data-hero="badge">
            <Badge
              tone="teal"
              className="gap-1.5 rounded-full border border-teal/15 bg-teal-soft px-4 py-1.5 text-teal"
            >
              <HugeiconsIcon icon={AiBrain01Icon} size={14} strokeWidth={1.8} />
              Early access for Pakistani Social Sellers
            </Badge>
          </div>

          <h1 className="font-heading mt-8 text-[2.75rem] leading-[1.05] tracking-wide text-ink sm:text-6xl md:text-7xl xl:text-[5.5rem]">
            <span data-hero="line" className="block">
              Keep the conversations
            </span>
            <span
              data-hero="line"
              className=" bg-gradient-to-r from-teal-bright to-accent bg-clip-text text-transparent"
            >
            that matter.
            </span>
          </h1>

          <p
            data-hero="sub"
            className="mt-7 max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl"
          >
            Instead of spending hours replying to the same WhatsApp questions, let Jawab AI handle product enquiries, delivery questions and COD confirmations using your own catalogue and business rules.
          </p>

          <div data-hero="cta" className="mt-10 flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <ButtonLink href="/auth/signup" size="lg" className="bg-teal text-paper hover:bg-teal-bright px-7">
                Request Early Access
                <HugeiconsIcon icon={ArrowRight02Icon} size={18} strokeWidth={2} />
              </ButtonLink>
              <ButtonLink href="/dashboard" size="lg" variant="outline" className="border-teal text-teal hover:bg-teal-soft px-7">
                See Demo
              </ButtonLink>
            </div>
            <p className="mt-2 text-xs text-ink-faint">
              Private pilot • Selected Pakistani businesses
            </p>
          </div>
        </div>

        {/* Interactive demo: WhatsApp thread + agent trace */}
        <TooltipProvider delayDuration={150}>
          <div data-hero="preview" className="relative mx-auto mt-24 max-w-6xl">
            <div ref={windowRef} className="will-change-transform">
              <Card className="gap-0 overflow-hidden rounded-2xl border-line bg-card p-0 shadow-[0_40px_120px_-32px_rgba(0,167,199,0.25)]">
                {/* window chrome */}
                <div className="flex items-center gap-2 border-b border-line bg-surface/50 px-5 py-3.5">
                  <span className="size-3 rounded-full bg-[#f87171] transition-transform hover:scale-125" />
                  <span className="size-3 rounded-full bg-[#fbbf24] transition-transform hover:scale-125" />
                  <span className="size-3 rounded-full bg-[#34d399] transition-transform hover:scale-125" />
                  <span className="ml-3 font-mono text-xs text-ink-soft">
                    Jawab AI · live demo — try the approve button
                  </span>
                </div>

                <div className="grid gap-0 lg:min-h-[560px] lg:grid-cols-2">
                   {/* ───── WhatsApp side ───── */}
                  <div className="flex flex-col border-b border-line bg-surface/20 lg:border-r lg:border-b-0">
                    {/* chat header */}
                    <div className="flex items-center gap-3 border-b border-line bg-card-strong px-5 py-3.5">
                      <span className="font-heading flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-teal to-teal-bright text-xs text-paper">
                        MH
                      </span>
                      <div className="leading-tight">
                        <div className="text-sm font-semibold text-ink">Meher Handmade</div>
                        <div className="flex items-center gap-1.5 text-xs text-ink-soft">
                          <span className="size-1.5 rounded-full bg-[#34d399]" />
                          online · replied by Jawab AI
                        </div>
                      </div>
                      <span className="ml-auto text-[#25D366]">
                        <HugeiconsIcon icon={WhatsappIcon} size={22} strokeWidth={1.8} />
                      </span>
                    </div>

                    {/* messages */}
                    <div
                      ref={chatRef}
                      className="flex max-h-[420px] flex-1 flex-col gap-3 overflow-y-auto px-5 py-5"
                    >
                      <div className="mb-1 self-center rounded-full bg-surface-strong/50 px-3 py-1 font-mono text-[10px] text-ink-soft">
                        Today
                      </div>
                      <ChatBubble data-hero="bubble" side="in" time="02:47">
                        Aoa, price of the gold hoops? 😍
                      </ChatBubble>
                      <ChatBubble data-hero="bubble" side="out" time="02:47" ticks>
                        Wa alaikum assalam! The Gold-tone Hoop Earrings are Rs. 1,900 — only a few left. Want me to reserve a pair?
                      </ChatBubble>
                      <ChatBubble data-hero="bubble" side="in" time="02:48">
                        Yes please! Do you ship to Faisalabad?
                      </ChatBubble>
                      {stage === "typing" && <TypingBubble />}
                      {stage === "approved" && (
                        <ChatBubble data-hero="pop" side="out" time="02:48" ticks highlight>
                          Yes, we ship to Faisalabad via Leopard Courier (2-3 days). Shipping charges are Rs. 150.
                        </ChatBubble>
                      )}
                    </div>

                    {/* input bar */}
                    <div className="flex items-center gap-2.5 border-t border-line bg-card-strong px-4 py-3">
                      <div className="h-10 flex-1 rounded-full border border-line bg-surface/40 px-4 text-sm leading-10 text-ink-soft select-none">
                        Message
                      </div>
                      <span className="bg-teal text-paper flex size-10 shrink-0 items-center justify-center rounded-full">
                        <HugeiconsIcon icon={SentIcon} size={17} strokeWidth={1.8} />
                      </span>
                    </div>
                  </div>

                  {/* ───── Agent / approval side ───── */}
                  <div className="flex flex-col bg-surface/30 p-6 sm:p-8">
                    <div className="mb-6 flex items-center gap-2.5 text-base font-medium text-ink">
                      <span className="flex size-9 items-center justify-center rounded-full bg-teal-soft">
                        <HugeiconsIcon
                          icon={AiBrain01Icon}
                          size={20}
                          className="text-teal"
                          strokeWidth={1.8}
                        />
                      </span>
                      AI Suggested Reply
                    </div>

                    <div className="space-y-3 text-sm">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            data-hero="bubble"
                            className="flex cursor-help items-center gap-3 rounded-xl border border-line bg-card-strong px-4 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal/30"
                          >
                            <HugeiconsIcon icon={DatabaseIcon} size={18} className="text-teal" strokeWidth={1.8} />
                            <span className="text-ink-soft">
                              Knowledge Lookup ·{" "}
                              <span className="font-mono text-[13px] text-ink">
                                "shipping policy"
                              </span>
                            </span>
                            <span className="ml-auto font-mono text-xs text-[#059669]">matched ✓</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          Found Faisalabad shipping rule in store policy dataset.
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            data-hero="bubble"
                            className="flex cursor-help items-center gap-3 rounded-xl border border-line bg-card-strong px-4 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal/30"
                          >
                            <HugeiconsIcon icon={InvoiceIcon} size={18} className="text-teal" strokeWidth={1.8} />
                            <span className="text-ink-soft">
                              Delivery Lookup ·{" "}
                              <span className="font-medium text-ink">Rs. 150 Flat Shipping</span>
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          Standard courier flat shipping rates apply outside Lahore.
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            data-hero="bubble"
                            className="flex cursor-help items-center gap-3 rounded-xl border border-line bg-card-strong px-4 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal/30"
                          >
                            <HugeiconsIcon icon={ShieldIcon} size={18} className="text-teal" strokeWidth={1.8} />
                            <span className="text-ink-soft">
                              Tone Rules · Conciseness &amp; Language Check
                            </span>
                            <span className="ml-auto font-mono text-xs text-[#059669]">pass</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          Verified draft conforms to your brand voice and Roman Urdu parameters.
                        </TooltipContent>
                      </Tooltip>

                      {/* approval card — the interactive bit */}
                      <div
                        data-hero="bubble"
                        className={cn(
                          "relative rounded-xl border-2 p-4 transition-colors duration-300",
                          stage === "approved"
                            ? "border-[#059669]/40 bg-[#059669]/10"
                            : "border-teal/40 bg-card-strong shadow-[0_8px_32px_-12px_rgba(0,167,199,0.3)]"
                        )}
                      >
                        {/* floating hint so nobody misses the button */}
                        {stage === "idle" && (
                          <span
                            data-hero="hint"
                            className="absolute -top-4 right-4 z-10 px-3 py-1.5 text-[11px] font-semibold bg-teal text-paper rounded-md shadow-sm"
                          >
                            👇 Approve suggested reply
                          </span>
                        )}

                        <div className="flex items-center gap-2.5">
                          <HugeiconsIcon
                            icon={CheckmarkCircle02Icon}
                            size={18}
                            className={stage === "approved" ? "text-[#059669]" : "text-teal"}
                            strokeWidth={1.8}
                          />
                          <span
                            className={cn(
                              "text-sm font-semibold",
                              stage === "approved" ? "text-[#059669]" : "text-ink"
                            )}
                          >
                            {stage === "approved"
                              ? "Approved · Reply Sent"
                              : "Review Suggested Draft"}
                          </span>
                        </div>
                        <p className="mt-1.5 ml-[30px] text-xs text-ink-soft leading-relaxed">
                          "Yes, we ship to Faisalabad via Leopard Courier (2-3 days). Shipping charges are Rs. 150."
                        </p>

                        {stage !== "approved" ? (
                          <div className="mt-4 ml-[30px] flex items-center gap-3">
                            <span className="relative inline-flex">
                              {/* ping ring advertising clickability */}
                              <span className="absolute inset-0 animate-ping rounded-md bg-teal/40" />
                              <button
                                type="button"
                                onClick={approve}
                                disabled={stage === "typing"}
                                className="relative cursor-pointer px-5 py-2.5 text-sm font-semibold bg-teal text-paper rounded-md transition-transform duration-150 hover:scale-105 active:scale-95 disabled:opacity-70"
                              >
                                {stage === "typing" ? "Processing…" : "Approve & Send"}
                              </button>
                            </span>
                          </div>
                        ) : (
                          <div className="mt-4 ml-[30px] flex items-center gap-3" data-hero="pop">
                            <span className="font-mono text-xs text-[#059669]">
                              replied · catalog synced ✓
                            </span>
                            <button
                              type="button"
                              onClick={replay}
                              className="ml-auto flex cursor-pointer items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-xs text-ink-soft transition-colors hover:border-teal/30 hover:text-ink"
                            >
                              <HugeiconsIcon icon={Refresh01Icon} size={13} strokeWidth={2} />
                              Replay demo
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* daily insight strip */}
                    <div
                      data-hero="bubble"
                      className="mt-auto flex items-center gap-3 rounded-xl border border-line bg-card-strong px-4 py-4 pt-4 text-sm"
                    >
                      <HugeiconsIcon
                        icon={ChartLineData01Icon}
                        size={18}
                        className="text-teal"
                        strokeWidth={1.8}
                      />
                      <span className="text-ink-soft">
                        Today · 14 conversations ·{" "}
                        <span
                          className={cn(
                            "transition-colors",
                            stage === "approved" && "font-medium text-[#059669]"
                          )}
                        >
                          {stage === "approved" ? 11 : 10} replies automated
                        </span>{" "}
                        ·{" "}
                        <span className="font-medium text-ink font-semibold">
                          86% time saved
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
}
