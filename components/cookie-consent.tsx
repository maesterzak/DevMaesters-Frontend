"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem("cookie-consent")
    if (!hasConsent) {
      setShowConsent(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true")
    setShowConsent(false)
  }

  if (!showConsent) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-lg z-50">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm">
          <p>
            <strong>Privacy Policy:</strong> By using our website, you agree that DevMaesters can store cookies on your
            device and disclose information in accordance with our{" "}
            <Link href="/privacy-policy" className="text-primary hover:underline">
              privacy policy
            </Link>
            .
          </p>
        </div>
        <Button onClick={acceptCookies} className="whitespace-nowrap">
          Accept
        </Button>
      </div>
    </div>
  )
}
