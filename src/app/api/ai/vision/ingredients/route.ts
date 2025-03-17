import { AI_MODEL_NAME } from "@/constants";
import { IngredientSchema } from "@/types/schema";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";

export const POST = async (request: Request) => {
  const { imageUrl } = await request.json();

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
              text: "Get ingredients from image in korean language",
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
    console.error(error, "error in ai/vision/ingredients");
    throw new Error("Error: create recipe in openai api or upload image to S3");
  }
};
