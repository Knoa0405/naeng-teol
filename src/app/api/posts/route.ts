import prisma from "@/db";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cursor = searchParams.get("cursor");
  const take = 10; // 한 번에 가져올 포스트 수

  const posts = await prisma.post.findMany({
    take: take + 1, // 다음 페이지가 있는지 확인하기 위해 하나 더 가져옴
    skip: cursor ? 1 : 0, // 커서가 있을 경우 첫 번째 포스트를 건너뜀
    cursor: cursor ? { id: Number(cursor) } : undefined,
    orderBy: { createdAt: "desc" },
  });

  const hasNextPage = posts.length > take;
  if (hasNextPage) posts.pop(); // 다음 페이지가 있으면 마지막 포스트 제거

  return Response.json({ posts, hasNextPage }, { status: 200 });
}
