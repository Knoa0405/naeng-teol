import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { postId } = params;

  const comments = await prisma.comment.findMany({
    where: {
      post_id: BigInt(postId),
    },
  });

  return NextResponse.json({ comments }, { status: 200 });
}
