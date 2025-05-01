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
            <h2>Introduction</h2>
            <p>
              This Privacy Policy explains how DevMaesters ("we", "us", or "our") collects, uses, and shares your
              personal information when you visit our website, use our services, or otherwise interact with us.
            </p>
            <p>
              By using our website and services, you consent to the collection, use, and disclosure of your information
              as described in this Privacy Policy.
            </p>
          </section>

          <section>
            <h2>Information We Collect</h2>
            <p>We collect several types of information from and about users of our website, including:</p>
            <ul>
              <li>
                <strong>Personal Information:</strong> Name, email address, phone number, and other identifiers that you
                provide when registering, subscribing to our services, or contacting us.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you interact with our website, including pages
                visited, time spent on pages, and other browsing patterns.
              </li>
              <li>
                <strong>Device Information:</strong> Information about the device you use to access our website,
                including IP address, browser type, operating system, and device identifiers.
              </li>
              <li>
                <strong>Cookies and Similar Technologies:</strong> We use cookies and similar tracking technologies to
                collect information about your browsing activities and to personalize your experience on our website.
              </li>
            </ul>
          </section>

          <section>
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our website and services</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative information, such as updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Personalize your experience and deliver content tailored to your interests</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our website</li>
              <li>Detect, prevent, and address technical issues</li>
              <li>Protect against harmful, unauthorized, or illegal activity</li>
            </ul>
          </section>

          <section>
            <h2>Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our website and to hold certain
              information. Cookies are files with a small amount of data which may include an anonymous unique
              identifier.
            </p>
            <p>We use the following types of cookies:</p>
            <ul>
              <li>
                <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly and
                cannot be switched off in our systems.
              </li>
              <li>
                <strong>Performance Cookies:</strong> These cookies allow us to count visits and traffic sources so we
                can measure and improve the performance of our site.
              </li>
              <li>
                <strong>Functional Cookies:</strong> These cookies enable the website to provide enhanced functionality
                and personalization.
              </li>
              <li>
                <strong>Targeting Cookies:</strong> These cookies may be set through our site by our advertising
                partners to build a profile of your interests.
              </li>
            </ul>
            <p>
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However,
              if you do not accept cookies, you may not be able to use some portions of our website.
            </p>
          </section>

          <section>
            <h2>Data Sharing and Disclosure</h2>
            <p>We may share your personal information in the following situations:</p>
            <ul>
              <li>
                <strong>With Service Providers:</strong> We may share your information with third-party vendors, service
                providers, contractors, or agents who perform services for us.
              </li>
              <li>
                <strong>For Business Transfers:</strong> We may share or transfer your information in connection with,
                or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a
                portion of our business.
              </li>
              <li>
                <strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with
                your consent.
              </li>
              <li>
                <strong>To Comply with Legal Obligations:</strong> We may disclose your information where we are legally
                required to do so.
              </li>
            </ul>
          </section>

          <section>
            <h2>Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li>The right to access the personal information we hold about you</li>
              <li>The right to request correction of inaccurate personal information</li>
              <li>The right to request deletion of your personal information</li>
              <li>The right to object to processing of your personal information</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the contact information provided at the end of
              this Privacy Policy.
            </p>
          </section>

          <section>
            <h2>Data Security</h2>
            <p>
              We have implemented appropriate technical and organizational security measures designed to protect the
              security of any personal information we process. However, please also remember that we cannot guarantee
              that the internet itself is 100% secure.
            </p>
          </section>

          <section>
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            <p>
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy
              are effective when they are posted on this page.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              Email: privacy@devmaesters.com
            </p>
          </section>

          <p className="text-sm text-muted-foreground mt-8">Last Updated: May 1, 2025</p>
        </div>
      </div>
    </main>
  )
}
