

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // You can add your data fetching logic here
    // For example, fetching from a database or external API
    const posts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/posts`);
    const data = await posts.json();
    console.log(data);
    

    return NextResponse.json({ data:data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}