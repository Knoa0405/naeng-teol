import { getIngredientsFromAIVision } from "@/actions";
import { getImageFile } from "@/lib/get-image-file";
import { uploadFileToS3 } from "@/lib/upload-s3";
import { createFormData } from "@/lib/utils";
import { pipe } from "@/lib/utils";

export const getIngredientsFromImage = async (
  image: File,
): Promise<string[]> => {
  try {
    const ingredients = await pipe<File, string[]>(
      createFormData,
      getImageFile,
      uploadFileToS3,
      getIngredientsFromAIVision,
    )(image);

    return ingredients;
  } catch (error) {
    console.error("이미지에서 재료 추출 중 오류 발생:", error);
    return [];
  }
};
