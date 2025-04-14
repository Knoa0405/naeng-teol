"use client";

import { useState } from "react";

import { Heart } from "lucide-react";

import { postPostLike } from "@/actions";
import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
interface LikeButtonProps {
  initialLikeCount: number;
  postId: number;
}

const LikeButton = ({ initialLikeCount, postId }: LikeButtonProps) => {
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const handleLike = async () => {
    const response = (await postPostLike(postId)) as {
      error?: string;
      likeCount?: number;
    };

    if (response.error) {
      toast({
        variant: "destructive",
        title: "좋아요 추가 실패",
        description: "로그인 후 시도해주세요.",
      });
    }

    if (response.likeCount) {
      setLikeCount(response.likeCount);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center gap-1"
      onClick={handleLike}
    >
      <Heart
        className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`}
      />
      <span>{likeCount}</span>
    </Button>
  );
};

export default LikeButton;
