"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Pulse } from "@/components/ui/Pulse";
import { Input, Label, Textarea } from "@/components/ui/Field";
import { formatPKR } from "@/lib/utils";
import {
  allSellers,
  products as seedProducts,
  policies as seedPolicies,
  type Seller,
  type Product,
} from "@/lib/mock-data";

export default function SellerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const seller = allSellers.find((s) => s.id === id);

  const [whatsappConnected, setWhatsappConnected] = useState(
    seller?.whatsappConnected ?? false
  );
  const [sellerProducts] = useState<Product[]>(
    seller?.id === "seller_meher" ? seedProducts : []
  );
  const [policies] = useState(
    seller?.id === "seller_meher" ? seedPolicies : { delivery: "", returns: "", hours: "" }
  );

  if (!seller) {
    return (
      <>
        <PageHeader title="Seller not found" />
        <p className="text-sm text-ink-soft">
          <Link href="/admin" className="text-teal hover:underline">
            ← Back to all sellers
          </Link>
        </p>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={seller.businessName}
        description={`${seller.ownerName} · ${seller.email}`}
        action={
          <Link
            href="/admin"
            className="text-sm font-medium text-teal hover:underline"
          >
            ← All sellers
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile */}
        <Card>
          <CardHeader title="Profile" />
          <CardBody className="space-y-3 pt-4">
            <div>
              <Label>Business name</Label>
              <p className="text-sm text-ink">{seller.businessName}</p>
            </div>
            <div>
              <Label>Owner</Label>
              <p className="text-sm text-ink">{seller.ownerName || "—"}</p>
            </div>
            <div>
              <Label>Email</Label>
              <p className="text-sm text-ink">{seller.email}</p>
            </div>
            <div>
              <Label>Phone</Label>
              <p className="text-sm text-ink">{seller.phone}</p>
            </div>
            <div>
              <Label>Plan</Label>
              <Badge tone="marigold">{seller.plan}</Badge>
            </div>
            <div>
              <Label>Member since</Label>
              <p className="text-sm text-ink-soft">{seller.memberSince}</p>
            </div>
          </CardBody>
        </Card>

        {/* WhatsApp management */}
        <Card className="lg:col-span-2">
          <CardHeader title="WhatsApp connection" />
          <CardBody className="pt-4">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-paper p-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-live-soft text-lg">
                  💬
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {whatsappConnected ? "Connected" : "Not connected"}
                  </p>
                  <p className="font-mono text-xs text-ink-soft">
                    {seller.whatsappNumber || "No number provided"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {whatsappConnected && <Pulse label="auto-replying" />}
                {seller.whatsappRequested && !whatsappConnected && (
                  <Badge tone="attention">Seller requested connection</Badge>
                )}
                <Button
                  variant={whatsappConnected ? "outline" : "primary"}
                  size="sm"
                  onClick={() => setWhatsappConnected((v) => !v)}
                >
                  {whatsappConnected ? "Disconnect" : "Connect now"}
                </Button>
              </div>
            </div>

            {!whatsappConnected && (
              <div className="mt-4 rounded-xl border border-dashed border-line bg-paper-deep p-4">
                <p className="text-sm text-ink-soft">
                  To connect this seller, register their phone number (
                  <strong>{seller.whatsappNumber || "not provided"}</strong>) on
                  your WhatsApp Business Account via the Meta Cloud API
                  Coexistence endpoint.
                </p>
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Catalogue */}
      <div className="mt-6">
        <Card>
          <CardHeader
            title="Catalogue"
            description={`${sellerProducts.length} products`}
          />
          <CardBody className="pt-4">
            {sellerProducts.length === 0 ? (
              <div className="rounded-xl border border-dashed border-line bg-paper px-4 py-8 text-center">
                <p className="text-sm text-ink-soft">
                  This seller hasn&apos;t added any products yet.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {sellerProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-start gap-3 rounded-lg border border-line bg-paper px-4 py-3"
                  >
                    <span className="mt-0.5 text-xl">{p.photo}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-ink">{p.name}</p>
                      <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                        {p.discountPrice ? (
                          <>
                            <span className="text-teal font-semibold">
                              {formatPKR(p.discountPrice)}
                            </span>
                            <span className="text-ink-faint line-through">
                              {formatPKR(p.price)}
                            </span>
                          </>
                        ) : (
                          <span className="text-ink-soft">
                            {formatPKR(p.price)}
                          </span>
                        )}
                        <span className="text-ink-faint">· {p.category}</span>
                      </div>
                      {p.description && (
                        <p className="mt-1 text-xs text-ink-soft line-clamp-1">
                          {p.description}
                        </p>
                      )}
                    </div>
                    <Badge tone={p.inStock ? "live" : "neutral"}>
                      {p.inStock ? "In stock" : "Sold out"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Policies */}
      <div className="mt-6">
        <Card>
          <CardHeader title="Policies" />
          <CardBody className="space-y-3 pt-4">
            {(
              [
                ["Delivery", policies.delivery],
                ["Returns", policies.returns],
                ["Hours", policies.hours],
              ] as const
            ).map(([label, value]) => (
              <div key={label}>
                <Label>{label}</Label>
                <p className="text-sm text-ink-soft">{value || "Not set"}</p>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </>
  );
}
