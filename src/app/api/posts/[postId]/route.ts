import prisma from "@/db";
import { IRouteParams } from "@/types/common";
import { IPostsRouteParams } from "@/types/posts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: IRouteParams<IPostsRouteParams>
) {
  const { postId } = await params;

  try {
    const post = await prisma.post.findFirst({
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
  { params }: IRouteParams<IPostsRouteParams>
) {
  const { postId } = await params;
  const body = await request.json();
  const { title, content, authorId } = body;

  try {
    const post = await prisma.post.update({
      where: { id: BigInt(postId) },
      data: {
        title,
        content,
        authorId: authorId,
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
  { params }: IRouteParams<IPostsRouteParams>
) {
  const { postId } = await params;

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
