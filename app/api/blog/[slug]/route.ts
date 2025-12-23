import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = await params; // ✅ REQUIRED in 16+

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/post-detail/${slug}/`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }

    const data = await response.json();

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}
