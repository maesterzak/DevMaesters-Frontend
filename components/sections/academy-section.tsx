import { GraduationCap, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FeatureCard } from "../feature-card"

export function AcademySection() {
  const features = [
    {
      title: "Structured Learning Paths",
      description: "Follow carefully crafted learning paths from beginner to advanced levels.",
      icon: CheckCircle,
    },
    {
      title: "Hands-on Projects",
      description: "Build real-world projects to reinforce your learning and build your portfolio.",
      icon: CheckCircle,
    },
    {
      title: "Expert Mentorship",
      description: "Get guidance from experienced developers throughout your learning journey.",
      icon: CheckCircle,
    },
  ]

  return (
    <section className="container py-24">
      <div className="flex flex-col items-center text-center">
        <div className="rounded-full bg-primary/10 p-3 text-primary">
          <GraduationCap className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-3xl font-bold">DevMaesters Academy</h2>
        <p className="mt-4 max-w-[58rem] text-muted-foreground">
          Take your development skills to the next level with our comprehensive learning platform. From beginner to
          advanced topics, we've got you covered.
        </p>
      </div>
      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Button asChild>
          <Link href="/academy">Start Learning</Link>
        </Button>
      </div>
    </section>
  )
}

