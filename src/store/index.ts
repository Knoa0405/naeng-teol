import { RecipeSchema } from "@/types/schema";
import { TIngredient, TIngredients } from "@/types";
import { create } from "zustand";
import { z } from "zod";

type TRecipe = z.infer<typeof RecipeSchema>;
interface IIngredientsStore {
  ingredients: TIngredients;
  addIngredient: (ingredient: TIngredient) => void;
  removeIngredient: (ingredient: TIngredient) => void;
}
interface IRecipeStore {
  recipe: TRecipe;
  addRecipe: (recipe: TRecipe) => void;
}

export const useIngredientsStore = create<IIngredientsStore>((set) => ({
  ingredients: [],
  addIngredient: (ingredient) =>
    set((state) => ({ ingredients: [...state.ingredients, ingredient] })),
  removeIngredient: (ingredient) =>
    set((state) => ({
      ingredients: state.ingredients.filter((i) => i !== ingredient),
    })),
}));

export const useRecipeStore = create<IRecipeStore>((set) => ({
  recipe: {
    content: "",
  },
  addRecipe: (recipe) =>
    set(() => ({
      recipe,
    })),
}));
