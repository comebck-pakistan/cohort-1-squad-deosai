"use client";

import Link from "next/link";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Pulse } from "@/components/ui/Pulse";
import { ButtonLink } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth";
import {
  overviewStats,
  activityLog,
  orders,
} from "@/lib/mock-data";

const stats = [
  { label: "Bot interactions today", value: overviewStats.conversationsToday },
  { label: "Auto-replied", value: overviewStats.autoReplied },
  { label: "COD orders confirmed", value: overviewStats.ordersConfirmed },
  { label: "Waiting on you", value: overviewStats.needsYou },
];

export default function DashboardOverview() {
  const { user } = useAuth();
  const needsYou = activityLog.filter((a) => a.kind === "handoff");
  const pendingOrders = orders.filter((o) => o.status === "pending");
  const firstName = user?.businessName?.split(" ")[0] ?? "there";

  return (
    <>
      <PageHeader
        title={`Salam, ${firstName}`}
        description="Here's what your assistant handled while you were away."
      />

      {/* WhatsApp status banner */}
      <Card className="mb-6 overflow-hidden">
        <CardBody className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-live-soft text-lg">
              💬
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">
                WhatsApp status
              </p>
              <p className="font-mono text-xs text-ink-soft">
                {user?.phone || "Not connected"}
              </p>
            </div>
          </div>
          <Pulse label="auto-replying" />
        </CardBody>
      </Card>

      {/* stat grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-[var(--radius-card)] border border-line bg-card p-5"
          >
            <p className="font-mono text-4xl text-teal">{s.value}</p>
            <p className="mt-2 text-sm text-ink-soft">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* needs-you queue */}
        <Card className="lg:col-span-2">
          <CardHeader
            title="Needs your reply"
            description="Custom requests and anything the assistant handed back to you."
            action={
              <Badge tone="attention">{needsYou.length} waiting</Badge>
            }
          />
          <CardBody className="pt-4">
            {needsYou.length === 0 ? (
              <div className="rounded-xl border border-dashed border-line bg-paper px-4 py-8 text-center">
                <p className="text-sm font-medium text-ink">
                  You&apos;re all caught up.
                </p>
                <p className="mt-1 text-sm text-ink-soft">
                  Every conversation was answered automatically.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-line">
                {needsYou.map((entry) => (
                  <li
                    key={entry.id}
                    className="flex items-center justify-between gap-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-ink">
                        {entry.customerName}
                      </p>
                      <p className="truncate text-sm text-ink-soft">
                        {entry.question ?? entry.summary}
                      </p>
                    </div>
                    <Link
                      href="/dashboard/activity"
                      className="flex-none text-sm font-semibold text-teal hover:underline"
                    >
                      View
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>

        {/* quick links */}
        <Card>
          <CardHeader title="Quick actions" />
          <CardBody className="flex flex-col gap-3 pt-4">
            <ButtonLink href="/dashboard/setup" variant="outline" className="justify-start">
              Configure AI Agent
            </ButtonLink>
            <ButtonLink href="/dashboard/activity" variant="outline" className="justify-start">
              View activity
            </ButtonLink>
            <ButtonLink href="/dashboard/orders" variant="outline" className="justify-start">
              View orders
              {pendingOrders.length > 0 && (
                <Badge tone="attention" className="ml-auto">
                  {pendingOrders.length} pending
                </Badge>
              )}
            </ButtonLink>
            <ButtonLink href="/dashboard/whatsapp" variant="outline" className="justify-start">
              WhatsApp settings
            </ButtonLink>
            <ButtonLink href="/dashboard/setup" variant="ghost" className="justify-start">
              Re-run setup
            </ButtonLink>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
