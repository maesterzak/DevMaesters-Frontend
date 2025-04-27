import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ThreadsSection() {
  return (
    <section className="container py-24">
      <div className="flex flex-col items-center text-center">
        <div className="rounded-full bg-primary/10 p-3 text-primary">
          <MessageSquare className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-3xl font-bold">Community Threads</h2>
        <p className="mt-4 max-w-[58rem] text-muted-foreground">
          Join our vibrant community discussions. Share your knowledge, ask questions, and learn from fellow developers.
          Our threads section is the perfect place to engage in meaningful technical conversations.
        </p>
        <div className="mt-8">
          <Button asChild>
            <Link href="/threads">Browse Threads</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

