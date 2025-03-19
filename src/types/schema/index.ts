import { z } from "zod";

export const RecipeSchema = z.object({
  title: z.string().describe("recipe title"),
  ingredients: z.array(z.string().describe("ingredient name")),
  content: z.string().describe("recipe content"),
  rawContent: z.string().describe("recipe raw content in markdown format"),
});

export const UserSchema = z.object({
  id: z.string().describe("user id"),
  name: z.string().nullable().describe("user name"),
  email: z.string().nullable().describe("user email"),
  emailVerified: z.date().nullable().describe("email verified date"),
  image: z.string().nullable().describe("user image"),
  role: z.enum(["ADMIN", "SUPER_ADMIN", "USER"]).describe("user role"),
  updatedAt: z.date().describe("updated at"),
  avatar: z.string().nullable().describe("user avatar"),
  bio: z.string().nullable().describe("user bio"),
  instagram: z.string().nullable().describe("instagram username"),
  createdAt: z.date().describe("created at"),
  isDeleted: z.boolean().describe("is deleted"),
});

export const CommentSchema = z.object({
  id: z.number().describe("comment id"),
  authorId: z.string().describe("author id"),
  createdAt: z.date().describe("created at"),
  content: z.string().describe("comment content"),
  postId: z.number().describe("post id"),
  parentId: z.number().nullable().describe("parent comment id"),
  updatedAt: z.date().describe("updated at"),
  likesCount: z.number().describe("number of likes"),
  isDeleted: z.boolean().describe("is deleted"),
  author: UserSchema.describe("comment author"),
});

export const LikeSchema = z.object({
  id: z.number().describe("like id"),
  userId: z.string().describe("user id"),
  postId: z.number().describe("post id"),
  createdAt: z.date().describe("created at"),
  user: UserSchema.describe("user who liked"),
});

export const PostSchema = RecipeSchema.extend({
  id: z.number().optional().describe("post id"),
  authorId: z.string().describe("author id"),
  views: z.number().optional().describe("number of views"),
  likesCount: z.number().optional().describe("number of likes"),
  isDeleted: z.boolean().optional().describe("is deleted"),
  updatedAt: z.date().optional().describe("updated at"),
  createdAt: z.date().optional().describe("created at"),
  comments: z.array(CommentSchema).optional().describe("post comments"),
  likes: z.array(LikeSchema).optional().describe("post likes"),
  author: UserSchema.optional().describe("post author"),
});

export const PostParamsSchema = PostSchema.omit({ id: true }).extend({
  id: z.string().describe("post id"),
});

export const IngredientSchema = z.object({
  ingredients: z.array(z.string().describe("ingredient name")),
});
