import { type NextRequest } from "next/server";

import prisma from "@/db";
import { IPost, IPostRequest } from "@/types/posts";

export interface ICreatePostRequestBody extends Partial<IPostRequest> {}
export interface ICreatePostResponseBody {
  post: IPost;
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
    include: {
      images: {
        include: {
          image: true,
        },
      },
    },
  });

  const hasNextPage = posts.length > take;
  if (hasNextPage) posts.pop(); // 다음 페이지가 있으면 마지막 포스트 제거

  return Response.json({ posts }, { status: 200 });
}

export async function POST(request: Request): Promise<Response> {
  const body = (await request.json()) as ICreatePostRequestBody;
  const { title, content, ingredients, rawContent, authorId, images } = body;

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
    const post = await prisma.$transaction(async tx => {
      // 1. 먼저 post를 생성합니다
      const newPost = await tx.post.create({
        data: {
          authorId,
          title,
          content,
          rawContent,
          ingredients,
        },
      });

      // 2. 이미지가 있는 경우 이미지와 관계를 생성합니다
      if (images && images.length > 0) {
        await Promise.all(
          images.map(async (imageRelation, index) => {
            // 2-1. 이미지 hash로 기존 이미지 찾기
            let image;
            if (imageRelation.image.hash) {
              image = await tx.image.findUnique({
                where: { hash: imageRelation.image.hash },
              });
            }

            // 2-2. 기존 이미지가 없는 경우에만 새로 생성
            if (!image) {
              image = await tx.image.create({
                data: {
                  url: imageRelation.image.url,
                  alt: imageRelation.image.alt,
                  hash: imageRelation.image.hash ?? undefined,
                },
              });
            }

            // 2-3. 이미지 관계 생성
            await tx.imageRelation.create({
              data: {
                order: imageRelation.order ?? index,
                post: {
                  connect: {
                    id: newPost.id,
                  },
                },
                image: {
                  connect: {
                    id: image.id,
                  },
                },
              },
            });
          }),
        );
      }

      // 3. 생성된 post를 이미지 관계와 함께 조회합니다
      return await tx.post.findUnique({
        where: { id: newPost.id },
        include: {
          images: {
            include: {
              image: true,
            },
          },
        },
      });
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
