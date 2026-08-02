"use client";

import { useEffect, useRef, useState } from "react";
import { Pulse } from "@/components/ui/Pulse";

type Step =
  | { type: "customer"; text: string; at: string }
  | { type: "typing" }
  | { type: "bot"; text: string; kind?: "reply" | "cod"; at: string };

const SCRIPT: Step[] = [
  { type: "customer", text: "Aoa, price of the gold hoops? 😍", at: "2:47 AM" },
  { type: "typing" },
  {
    type: "bot",
    text: "Wa alaikum assalam! The Gold-tone Hoop Earrings are Rs. 1,900 — only a few left. Want me to reserve a pair?",
    kind: "reply",
    at: "2:47 AM",
  },
  { type: "customer", text: "Yes please! COD to Lahore.", at: "2:48 AM" },
  { type: "typing" },
  {
    type: "bot",
    text: "Order confirmed ✅ Gold-tone Hoop Earrings · Rs. 1,900 · Cash on Delivery · free delivery in Lahore.",
    kind: "cod",
    at: "2:48 AM",
  },
];

type Rendered = Exclude<Step, { type: "typing" }>;

export function LiveThread() {
  const [items, setItems] = useState<Rendered[]>([]);
  const [typing, setTyping] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setItems(SCRIPT.filter((s): s is Rendered => s.type !== "typing"));
      return;
    }

    let delay = 600;
    SCRIPT.forEach((step) => {
      if (step.type === "typing") {
        timers.current.push(setTimeout(() => setTyping(true), delay));
        delay += 1100;
        timers.current.push(setTimeout(() => setTyping(false), delay));
      } else {
        timers.current.push(
          setTimeout(() => setItems((prev) => [...prev, step]), delay)
        );
        delay += 900;
      }
    });

    const saved = timers.current;
    return () => saved.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full max-w-sm rounded-[1.75rem] border border-line bg-card p-2 shadow-[0_30px_80px_-40px_rgba(15,76,70,0.55)]">
      {/* thread header */}
      <div className="flex items-center gap-3 rounded-[1.4rem] bg-teal px-4 py-3 text-paper">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-paper/15 font-display text-sm">
          M
        </div>
        <div className="leading-tight">
          <p className="font-sans text-sm font-semibold">Meher Handmade</p>
          <Pulse label="auto-replying" className="mt-0.5" />
        </div>
        <span className="ml-auto font-mono text-[11px] text-paper/70">
          2:47 AM
        </span>
      </div>

      {/* messages */}
      <div className="flex min-h-70 flex-col gap-2.5 px-3 py-4">
        <p className="mx-auto rounded-full bg-paper-deep px-3 py-1 font-mono text-[11px] text-ink-faint">
          after hours · you&apos;re asleep
        </p>

        {items.map((m, i) =>
          m.type === "customer" ? (
            <div key={i} className="bubble-in max-w-[80%] self-start">
              <div className="rounded-2xl rounded-bl-md bg-paper-deep px-3.5 py-2 text-sm text-ink">
                {m.text}
              </div>
              <span className="mt-1 block pl-1 font-mono text-[10px] text-ink-faint">
                {m.at}
              </span>
            </div>
          ) : (
            <div key={i} className="bubble-in max-w-[85%] self-end text-right">
              <div
                className={
                  m.kind === "cod"
                    ? "rounded-2xl rounded-br-md border border-live/40 bg-live-soft px-3.5 py-2 text-left text-sm text-ink"
                    : "rounded-2xl rounded-br-md bg-teal px-3.5 py-2 text-left text-sm text-paper"
                }
              >
                {m.kind === "cod" ? (
                  <span className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-live">
                    COD confirmation · sent for you
                  </span>
                ) : null}
                {m.text}
              </div>
              <span className="mt-1 inline-flex items-center gap-1 pr-1 font-mono text-[10px] text-ink-faint">
                {m.kind === "cod" ? "auto-sent" : "auto-reply"} · {m.at}
              </span>
            </div>
          )
        )}

        {typing ? (
          <div className="max-w-[60%] self-end">
            <div className="inline-flex gap-1 rounded-2xl rounded-br-md bg-teal px-4 py-3">
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-paper" />
              <span
                className="typing-dot h-1.5 w-1.5 rounded-full bg-paper"
                style={{ animationDelay: "0.15s" }}
              />
              <span
                className="typing-dot h-1.5 w-1.5 rounded-full bg-paper"
                style={{ animationDelay: "0.3s" }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
