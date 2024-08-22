import { TIngredient, TIngredients } from "@/types";
import { create } from "zustand";

interface IIngredientsStore {
  ingredients: TIngredients;
  addIngredient: (ingredient: TIngredient) => void;
  removeIngredient: (ingredient: TIngredient) => void;
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
