import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

interface TUploadFile {
  file: File;
}

export const uploadFileToS3 = async ({ file }: TUploadFile) => {
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

  const uploadResult = await s3Client.send(new PutObjectCommand(uploadParams));

  return {
    uploadResult,
    filePath,
  };
};
