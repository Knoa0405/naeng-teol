import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type AsyncOrSync<T> = T | Promise<T>;

export function pipe<T, R>(
  ...fns: Array<(arg: any) => AsyncOrSync<any>>
): (initial: T) => Promise<R> {
  return (initial: T) =>
    fns.reduce((promise, fn) => promise.then(fn), Promise.resolve(initial));
}

export const createFormData = async (file: File) => {
  const fileName = encodeURIComponent(file.name);
  const renamedFile = new File([file], fileName, { type: file.type });

  const formData = new FormData();
  formData.set("image", renamedFile);

  return formData;
};
