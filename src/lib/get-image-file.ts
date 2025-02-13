export const getImageFile = (formData: FormData): File => {
  const image = formData.get("image");

  if (!(image instanceof File)) {
    throw new Error("유효하지 않은 이미지 파일 형식입니다.");
  }

  return image;
};
