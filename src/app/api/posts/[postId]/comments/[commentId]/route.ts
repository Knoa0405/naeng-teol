import prisma from "@/db";
import { IRouteParams } from "@/types/common";
import { IPostsRouteParams } from "@/types/posts";

export async function GET(
  request: Request,
  { params }: IRouteParams<IPostsRouteParams>
) {
  const { commentId } = await params;

  const comment = await prisma.comment.findUnique({
    where: { id: Number(commentId) },
  });

  return Response.json({ comment }, { status: 200 });
}

export async function PATCH(
  request: Request,
  { params }: IRouteParams<IPostsRouteParams>
) {
  const { commentId } = await params;
  const body = await request.json();

  const comment = await prisma.comment.update({
    where: { id: Number(commentId) },
    data: body,
  });

  return Response.json({ comment }, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: IRouteParams<IPostsRouteParams>
) {
  const { commentId } = await params;

  const comment = await prisma.comment.delete({
    where: { id: Number(commentId) },
  });

  return Response.json({ comment }, { status: 200 });
}
