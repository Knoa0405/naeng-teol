import prisma from "@/db";
import { type NextRequest, NextResponse } from "next/server";

interface RouteParams {
  postId: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: RouteParams }
) {
  const { postId } = params;

  const comments = await prisma.comment.findMany({
    where: {
      post_id: BigInt(postId),
    },
  });

  return NextResponse.json({ comments }, { status: 200 });
}
