"use client";

import { useEffect, useState } from "react";

import { Heart } from "lucide-react";

import { deletePostLike, getPostLike, postPostLike } from "@/actions";
import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
interface LikeButtonProps {
  initialLikeCount: number;
  postId: string;
}

const LikeButton = ({ initialLikeCount, postId }: LikeButtonProps) => {
  const { toast } = useToast();
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchLike = async () => {
      const response = await getPostLike(postId);

      if (response) {
        setLiked(true);
      }
    };
    fetchLike();
  }, [postId]);

  const handleLike = async () => {
    try {
      const response = await postPostLike(Number(postId));

      if (response.userId) {
        setLiked(true);
        setLikeCount(likeCount + 1);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "좋아요 추가 실패",
        description: "로그인 후 시도해주세요.",
      });
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await deletePostLike(Number(postId));

      if (response.userId) {
        setLiked(false);
        setLikeCount(likeCount - 1);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "좋아요 취소 실패",
        description:
          error instanceof Error ? error.message : "좋아요 취소 실패",
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center gap-1"
      onClick={liked ? handleUnlike : handleLike}
    >
      <Heart
        className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`}
      />
      <span>{likeCount}</span>
    </Button>
  );
};

export default LikeButton;
