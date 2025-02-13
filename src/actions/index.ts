"use server";

import { signIn, signOut } from "@/auth";
import { IRecipe } from "@/types/recipe";
import { api } from "@/lib/api-helper";
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

export const saveRecipe = async ({
  recipe,
  authorId,
}: {
  recipe: IRecipe;
  authorId: string;
}) => {
  const response = await api
    .post("posts/create", {
      json: { recipe, authorId },
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
