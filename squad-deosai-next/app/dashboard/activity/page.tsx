"use client";

import { useState } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import {
  activityLog as seed,
  type ActivityEntry,
  type ActivityKind,
} from "@/lib/mock-data";

const kindMeta: Record<
  ActivityKind,
  { label: string; tone: "live" | "attention" | "teal" | "marigold"; icon: string }
> = {
  "auto-reply": { label: "Auto-replied", tone: "live", icon: "🤖" },
  "cod-confirmation": { label: "COD sent", tone: "teal", icon: "✅" },
  handoff: { label: "Needs you", tone: "attention", icon: "🙋" },
  "order-confirmed": { label: "Order confirmed", tone: "live", icon: "📦" },
  "order-cancelled": { label: "Cancelled", tone: "marigold", icon: "❌" },
};

type Filter = "all" | "auto-reply" | "handoff" | "cod-confirmation";

export default function ActivityPage() {
  const [entries] = useState<ActivityEntry[]>(seed);
  const [filter, setFilter] = useState<Filter>("all");

  const filtered =
    filter === "all"
      ? entries
      : entries.filter((e) => e.kind === filter);

  const handoffCount = entries.filter((e) => e.kind === "handoff").length;

  return (
    <>
      <PageHeader
        title="Activity"
        description="Everything your assistant handled — auto-replies, COD confirmations, and conversations it handed back to you."
      />

      {/* filters */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {(
          [
            ["all", "All"],
            ["auto-reply", "Auto-replies"],
            ["handoff", "Needs you"],
            ["cod-confirmation", "COD"],
          ] as [Filter, string][]
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
              filter === key
                ? "border-teal bg-teal text-paper"
                : "border-line bg-card text-ink-soft hover:border-teal hover:text-teal"
            )}
          >
            {label}
            {key === "handoff" && handoffCount > 0 && (
              <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-marigold px-1 text-[10px] font-bold text-ink">
                {handoffCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* activity feed */}
      {filtered.length === 0 ? (
        <div className="rounded-[var(--radius-card)] border border-dashed border-line bg-card px-6 py-14 text-center">
          <p className="text-sm font-medium text-ink">No activity yet</p>
          <p className="mt-1 text-sm text-ink-soft">
            Once your assistant starts replying, you&apos;ll see everything here.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((entry) => {
            const meta = kindMeta[entry.kind];
            const isHandoff = entry.kind === "handoff";

            return (
              <div
                key={entry.id}
                className={cn(
                  "rounded-[var(--radius-card)] border bg-card p-4 transition-colors",
                  isHandoff
                    ? "border-marigold/40 bg-marigold-soft/30"
                    : "border-line"
                )}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <span className="mt-0.5 text-lg flex-none">{meta.icon}</span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-ink">
                          {entry.customerName}
                        </span>
                        <Badge tone={meta.tone}>{meta.label}</Badge>
                        {entry.afterHours && (
                          <span className="rounded-full bg-paper-deep px-2 py-0.5 font-mono text-[10px] text-ink-faint">
                            after hours
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-ink-soft">
                        {entry.summary}
                      </p>
                      {entry.question && (
                        <p className="mt-2 rounded-lg border border-line bg-paper px-3 py-2 text-xs text-ink-soft italic">
                          &ldquo;{entry.question}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 flex-none">
                    <span className="font-mono text-xs text-ink-faint">
                      {entry.at}
                    </span>
                    {isHandoff && (
                      <a
                        href={`https://wa.me/${entry.customerPhone.replace(/\s/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-teal bg-teal px-3 py-1 text-xs font-semibold text-paper transition-colors hover:bg-teal-bright"
                      >
                        Open in WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
