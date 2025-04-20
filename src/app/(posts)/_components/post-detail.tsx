import { Suspense } from "react";

import { Loader2 } from "lucide-react";

import CommentSection from "@/components/comments/comment-section";
import { Card } from "@/components/ui/card";
import { TPostParams } from "@/types/posts";

import PostContent from "./post-content";

import PostLoading from "../posts/[id]/loading";
interface IPostDetailProps {
  id: TPostParams["id"];
}

const PostDetail = async ({ id }: IPostDetailProps) => {
  return (
    <Card className="overflow-hidden">
      <Suspense fallback={<PostLoading />}>
        <PostContent postId={id} />
      </Suspense>
      <Suspense
        fallback={
          <div className="flex h-40 w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
          </div>
        }
      >
        <CommentSection postId={id} />
      </Suspense>
    </Card>
  );
};

export default PostDetail;
