"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

interface Step7Props {
    user: any;
    formData: any;
    onComplete: () => void;   // ← YEH ADD KARO
}

export default function Step7_Success({ user, formData, onComplete }: Step7Props) {
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    const handleFinish = async () => {
        setSaving(true);
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
                .eq("id", user.id);

            if (error) console.warn("Supabase error:", error);

            if (typeof window !== "undefined") {
                localStorage.setItem(`onboarded_${user.id}`, "true");
                localStorage.setItem("onboardingData", JSON.stringify(formData));
            }

            onComplete();   // ← YEH CALL KARO
            router.push("/dashboard");
        } catch (e) {
            console.warn("Error:", e);
        }
        setSaving(false);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                You're All Set!
            </h2>
            <p className="text-gray-600 mb-6">
                Your AI support agent is ready to go.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2 text-sm">
                <p className="font-medium">📋 Business: <span className="font-normal">{formData.businessName || user.businessName}</span></p>
                <p className="font-medium">📱 WhatsApp: <span className="font-normal">{formData.whatsappNumber || "Not connected"}</span></p>
                <p className="font-medium">🤖 Agent: <span className="font-normal">{formData.agentName || "Deosai Bot"}</span></p>
            </div>

            <Button
                onClick={handleFinish}
                disabled={saving}
                className="w-full mt-6 py-6 text-lg bg-blue-600 hover:bg-blue-700"
            >
                {saving ? "Saving..." : "Go to Dashboard →"}
            </Button>
        </div>
    );
}