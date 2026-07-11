import { cn } from "@/lib/utils";

type Tone = "live" | "attention" | "neutral" | "teal" | "marigold";

const tones: Record<Tone, string> = {
  live: "bg-live-soft text-teal border-live/30",
  attention: "bg-marigold-soft text-[#8a5a12] border-marigold/40",
  neutral: "bg-paper-deep text-ink-soft border-line",
  teal: "bg-teal-soft text-teal border-teal/20",
  marigold: "bg-marigold-soft text-[#8a5a12] border-marigold/40",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
