import { cn } from "@/lib/utils";

/**
 * Deosai mark: a rounded green tile with a chat/moon glyph, nodding to the
 * after-hours "presence" idea. Wordmark uses the display grotesque.
 * `tone="light"` renders the wordmark white for dark backgrounds.
 */
export function Logo({
  className,
  showText = true,
  tone = "dark",
}: {
  className?: string;
  showText?: boolean;
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "relative grid h-8 w-8 place-items-center rounded-[0.7rem]",
          light ? "bg-white" : "bg-green"
        )}
      >
        <span
          className={cn(
            "absolute h-3.5 w-3.5 rounded-full",
            light ? "bg-green" : "bg-coal"
          )}
        />
        <span
          className={cn(
            "absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full",
            light ? "bg-forest" : "bg-snow"
          )}
        />
      </span>
      {showText ? (
        <span
          className={cn(
            "font-display text-lg font-bold tracking-[-0.02em]",
            tone === "light" ? "text-snow" : "text-coal"
          )}
        >
          Deosai
        </span>
      ) : null}
    </span>
  );
}
