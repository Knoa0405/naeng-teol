import { z } from "zod";

import {
  PostParamsSchema,
  PostRequestSchema,
  PostSchema,
} from "@/types/schema";

export interface IPostsRouteParams {
  postId: string;
  commentId: string;
  cursor?: string;
}

export type IPostParams = z.infer<typeof PostParamsSchema>;

export interface IPost extends z.infer<typeof PostSchema> {}

export interface IPostRequest extends z.infer<typeof PostRequestSchema> {}
