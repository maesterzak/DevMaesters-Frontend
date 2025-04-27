"use client"

import { useState, useEffect } from "react"
import { use } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, User, ThumbsUp, Eye, Flag, Share2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import dompurify from "isomorphic-dompurify"
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import Link from "next/link"


interface ThreadMessage {
  id: number;
  name: string;
  date_created: string;
  body: string;
  profile_image: string | null;
}

interface ThreadData {
  id: number;
  title: string;
  description: string;
  started: string;
  status: boolean;
  thread_messages: ThreadMessage[];
}

interface Thread {
  threads: ThreadData;
  similar_content: Array<{
    id: number;
    title: string;
    description: string;
  }>;
  tags: Array<{
    id: number;
    name: string;
  }>;
}

const sanitizer = dompurify.sanitize;

export default function ThreadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [thread, setThread] = useState<Thread | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const { toast } = useToast();
  const orig = process.env.NEXT_PUBLIC_ORIG_URL;

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const response = await fetch(`/api/blog/threads/${resolvedParams.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch thread');
        }
        const data = await response.json();
        setThread(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load thread. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchThread();
  }, [resolvedParams.id]);

  useEffect(() => {
    // Initialize highlight.js after content is loaded
    if (!isLoading && thread) {
      hljs.highlightAll();
    }
  }, [isLoading, thread]);

  const handleReplySubmit = async () => {
    if (!reply.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a reply before submitting.",
      });
      return;
    }

    try {
      const response = await fetch(`/api/blog/threads/${resolvedParams.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: reply,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit reply');
      }

      const newReply = await response.json();
      setThread(prev => {
        if (!prev) return null;
        return {
          ...prev,
          threads: {
            ...prev.threads,
            thread_messages: [...prev.threads.thread_messages, newReply.data],
          },
        };
      });
      setReply("");
      toast({
        title: "Reply submitted",
        description: "Your reply has been posted successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit reply. Please try again.",
      });
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-24">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded mb-8"></div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !thread) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Error</h1>
            <p className="text-muted-foreground">{error || 'Thread not found'}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{thread.threads.title}</h1>
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <User className="h-4 w-4 mr-1" />
            <span className="mr-4">Posted on {new Date(thread.threads.started).toLocaleDateString()}</span>
            {thread.tags.length > 0 && (
              <div className="flex items-center">
                <span className="mr-2">Tags:</span>
                {thread.tags.map(tag => (
                  <span key={tag.id} className="mr-2 text-primary">{tag.name}</span>
                ))}
              </div>
            )}
          </div>
          <div className="bg-card rounded-lg p-6 mb-6">
            <div 
              className="prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: sanitizer(thread.threads.description) }}
            />
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Like
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Flag className="h-4 w-4 mr-2" />
              Report
            </Button>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Replies</h2>
        <div className="space-y-6">
          {thread.threads.thread_messages.map((message) => (
            <div key={message.id} className="bg-card rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={message.profile_image ? orig + message.profile_image : undefined} alt={message.name} />
                  <AvatarFallback>{message.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{message.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Replied on {new Date(message.date_created).toLocaleDateString()}
                  </p>
                  <div 
                    className="mt-2 prose prose-sm dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: sanitizer(message.body) }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {thread.similar_content.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Similar Threads</h2>
            <div className="grid gap-4">
              {thread.similar_content.map((similar) => (
                <div key={similar.id} className="bg-card rounded-lg p-4 hover:shadow-md transition-shadow">
                  <Link href={`/thread/${similar.id}`} className="text-lg font-semibold mb-2">{similar.title}</Link>
                  
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Add a Reply</h3>
          <Textarea 
            className="mb-4" 
            placeholder="Type your reply here..." 
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
          <Button onClick={handleReplySubmit}>Post Reply</Button>
        </div>
      </div>
    </main>
  )
}

