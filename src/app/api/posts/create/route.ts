import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { IPost } from "@/types/posts";

export interface ICreatePostRequestBody extends IPost {}
export interface ICreatePostResponseBody {
  post: IPost | null;
  error?: string;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ICreatePostResponseBody>> {
  const body = (await request.json()) as ICreatePostRequestBody;
  const { title, content, ingredients, rawContent, authorId } = body;

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

    return NextResponse.json(
      {
        post,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { post: null, error: "Failed to create post" },
      { status: 500 }
    );
  }
}
