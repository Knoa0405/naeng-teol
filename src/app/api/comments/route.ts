import prisma from "@/db";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { postId: string } }) {
  const { postId } = params;

  const comments = await prisma.comment.findMany({
    where: {
      post_id: BigInt(postId),
    },
  });

  return NextResponse.json({ comments }, { status: 200 });
}
