import { Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function PortfolioSection() {
  
    
  let projects= [
    {
      title: "Cloth2Life",
      description: "Instantly generate high-quality lifestyle photos for your site, marketplace, social media & ad campaign without ever needing a professional photoshoot",
      image: "/placeholder.svg?height=300&width=400",
      link: "https://cloth2life.ai/",
    },
    {
      title: "Plugged Ai",
      description: "A serverless platform for hosting, managing, and integrating AI agents and MCP servers. Scale your AI applications effortlessly with our powerful infrastructure.",
      image: "/placeholder.svg?height=300&width=400",
      link: "https://pluged.ai/",
    },
  ]

  return (
    <section className="container py-24">
      <div className="flex flex-col items-center text-center">
        <div className="rounded-full bg-primary/10 p-3 text-primary">
          <Briefcase className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-3xl font-bold">Featured Projects</h2>
        <p className="mt-4 max-w-[58rem] text-muted-foreground">
          Explore our portfolio of successful projects. See how we've helped businesses and individuals bring their
          ideas to life through innovative web solutions.
        </p>
      </div>
      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group relative overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md"
          >
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={400}
              height={300}
              className="w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="p-6">
              <h3 className="font-semibold">{project.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Button asChild>
          <Link href="/portfolio">View All Projects</Link>
        </Button>
      </div>
    </section>
  )
}

