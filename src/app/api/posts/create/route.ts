import prisma from "@/db";
import { IPost } from "@/types/posts";

export interface ICreatePostRequestBody extends Partial<IPost> {}
export interface ICreatePostResponseBody {
  post: IPost | null;
  error?: string;
}

export async function POST(request: Request): Promise<Response> {
  const body = (await request.json()) as ICreatePostRequestBody;
  const { title, content, ingredients, rawContent, authorId } = body;

  if (!title || !content || !ingredients || !rawContent || !authorId) {
    const missingFields = Object.keys(body).filter(
      (key) => !body[key as keyof ICreatePostRequestBody]
    );

    return Response.json(
      { error: `Missing required fields: ${missingFields.join(", ")}` },
      { status: 400 }
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
