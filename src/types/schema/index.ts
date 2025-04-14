import { z } from "zod";

import { ImageRelationRequestSchema, ImageRelationSchema } from "../common";

export const RecipeSchema = z.object({
  title: z.string().describe("recipe title"),
  ingredients: z.array(z.string().describe("ingredient name")),
  content: z.string().describe("recipe content"),
  rawContent: z.string().describe("recipe raw content in markdown format"),
  images: z
    .array(ImageRelationRequestSchema)
    .optional()
    .describe("post images"),
});

export const UserSchema = z.object({
  id: z.string().describe("user id"),
  name: z.string().nullable().describe("user name"),
  email: z.string().nullable().describe("user email"),
  emailVerified: z.date().nullable().describe("email verified date"),
  image: z.string().nullable().describe("user image"),
  role: z.enum(["ADMIN", "SUPER_ADMIN", "USER"]).describe("user role"),
  avatar: z.string().nullable().describe("user avatar"),
  bio: z.string().nullable().describe("user bio"),
  instagram: z.string().nullable().describe("instagram username"),
  deletedAt: z.date().nullable().describe("deleted at"),
});

export const CommentSchema = z.object({
  id: z.number().describe("comment id"),
  authorId: z.string().describe("author id"),
  content: z.string().describe("comment content"),
  postId: z.number().describe("post id"),
  parentId: z.number().nullable().describe("parent comment id"),
  createdAt: z.date().describe("created at"),
  updatedAt: z.date().describe("updated at"),
  likesCount: z.number().describe("number of likes"),
  deletedAt: z.date().nullable().describe("deleted at"),
  author: UserSchema.describe("comment author"),
  images: z.array(ImageRelationSchema).describe("comment images"),
});

export const CommentRequestSchema = CommentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  author: true,
  likesCount: true,
});

export const PostLikeSchema = z.object({
  id: z.number().describe("like id"),
  userId: z.string().describe("user id"),
  postId: z.number().describe("post id"),
  createdAt: z.date().describe("created at"),
  user: UserSchema.describe("user who liked"),
});

export const CommentLikeSchema = z.object({
  id: z.number().describe("comment like id"),
  userId: z.string().describe("user id"),
  commentId: z.number().describe("comment id"),
  createdAt: z.date().describe("created at"),
  user: UserSchema.describe("user who liked"),
});

export const PostSchema = RecipeSchema.extend({
  id: z.number().describe("post id"),
  authorId: z.string().describe("author id"),
  images: z.array(ImageRelationSchema).describe("post images"),
  views: z.number().describe("number of views"),
  likesCount: z.number().describe("number of likes"),
  deletedAt: z.date().nullable().describe("deleted at"),
  comments: z.array(CommentSchema).describe("post comments"),
  likes: z.array(PostLikeSchema).describe("post likes"),
  author: UserSchema.describe("post author"),
});

export const PostRequestSchema = PostSchema.omit({ id: true }).extend({
  images: z
    .array(ImageRelationRequestSchema)
    .optional()
    .describe("post images"),
});

export const PostParamsSchema = PostSchema.omit({ id: true }).extend({
  id: z.string().describe("post id"),
});

export const IngredientSchema = z.object({
  ingredients: z.array(z.string().describe("ingredient name")),
});
