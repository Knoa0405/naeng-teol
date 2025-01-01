import { z } from "zod";

export const RecipeSchema = z.object({
  title: z.string().describe("recipe title"),
  ingredients: z.array(z.string().describe("ingredient name")),
  content: z.string().describe("recipe content"),
  rawContent: z.string().describe("recipe raw content in markdown format"),
});

export const IngredientSchema = z.object({
  ingredients: z.array(z.string().describe("ingredient name")),
});
