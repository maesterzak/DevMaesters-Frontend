import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import type { Metadata } from "next"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar";
import GoogleAnalytics from "@/components/google-analytics";
import { CookieConsent } from "@/components/cookie-consent"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevMaesters | Programming Tutorials, Projects & Developer Community",
  description: "DevMaesters is a full-stack development hub offering programming tutorials, project showcases, and a vibrant developer community. Explore in-depth articles, hands-on projects, and structured learning paths to enhance your coding skills",
  keywords: "DevMaesters, programming tutorials, web development, full-stack development, developer community, coding projects, learning paths, Django, React, Next.js, Electron, React Native"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google AdSense Script */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2931659559298094"
     crossorigin="anonymous"></script> */}
        <Script
          id="adsense-script"
          strategy="afterInteractive"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2931659559298094"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
          <ToastContainer position="top-right" autoClose={3000} />
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  )
}

import './globals.css'
import Script from "next/script";
