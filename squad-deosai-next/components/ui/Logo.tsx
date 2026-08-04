import { cn } from "@/lib/utils";

/**
 * Deosai mark: a crescent/moon-lozenge nodding to the after-hours "presence"
 * idea, set against the brand teal. Wordmark uses the display serif.
 */
export function Logo({
  className,
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative grid h-8 w-8 place-items-center rounded-xl bg-teal">
        <span className="absolute h-3.5 w-3.5 rounded-full bg-paper" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-marigold" />
      </span>
      {showText ? (
        <span className="font-display text-lg font-semibold tracking-tight text-ink">
          Jawab AI
        </span>
      ) : null}
    </span>
  );
}
