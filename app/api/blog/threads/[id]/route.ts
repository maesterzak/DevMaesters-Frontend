import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/thread-detail/${params.id}/`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch thread');
    }
    
    const data = await response.json();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error fetching thread:', error);
    return NextResponse.json(
      { error: "Failed to fetch thread" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/thread-detail/${params.id}/reply/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to create reply');
    }
    
    const data = await response.json();
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error('Error creating reply:', error);
    return NextResponse.json(
      { error: "Failed to create reply" },
      { status: 500 }
    );
  }
} 