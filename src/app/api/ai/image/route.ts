import { openai } from "@ai-sdk/openai";
import { experimental_generateImage as generateImage } from "ai";

import { AI_IMAGE_MODEL_NAME, AI_IMAGE_SIZE, AI_IMAGE_N } from "@/constants";
import { getFullImageUrl } from "@/lib/get-full-image-url";
import { isImageExistsFromS3, uploadImageToS3 } from "@/lib/upload-s3";
import { createHashFromContents } from "@/lib/utils";
interface IRequest {
  rawContent: string;
}

export const POST = async (request: Request) => {
  const { rawContent } = (await request.json()) as IRequest;

  try {
    const hashFileName = createHashFromContents(rawContent);

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

    const { images } = await generateImage({
      model: openai.image(AI_IMAGE_MODEL_NAME),
      prompt: `Generate an food image from the recipe: ${rawContent}`,
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
