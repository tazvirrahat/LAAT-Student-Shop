// Validate required env vars at startup — crashes immediately with a clear message
// if any are missing, preventing mysterious runtime failures in production.
import '@/lib/env'

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: "LAAT Student Shop — The Student Marketplace",
    template: "%s | LAAT Student Shop",
  },
  description: "Shop everything you need for student life. Textbooks, tech, dorm essentials — bought and sold by verified students.",
  keywords: ["student marketplace", "student shop", "textbooks", "dorm essentials", "campus deals"],
  openGraph: {
    type: "website",
    siteName: "LAAT Student Shop",
  },
  robots: {
    index: true,
    follow: true,
  },
}



export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-[var(--bg-page)] text-[var(--text-primary)]">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
