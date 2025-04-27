import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export function ContactSection() {
  return (
    <section className="container py-24">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Contact Us</h2>
          <p className="text-muted-foreground">
            Have questions or want to get in touch? Fill out the form, and we'll get back to you as soon as possible.
          </p>
          <div className="flex space-x-4">
            <a href="https://github.com/devmaesters" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </a>
            <a href="https://twitter.com/devmaesters" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
            </a>
            <a href="https://linkedin.com/company/devmaesters" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </a>
            <a href="mailto:contact@devmaesters.com">
              <Button variant="outline" size="icon">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </a>
          </div>
        </div>
        <form className="space-y-4">
          <Input placeholder="Your Name" />
          <Input type="email" placeholder="Your Email" />
          <Input placeholder="Subject" />
          <Textarea placeholder="Your Message" className="min-h-[150px]" />
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  )
}

