"use server";

import { auth, signIn, signOut } from "@/auth";
import { IRecipe } from "@/types/recipe";
import { api } from "@/lib/api-helper";
import {
  ICreatePostRequestBody,
  ICreatePostResponseBody,
} from "@/app/api/posts/create/route";

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

export const getRecipe = async (id: string) => {
  const response = await api.get<IRecipe>(`recipes/${id}`).json();

  return response;
};

export const saveRecipe = async ({ recipe }: { recipe: IRecipe }) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("User not found");
  }

  const requestBody: ICreatePostRequestBody = {
    authorId: session.user.id ?? "",
    title: recipe.title,
    ingredients: recipe.ingredients,
    content: recipe.content,
    rawContent: recipe.rawContent,
  };

  // TODO: post 로 변경 recipe 은 따로 저장
  const response = await api
    .post<ICreatePostResponseBody>("posts/create", {
      json: requestBody,
    })
    .json();

  return response;
};

export const signOutAction = async () => {
  await signOut();
};

export const signInWithGoogle = async () => {
  await signIn("google");
};
