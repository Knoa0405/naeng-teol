"use server";

import { signIn } from "@/auth";
import { uploadFileToS3 } from "@/lib/upload-s3";
import { IRecipe } from "@/types/recipe";

const IMAGE_ORIGIN_URL = process.env.CLOUDFRONT_URL;

// 이미지 파일 유효성 검사 함수
const validateImageFile = (image: FormDataEntryValue | null) => {
  if (!(image instanceof File)) {
    throw new Error("유효하지 않은 이미지 파일 형식입니다.");
  }
};

export const getIngredientsFromImage = async (
  formData: FormData
): Promise<string[]> => {
  const image = formData.get("image");
  validateImageFile(image);

  // S3에 이미지 업로드
  const { filePath } = await uploadFileToS3({
    file: image as File,
  });

  // AI Vision API 호출
  const data = await getIngredientsFromAIVision(filePath);

  return data.ingredients;
};

const getIngredientsFromAIVision = async (imagePath: string) => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/ai/vision/ingredients`,
    {
      method: "POST",
      body: JSON.stringify({
        imageUrl: `${IMAGE_ORIGIN_URL}/${imagePath}`,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI Vision API 호출 실패: ${errorText}`);
  }

  return response.json();
};

export const saveRecipe = async ({
  recipe,
  authorId,
}: {
  recipe: IRecipe;
  authorId: string;
}) => {
  const response = await fetch(`${process.env.API_BASE_URL}/posts/create`, {
    method: "POST",
    body: JSON.stringify({ recipe, authorId }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`레시피 저장 실패: ${errorText}`);
  }

  return response.json();
};

export const signInWithGoogle = async () => {
  await signIn("google");
};
