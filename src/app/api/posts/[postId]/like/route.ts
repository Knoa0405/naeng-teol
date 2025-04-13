import prisma from "@/db";
import { IRouteParams } from "@/types/common";

export const POST = async (
  request: Request,
  { params }: IRouteParams<{ postId: string }>,
) => {
  const { userId } = await request.json();
  const { postId } = await params;

  const response = await prisma.like.create({
    data: {
      userId,
      postId: Number(postId),
    },
  });

  return Response.json(response, { status: 200 });
};
