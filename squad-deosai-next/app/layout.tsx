import type { Metadata } from "next";
import { Fraunces, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { PointerGlow } from "@/components/ui/PointerGlow";

const display = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const sans = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deosai — never miss a DM again",
  description:
    "A WhatsApp assistant for Pakistani social sellers. It answers price, delivery, availability, returns and hours from your own catalogue, and confirms COD orders automatically — even at 3 AM.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-paper text-ink font-sans min-h-full flex flex-col" suppressHydrationWarning>
        <PointerGlow />
        {children}
      </body>
    </html>
  );
}
