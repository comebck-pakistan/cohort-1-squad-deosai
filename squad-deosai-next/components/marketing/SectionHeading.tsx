import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  tone = "light",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
}) {
  const centered = align === "center";
  const dark = tone === "dark";
  return (
    <Reveal
      className={cn("max-w-2xl", centered && "mx-auto text-center", className)}
    >
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-widest",
          dark
            ? "bg-white/10 text-primary-200"
            : "bg-green-soft text-green-deep"
        )}
      >
        <span className={cn("h-1.5 w-1.5 rounded-full", dark ? "bg-primary-200" : "bg-green")} />
        {eyebrow}
      </span>
      <h2
        className={cn(
          "mt-4 font-display text-3xl font-bold leading-[1.12] tracking-[-0.02em] sm:text-[2.6rem]",
          dark ? "text-snow" : "text-coal"
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            dark ? "text-white/70" : "text-slate",
            centered && "mx-auto max-w-xl"
          )}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
