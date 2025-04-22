import { auth } from "@/auth";
import prisma from "@/db";
import { IRouteParams } from "@/types/common";

export const GET = async (
  request: Request,
  { params }: IRouteParams<{ commentId: string }>,
) => {
  const { commentId } = await params;

  const session = await auth();

  try {
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessionUserId = session.user.id;

    const like = await prisma.commentLike.findUnique({
      where: {
        userId_commentId: {
          userId: sessionUserId,
          commentId: Number(commentId),
        },
      },
    });

    return Response.json(like, { status: 200 });
  } catch (error) {
    console.error(
      error,
      "error in api/posts/[postId]/comments/[commentId]/like GET",
    );

    return Response.json({ error: "Failed to get like" }, { status: 500 });
  }
};

export const POST = async (
  request: Request,
  { params }: IRouteParams<{ commentId: string }>,
) => {
  const { userId } = await request.json();
  const { commentId } = await params;

  const existingLike = await prisma.commentLike.findUnique({
    where: {
      userId_commentId: {
        userId: userId as string,
        commentId: Number(commentId),
      },
    },
  });

  if (existingLike) {
    return Response.json(existingLike, { status: 200 });
  }

  const transaction = await prisma.$transaction(async tx => {
    const comment = await tx.comment.findUnique({
      where: {
        id: Number(commentId),
      },
    });

    if (!comment) {
      return Response.json(
        { error: "댓글을 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    await tx.comment.update({
      where: {
        id: Number(commentId),
      },
      data: {
        likesCount: {
          increment: 1,
        },
      },
    });

    const response = await tx.commentLike.create({
      data: {
        userId: userId as string,
        commentId: Number(commentId),
      },
    });

    return response;
  });

  return Response.json(transaction, { status: 200 });
};
