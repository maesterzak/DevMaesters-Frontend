import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { ThreadsSection } from "@/components/sections/threads-section"
import { BlogSection } from "@/components/sections/blog-section"
import { PortfolioSection } from "@/components/sections/portfolio-section"
import { AcademySection } from "@/components/sections/academy-section"
import { ContactSection } from "@/components/sections/contact-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ThreadsSection />
      <BlogSection />
      <PortfolioSection />
      <AcademySection />
      <ContactSection />
    </main>
  )
}

