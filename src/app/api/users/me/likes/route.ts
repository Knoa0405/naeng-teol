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

  const likes = await prisma.like.findMany({
    where: {
      userId: user.id,
    },
    include: {
      post: true,
    },
  });

  return Response.json(likes, { status: 200 });
};
