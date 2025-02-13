"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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
