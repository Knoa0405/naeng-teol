import { type NextRequest } from "next/server";

import prisma from "@/db";
import { IPost } from "@/types/posts";

export interface ICreatePostRequestBody extends Partial<IPost> {}
export interface ICreatePostResponseBody {
  post: IPost | null;
  error?: string;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cursorParam = searchParams.get("cursor");
  const cursor = cursorParam ? Number(cursorParam) : undefined;
  const take = 10; // 한 번에 가져올 포스트 수

  const posts = await prisma.post.findMany({
    take: take + 1,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { createdAt: "desc" },
  });

  const hasNextPage = posts.length > take;
  if (hasNextPage) posts.pop(); // 다음 페이지가 있으면 마지막 포스트 제거

  return Response.json({ posts }, { status: 200 });
}

export async function POST(request: Request): Promise<Response> {
  const body = (await request.json()) as ICreatePostRequestBody;
  const { title, content, ingredients, rawContent, authorId } = body;

  if (!title || !content || !ingredients || !rawContent || !authorId) {
    const missingFields = Object.keys(body).filter(
      key => !body[key as keyof ICreatePostRequestBody],
    );

    return Response.json(
      { error: `Missing required fields: ${missingFields.join(", ")}` },
      { status: 400 },
    );
  }

  try {
    const post = await prisma.post.create({
      data: {
        authorId,
        title,
        content,
        rawContent,
        ingredients,
      },
    });

    return Response.json(
      {
        post,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { post: null, error: "Failed to create post" },
      { status: 500 },
    );
  }
}
