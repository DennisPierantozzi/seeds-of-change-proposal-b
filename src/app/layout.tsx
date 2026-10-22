import type { Metadata, Viewport } from "next";
import { Caveat, DM_Sans, Fraunces } from "next/font/google";
import { asset } from "@/lib/asset";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const hand = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Seeds of Change Initiative",
  description:
    "We work alongside local changemakers and NGOs to strengthen their organisations, so they can have a greater impact in their communities.",
  openGraph: {
    title: "The Seeds of Change Initiative",
    description: "Helping communities to help themselves.",
    images: [asset("/images/hands.png")],
  },
};

export const viewport: Viewport = {
  themeColor: "#e9e2d3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${hand.variable}`}>{children}</body>
    </html>
  );
}
