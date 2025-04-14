import { z } from "zod";

import {
  CommentLikeSchema,
  CommentRequestSchema,
  CommentSchema,
} from "@/types/schema";

export type TComment = z.infer<typeof CommentSchema>;

export type TCommentRequest = z.infer<typeof CommentRequestSchema>;

export type TCommentLike = z.infer<typeof CommentLikeSchema>;
