"use client";

import { useState } from "react";
import Link from "next/link";
import Papa from "papaparse";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Input } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

type Spreadsheet = {
  headers: string[];
  rows: Record<string, string>[];
  fileName: string;
};

type DemoMessage = {
  id: string;
  sender: "user" | "assistant";
  text: string;
  action?: "reply" | "handoff";
};

export default function DemoPage() {
  const [spreadsheet, setSpreadsheet] = useState<Spreadsheet | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [question, setQuestion] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState<DemoMessage[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: "Upload the sample CSV, then ask about necklace price, stock, delivery charges, delivery time, or returns.",
    },
  ]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadError("");

    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const headers = results.meta.fields || [];
        const rows = results.data.map((row) =>
          Object.fromEntries(
            headers.map((header) => [header, String(row[header] ?? "").trim()]),
          ),
        );

        if (results.errors.length > 0 || headers.length === 0 || rows.length === 0) {
          setSpreadsheet(null);
          setUploadError("This CSV could not be read. Check that it has headers and data rows.");
          return;
        }

        setSpreadsheet({ headers, rows, fileName: file.name });
        setMessages((current) => [
          ...current,
          {
            id: `upload_${Date.now()}`,
            sender: "assistant",
            text: `${file.name} loaded with ${rows.length} verified product rows.`,
          },
        ]);
      },
      error: () => {
        setSpreadsheet(null);
        setUploadError("This CSV could not be read.");
      },
    });
  };

  const askQuestion = async () => {
    const message = question.trim();
    if (!message || !spreadsheet || sending) return;

    setMessages((current) => [
      ...current,
      { id: `user_${Date.now()}`, sender: "user", text: message },
    ]);
    setQuestion("");
    setSending(true);

    try {
      const response = await fetch("/api/ai/demo-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, spreadsheet }),
      });
      const data = (await response.json()) as {
        reply?: string;
        action?: "reply" | "handoff";
        error?: string;
      };

      if (!response.ok || !data.reply) {
        throw new Error(data.error || "The demo could not answer.");
      }

      setMessages((current) => [
        ...current,
        {
          id: `assistant_${Date.now()}`,
          sender: "assistant",
          text: data.reply || "",
          action: data.action,
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: `error_${Date.now()}`,
          sender: "assistant",
          text: error instanceof Error ? error.message : "The demo could not answer.",
          action: "handoff",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-paper px-4 py-8 text-ink sm:px-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-teal">
              Local mentor demo
            </p>
            <h1 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">
              Grounded CSV assistant
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
              Upload approved catalogue facts. The assistant returns an exact answer or a safe handoff—never a made-up store policy.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-lg border border-line bg-card px-3 py-2 text-xs font-semibold text-ink-soft hover:text-ink"
          >
            Back to home
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Card>
            <CardBody className="space-y-5">
              <div>
                <h2 className="text-base font-semibold">1. Upload catalogue</h2>
                <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                  No Supabase or OpenAI key is needed for this exact-data accuracy test.
                </p>
              </div>

              <a
                href="/sample-data/deosai_catalogue.csv"
                download
                className="inline-flex w-full items-center justify-center rounded-lg border border-teal px-4 py-2.5 text-xs font-semibold text-teal hover:bg-teal-soft/20"
              >
                Download prepared CSV
              </a>

              <label className="block cursor-pointer rounded-xl border border-dashed border-line bg-paper-deep/40 p-6 text-center hover:border-teal">
                <span className="text-sm font-semibold">Choose CSV file</span>
                <span className="mt-1 block text-xs text-ink-soft">
                  Product and policy columns are preserved exactly.
                </span>
                <input
                  type="file"
                  accept=".csv,text/csv"
                  className="hidden"
                  onChange={handleUpload}
                />
              </label>

              {spreadsheet && (
                <div className="rounded-xl border border-success/30 bg-success/10 p-3 text-xs text-ink">
                  <span className="font-semibold">{spreadsheet.fileName}</span>
                  <span className="mt-1 block text-ink-soft">
                    {spreadsheet.rows.length} rows · {spreadsheet.headers.length} fields
                  </span>
                </div>
              )}
              {uploadError && <p className="text-xs text-danger">{uploadError}</p>}

              <div>
                <p className="text-xs font-semibold text-ink">Try these questions</p>
                <ul className="mt-2 space-y-1 text-xs text-ink-soft">
                  <li>What is the price of the necklace?</li>
                  <li>Is the necklace available?</li>
                  <li>What are the delivery charges?</li>
                  <li>What is the return policy?</li>
                  <li>Is the leather wallet available?</li>
                </ul>
              </div>
            </CardBody>
          </Card>

          <Card className="flex min-h-[34rem] flex-col overflow-hidden">
            <div className="border-b border-line px-4 py-3">
              <h2 className="text-sm font-semibold">2. Ask the catalogue</h2>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto bg-paper/40 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "max-w-[88%] rounded-2xl px-3 py-2 text-xs leading-relaxed",
                    message.sender === "user"
                      ? "ml-auto rounded-br-none bg-teal text-paper"
                      : "rounded-bl-none bg-paper-deep text-ink",
                  )}
                >
                  {message.text}
                  {message.action && (
                    <span
                      className={cn(
                        "mt-2 block font-mono text-[10px] uppercase tracking-wider",
                        message.action === "reply" ? "text-success" : "text-danger",
                      )}
                    >
                      {message.action === "reply"
                        ? "Verified from uploaded data"
                        : "Safe seller handoff"}
                    </span>
                  )}
                </div>
              ))}
              {sending && (
                <div className="max-w-[50%] rounded-2xl rounded-bl-none bg-paper-deep px-3 py-2 text-xs text-ink-soft">
                  Checking exact fields…
                </div>
              )}
            </div>
            <div className="flex gap-2 border-t border-line bg-card p-3">
              <Input
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && askQuestion()}
                placeholder={
                  spreadsheet
                    ? "Ask about price, stock, delivery, or returns…"
                    : "Upload a CSV first"
                }
                disabled={!spreadsheet || sending}
                className="flex-1"
              />
              <Button
                onClick={askQuestion}
                disabled={!spreadsheet || !question.trim() || sending}
              >
                Ask
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
