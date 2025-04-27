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

interface Category {
  id: number;
  name: string;
  post_count: number;
}

interface Post {
  id: number;
  title: string;
  body: string;
  image: string;
  category: {
    name: string;
  };
  updated_date: string;
}

export default function BlogPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null)
  const orig = process.env.NEXT_PUBLIC_ORIG_URL
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [postsData, categoriesData] = await Promise.all([
          getPosts(),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/categories/`).then(res => res.json())
        ]);
        
        setPosts(postsData.results);
        setCategories(categoriesData);
        setNextPageUrl(postsData.next);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const truncate = (str: string) => {
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
                      {category.post_count}
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
                        __html: dompurify.sanitize(truncate(post.body)),
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

