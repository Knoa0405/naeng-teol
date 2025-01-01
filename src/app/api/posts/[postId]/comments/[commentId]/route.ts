import prisma from "@/db";
import { IRouteParams } from "@/types/common";
import { type NextRequest, NextResponse } from "next/server";
import { IPostsRouteParams } from "@/types/posts";

export async function GET(
  request: NextRequest,
  { params }: IRouteParams<IPostsRouteParams>
) {
  const { commentId } = await params;

  const comment = await prisma.comment.findUnique({
    where: { id: BigInt(commentId) },
  });

  return NextResponse.json({ comment }, { status: 200 });
}

export async function PATCH(
  request: NextRequest,
  { params }: IRouteParams<IPostsRouteParams>
) {
  const { commentId } = await params;
  const body = await request.json();

  const comment = await prisma.comment.update({
    where: { id: BigInt(commentId) },
    data: body,
  });

  return NextResponse.json({ comment }, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: IRouteParams<IPostsRouteParams>
) {
  const { commentId } = await params;

  const comment = await prisma.comment.delete({
    where: { id: BigInt(commentId) },
  });

  return NextResponse.json({ comment }, { status: 200 });
}
