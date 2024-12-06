import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  postId: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: RouteParams }
) {
  const { postId } = params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: BigInt(postId) },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        post,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch post from database" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: RouteParams }
) {
  const { postId } = params;
  const body = await request.json();
  const { title, content, authorId } = body;

  try {
    const post = await prisma.post.update({
      where: { id: BigInt(postId) },
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
      { error: "Failed to update post in database" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: RouteParams }
) {
  const { postId } = params;

  try {
    const post = await prisma.post.delete({
      where: { id: Number(postId) },
    });

    return NextResponse.json(
      {
        post,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete post from database" },
      { status: 500 }
    );
  }
}
