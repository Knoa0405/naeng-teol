"use server";

import { revalidateTag } from "next/cache";

import {
  ICreatePostRequestBody,
  ICreatePostResponseBody,
} from "@/app/api/posts/route";

import { auth, signIn, signOut } from "@/auth";
import { api } from "@/lib/api-helper";
import { getFullImageUrl } from "@/lib/get-full-image-url";
import { TPost } from "@/types/posts";
import { TComment } from "@/types/posts/comments";
import { TPostLike } from "@/types/posts/like";
import { TRecipe } from "@/types/recipe";

const IMAGE_ORIGIN_URL = process.env.CLOUDFRONT_URL;

export const getIngredientsFromAIVision = async (imagePath: string) => {
  if (!IMAGE_ORIGIN_URL) {
    throw new Error("CLOUDFRONT_URL is not set");
  }

  const response = await api
    .post<{ ingredients: string[] }>("ai/vision/ingredients", {
      json: {
        imageUrl: getFullImageUrl(imagePath),
      },
    })
    .json();

  return response.ingredients ?? [];
};

export const getPost = async (id: string) => {
  const response = await api.get<TPost>(`posts/${id}`, {
    cache: "force-cache",
    next: {
      revalidate: 3600,
      tags: [`posts/${id}`],
    },
  });

  return response.json();
};

export const saveRecipe = async ({ recipe }: { recipe: TRecipe }) => {
  const session = await auth();

  if (!session?.user) {
    return { error: "User not found" };
  }

  const requestBody: ICreatePostRequestBody = {
    authorId: session.user.id ?? "",
    title: recipe.title,
    ingredients: recipe.ingredients,
    content: recipe.content,
    rawContent: recipe.rawContent,
    images: recipe.images,
  };

  const response = await api
    .post<ICreatePostResponseBody>("posts", {
      json: requestBody,
    })
    .json();

  revalidateTag("posts");

  return response;
};

export const getImageFromAI = async (rawContent: string) => {
  const response = await api.post<{
    imageUrl: string;
    imagePath: string;
    hashFileName: string;
  }>("ai/image", {
    json: { rawContent },
  });

  return response.json();
};

export const getPosts = async () => {
  const response = await api.get<{ posts: TPost[]; hasNextPage: boolean }>(
    "posts",
    {
      next: {
        revalidate: 3600,
        tags: ["posts"],
      },
    },
  );

  return response.json();
};

export const getComments = async (postId: string) => {
  const response = await api.get<{
    comments: TComment[];
  }>(`posts/${postId}/comments`, {
    cache: "no-store",
    next: {
      tags: ["comments"],
    },
  });

  return response.json();
};

export const postCommentLike = async (postId: string, commentId: number) => {
  const session = await auth();

  if (!session?.user) {
    return { error: "User not found" };
  }

  const response = await api.post(
    `posts/${postId}/comments/${commentId}/like`,
    {
      json: {
        userId: session.user.id,
      },
    },
  );

  return response.json();
};

export const postPostLike = async (postId: number) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("User not found");
  }

  const response = await api.post<TPostLike>(`posts/${postId}/like`, {
    json: { userId: session.user.id },
  });

  if (response.ok) {
    revalidateTag(`posts/${postId}`);
  }

  return response;
};

export const postComment = async ({
  postId,
  content,
  parentId,
}: {
  postId: number;
  content: string;
  parentId?: number; // parentId는 대댓글의 부모 댓글의 id
}) => {
  const session = await auth();

  if (!session?.user) {
    return { error: "User not found" };
  }

  const response = await api.post<TComment>(`posts/${postId}/comments`, {
    json: { postId, content, authorId: session.user.id, parentId },
  });

  if (response.ok) {
    revalidateTag("comments");
  }

  return response.json();
};

export const signOutAction = async () => {
  await signOut();
};

export const signInWithGoogle = async () => {
  await signIn("google");
};
