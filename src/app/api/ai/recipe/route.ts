import { AI_MODEL_NAME } from "@/constants";
import { RecipeSchema } from "@/types/schema";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";

export const POST = async (request: Request) => {
  const { ingredients, categories } = await request.json();

  try {
    const result = await generateObject({
      model: openai(AI_MODEL_NAME),
      schema: RecipeSchema,
      system:
        "Create Recipe following ingredients in markdown format, korean language",
      prompt: `ingredients : ${ingredients}, categories: ${categories}`,
    });

    return Response.json(
      {
        ...result.object,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error, "error in ai/recipe");
    throw new Error("Error: create recipe in openai api");
  }
};
