import { cookies } from "next/headers";

import prisma from "@/db";
import { api } from "@/lib/api-helper";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ postId: string }> },
) => {
  const { postId } = await params;

  const post = await prisma.post.findUnique({
    where: {
      id: Number(postId),
    },
    select: {
      views: true,
    },
  });

  if (!post) {
    return Response.json({ error: "Post not found" }, { status: 404 });
  }

  return Response.json({ views: post.views });
};

export const PATCH = async (
  request: Request,
  { params }: { params: Promise<{ postId: string }> },
) => {
  const { postId } = await params;

  const cookieStore = await cookies();
  const viewsCookie = cookieStore.get("viewedPosts")?.value;

  if (!viewsCookie || !viewsCookie.includes(postId)) {
    const post = await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: { views: { increment: 1 } },
    });

    const viewsCookieArray = viewsCookie ? viewsCookie.split(",") : [];

    viewsCookieArray.push(postId);

    cookieStore.set("viewedPosts", viewsCookieArray.join(","), {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 12,
      path: "/",
    });

    return Response.json({ views: post.views });
  }

  const response = await api.get<{ views: number }>(`posts/${postId}/views`);

  const data = await response.json();

  return Response.json({ views: data.views }, { status: 200 });
};
