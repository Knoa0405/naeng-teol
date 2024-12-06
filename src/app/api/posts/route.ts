import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const cursor = url.searchParams.get("cursor");
  const take = 10; // 한 번에 가져올 포스트 수

  const posts = await prisma.post.findMany({
    take: take + 1, // 다음 페이지가 있는지 확인하기 위해 하나 더 가져옴
    skip: cursor ? 1 : 0, // 커서가 있을 경우 첫 번째 포스트를 건너뜀
    cursor: cursor ? { id: Number(cursor) } : undefined,
    orderBy: { created_at: "desc" },
  });

  const hasNextPage = posts.length > take;
  if (hasNextPage) posts.pop(); // 다음 페이지가 있으면 마지막 포스트 제거

  return NextResponse.json({ posts, hasNextPage }, { status: 200 });
}
