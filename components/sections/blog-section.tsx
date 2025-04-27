"use client"

import { useState, useEffect } from "react"
import { Newspaper } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import { getPosts } from "../function/getBlogPosts"

interface LatestPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  author: {
    username: string;
    avatar: string;
  };
  created_at: string;
  category: string;
  read_time: number;
  image: string;
}



export function BlogSection() {
  const [featuredPosts, setFeaturedPosts] = useState<LatestPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const orig = process.env.NEXT_PUBLIC_ORIG_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts();
        
        // Get only the first 3 posts
        setFeaturedPosts(posts.results.slice(0, 3));
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load latest posts. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="container py-24">
      <div className="flex flex-col items-center text-center">
        <div className="rounded-full bg-primary/10 p-3 text-primary">
          <Newspaper className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-3xl font-bold">Latest Blog Posts</h2>
        <p className="mt-4 max-w-[58rem] text-muted-foreground">
          Stay up to date with the latest in web development. Our blog features in-depth articles, tutorials, and
          insights from experienced developers.
        </p>
      </div>
      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          // Loading skeleton
          Array(3).fill(0).map((_, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border bg-background"
            >
              <div className="h-[200px] w-full bg-gray-200 animate-pulse" />
              <div className="p-6">
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))
        ) : (
          featuredPosts.map((post) => (
            <div
              key={post.id}
            className="group relative overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md"
          >
            <Image
                src={post.image ? orig + post.image : "/placeholder.svg"}
              alt={post.title}
              width={400}
              height={200}
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="p-6">
            <Link
                  
                  href={`/blog/${post.id}`}
                  className="group relative overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md"
                >
              <h3 className="font-semibold">{post.title}</h3>
              </Link>
              <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <span>{post.author.username}</span>
                  <span className="mx-2">•</span>
                  <span>{post.read_time} min read</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-12 flex justify-center">
        <Button asChild>
          <Link href="/blog">View All Posts</Link>
        </Button>
      </div>
    </section>
  )
}

