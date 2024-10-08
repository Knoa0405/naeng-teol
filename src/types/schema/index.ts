import { z } from "zod";

export const RecipeSchema = z.object({
  content: z.string(),
});
