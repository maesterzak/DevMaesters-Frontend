import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page');
    
    const url = page 
      ? `${process.env.NEXT_PUBLIC_API_URL}/blog/posts/?page=${page}`
      : `${process.env.NEXT_PUBLIC_API_URL}/blog/posts/`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    let data = await response.json();
  
    // Transform the next URL to use our API route
    if (data.next) {
      const nextUrl = new URL(data.next);
      const nextPage = nextUrl.searchParams.get('page');
      data.next = nextPage ? `https://localhost:3000/api/blog/postlist?page=${nextPage}` : 'https://localhost:3000/api/blog/postlist';
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}