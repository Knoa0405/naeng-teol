"use server";

import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";

import { convertToWebP } from "./convert-to-webp";

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

export const uploadFileToS3 = async (file: File) => {
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

export const uploadImageToS3 = async (image: Uint8Array, filePath?: string) => {
  try {
    const fullFilePath = `images/${filePath}.webp`;

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

    return `${process.env.CLOUDFRONT_URL}/${fullFilePath}`;
  } catch (error) {
    console.error("S3 업로드 중 에러 발생:", error);
    throw error;
  }
};
