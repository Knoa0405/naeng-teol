"use server";

import {
  ICreatePostRequestBody,
  ICreatePostResponseBody,
} from "@/app/api/posts/route";

import { auth, signIn, signOut } from "@/auth";
import { api } from "@/lib/api-helper";
import { getFullImageUrl } from "@/lib/upload-s3";
import { IPost } from "@/types/posts";
import { IComment } from "@/types/posts/comments";
import { IRecipe } from "@/types/recipe";

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
  const response = await api.get<IPost>(`posts/${id}`);

  return response.json();
};

export const saveRecipe = async ({ recipe }: { recipe: IRecipe }) => {
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
  };

  const response = await api
    .post<ICreatePostResponseBody>("posts", {
      json: requestBody,
    })
    .json();

  return response;
};

export const getImageFromAI = async (rawContent: string) => {
  const response = await api.post<{ imageUrl: string }>("ai/image", {
    json: { rawContent },
  });

  return response.json();
};

export const getPosts = async () => {
  const response = await api.get<{ posts: IPost[]; hasNextPage: boolean }>(
    "posts",
  );

  return response.json();
};

export const getComments = async (postId: string) => {
  const response = await api.get<{ comments: IComment[] }>(
    `posts/${postId}/comments`,
  );

  return response.json();
};

export const postComment = async (postId: string, content: string) => {
  const response = await api.post<{ comment: IComment }>(
    `posts/${postId}/comments`,
    {
      json: { content },
    },
  );

  return response.json();
};

export const signOutAction = async () => {
  await signOut();
};

export const signInWithGoogle = async () => {
  await signIn("google");
};
