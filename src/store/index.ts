import { z } from "zod";
import { create } from "zustand";
import { RecipeSchema } from "@/types/schema";
import { devtools } from "zustand/middleware";
import { TInputIngredient, TInputIngredients } from "@/types/recipe";
import { isProduction } from "@/constants";

type TRecipe = z.infer<typeof RecipeSchema>;
interface IIngredientsStore {
  ingredients: TInputIngredients;
  addIngredient: (ingredient: TInputIngredient) => void;
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
    {
      name: "ingredientsStore",
      enabled: !isProduction,
    }
  )
);

export const useRecipeStore = create<IRecipeStore>()(
  devtools(
    (set) => ({
      recipe: {
        content: "",
      },
      addRecipe: (recipe: TRecipe) =>
        set(
          () => ({
            recipe,
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
