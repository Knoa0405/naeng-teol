import { openai } from "@ai-sdk/openai";
import { experimental_generateImage as generateImage } from "ai";

import { AI_IMAGE_MODEL_NAME, AI_IMAGE_SIZE, AI_IMAGE_N } from "@/constants";

interface IRequest {
  rawContent: string;
}

export const POST = async (request: Request) => {
  const { rawContent } = (await request.json()) as IRequest;

  try {
    const { images } = await generateImage({
      model: openai.image(AI_IMAGE_MODEL_NAME),
      prompt: `Generate an food image from the recipe: ${rawContent}`,
      n: AI_IMAGE_N,
      size: AI_IMAGE_SIZE,
    });

    return Response.json(
      {
        imageUrl: images[0],
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error, "error in ai/image");
    throw new Error("Error: generate image in openai api");
  }
};
