import { Navbar } from "@/components/navbar"
import { Shield } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-24">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="rounded-full bg-primary/10 p-3 text-primary">
            <Shield className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-4xl font-bold">Privacy Policy</h1>
          <p className="mt-4 max-w-[58rem] text-muted-foreground">
            Your privacy is important to us. This policy outlines how we collect, use, and protect your data.
          </p>
        </div>

        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <section>
            <h2>Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul>
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Profile information</li>
              <li>Content you post on our platform</li>
            </ul>
          </section>

          <section>
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and maintain our services</li>
              <li>Improve and personalize your experience</li>
              <li>Communicate with you</li>
              <li>Monitor and analyze trends</li>
            </ul>
          </section>

          <section>
            <h2>Information Sharing</h2>
            <p>We do not sell your personal information. We may share your information with:</p>
            <ul>
              <li>Service providers</li>
              <li>Legal authorities when required</li>
              <li>Other users (only information you choose to make public)</li>
            </ul>
          </section>

          <section>
            <h2>Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information from unauthorized access,
              alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of communications</li>
            </ul>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              Email: privacy@devmaesters.com
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

