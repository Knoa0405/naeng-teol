import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, content, authorId } = body;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        author_id: authorId,
      },
    });

    return NextResponse.json(
      {
        post,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
