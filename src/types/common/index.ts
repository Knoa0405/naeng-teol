import { z } from "zod";

export interface IRouteParams<T> {
  params: Promise<T>;
}

export const ImageSchema = z.object({
  id: z.number().describe("image id"),
  url: z.string().url("유효한 URL을 입력해주세요"),
  alt: z.string().optional(),
  hash: z.string().optional(),
  createdAt: z.date().describe("created at"),
  updatedAt: z.date().describe("updated at"),
});

export const ImageRequestSchema = ImageSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const ImageRelationSchema = z.object({
  id: z.number().describe("image relation id"),
  order: z.number().int().default(0),
  imageId: z.number(),
  postId: z.number().nullable(),
  commentId: z.number().nullable(),
  image: ImageRequestSchema,
  createdAt: z.date().describe("created at"),
  updatedAt: z.date().describe("updated at"),
});

export const ImageRelationRequestSchema = ImageRelationSchema.omit({
  id: true,
  imageId: true,
  postId: true,
  commentId: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  image: ImageRequestSchema,
});

export type TImageRelation = z.infer<typeof ImageRelationSchema>;
