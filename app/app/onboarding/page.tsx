"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select } from "@/components/ui/Field";
import { useAuth } from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const industries = [
  "Jewellery",
  "Fashion",
];

const companySizes = [
  "1 - 10",
  "11 - 50",
  "51 - 200",
  "201 - 500",
  "More than 500",
];

export default function StandaloneOnboardingPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [saving, setSaving] = useState(false);

  // If already onboarded, send them to dashboard
  useEffect(() => {
    if (!authLoading && user && user.onboarded) {
      router.replace("/dashboard");
    }
  }, [user, authLoading, router]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("sellers")
        .update({
          industry,
          website,
          role_description: roleDescription,
          company_size: companySize,
          onboarded: true,
        })
        .eq("id", user.id);

      if (error) {
        console.warn("Supabase update error during onboarding (columns might be missing):", error);
      }
    } catch (e) {
      console.warn("Exception during profile onboarding save:", e);
    }
    
    // Store in localStorage as fallback so client is not stuck on database schema discrepancies
    if (typeof window !== "undefined") {
      window.localStorage.setItem(`onboarded_${user.id}`, "true");
      window.localStorage.setItem(`industry_${user.id}`, industry);
      window.localStorage.setItem(`website_${user.id}`, website);
      window.localStorage.setItem(`role_desc_${user.id}`, roleDescription);
      window.localStorage.setItem(`company_size_${user.id}`, companySize);
    }

    // Refresh page / auth state, then send to dashboard setup page
    if (typeof window !== "undefined") {
      window.location.href = "/dashboard/setup";
    }
    setSaving(false);
  };

  if (authLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-paper text-ink">
        <p className="font-mono text-sm text-ink-soft">Loading onboarding...</p>
      </div>
    );
  }

  if (!user) {
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
    return null;
  }

  const firstName = user?.businessName?.split(" ")[0] ?? "Partner";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-paper px-5 py-16">
      {/* Decorative glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-marigold-soft blur-3xl opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-teal-soft blur-3xl opacity-50"
      />

      <div className="relative z-10 w-full max-w-2xl space-y-6">
        {/* Header Branding */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2.5">
            <span className="relative grid h-8 w-8 place-items-center rounded-xl bg-teal">
              <span className="absolute h-3.5 w-3.5 rounded-full bg-paper" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-marigold" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-ink">
              Deosai
            </span>
          </div>
          <div>
            <h2 className="font-display text-3xl text-ink">
              Hello, <span className="text-teal font-bold">{firstName}</span> 👋
            </h2>
            <h1 className="mt-2 font-display text-4xl leading-tight tracking-tight text-ink">
              Welcome to <span className="text-teal">Deosai!</span>
            </h1>
            <p className="mt-2 text-sm text-ink-soft">
              Help us personalise Deosai for your business
            </p>
          </div>
        </div>

        {/* Form Body Card */}
        <Card className="shadow-sm">
          <CardBody className="space-y-6">
            {/* Confirm your industry */}
            <div>
              <Label className="text-sm font-semibold text-ink">Confirm your industry</Label>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {industries.map((ind) => (
                  <button
                    key={ind}
                    type="button"
                    onClick={() => setIndustry(ind)}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-150",
                      industry === ind
                        ? "border-teal bg-teal text-paper shadow-sm"
                        : "border-line bg-paper/40 text-ink-soft hover:border-teal hover:text-teal"
                    )}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>

            {/* Confirm your website */}
            <div>
              <Label htmlFor="onb-web" className="text-sm font-semibold text-ink">
                Confirm your website
              </Label>
              <div className="mt-1">
                <Input
                  id="onb-web"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://myjewellerybrand.com"
                  className="h-10 text-xs"
                />
                <p className="mt-1 text-[11px] text-ink-faint">
                  We&apos;ll use this to pre-fill your brand details.
                </p>
              </div>
            </div>

            {/* What best describes you? */}
            <div>
              <Label htmlFor="onb-role" className="text-sm font-semibold text-ink">
                What best describes you?
              </Label>
              <div className="mt-1">
                <Select
                  id="onb-role"
                  value={roleDescription}
                  onChange={(e) => setRoleDescription(e.target.value)}
                  className="h-10 text-xs"
                >
                  <option value="">Select an option</option>
                  <option value="Owner / Founder">Owner / Founder</option>
                  <option value="Store Manager">Store Manager</option>
                  <option value="Customer Support Lead">Customer Support Lead</option>
                  <option value="Marketing Specialist">Marketing Specialist</option>
                  <option value="Developer / Tech Lead">Developer / Tech Lead</option>
                  <option value="Others">Others</option>
                </Select>
              </div>
            </div>

            {/* How big is your company? */}
            <div>
              <Label className="text-sm font-semibold text-ink">How big is your company?</Label>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {companySizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setCompanySize(size)}
                    className={cn(
                      "rounded-full border px-4.5 py-2 text-xs font-semibold transition-all duration-150",
                      companySize === size
                        ? "border-teal bg-teal text-paper shadow-sm"
                        : "border-line bg-paper/40 text-ink-soft hover:border-teal hover:text-teal"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-line flex justify-end">
              <Button
                onClick={handleSaveProfile}
                disabled={saving || !industry || !companySize}
                className="px-8 h-10 text-xs font-bold"
              >
                {saving ? "Saving..." : "Continue"}
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
