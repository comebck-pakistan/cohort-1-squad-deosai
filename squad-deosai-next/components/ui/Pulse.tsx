import { cn } from "@/lib/utils";

/**
 * The signature "presence" motif: a breathing dot that marks anything live —
 * a connected WhatsApp number, an auto-replied message, the hero status.
 * Reused across marketing and dashboard so presence reads as one idea.
 */
export function Pulse({
  label,
  tone = "live",
  onDark = false,
  className,
}: {
  label?: string;
  tone?: "live" | "idle";
  onDark?: boolean;
  className?: string;
}) {
  const live = tone === "live";
  const liveColor = onDark ? "bg-primary-200" : "bg-green";
  const liveText = onDark ? "text-primary-200" : "text-green";
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="relative inline-flex h-2.5 w-2.5">
        <span
          className={cn(
            "inline-flex h-2.5 w-2.5 rounded-full",
            live ? `${liveColor} pulse-dot` : "bg-slate-faint"
          )}
        />
      </span>
      {label ? (
        <span
          className={cn(
            "font-mono text-xs uppercase tracking-wider",
            live ? liveText : "text-slate-faint"
          )}
        >
          {label}
        </span>
      ) : null}
    </span>
  );
}
