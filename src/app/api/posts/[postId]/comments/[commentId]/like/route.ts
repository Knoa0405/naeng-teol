import prisma from "@/db";
import { IRouteParams } from "@/types/common";

export const POST = async (
  request: Request,
  { params }: IRouteParams<{ commentId: string }>,
) => {
  const { userId } = await request.json();
  const { commentId } = await params;

  const response = await prisma.commentLike.create({
    data: {
      userId,
      commentId: Number(commentId),
    },
  });

  return Response.json(response, { status: 200 });
};
