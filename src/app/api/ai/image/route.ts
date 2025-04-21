import { openai } from "@ai-sdk/openai";
import { experimental_generateImage as generateImage } from "ai";

import { AI_IMAGE_MODEL_NAME, AI_IMAGE_SIZE, AI_IMAGE_N } from "@/constants";
import { getFullImageUrl } from "@/lib/get-full-image-url";
import { isImageExistsFromS3, uploadImageToS3 } from "@/lib/upload-s3";
import { createHashFromContents } from "@/lib/utils";
interface IRequest {
  title: string;
  ingredients: string[];
}

export const POST = async (request: Request) => {
  const { title, ingredients } = (await request.json()) as IRequest;

  try {
    const hashFileName = createHashFromContents(
      `${title.replaceAll(" ", "")}${ingredients.join("").replaceAll(" ", "")}`,
    );

    const imagePath = `images/${hashFileName}.webp`;

    const isImageExists = await isImageExistsFromS3(hashFileName);

    if (isImageExists) {
      return Response.json(
        {
          imageUrl: getFullImageUrl(imagePath),
          imagePath: imagePath,
          hashFileName: hashFileName,
        },
        { status: 200 },
      );
    }

    const prompt = `
        Please create a photorealistic, top‑down image of the finished dish described below.
        • Dish name: ${title}
        • Ingredients: ${ingredients.join(", ")}
        • Style: warm natural lighting, shallow depth of field
        • Exclude any text, logos or people
      `.trim();

    const { images } = await generateImage({
      model: openai.image(AI_IMAGE_MODEL_NAME),
      prompt: prompt,
      n: AI_IMAGE_N,
      size: AI_IMAGE_SIZE,
    });

    const fullImageUrl = await uploadImageToS3(
      images[0].uint8Array,
      hashFileName,
    );

    return Response.json(
      {
        imageUrl: fullImageUrl,
        imagePath: imagePath,
        hashFileName: hashFileName,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error, "error in ai/image");
    throw new Error("Error: generate image in openai api");
  }
};
