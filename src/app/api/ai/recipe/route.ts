import { AI_MODEL_NAME } from "@/constants";
import { RecipeSchema } from "@/types/schema";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";

export const POST = async (req: Request) => {
  const { ingredients } = await req.json();

  try {
    const result = await generateObject({
      model: openai(AI_MODEL_NAME),
      schema: RecipeSchema,
      system:
        "Create Recipe following ingredients in markdown format, korean language",
      prompt: `ingredients : ${ingredients}`,
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
    throw new Error("Error: create recipe in openai api");
  }
};
