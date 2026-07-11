"use client";

import { useState } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn, formatPKR } from "@/lib/utils";
import { orders as seedOrders, type Order, type OrderStatus } from "@/lib/mock-data";

const statusMeta: Record<
  OrderStatus,
  { label: string; tone: "live" | "attention" | "marigold" | "neutral" }
> = {
  pending: { label: "Pending confirmation", tone: "attention" },
  confirmed: { label: "Confirmed", tone: "live" },
  cancelled: { label: "Cancelled", tone: "neutral" },
};

export default function OrdersPage() {
  const [orders] = useState<Order[]>(seedOrders);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");

  const filtered =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const pendingCount = orders.filter((o) => o.status === "pending").length;

  return (
    <>
      <PageHeader
        title="Orders"
        description="COD order confirmations from your Shopify or WooCommerce checkout. Customers confirm or cancel via WhatsApp."
      />

      {/* explainer */}
      <Card className="mb-6">
        <CardBody className="flex flex-wrap items-center gap-4">
          <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-teal-soft text-lg">
            📦
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-ink">
              How it works
            </p>
            <p className="text-sm text-ink-soft">
              When a customer places a COD order on your website, Deosai sends them a
              WhatsApp message to confirm. If they reply <strong>Confirm</strong>,
              the order is locked in. If they reply <strong>Cancel</strong>, you
              save the shipping cost.
            </p>
          </div>
        </CardBody>
      </Card>

      {/* filters */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {(
          [
            ["all", "All orders"],
            ["pending", "Pending"],
            ["confirmed", "Confirmed"],
            ["cancelled", "Cancelled"],
          ] as [OrderStatus | "all", string][]
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
            {key === "pending" && pendingCount > 0 && (
              <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-marigold px-1 text-[10px] font-bold text-ink">
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* order list */}
      {filtered.length === 0 ? (
        <div className="rounded-[var(--radius-card)] border border-dashed border-line bg-card px-6 py-14 text-center">
          <p className="text-sm font-medium text-ink">No orders yet</p>
          <p className="mt-1 text-sm text-ink-soft">
            Connect your Shopify or WooCommerce store to start receiving COD
            confirmations.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => {
            const meta = statusMeta[order.status];
            const createdDate = new Date(order.createdAt);
            const timeStr = createdDate.toLocaleString("en-PK", {
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <Card key={order.id}>
                <CardBody className="flex flex-wrap items-start gap-4">
                  <div
                    className={cn(
                      "grid h-10 w-10 flex-none place-items-center rounded-full text-sm font-display",
                      order.status === "confirmed"
                        ? "bg-live-soft text-teal"
                        : order.status === "cancelled"
                        ? "bg-paper-deep text-ink-faint"
                        : "bg-marigold-soft text-[#8a5a12]"
                    )}
                  >
                    {order.status === "confirmed"
                      ? "✅"
                      : order.status === "cancelled"
                      ? "❌"
                      : "⏳"}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-ink">
                        {order.customerName}
                      </span>
                      <Badge tone={meta.tone}>{meta.label}</Badge>
                      <Badge tone="neutral">{order.source}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-ink-soft">{order.items}</p>
                    <p className="mt-1 font-mono text-xs text-ink-faint">
                      {order.customerPhone}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1 flex-none">
                    <span className="font-mono text-lg font-semibold text-teal">
                      {formatPKR(order.total)}
                    </span>
                    <span className="font-mono text-xs text-ink-faint">
                      {timeStr}
                    </span>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
