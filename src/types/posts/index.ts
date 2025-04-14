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

export type TPostParams = z.infer<typeof PostParamsSchema>;

export type TPost = z.infer<typeof PostSchema>;

export type TPostRequest = z.infer<typeof PostRequestSchema>;
