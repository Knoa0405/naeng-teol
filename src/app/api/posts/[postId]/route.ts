import prisma from "@/db";
import { IRouteParams } from "@/types/common";
import { IPostsRouteParams } from "@/types/posts";

export async function GET(
  request: Request,
  { params }: IRouteParams<IPostsRouteParams>
) {
  const { postId } = await params;

  try {
    const post = await prisma.post.findFirst({
      where: { id: BigInt(postId) },
    });

    if (!post) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    return Response.json(
      {
        post,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch post from database" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: IRouteParams<IPostsRouteParams>
) {
  const { postId } = await params;
  const body = await request.json();
  const { title, content, authorId } = body;

  try {
    const post = await prisma.post.update({
      where: { id: BigInt(postId) },
      data: {
        title,
        content,
        authorId: authorId,
      },
    });

    return Response.json(
      {
        post,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: "Failed to update post in database" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: IRouteParams<IPostsRouteParams>
) {
  const { postId } = await params;

  try {
    const post = await prisma.post.delete({
      where: { id: Number(postId) },
    });

    return Response.json(
      {
        post,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: "Failed to delete post from database" },
      { status: 500 }
    );
  }
}
