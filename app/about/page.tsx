import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Users, Award, BookOpen } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-24">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="rounded-full bg-primary/10 p-3 text-primary">
            <Users className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-4xl font-bold">About DevMaesters</h1>
          <p className="mt-4 max-w-[58rem] text-muted-foreground">
            Learn more about our mission, our team, and how we're shaping the future of web development education.
          </p>
        </div>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              At DevMaesters, we're passionate about empowering the next generation of web developers. Our mission is to
              provide accessible, high-quality education and resources to help individuals master the art of web
              development and thrive in the ever-evolving tech industry.
            </p>
          </div>
          <div>
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="Team collaboration"
              width={400}
              height={300}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <Award className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expert-Led Courses</h3>
            <p className="text-muted-foreground">
              Learn from industry professionals with years of experience in web development.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <BookOpen className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Comprehensive Curriculum</h3>
            <p className="text-muted-foreground">
              Our courses cover everything from basics to advanced topics in web development.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Users className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Supportive Community</h3>
            <p className="text-muted-foreground">
              Join a thriving community of learners and mentors to support your journey.
            </p>
          </div>
        </div>
        <div className="mt-16 flex justify-center">
          <Button>Join Our Community</Button>
        </div>
      </div>
    </main>
  )
}

