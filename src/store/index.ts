import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { isProduction } from "@/constants";
import { IRecipe } from "@/types/recipe";

interface IRecipeStore {
  recipe: IRecipe;
  addRecipe: (recipeData: Partial<IRecipe>) => void;
  resetRecipe: () => void;
}

export const useRecipeStore = create<IRecipeStore>()(
  devtools(
    set => ({
      recipe: {
        title: "",
        ingredients: [],
        content: "",
        rawContent: "",
        images: [],
      },
      addRecipe: (recipeData: Partial<IRecipe>) =>
        set(
          (state: IRecipeStore) => ({
            recipe: {
              ...state.recipe,
              ...recipeData,
            },
          }),
          false,
          "addRecipe",
        ),
      resetRecipe: () =>
        set({
          recipe: {
            title: "",
            ingredients: [],
            content: "",
            rawContent: "",
            images: [],
          },
        }),
    }),
    {
      name: "recipeStore",
      enabled: !isProduction,
    },
  ),
);
