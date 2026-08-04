"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ActivityRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/inbox");
  }, [router]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-paper">
      <p className="text-sm text-ink-soft">Redirecting to Inbox…</p>
    </div>
  );
}
