import prisma from "@/db";
import { IPost } from "@/types/posts";

export interface ICreatePostRequestBody extends IPost {}
export interface ICreatePostResponseBody {
  post: IPost | null;
  error?: string;
}

export async function POST(request: Request): Promise<Response> {
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

    return Response.json(
      {
        post: {
          id: post.id.toString(),
          title: post.title,
          content: post.content,
          rawContent: post.rawContent,
          ingredients: post.ingredients,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { post: null, error: "Failed to create post" },
      { status: 500 }
    );
  }
}
