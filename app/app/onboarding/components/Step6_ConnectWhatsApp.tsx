"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface Step6Props {
    formData: any;
    onNext: () => void;    // ← YEH ADD KARO
    onPrev: () => void;
}

export default function Step6_ConnectWhatsApp({
    formData,
    onNext,                // ← YEH ADD KARO
    onPrev,
}: Step6Props) {
    const [connecting, setConnecting] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Connect WhatsApp 📱
            </h2>
            <p className="text-gray-600 mb-6">
                Link your business number to start automating replies.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <p className="text-2xl font-bold text-gray-800">
                    {formData.whatsappNumber || "+92 300 1234567"}
                </p>
                <p className="text-sm text-gray-500">WhatsApp Business Number</p>
            </div>

            <Button
                onClick={() => {
                    setConnecting(true);
                    setTimeout(() => {
                        setConnecting(false);
                        onNext();        // ← YEH CALL HOGA
                    }, 1500);
                }}
                disabled={connecting}
                className="w-full py-6 text-lg bg-green-600 hover:bg-green-700"
            >
                {connecting ? "Connecting..." : "Connect via Meta"}
            </Button>

            <p className="text-xs text-gray-400 mt-3">
                🔒 This is a frontend demo — connection is simulated.
            </p>

            <div className="flex justify-between mt-8">
                <Button type="button" variant="outline" onClick={onPrev}>
                    Back
                </Button>
            </div>
        </div>
    );
}