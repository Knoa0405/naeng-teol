import { RecipeSchema } from "@/types/schema";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";

export const POST = async (req: Request) => {
  const { ingredients } = await req.json();

  const result = await generateObject({
    model: openai("gpt-3.5-turbo"),
    schema: RecipeSchema,
    system:
      "Create Recipe following ingredients, please answer markdown format and korean language",
    prompt: `Create Recipe following ingredients : ${ingredients}`,
  });

  return Response.json({
    ...result.object,
  });
};
