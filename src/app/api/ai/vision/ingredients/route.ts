import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

const s3Client = new S3Client({ region: "ap-northeast-2" });

export const POST = async (req: Request) => {
  const { image } = await req.json();

  try {
    // Upload image to S3
    const imageBuffer = Buffer.from(image, "base64");

    const uploadParams = {
      Bucket: "naeng-refri",
      Key: `images/${Date.now()}.{}`,
      Body: imageBuffer,
      ContentEncoding: "base64",
      ContentType: "image/jpeg",
    };

    const uploadResult = await s3Client.send(
      new PutObjectCommand(uploadParams)
    );

    const imageUrl = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;

    // Generate object with OpenAI using image parts
    const result = await generateText({
      model: openai("gpt-3.5-turbo"),
      system:
        "Create Recipe following ingredients in markdown format, korean language",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: "url",
            },
          ],
        },
      ],
    });

    return Response.json(
      {
        ...result.rawResponse,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    throw new Error("Error: create recipe in openai api or upload image to S3");
  }
};
