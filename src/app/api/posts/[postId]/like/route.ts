import { auth } from "@/auth";

import prisma from "@/db";
import { IRouteParams } from "@/types/common";
export const GET = async (
  request: Request,
  { params }: IRouteParams<{ postId: string }>,
) => {
  const { postId } = await params;

  const session = await auth();

  try {
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const like = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId: Number(postId),
        },
      },
    });

    return Response.json(like, { status: 200 });
  } catch (error) {
    console.error(error, "error in api/posts/[postId]/like");

    return Response.json({ error: "Failed to get like" }, { status: 500 });
  }
};

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
    return Response.json(existingLike, { status: 200 });
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
