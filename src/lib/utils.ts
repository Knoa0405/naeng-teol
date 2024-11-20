import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleFileUpload = async (file: File) => {
  const fileName = encodeURIComponent(file.name);
  const renamedFile = new File([file], fileName, { type: file.type });

  const formData = new FormData();
  formData.set("image", renamedFile);

  return {
    pipe: <T>(fn: (formData: FormData) => Promise<T>) => fn(formData),
    formData,
  };
};
