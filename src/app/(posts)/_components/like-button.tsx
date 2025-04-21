"use client";

import { useState } from "react";

import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";

import useGetLike from "../_hooks/use-get-like";

interface ILikeButtonProps {
  postId: string;
  likesCount: number;
}

const LikeButton = ({ postId, likesCount }: ILikeButtonProps) => {
  const [likeCount, setLikeCount] = useState(likesCount);
  const { liked, handlePostLike, handleDeleteLike } = useGetLike({ postId });

  const handleLike = async () => {
    if (liked) {
      await handleDeleteLike();
      setLikeCount(likeCount - 1);
    }

    if (!liked) {
      await handlePostLike();
      setLikeCount(likeCount + 1);
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
