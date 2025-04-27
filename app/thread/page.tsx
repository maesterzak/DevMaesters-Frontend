"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, User, ThumbsUp, Eye } from "lucide-react"
import Link from "next/link"
import { NewThreadModal } from "@/components/modals/new-thread-modal"
import { LoadingOverlay } from "@/components/loading-overlay"
import { useToast } from "@/components/ui/use-toast"

interface Thread {
  id: number;
  title: string;
  author: {
    username: string;
  };
  category: string;
  replies_count: number;
  likes_count: number;
  views_count: number;
  last_active: string;
}

export default function ThreadsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [threads, setThreads] = useState<Thread[]>([])
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/threads/`);
        if (!response.ok) {
          throw new Error('Failed to fetch threads');
        }
        const data = await response.json();
        console.log("data",data)  
        setThreads(data.results);
        setNextPageUrl(data.next);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load threads. Please try again later.",
        });
      }
    };

    fetchThreads();
  }, []);

  const loadMoreThreads = async () => {
    if (!nextPageUrl) return;
    
    setIsLoading(true)
    try {
      const response = await fetch(nextPageUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch more threads');
      }
      const data = await response.json();
      setThreads(prevThreads => [...prevThreads, ...data.results]);
      setNextPageUrl(data.next);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load more threads. Please try again later.",
      });
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {isLoading && <LoadingOverlay />}
      <Navbar />
      <div className="container py-24">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="rounded-full bg-primary/10 p-3 text-primary">
            <MessageSquare className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-4xl font-bold">Community Threads</h1>
          <p className="mt-4 max-w-[58rem] text-muted-foreground">
            Join our vibrant community discussions. Share your knowledge, ask questions, and learn from fellow
            developers.
          </p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <Input className="max-w-sm" placeholder="Search threads..." />
          <NewThreadModal />
        </div>

        <div className="space-y-4">
          {threads.map((thread) => (
            <div key={thread.id} className="border rounded-lg p-6 bg-card hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Link
                    href={`/thread/${thread.id}`}
                    className="text-xl font-semibold hover:text-primary transition-colors"
                  >
                    {thread.title}
                  </Link>
                  <p className="text-sm text-muted-foreground mt-1">
                    Category: <span className="text-primary">{thread.category}</span>
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Reply
                </Button>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="h-4 w-4 mr-1" />
                {/* <span className="mr-4">{thread.author.username}</span> */}
                <MessageSquare className="h-4 w-4 mr-1" />
                {/* <span className="mr-4">{thread.replies_count} replies</span> */}
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span className="mr-4">{thread.likes_count} likes</span>
                <Eye className="h-4 w-4 mr-1" />
                {/* <span className="mr-4">{thread.views_count} views</span> */}
                {/* <span>Last active: {new Date(thread.last_active).toLocaleDateString()}</span> */}
              </div>
            </div>
          ))}
        </div>

        {nextPageUrl && (
          <div className="mt-8 flex justify-center">
            <Button onClick={loadMoreThreads} variant="outline" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Load More'}
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}

