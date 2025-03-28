import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { isProduction } from "@/constants";
import { IRecipe } from "@/types/recipe";

interface IRecipeStore {
  recipe: IRecipe;
  addRecipe: (recipe: IRecipe) => void;
}

export const useRecipeStore = create<IRecipeStore>()(
  devtools(
    set => ({
      recipe: {
        title: "",
        ingredients: [],
        content: "",
        rawContent: "",
      },
      addRecipe: (recipe: IRecipe) =>
        set(
          () => ({
            recipe: {
              ...recipe,
            },
          }),
          false,
          "addRecipe",
        ),
    }),
    {
      name: "recipeStore",
      enabled: !isProduction,
    },
  ),
);
