"use server";

import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";

import { convertToWebP } from "./convert-to-webp";

type TDomain = string;
type TPath = string;

type TFullImageUrl = `${TDomain}/${TPath}`;

export const getFullImageUrl = (path: TPath): TFullImageUrl => {
  return `${process.env.CLOUDFRONT_URL}/${path}`;
};

export const isImageExistsFromS3 = async (filePath: string) => {
  const s3Client = new S3Client({
    region: "ap-northeast-2",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const fullFilePath = `images/${filePath}.webp`;

  try {
    await s3Client.send(
      new HeadObjectCommand({
        Bucket: "naeng-refri",
        Key: fullFilePath,
      }),
    );

    return true;
  } catch (error: any) {
    if (error.$metadata?.httpStatusCode !== 404) {
      return false;
    }
  }
};

export const uploadFileToS3 = async (file: File): Promise<TPath> => {
  const s3Client = new S3Client({
    region: "ap-northeast-2",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const name = file.name;
  const fileBuffer = await file.arrayBuffer();
  const isImage = file.type.startsWith("image/");
  const folder = isImage ? "images" : "uploads";
  const fileName = `${Date.now()}-${decodeURIComponent(name)}`;
  const filePath = `${folder}/${fileName}`;

  const uploadParams = {
    Bucket: "naeng-refri",
    Key: filePath,
    Body: new Uint8Array(fileBuffer),
    ContentType: file.type || "application/octet-stream",
  };

  await s3Client.send(new PutObjectCommand(uploadParams));

  return filePath;
};

export const uploadImageToS3 = async (
  image: Uint8Array,
  filePath?: TPath,
): Promise<TFullImageUrl> => {
  try {
    const fileName = filePath || Date.now().toString();
    const fullFilePath = `images/${fileName}.webp`;
    const webpImage = await convertToWebP(image);

    const s3Client = new S3Client({
      region: "ap-northeast-2",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const uploadParams = {
      Bucket: "naeng-refri",
      Key: fullFilePath,
      Body: new Uint8Array(webpImage),
      ContentType: "image/webp",
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    return getFullImageUrl(fullFilePath);
  } catch (error) {
    console.error("S3 업로드 중 에러 발생:", error);
    throw error;
  }
};
