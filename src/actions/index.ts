"use server";

import { auth, signIn, signOut } from "@/auth";
import { IRecipe } from "@/types/recipe";
import { api } from "@/lib/api-helper";
import {
  ICreatePostRequestBody,
  ICreatePostResponseBody,
} from "@/app/api/posts/route";
import { IPost } from "@/types/posts";
const IMAGE_ORIGIN_URL = process.env.CLOUDFRONT_URL;

export const getIngredientsFromAIVision = async (imagePath: string) => {
  const response = await api
    .post<{ ingredients: string[] }>("ai/vision/ingredients", {
      json: {
        imageUrl: `${IMAGE_ORIGIN_URL}/${imagePath}`,
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

export const getPosts = async () => {
  const response = await api.get<{ posts: IPost[]; hasNextPage: boolean }>(
    "posts"
  );

  return response.json();
};

export const signOutAction = async () => {
  await signOut();
};

export const signInWithGoogle = async () => {
  await signIn("google");
};
