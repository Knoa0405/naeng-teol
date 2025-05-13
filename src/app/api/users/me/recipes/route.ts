import { auth } from "@/auth";
import prisma from "@/db";

export const GET = async (request: Request) => {
  const session = await auth();

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  const recipes = await prisma.post.findMany({
    where: {
      authorId: user.id,
    },
  });

  return Response.json(recipes, { status: 200 });
};
