import { PostSchema } from "@/types/schema";
import { z } from "zod";

export interface IPostsRouteParams {
  cursor: string;
}

export interface IPost extends z.infer<typeof PostSchema> {}
