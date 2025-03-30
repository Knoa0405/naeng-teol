import prisma from "@/db";
import { IRouteParams } from "@/types/common";
import { IPostsRouteParams } from "@/types/posts";

export async function GET(
  request: Request,
  { params }: IRouteParams<IPostsRouteParams>,
) {
  const { postId } = await params;

  const comments = await prisma.comment.findMany({
    where: {
      postId: Number(postId),
    },
  });

  return Response.json({ comments }, { status: 200 });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { postId, content, authorId } = body;

  const comment = await prisma.comment.create({
    data: {
      postId: Number(postId),
      content,
      authorId,
    },
  });

  return Response.json({ comment }, { status: 200 });
}
