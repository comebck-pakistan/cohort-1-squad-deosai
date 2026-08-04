import { cn } from "@/lib/utils";

/**
 * The signature "presence" motif: a breathing dot that marks anything live —
 * a connected WhatsApp number, an auto-replied message, the hero status.
 * Reused across marketing and dashboard so presence reads as one idea.
 */
export function Pulse({
  label,
  tone = "live",
  className,
}: {
  label?: string;
  tone?: "live" | "idle";
  className?: string;
}) {
  const live = tone === "live";
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="relative inline-flex h-2.5 w-2.5">
        <span
          className={cn(
            "inline-flex h-2.5 w-2.5 rounded-full",
            live ? "bg-live pulse-dot" : "bg-ink-faint"
          )}
        />
      </span>
      {label ? (
        <span
          className={cn(
            "font-mono text-xs uppercase tracking-wider",
            live ? "text-live" : "text-ink-faint"
          )}
        >
          {label}
        </span>
      ) : null}
    </span>
  );
}
