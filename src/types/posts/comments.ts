import { z } from "zod";

import { CommentSchema } from "@/types/schema";

export type IComment = z.infer<typeof CommentSchema>;
