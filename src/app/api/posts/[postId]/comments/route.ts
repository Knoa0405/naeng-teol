import prisma from "@/db";
import { IRouteParams } from "@/types/common";
import { IPostsRouteParams } from "@/types/posts";

export async function GET(
  request: Request,
  { params }: IRouteParams<IPostsRouteParams>
) {
  const { postId } = await params;

  const comments = await prisma.comment.findMany({
    where: {
      postId: BigInt(postId),
    },
  });

  return Response.json({ comments }, { status: 200 });
}
