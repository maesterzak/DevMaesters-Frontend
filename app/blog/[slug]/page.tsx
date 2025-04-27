"use client"

import { useEffect, useState } from "react"
import { use } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, MessageSquare, Share2, Bookmark, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { YouTubeEmbed } from "@/components/youtube-embed"
import dompurify from "isomorphic-dompurify"
import "highlight.js/styles/agate.css";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

interface Tag {
  id: number;
  name: string;
}

interface SimilarPost {
  id: number;
  title: string;
  image: string;
  published_date: string;
}

interface Comment {
  id: number;
  name: string;
  body: string;
  date_created: string;
  likes: number;
}

interface Post {
  id: number;
  title: string;
  body: string;
  image: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  published_date: string;
  video?: string;
  tags: Tag[];
  posts_comments: Comment[];
}

interface PostResponse {
  post: Post;
  similar_post: SimilarPost[];
  tags: Tag[];
}

const sanitizer = dompurify.sanitize;

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [postData, setPostData] = useState<PostResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const { toast } = useToast();
  const orig = process.env.NEXT_PUBLIC_ORIG_URL;
  const hljs = require("highlight.js");
  useEffect(() => {
    hljs.highlightAll();
    hljs.configure({ ignoreUnescapedHTML: true });
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${resolvedParams.slug}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPostData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [resolvedParams.slug]);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a comment before submitting.",
      });
      return;
    }

    try {
      // Here you would typically make an API call to submit the comment
      // For now, we'll just show a success message
      toast({
        title: "Comment submitted",
        description: "Your comment has been posted successfully.",
        action: (
          <ToastAction altText="Undo">Undo</ToastAction>
        ),
      });
      setComment("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit comment. Please try again.",
      });
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-24">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="h-96 bg-gray-200 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !postData) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Error</h1>
            <p className="text-muted-foreground">{error || 'Post not found'}</p>
          </div>
        </div>
      </main>
    );
  }

  const { post, similar_post, tags } = postData?.data;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article className="container py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center space-x-4 mb-8">
            <Avatar>
              <AvatarImage src={orig + post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">{post.author.role}</p>
            </div>
            <div className="text-sm text-muted-foreground">
              <span>{new Date(post.published_date).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag) => (
              <Badge key={tag.id} variant="secondary">{tag.name}</Badge>
            ))}
          </div>

          <Image
            src={orig + post.image || "/placeholder.svg"}
            alt={post.title}
            width={800}
            height={400}
            className="rounded-lg mb-8 object-cover"
          />

          <div 
            className="prose prose-lg dark:prose-invert max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: sanitizer(post.body) }}
          />

          {post.video && (
            <>
          <Separator className="my-8" />
          <section className="my-8">
            <h2 className="text-2xl font-bold mb-4">Video Content</h2>
                <YouTubeEmbed videoId={post.video} title={post.title} />
          </section>
            </>
          )}

          <Separator className="my-8" />

          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar Posts</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {similar_post.map((similar) => (
                <Link key={similar.id} href={`/blog/${similar.id}`} className="group">
                  <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="relative">
                        <Image
                          src={orig + similar.image || "/placeholder.svg"}
                          alt={similar.title}
                          width={400}
                          height={200}
                          className="w-full object-cover h-48 transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                          {similar.title}
                        </h3>
                        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                          <span>{new Date(similar.published_date).toLocaleDateString()}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="w-full mt-4 group">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <Separator className="my-8" />

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-8">Comments</h2>

            <div className="mb-8">
              <Textarea 
                placeholder="Add a comment..." 
                className="mb-4" 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button onClick={handleCommentSubmit}>Post Comment</Button>
            </div>

            <div className="space-y-6">
              {post.posts_comments.map((comment) => (
                <div key={comment.id} className="flex space-x-4">
                  <Avatar>
                    <AvatarImage src={"#"} alt={comment.name} />
                    <AvatarFallback>{comment.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{comment?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(comment.date_created).toLocaleDateString()}
                      </p>
                    </div>
                    <div 
                      className="mt-2 prose prose-sm dark:prose-invert"
                      dangerouslySetInnerHTML={{ __html: sanitizer(comment.body) }}
                    />
                    <div className="mt-2 flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        {comment.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Separator className="my-8" />

          <div className="flex items-center justify-between py-6">
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Like
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
            <Button variant="ghost" size="sm">
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </article>
    </main>
  )
}

