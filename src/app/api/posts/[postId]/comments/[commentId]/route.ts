import prisma from "@/db";
import { type NextRequest, NextResponse } from "next/server";

interface RouteParams {
  postId: string;
  commentId: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: RouteParams }
) {
  const { commentId } = params;

  const comment = await prisma.comment.findUnique({
    where: { id: BigInt(commentId) },
  });

  return NextResponse.json({ comment }, { status: 200 });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: RouteParams }
) {
  const { commentId } = params;
  const body = await request.json();

  const comment = await prisma.comment.update({
    where: { id: BigInt(commentId) },
    data: body,
  });

  return NextResponse.json({ comment }, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: RouteParams }
) {
  const { commentId } = params;

  const comment = await prisma.comment.delete({
    where: { id: BigInt(commentId) },
  });

  return NextResponse.json({ comment }, { status: 200 });
}
