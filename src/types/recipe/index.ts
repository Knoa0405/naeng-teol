import { z } from "zod";

import { IngredientSchema, RecipeSchema } from "@/types/schema";

export type TInputIngredient = {
  [key in string]: string;
};

export type TInputIngredients = TInputIngredient[];

export type TIngredient = z.infer<typeof IngredientSchema>;
export type TRecipe = z.infer<typeof RecipeSchema>;
