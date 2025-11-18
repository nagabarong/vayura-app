import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { Flower2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { env } from "@/config/env";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: "%s | " + siteConfig.name,
  },
  description: siteConfig.description,
  metadataBase: new URL(env.SITE_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Gunakan className="min-h-screen bg-background text-foreground" agar warna dinamis */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground transition-colors`}
      >
        <Providers>
          <Link href="/" aria-label="Go Home" className="fixed left-6 top-6 z-50 transition-transform duration-200 ease-out hover:scale-105 hover:opacity-80">
            <Flower2 className="h-6 w-6 text-black/80 dark:text-white/80" />
          </Link>
          
          {children}
        </Providers>
      </body>
    </html>
  );
}
