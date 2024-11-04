import { AI_MODEL_NAME } from "@/constants";
import { IngredientSchema } from "@/types/schema";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";

export const POST = async (req: Request) => {
  const { imageUrl } = await req.json();

  try {
    const result = await generateObject({
      model: openai(AI_MODEL_NAME),
      schema: IngredientSchema,
      system: "Get ingredients from image",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Get ingredients from image, return array like: ['ingredient1', 'ingredient2', 'ingredient3'], in korean language",
            },
            {
              type: "image",
              image: imageUrl,
            },
          ],
        },
      ],
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
    console.log(error, "error");
    throw new Error("Error: create recipe in openai api or upload image to S3");
  }
};
