import { IngredientSchema, RecipeSchema } from "@/types/schema";
import { z } from "zod";

export type TInputIngredient = {
  [key in string]: string;
};

export type TInputIngredients = TInputIngredient[];

export interface IIngredient extends z.infer<typeof IngredientSchema> {}
export interface IRecipe extends z.infer<typeof RecipeSchema> {}
