import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { IPost } from "@/types/posts";

interface IRequestBody extends IPost {}
interface IResponseBody {
  post: IPost | null;
  error?: string;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<IResponseBody>> {
  const body = (await request.json()) as IRequestBody;
  const { title, content, ingredients, rawContent, authorId } = body;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        ingredients,
        rawContent,
        authorId,
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
