"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select, Textarea } from "@/components/ui/Field";
import Link from "next/link";
import Papa from "papaparse";
import * as XLSX from "xlsx";

// ============================================
// STEP 1: BUSINESS PROFILE (Previously Step 2)
// ============================================
const categories = ["Jewellery", "Fashion", "Electronics", "Food", "Handicrafts", "Other"];

function Step1_BusinessProfile({ formData, updateFormData, onNext }: any) {
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate WhatsApp number format: +923001234567
    const phoneRegex = /^\+92\d{10}$/;
    if (!phoneRegex.test(formData.whatsappNumber)) {
      setPhoneError("Please enter a valid WhatsApp number (e.g., +923001234567)");
      return;
    }

    setPhoneError("");
    if (formData.businessName && formData.category && formData.whatsappNumber) {
      onNext();
    }
  };

  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-card p-5 shadow-sm">
      <h2 className="font-display text-xl font-bold text-ink mb-2">Business Profile 🏪</h2>
      <p className="text-ink-soft mb-4 text-sm">Tell us about your store so the AI understands your context.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Business Name *</Label>
          <Input
            type="text"
            placeholder="e.g., Glam Jewellery"
            value={formData.businessName}
            onChange={(e) => updateFormData("businessName", e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Category *</Label>
          <Select
            value={formData.category}
            onChange={(e) => updateFormData("category", e.target.value)}
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label>WhatsApp Business Number *</Label>
          <Input
            type="tel"
            placeholder="+923001234567"
            value={formData.whatsappNumber}
            onChange={(e) => updateFormData("whatsappNumber", e.target.value)}
            required
          />
          {phoneError && <p className="text-danger text-sm mt-1">{phoneError}</p>}
        </div>
        <div className="flex justify-end mt-6 pt-4">
          <Button type="submit">
            Continue →
          </Button>
        </div>
      </form>
    </div>
  );
}

