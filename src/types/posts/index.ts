import { PostSchema } from "@/types/schema";
import { z } from "zod";

export interface IPostsRouteParams {
  postId: string;
  cursor?: string;
}

export interface IPost extends z.infer<typeof PostSchema> {}
