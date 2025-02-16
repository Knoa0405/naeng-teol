import { z } from "zod";

export const RecipeSchema = z.object({
  title: z.string().describe("recipe title"),
  ingredients: z.array(z.string().describe("ingredient name")),
  content: z.string().describe("recipe content"),
  rawContent: z.string().describe("recipe raw content in markdown format"),
});

export const PostSchema = RecipeSchema.extend({
  id: z.bigint().optional().describe("post id"),
  authorId: z.string().describe("author id"),
  views: z.number().optional().describe("number of views"),
  likesCount: z.number().optional().describe("number of likes"),
  isDeleted: z.boolean().optional().describe("is deleted"),
  updatedAt: z.date().optional().describe("updated at"),
  createdAt: z.date().optional().describe("created at"),
});

export const IngredientSchema = z.object({
  ingredients: z.array(z.string().describe("ingredient name")),
});
