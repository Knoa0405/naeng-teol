import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: BigInt(id) },
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
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const { title, content, authorId } = body;

  try {
    const post = await prisma.post.update({
      where: { id: BigInt(id) },
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

export async function DELETE({ params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const post = await prisma.post.delete({
      where: { id: Number(id) },
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
