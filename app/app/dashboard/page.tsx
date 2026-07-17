"use client";

import Link from "next/link";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Pulse } from "@/components/ui/Pulse";
import { ButtonLink } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth";
import { overviewStats, activityLog, orders } from "@/lib/mock-data";

const stats = [
  { label: "Efficiency", value: "94.2%" },
  { label: "Active units", value: "128" },
  { label: "Critical alerts", value: "3" },
  { label: "24h output", value: "2.4M" },
];

export default function DashboardOverview() {
  const { user } = useAuth();
  const needsYou = activityLog.filter((a) => a.kind === "handoff");
  const pendingOrders = orders.filter((o) => o.status === "pending");
  const firstName = user?.businessName?.split(" ")[0] ?? "there";

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-line bg-card glass-card p-8 shadow-2xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-teal">Operations command center</p>
            <h1 className="text-4xl font-display font-semibold text-ink sm:text-5xl">
              Welcome back, {firstName}.
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-ink-soft">
              Your industrial operations center delivers real-time production intelligence, active alerts, and workflow control in a premium enterprise experience.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href="/dashboard/activity" variant="outline" className="border-teal text-teal hover:bg-teal-soft">
              Activity log
            </ButtonLink>
            <ButtonLink href="/dashboard/setup" size="sm" className="bg-teal text-paper hover:bg-teal-bright">
              Configure agent
            </ButtonLink>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-sm">
              <p className="text-3xl font-semibold text-teal">{stat.value}</p>
              <p className="mt-2 text-sm text-ink-soft">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card className="glass-card overflow-hidden">
          <CardHeader
            title="Production trend"
            description="Realtime output and performance tracking for the last 24 hours."
            action={<Badge tone="teal">Live</Badge>}
          />
          <CardBody className="space-y-6">
            <div className="rounded-[1.5rem] border border-line bg-surface p-6">
              <div className="flex items-center justify-between gap-4 text-sm text-ink-soft">
                <span>Output</span>
                <span>+18% vs yesterday</span>
              </div>
              <div className="mt-6 h-64 overflow-hidden rounded-[1.5rem] bg-gradient-to-b from-teal-soft to-white p-4">
                <div className="relative h-full w-full">
                  <div className="absolute left-0 bottom-0 h-1/4 w-10 rounded-full bg-teal opacity-80" />
                  <div className="absolute left-20 bottom-5 h-1/3 w-8 rounded-full bg-teal/80" />
                  <div className="absolute left-40 bottom-10 h-1/2 w-12 rounded-full bg-teal/70" />
                  <div className="absolute left-56 bottom-8 h-5/6 w-9 rounded-full bg-teal/90" />
                  <div className="absolute left-72 bottom-12 h-2/3 w-11 rounded-full bg-teal/70" />
                  <div className="absolute left-88 bottom-2 h-4/5 w-8 rounded-full bg-teal/80" />
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                { label: "Peak production", value: "18,300" },
                { label: "Alerts processed", value: "42" },
                { label: "Cycle time", value: "1.2m" },
              ].map((item) => (
                <div key={item.label} className="rounded-[var(--radius-card)] border border-line bg-white/90 p-4">
                  <p className="text-lg font-semibold text-ink">{item.value}</p>
                  <p className="mt-2 text-sm text-ink-soft">{item.label}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <div className="grid gap-6">
          <Card className="glass-card">
            <CardHeader title="Active alerts" description="Critical events and system warnings." action={<Badge tone="attention">3 critical</Badge>} />
            <CardBody className="space-y-4 pt-4">
              {needsYou.slice(0, 4).map((entry) => (
                <div key={entry.id} className="rounded-2xl border border-line bg-surface p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-ink">{entry.customerName}</p>
                      <p className="mt-1 text-sm text-ink-soft">{entry.question ?? entry.summary}</p>
                    </div>
                    <Badge tone={entry.kind === "handoff" ? "marigold" : "teal"}>Review</Badge>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>

          <Card className="glass-card">
            <CardHeader title="Work orders" description="Current tasks and maintenance activity." />
            <CardBody className="space-y-4 pt-4">
              {[
                { title: "Inspect conveyor line B", progress: 64, owner: "Aisha" },
                { title: "Approve incoming shipments", progress: 84, owner: "Faisal" },
                { title: "Review warranty claim flow", progress: 48, owner: "Nadia" },
              ].map((task) => (
                <div key={task.title} className="rounded-3xl border border-line bg-surface p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-ink">{task.title}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.25em] text-ink-soft">Assigned to {task.owner}</p>
                    </div>
                    <p className="text-sm font-semibold text-teal">{task.progress}%</p>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-strong">
                    <div className="h-full rounded-full bg-gradient-to-r from-teal to-accent" style={{ width: `${task.progress}%` }} />
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="glass-card">
          <CardHeader title="WhatsApp status" description="Your assistant is connected and monitoring conversations." />
          <CardBody>
            <div className="flex items-center gap-4 rounded-3xl border border-line bg-surface p-5">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-live-soft text-teal">💬</span>
              <div>
                <p className="text-sm font-semibold text-ink">{user?.phone || "Not connected"}</p>
                <p className="text-sm text-ink-soft">Auto-replies enabled</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="glass-card">
          <CardHeader title="Inventory pace" description="How quickly items move through the workflow." />
          <CardBody className="space-y-4">
            {[
              { label: "Stock health", value: "82%" },
              { label: "Reorder alerts", value: "5" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-sm text-ink-soft">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-ink">{item.value}</p>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card className="glass-card">
          <CardHeader title="Quick actions" />
          <CardBody className="space-y-3 pt-4">
            <ButtonLink href="/dashboard/orders" variant="outline" className="w-full justify-center border-teal text-teal hover:bg-teal-soft">
              Manage orders
            </ButtonLink>
            <ButtonLink href="/dashboard/settings" variant="outline" className="w-full justify-center border-teal text-teal hover:bg-teal-soft">
              System settings
            </ButtonLink>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
