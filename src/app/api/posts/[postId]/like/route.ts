import prisma from "@/db";
import { IRouteParams } from "@/types/common";

export const POST = async (
  request: Request,
  { params }: IRouteParams<{ postId: string }>,
) => {
  const { userId } = await request.json();
  const { postId } = await params;

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId,
        postId: Number(postId),
      },
    },
  });

  if (existingLike) {
    return Response.json(
      { error: "이미 좋아요를 눌렀습니다." },
      { status: 400 },
    );
  }

  const transaction = await prisma.$transaction(async tx => {
    const post = await tx.post.findUnique({
      where: {
        id: Number(postId),
      },
    });

    if (!post) {
      return Response.json(
        { error: "게시글을 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    await tx.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        likesCount: {
          increment: 1,
        },
      },
    });

    const response = await tx.like.create({
      data: {
        userId,
        postId: Number(postId),
      },
    });

    return response;
  });

  return Response.json(transaction, { status: 200 });
};

export const DELETE = async (
  request: Request,
  { params }: IRouteParams<{ postId: string }>,
) => {
  const { userId } = await request.json();
  const { postId } = await params;

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId,
        postId: Number(postId),
      },
    },
  });

  if (!existingLike) {
    return Response.json(
      { error: "좋아요를 누르지 않았습니다." },
      { status: 400 },
    );
  }

  const transaction = await prisma.$transaction(async tx => {
    await tx.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        likesCount: {
          decrement: 1,
        },
      },
    });

    const response = await tx.like.delete({
      where: {
        userId_postId: {
          userId,
          postId: Number(postId),
        },
      },
    });

    return response;
  });

  return Response.json(transaction, { status: 200 });
};
