"use server";

import { signIn } from "@/auth";
import { uploadFileToS3 } from "@/lib/upload-s3";
import { IRecipe } from "@/types/recipe";
import { api } from "@/lib/api-helper";
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

  return data?.ingredients ?? [];
};

const getIngredientsFromAIVision = async (imagePath: string) => {
  const response = await api
    .post<{ ingredients: string[] }>("ai/vision/ingredients", {
      json: {
        imageUrl: `${IMAGE_ORIGIN_URL}/${imagePath}`,
      },
    })
    .json();

  return response;
};

export const getRecipe = async (id: string) => {
  const response = await api.get<IRecipe>(`recipes/${id}`).json();

  return response;
};

export const saveRecipe = async ({
  recipe,
  authorId,
}: {
  recipe: IRecipe;
  authorId: string;
}) => {
  const response = await api
    .post("posts/create", {
      json: { recipe, authorId },
    })
    .json();

  return response;
};

export const signInWithGoogle = async () => {
  await signIn("google");
};
