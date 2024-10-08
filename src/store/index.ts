import { z } from "zod";
import { create } from "zustand";
import { RecipeSchema } from "@/types/schema";
import { TIngredient, TIngredients } from "@/types";
import { devtools } from "zustand/middleware";
import { isProduction } from "@/constants";

type TRecipe = z.infer<typeof RecipeSchema>;
interface IIngredientsStore {
  ingredients: TIngredients;
  addIngredient: (ingredient: TIngredient) => void;
  removeIngredient: (id: string) => void;
}
interface IRecipeStore {
  recipe: TRecipe;
  addRecipe: (recipe: TRecipe) => void;
}

export const useIngredientsStore = create<IIngredientsStore>()(
  devtools(
    (set) => ({
      ingredients: [],
      addIngredient: (ingredient) => {
        set(
          () => ({
            ingredients: Object.keys(ingredient).map((key) => ({
              [key]: ingredient[key],
            })),
          }),
          false,
          "addIngredient"
        );
      },
      removeIngredient: (id) =>
        set(
          (state) => ({
            ingredients: state.ingredients.filter(
              (ingredient) => Object.keys(ingredient).toString() !== id
            ),
          }),
          false,
          "removeIngredient"
        ),
    }),
    { name: "ingredientsStore", enabled: !isProduction }
  )
);

export const useRecipeStore = create<IRecipeStore>()(
  devtools(
    (set) => ({
      recipe: {
        content: "",
      },
      addRecipe: (recipe) =>
        set(
          () => ({
            recipe,
          }),
          false,
          "recipeStore"
        ),
    }),
    {
      name: "recipeStore",
      enabled: !isProduction,
    }
  )
);
