import { z } from "zod";

import { PostLikeSchema } from "@/types/schema";

export type TPostLike = z.infer<typeof PostLikeSchema>;
