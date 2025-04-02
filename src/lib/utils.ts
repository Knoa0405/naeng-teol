import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";

type AsyncOrSync<T> = T | Promise<T>;

export function pipe<T, R>(
  ...fns: Array<(arg: any) => AsyncOrSync<any>>
): (initial: T) => Promise<R> {
  return (initial: T) =>
    fns.reduce((promise, fn) => promise.then(fn), Promise.resolve(initial));
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createFormData = async (file: File) => {
  const fileName = encodeURIComponent(file.name);
  const renamedFile = new File([file], fileName, { type: file.type });

  const formData = new FormData();
  formData.set("image", renamedFile);

  return formData;
};

export const createHashFromContents = (contents: string) => {
  const hash = crypto.createHash("sha1").update(contents).digest("hex");

  return hash;
};
