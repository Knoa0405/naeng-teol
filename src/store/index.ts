import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { isProduction } from "@/constants";
import { TRecipe } from "@/types/recipe";

interface IRecipeStore {
  recipe: TRecipe;
  addRecipe: (recipeData: Partial<TRecipe>) => void;
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
      addRecipe: (recipeData: Partial<TRecipe>) =>
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
