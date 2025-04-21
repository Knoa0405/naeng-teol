import { z } from "zod";

import {
  CommentLikeResponseSchema,
  CommentLikeSchema,
  CommentRequestSchema,
  CommentSchema,
} from "@/types/schema";

export type TComment = z.infer<typeof CommentSchema>;

export type TCommentRequest = z.infer<typeof CommentRequestSchema>;

export type TCommentLike = z.infer<typeof CommentLikeSchema>;

export type TCommentLikeResponse = z.infer<typeof CommentLikeResponseSchema>;
