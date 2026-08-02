"use client";

import { useState } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Pulse } from "@/components/ui/Pulse";
import { Badge } from "@/components/ui/Badge";
import { Input, Label } from "@/components/ui/Field";
import { useAuth } from "@/lib/auth";

export default function WhatsAppPage() {
  const { user } = useAuth();
  // In production these would come from the sellers row in Supabase
  const [connected] = useState(false);
  const [requested, setRequested] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState(user?.phone ?? "");

  const handleRequest = () => {
    if (!whatsappNumber.trim()) return;
    // In production: save to Supabase sellers table (whatsapp_requested = true, whatsapp_number = ...)
    setRequested(true);
  };

  return (
    <>
      <PageHeader
        title="WhatsApp"
        description="This is the number your customers already message. The assistant answers on it — you never lose access."
      />

      {/* connection status */}
      <Card className="mb-6">
        <CardBody className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-live-soft text-xl">
              💬
            </span>
            <div>
              <p className="font-semibold text-ink">
                {connected
                  ? "Connected"
                  : requested
                  ? "Connection requested"
                  : "Not connected yet"}
              </p>
              {connected && (
                <p className="font-mono text-sm text-ink-soft">
                  {whatsappNumber}
                </p>
              )}
            </div>
          </div>
          {connected ? (
            <Pulse label="auto-replying" />
          ) : requested ? (
            <Badge tone="marigold">Pending setup by Deosai team</Badge>
          ) : null}
        </CardBody>
      </Card>

      {/* Request connection (only when not connected and not yet requested) */}
      {!connected && !requested && (
        <Card className="mb-6 border-dashed">
          <CardBody className="py-8">
            <div className="mx-auto max-w-md text-center">
              <p className="text-sm font-medium text-ink">
                Your assistant is asleep
              </p>
              <p className="mx-auto mt-1 max-w-sm text-sm text-ink-soft">
                Submit your WhatsApp business number and the Deosai team will
                connect it for you. It takes about a day.
              </p>
              <div className="mt-5 mx-auto max-w-xs space-y-3">
                <div className="text-left">
                  <Label htmlFor="wa-number">WhatsApp number</Label>
                  <Input
                    id="wa-number"
                    type="tel"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="+92 300 1234567"
                  />
                </div>
                <Button
                  onClick={handleRequest}
                  className="w-full"
                  disabled={!whatsappNumber.trim()}
                >
                  Request connection
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Requested confirmation */}
      {!connected && requested && (
        <Card className="mb-6">
          <CardBody className="py-8 text-center">
            <span className="text-3xl">🔗</span>
            <p className="mt-3 text-sm font-medium text-ink">
              Connection requested for {whatsappNumber}
            </p>
            <p className="mx-auto mt-1 max-w-sm text-sm text-ink-soft">
              The Deosai team will set up WhatsApp Coexistence on your number.
              You&apos;ll keep full access to your WhatsApp app — the assistant
              just fills in the gaps.
            </p>
          </CardBody>
        </Card>
      )}

      {/* coexistence explainer, in the seller's words */}
      <Card>
        <CardHeader
          title="You and the assistant, on one number"
          description="This is called Coexistence — here's what it means for you."
        />
        <CardBody className="grid gap-4 pt-4 sm:grid-cols-3">
          {[
            {
              icon: "🙋",
              title: "You reply whenever you want",
              body: "Open WhatsApp and answer any chat yourself, any time. Nothing is locked.",
            },
            {
              icon: "🤖",
              title: "It only fills the gaps",
              body: "The assistant answers the common questions you haven't gotten to — price, delivery, stock, returns, hours.",
            },
            {
              icon: "🤝",
              title: "It hands back the hard ones",
              body: "Custom requests and anything unusual get passed to you, marked as 'needs you'.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-xl border border-line bg-paper p-5"
            >
              <span className="text-2xl">{c.icon}</span>
              <h3 className="mt-3 text-sm font-semibold text-ink">{c.title}</h3>
              <p className="mt-1.5 text-sm text-ink-soft">{c.body}</p>
            </div>
          ))}
        </CardBody>
      </Card>
    </>
  );
}
