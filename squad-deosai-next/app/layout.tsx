import type { Metadata } from "next";
import { Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Manrope is the Docushield style-guide primary typeface, used for both
// headings and body. Full weight range so display headings can sit at a
// refined 600/700 rather than a punchy 800.
const sans = Manrope({
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
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
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="bg-snow text-coal font-sans min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
