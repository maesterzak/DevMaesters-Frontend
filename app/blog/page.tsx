"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Newspaper, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { LoadingOverlay } from "@/components/loading-overlay"
import { getPosts } from "@/components/function/getBlogPosts"
import dompurify from "isomorphic-dompurify";

const categories = [
  { id: "all", name: "All Posts", count: 42 },
  { id: "tutorials", name: "Tutorials", count: 15 },
  { id: "guides", name: "Guides", count: 12 },
  { id: "news", name: "News", count: 8 },
  { id: "case-studies", name: "Case Studies", count: 7 },
]

const blogPosts = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js",
    excerpt: "Learn the basics of Next.js and start building modern web applications.",
    image: "/placeholder.svg?height=200&width=400",
    date: "2023-06-01",
    category: "tutorials",
  },
  {
    slug: "understanding-typescript",
    title: "Understanding TypeScript",
    excerpt: "Deep dive into TypeScript features and best practices.",
    image: "/placeholder.svg?height=200&width=400",
    date: "2023-06-05",
    category: "guides",
  },
  {
    slug: "modern-css-techniques",
    title: "Modern CSS Techniques",
    excerpt: "Explore the latest CSS features and how to use them effectively.",
    image: "/placeholder.svg?height=200&width=400",
    date: "2023-06-10",
    category: "news",
  },
  {
    slug: "react-hooks-explained",
    title: "React Hooks Explained",
    excerpt: "Master the use of React Hooks to create more efficient components.",
    image: "/placeholder.svg?height=200&width=400",
    date: "2023-06-15",
    category: "tutorials",
  },
  {
    slug: "building-restful-apis",
    title: "Building RESTful APIs",
    excerpt: "Learn how to design and implement RESTful APIs for your applications.",
    image: "/placeholder.svg?height=200&width=400",
    date: "2023-06-20",
    category: "guides",
  },
  {
    slug: "introduction-to-graphql",
    title: "Introduction to GraphQL",
    excerpt: "Discover the benefits of GraphQL and how to use it in your projects.",
    image: "/placeholder.svg?height=200&width=400",
    date: "2023-06-25",
    category: "case-studies",
  },
]

const sanitizer = dompurify.sanitize;

export default function BlogPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null)
  const orig = process.env.NEXT_PUBLIC_ORIG_URL
  
  useEffect(() => {
    const fetchPosts = async () => {
      let posts = await getPosts()
      
      console.log("posts", posts)
      setPosts(posts.results)
      setNextPageUrl(posts.next)
    }
    fetchPosts()
  }, [])

  const loadMorePosts = async () => {
    if (!nextPageUrl) return;
    
    setIsLoading(true)
    try {
      const response = await fetch(nextPageUrl);
      const newData = await response.json();
      
      setPosts(prevPosts => [...prevPosts, ...newData.results]);
      setNextPageUrl(newData.next);
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setIsLoading(false)
    }
  }
  console.log("postswww",posts)

  const truncate = (str) => {
    return str.length > 50 ? str.substring(0, 100) + "..." : str;
  };

  return (
    <main className="min-h-screen bg-background">
      {isLoading && <LoadingOverlay />}
      <Navbar />
      <div className="container py-24">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="rounded-full bg-primary/10 p-3 text-primary">
            <Newspaper className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-4xl font-bold">DevMaesters Blog</h1>
          <p className="mt-4 max-w-[58rem] text-muted-foreground">
            Stay up to date with the latest in web development. Our blog features in-depth articles, tutorials, and
            insights from experienced developers.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-64 space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search posts..." className="pl-8" />
            </div>
            <div className="space-y-2">
              <h2 className="font-semibold">Categories</h2>
              <div className="space-y-1">
                {categories.map((category) => (
                  <Button key={category.id} variant="ghost" className="w-full justify-start">
                    {category.name}
                    <Badge variant="secondary" className="ml-auto">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Link
                  key={index}
                  href={`/blog/${post.id}`}
                  className="group relative overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md"
                >
                  <Image
                    src={orig + post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="p-6">
                    <Badge className="mb-2">{post.category.name}</Badge>
                    <h2 className="font-semibold group-hover:text-primary transition-colors">{post.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground"
                    dangerouslySetInnerHTML={{
                        __html: sanitizer(truncate(post.body)),
                      }}>
                    </p>
                    <p className="mt-4 text-sm text-primary">{post.updated_date}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              {nextPageUrl && (
                <Button onClick={loadMorePosts} variant="outline" disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Load More'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

