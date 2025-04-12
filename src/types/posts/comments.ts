import { z } from "zod";

import { CommentRequestSchema, CommentSchema } from "@/types/schema";

export type TComment = z.infer<typeof CommentSchema>;

export type TCommentRequest = z.infer<typeof CommentRequestSchema>;
