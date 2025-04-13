import prisma from "@/db";
import { IRouteParams } from "@/types/common";
import { IPostsRouteParams } from "@/types/posts";

export const GET = async (
  request: Request,
  { params }: IRouteParams<IPostsRouteParams>,
) => {
  const { postId } = await params;

  const comments = await prisma.comment.findMany({
    where: {
      postId: Number(postId),
    },
    include: {
      author: true,
    },
  });

  return Response.json({ comments }, { status: 200 });
};

export const POST = async (request: Request) => {
  const body = await request.json();
  const { postId, content, authorId, parentId } = body;

  const comment = await prisma.comment.create({
    data: {
      postId: Number(postId),
      content,
      authorId,
      parentId,
    },
  });

  return Response.json({ comment }, { status: 200 });
};
