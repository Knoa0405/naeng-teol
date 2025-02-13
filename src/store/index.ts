import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IRecipe, TInputIngredient, TInputIngredients } from "@/types/recipe";
import { isProduction } from "@/constants";

interface IRecipeStore {
  recipe: IRecipe;
  addRecipe: (recipe: IRecipe) => void;
}

export const useRecipeStore = create<IRecipeStore>()(
  devtools(
    (set) => ({
      recipe: {
        title: "",
        ingredients: [],
        content: "",
        rawContent: "",
        referenceLink: [],
      },
      addRecipe: (recipe: IRecipe) =>
        set(
          () => ({
            recipe: {
              ...recipe,
            },
          }),
          false,
          "addRecipe"
        ),
    }),
    {
      name: "recipeStore",
      enabled: !isProduction,
    }
  )
);
