"use server";

import sharp from "sharp";

export const convertToWebP = async (
  image: Uint8Array,
  options?: sharp.WebpOptions,
): Promise<Buffer> => {
  try {
    const webpBuffer = await sharp(image)
      .webp({
        quality: 80,
        lossless: false,
        ...options,
      })
      .toBuffer();

    return webpBuffer;
  } catch (error) {
    console.error("WebP 변환 중 에러 발생:", error);
    throw new Error("이미지 변환에 실패했습니다.");
  }
};
