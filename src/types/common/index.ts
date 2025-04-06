import { z } from "zod";

export interface IRouteParams<T> {
  params: Promise<T>;
}

export const ImageSchema = z.object({
  id: z.number().describe("image id"),
  url: z.string().url("유효한 URL을 입력해주세요"),
  alt: z.string().optional(),
  hash: z.string().optional(),
});

export const ImageRelationSchema = z.object({
  id: z.number().describe("image relation id"),
  order: z.number().int().default(0),
  entityType: z.enum(["POST", "COMMENT"]),
  image: ImageSchema,
  createdAt: z.date().describe("created at"),
  updatedAt: z.date().describe("updated at"),
});

export const ImageRequestSchema = ImageSchema.omit({
  id: true,
});

export const ImageRelationRequestSchema = ImageRelationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
