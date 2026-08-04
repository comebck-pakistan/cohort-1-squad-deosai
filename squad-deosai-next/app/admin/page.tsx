"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Pulse } from "@/components/ui/Pulse";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Field";
import { cn } from "@/lib/utils";
import { allSellers, type Seller } from "@/lib/mock-data";

export default function AdminSellersPage() {
  const [sellers, setSellers] = useState<Seller[]>(allSellers);
  const [search, setSearch] = useState("");

  const filtered = sellers.filter(
    (s) =>
      s.businessName.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleWhatsApp = (id: string) => {
    setSellers((list) =>
      list.map((s) =>
        s.id === id
          ? {
              ...s,
              whatsappConnected: !s.whatsappConnected,
              whatsappRequested: false,
            }
          : s
      )
    );
  };

  const connectedCount = sellers.filter((s) => s.whatsappConnected).length;
  const requestedCount = sellers.filter((s) => s.whatsappRequested).length;

  return (
    <>
      <PageHeader
        title="All sellers"
        description={`${sellers.length} registered · ${connectedCount} connected · ${requestedCount} requesting connection`}
      />

      {/* search */}
      <div className="mb-6 max-w-sm">
        <Label htmlFor="admin-search" className="sr-only">
          Search sellers
        </Label>
        <Input
          id="admin-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email…"
        />
      </div>

      {/* seller list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card>
            <CardBody className="py-14 text-center">
              <p className="text-sm text-ink-soft">No sellers match your search.</p>
            </CardBody>
          </Card>
        ) : (
          filtered.map((seller) => (
            <Card key={seller.id}>
              <CardBody className="flex flex-wrap items-center gap-4">
                {/* avatar */}
                <div className="grid h-11 w-11 flex-none place-items-center rounded-full bg-paper-deep font-display text-sm text-ink">
                  {seller.businessName.charAt(0)}
                </div>

                {/* info */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-ink">
                      {seller.businessName}
                    </p>
                    {seller.whatsappConnected && (
                      <Pulse label="connected" />
                    )}
                    {!seller.whatsappConnected && seller.whatsappRequested && (
                      <Badge tone="attention">Requesting connection</Badge>
                    )}
                    {!seller.whatsappConnected && !seller.whatsappRequested && (
                      <Badge tone="neutral">Not connected</Badge>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-ink-soft">
                    {seller.ownerName} · {seller.email} · {seller.phone}
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-ink-faint">
                    Member since {seller.memberSince}
                    {seller.whatsappNumber
                      ? ` · WA: ${seller.whatsappNumber}`
                      : ""}
                  </p>
                </div>

                {/* actions */}
                <div className="flex items-center gap-2 flex-none">
                  {seller.whatsappConnected ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleWhatsApp(seller.id)}
                    >
                      Disconnect
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => toggleWhatsApp(seller.id)}
                    >
                      Connect WA
                    </Button>
                  )}
                  <Link
                    href={`/admin/sellers/${seller.id}`}
                    className="rounded-lg px-3 py-1.5 text-sm text-ink-soft transition-colors hover:bg-teal-soft hover:text-teal"
                  >
                    View →
                  </Link>
                </div>
              </CardBody>
            </Card>
          ))
        )}
      </div>
    </>
  );
}