// ============================================
// STEP 2: IMPORT CATALOGUE
// ============================================
function Step2_ImportCatalogue({ formData, updateFormData, onNext, onPrev }: any) {
  const [method, setMethod] = useState<"upload" | "paste">("upload");
  const [pastedText, setPastedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    const extension = file.name.split(".").pop()?.toLowerCase();

    if (extension === "xlsx" || extension === "xls") {
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const bstr = evt.target?.result;
          const workbook = XLSX.read(bstr, { type: "binary" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const data = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, { defval: "" });
          const headers = data.length > 0 ? Object.keys(data[0]) : [];
          
          const cleanRows = data.map((row) => {
            const clean: Record<string, string> = {};
            headers.forEach((h) => { clean[h] = String(row[h] ?? ""); });
            return clean;
          });

          const fullContent = JSON.stringify({
            headers,
            rows: cleanRows,
            fileName: file.name
          });

          updateFormData("catalogues", [
            ...(formData.catalogues || []),
            {
              id: `k_${Date.now()}`,
              type: "document",
              name: `Excel: ${file.name} (${data.length} rows)`,
              content: fullContent,
            }
          ]);
        } catch (err) {
          console.error("Error parsing Excel:", err);
        }
        setIsProcessing(false);
      };
      reader.readAsBinaryString(file);
    } else if (extension === "csv") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const rows = results.data as Record<string, string>[];
          const headers = results.meta.fields ?? [];
          
          const fullContent = JSON.stringify({
            headers,
            rows,
            fileName: file.name
          });

          updateFormData("catalogues", [
            ...(formData.catalogues || []),
            {
              id: `k_${Date.now()}`,
              type: "document",
              name: `CSV: ${file.name} (${rows.length} rows)`,
              content: fullContent,
            }
          ]);
          setIsProcessing(false);
        },
        error: (err) => {
          console.error("Error parsing CSV:", err);
          setIsProcessing(false);
        }
      });
    } else {
      setIsProcessing(false);
    }
  };

  const handlePasteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPastedText(e.target.value);
  };

  const handleNext = () => {
    if (method === "paste" && pastedText.trim()) {
      updateFormData("catalogues", [
        ...(formData.catalogues || []),
        {
          id: `k_${Date.now()}`,
          type: "qa",
          name: `Pasted Catalogue Data`,
          content: pastedText,
        }
      ]);
    }
    onNext();
  };

  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-card p-5 shadow-sm">
      <h2 className="font-display text-xl font-bold text-ink mb-2">Import Catalogue 📦</h2>
      <p className="text-ink-soft mb-4 text-sm">How would you like to add your products?</p>
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded-lg border text-sm transition-colors ${method === "upload" ? "bg-teal-soft/20 border-teal text-teal-bright" : "border-line text-ink-soft hover:bg-paper"}`}
          onClick={() => setMethod("upload")}
        >
          📤 Upload CSV/Excel
        </button>
        <button
          className={`px-4 py-2 rounded-lg border text-sm transition-colors ${method === "paste" ? "bg-teal-soft/20 border-teal text-teal-bright" : "border-line text-ink-soft hover:bg-paper"}`}
          onClick={() => setMethod("paste")}
        >
          📋 Paste Product List
        </button>
      </div>
      {method === "upload" && (
        <div className="border-2 border-dashed border-line rounded-lg p-5 text-center bg-paper/50">
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            disabled={isProcessing}
            onChange={handleFileUpload}
            className="block w-full text-sm text-ink-soft file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal/10 file:text-teal hover:file:bg-teal/20"
          />
          {isProcessing && <p className="mt-3 text-sm text-ink-soft">Processing file...</p>}
          {formData.catalogues && formData.catalogues.filter((c: any) => c.name.startsWith('CSV') || c.name.startsWith('Excel')).map((cat: any) => (
             <p key={cat.id} className="mt-3 text-sm text-success">✅ {cat.name}</p>
          ))}
        </div>
      )}
      {method === "paste" && (
        <Textarea
          className="w-full h-32 text-sm"
          placeholder="Product 1, Rs. 500, In Stock&#10;Product 2, Rs. 750, Out of Stock"
          value={pastedText}
          onChange={handlePasteChange}
        />
      )}
      <div className="flex justify-between mt-6 pt-4">
        <Button type="button" variant="outline" onClick={onPrev}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={isProcessing}>
          Continue →
        </Button>
      </div>
    </div>
  );
}

// ============================================
// STEP 3: STORE POLICIES
// ============================================
function Step3_StorePolicies({ formData, updateFormData, onNext, onPrev }: any) {
  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-card p-5 shadow-sm">
      <h2 className="font-display text-xl font-bold text-ink mb-2">Store Policies 📋</h2>
      <p className="text-ink-soft mb-4 text-sm">Define your rules so the AI gives accurate answers.</p>
      <div className="space-y-4">
        <div>
          <Label>Delivery Charges</Label>
          <Input
            type="text"
            placeholder="e.g., Rs. 150 (free above Rs. 2000)"
            value={formData.deliveryCharges}
            onChange={(e) => updateFormData("deliveryCharges", e.target.value)}
          />
        </div>
        <div>
          <Label>Delivery Time</Label>
          <Input
            type="text"
            placeholder="e.g., 2-3 business days"
            value={formData.deliveryTime}
            onChange={(e) => updateFormData("deliveryTime", e.target.value)}
          />
        </div>
        <div>
          <Label>Return Policy</Label>
          <Input
            type="text"
            placeholder="e.g., 7 days return"
            value={formData.returnPolicy}
            onChange={(e) => updateFormData("returnPolicy", e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-between mt-6 pt-4">
        <Button type="button" variant="outline" onClick={onPrev}>
          Back
        </Button>
        <Button onClick={onNext}>
          Continue →
        </Button>
      </div>
    </div>
  );
}

// ============================================
// STEP 4: AI PERSONALITY
// ============================================
const tones = ["Professional", "Friendly", "Casual", "Formal"];
const languages = ["Urdu + English", "Urdu", "English"];

function Step4_AIPersonality({ formData, updateFormData, onNext, onPrev }: any) {
  const preview = `"Ji bilkul! Pearl earrings are available for Rs. 1,200."`;

  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-card p-5 shadow-sm">
      <h2 className="font-display text-xl font-bold text-ink mb-2">AI Agent Personality 🤖</h2>
      <p className="text-ink-soft mb-4 text-sm">How should your assistant sound?</p>
      <div className="space-y-4">
        <div>
          <Label>Agent Name</Label>
          <Input
            type="text"
            placeholder="e.g., Sara, Deosai Bot"
            value={formData.agentName}
            onChange={(e) => updateFormData("agentName", e.target.value)}
          />
        </div>
        <div>
          <Label>Tone</Label>
          <Select
            value={formData.tone}
            onChange={(e) => updateFormData("tone", e.target.value)}
          >
            {tones.map((t) => (
              <option key={t} value={t.toLowerCase()}>{t}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label>Language</Label>
          <Select
            value={formData.language}
            onChange={(e) => updateFormData("language", e.target.value)}
          >
            {languages.map((l) => (
              <option key={l} value={l.toLowerCase().replace(" + ", "-")}>{l}</option>
            ))}
          </Select>
        </div>
        <div className="rounded-xl border border-line bg-paper p-3">
          <p className="text-xs text-ink-soft mb-1">🔊 Preview</p>
          <p className="text-sm text-ink font-medium">{preview}</p>
        </div>
      </div>
      <div className="flex justify-between mt-6 pt-4">
        <Button type="button" variant="outline" onClick={onPrev}>
          Back
        </Button>
        <Button onClick={onNext}>
          Continue →
        </Button>
      </div>
    </div>
  );
}

// ============================================
// STEP 5: CONNECT WHATSAPP
// ============================================
function Step5_ConnectWhatsApp({ formData, onNext, onPrev }: any) {
  const [connecting, setConnecting] = useState(false);

  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-card p-5 text-center shadow-sm">
      <h2 className="font-display text-xl font-bold text-ink mb-2">Connect WhatsApp 📱</h2>
      <p className="text-ink-soft mb-4 text-sm">Link your business number to start automating replies.</p>
      <div className="rounded-xl border border-line bg-paper p-4 mb-4">
        <p className="text-xl font-bold text-ink">{formData.whatsappNumber || "+92 300 1234567"}</p>
      </div>
      <Button
        onClick={() => {
          setConnecting(true);
          setTimeout(() => { setConnecting(false); onNext(); }, 1500);
        }}
        disabled={connecting}
        className="w-full bg-success hover:bg-success/90 text-white"
        size="lg"
      >
        {connecting ? "Connecting..." : "Connect via Meta"}
      </Button>
      <div className="flex justify-between mt-6 pt-4">
        <Button type="button" variant="outline" onClick={onPrev}>
          Back
        </Button>
      </div>
    </div>
  );
}

// ============================================
// STEP 6: SUCCESS
// ============================================
function Step6_Success({ user, formData, onComplete }: any) {
  const [saving, setSaving] = useState(false);

  const handleFinish = async () => {
    setSaving(true);
    console.log("[Onboarding] Step 6: Saving to Supabase...");
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("sellers")
        .update({
          business_name: formData.businessName,
          category: formData.category,
          phone: formData.whatsappNumber,
          delivery_charges: formData.deliveryCharges,
          delivery_time: formData.deliveryTime,
          return_policy: formData.returnPolicy,
          agent_name: formData.agentName,
          agent_tone: formData.tone,
          agent_language: formData.language,
          onboarded: true,
        })
        .eq("id", user?.id);

      if (error) {
        console.error("[Onboarding] Supabase update error:", error.message);
      } else {
        console.log("[Onboarding] Supabase save successful!");
      }

      // Save catalogue to agent_configs
      if (formData.catalogues && formData.catalogues.length > 0) {
        const { data: existingConfig } = await supabase
          .from("agent_configs")
          .select("seller_id, knowledge_items")
          .eq("seller_id", user?.id)
          .maybeSingle();

        if (existingConfig) {
          const newKnowledge = [...(existingConfig.knowledge_items || []), ...formData.catalogues];
          await supabase
            .from("agent_configs")
            .update({ knowledge_items: newKnowledge })
            .eq("seller_id", user?.id);
        } else {
          await supabase
            .from("agent_configs")
            .insert({
              seller_id: user?.id,
              knowledge_items: formData.catalogues,
            });
        }
      }
    } catch (e) {
      console.error("[Onboarding] Exception during Supabase save:", e);
    }

    // Always attempt to redirect, even if Supabase saving failed
    console.log("[Onboarding] Proceeding to redirect...");
    try {
      localStorage.setItem("onboardingData", JSON.stringify(formData));

      if (onComplete) {
        await onComplete();
      } else {
        // Backup direct redirect if onComplete is missing
        console.log("[Onboarding] onComplete not found, forcing direct redirect");
        if (typeof window !== "undefined") window.location.href = "/dashboard";
      }
    } catch (e) {
      console.error("[Onboarding] Error during final redirect:", e);
      if (typeof window !== "undefined") window.location.href = "/dashboard";
    }

    setSaving(false);
  };

  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-card p-5 text-center shadow-sm">
      <h2 className="font-display text-2xl font-bold text-ink mb-2">You're All Set!</h2>
      <p className="text-ink-soft mb-4 text-sm">Your AI support agent is ready to go.</p>
      <Button
        onClick={handleFinish}
        disabled={saving}
        className="w-full"
        size="lg"
      >
        {saving ? "Saving..." : "Go to Dashboard →"}
      </Button>
    </div>
  );
}

// ============================================
// MAIN ONBOARDING PAGE
// ============================================
export default function OnboardingPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    whatsappNumber: "",
    deliveryCharges: "",
    deliveryTime: "",
    returnPolicy: "",
    agentName: "",
    tone: "friendly",
    language: "urdu-english",
    industry: "",
    website: "",
    roleDescription: "",
    companySize: "",
    catalogues: [],
  });

  // 1. One-time Redirect to Dashboard if already onboarded
  useEffect(() => {
    if (!authLoading && user && user.onboarded) {
      if (typeof window !== "undefined") {
        window.location.replace("/dashboard");
      }
    }
  }, [user, authLoading]);

  // 2. Pre-fill businessName and phone from signup data
  useEffect(() => {
    if (user && !authLoading) {
      setFormData((prev) => ({
        ...prev,
        businessName: prev.businessName || user.businessName || "",
        whatsappNumber: prev.whatsappNumber || user.phone || "",
      }));
    }
  }, [user, authLoading]);

  const updateFormData = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => { if (step < totalSteps) setStep(step + 1); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const prevStep = () => { if (step > 1) setStep(step - 1); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const handleComplete = async () => {
    console.log("[Onboarding] handleComplete triggered");

    if (user) {
      localStorage.setItem(`onboarded_${user.id}`, "true");
      localStorage.setItem("onboardingComplete", "true");
    }

    // Small delay to ensure localStorage is set
    await new Promise(resolve => setTimeout(resolve, 100));

    console.log("[Onboarding] Attempting router.push('/dashboard')...");
    try {
      router.push("/dashboard");
    } catch (e) {
      console.warn("[Onboarding] router.push failed:", e);
    }

    // Fallback to window.location.href to guarantee redirect
    setTimeout(() => {
      if (typeof window !== "undefined" && window.location.pathname !== "/dashboard") {
        console.log("[Onboarding] Fallback: Forcing window.location.href = '/dashboard'");
        window.location.href = "/dashboard";
      }
    }, 300);
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center bg-paper text-ink-soft">Loading...</div>;

  if (!user) {
    if (typeof window !== "undefined") window.location.href = "/auth/login";
    return null;
  }

  // If already onboarded, we don't render the form again (prevents flashes before redirect)
  if (user.onboarded) {
    return <div className="min-h-screen flex items-center justify-center bg-paper text-ink-soft">Redirecting to dashboard...</div>;
  }

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1_BusinessProfile formData={formData} updateFormData={updateFormData} onNext={nextStep} />;
      case 2: return <Step2_ImportCatalogue formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 3: return <Step3_StorePolicies formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 4: return <Step4_AIPersonality formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 5: return <Step5_ConnectWhatsApp formData={formData} onNext={nextStep} onPrev={prevStep} />;
      case 6: return <Step6_Success user={user} formData={formData} onComplete={handleComplete} />;
      default: return null;
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-paper px-5 py-12">
      {/* Decorative blurs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-teal-soft blur-3xl opacity-50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-marigold-soft blur-3xl opacity-60"
      />

      <div className="relative z-10 w-full max-w-lg space-y-6">
        <div className="flex flex-col items-center gap-3">
          <Link href="/" aria-label="Back to home">
            <Logo />
          </Link>
          <div className="text-center">
            <h1 className="font-display text-2xl tracking-tight text-ink">
              Store Setup
            </h1>
            <p className="mt-1 text-sm text-ink-soft">
              Complete these steps to set up your store.
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="rounded-[var(--radius-card)] border border-line bg-card p-4 shadow-sm">
          <div className="flex justify-between text-xs text-ink-soft mb-2 font-medium">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-paper rounded-full h-2 border border-line overflow-hidden">
            <div className="bg-teal h-full rounded-full transition-all duration-500" style={{ width: `${(step / totalSteps) * 100}%` }} />
          </div>
        </div>

        {renderStep()}
      </div>
    </div>
  );
}