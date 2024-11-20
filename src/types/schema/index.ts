import { z } from "zod";

export const RecipeSchema = z.object({
  content: z.string(),
});

export const IngredientSchema = z.object({
  ingredients: z.array(z.string().describe("ingredient name")),
});
