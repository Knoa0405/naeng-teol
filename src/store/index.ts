import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IRecipe, TInputIngredient, TInputIngredients } from "@/types/recipe";
import { isProduction } from "@/constants";

interface IIngredientsStore {
  ingredients: TInputIngredients;
  addIngredient: (ingredient: TInputIngredient) => void;
  removeIngredient: (id: string) => void;
}
interface IRecipeStore {
  recipe: IRecipe;
  addRecipe: (recipe: IRecipe) => void;
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
        title: "",
        ingredients: [],
        content: "",
        rawContent: "",
        referenceLink: []
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
