import prisma from "@/db";
import { type NextRequest, NextResponse } from "next/server";
import { IRouteParams } from "@/types/common";
import { IPostsRouteParams } from "@/types/posts";

export async function GET(
  request: NextRequest,
  { params }: IRouteParams<IPostsRouteParams>
) {
  const { postId } = await params;

  const comments = await prisma.comment.findMany({
    where: {
      post_id: BigInt(postId),
    },
  });

  return NextResponse.json({ comments }, { status: 200 });
}
