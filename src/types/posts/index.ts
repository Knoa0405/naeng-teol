import { PostParamsSchema, PostSchema } from "@/types/schema";
import { z } from "zod";

export interface IPostsRouteParams {
  postId: string;
  commentId: string;
  cursor?: string;
}

export type IPostParams = z.infer<typeof PostParamsSchema>;

export interface IPost extends z.infer<typeof PostSchema> {}
