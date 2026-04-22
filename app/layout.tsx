import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DigitalCard — Digital Business Cards for Apple & Google Wallet",
  description: "Create beautiful digital business cards and add them to Apple Wallet and Google Wallet. Share your contact info with a QR code or NFC tap.",
  openGraph: {
    title: "DigitalCard",
    description: "Digital business cards for the modern professional",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
