"use client";

import { useState } from "react";

import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";

interface LikeButtonProps {
  initialLikeCount: number;
}

const LikeButton = ({ initialLikeCount }: LikeButtonProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);

    // In a real app, you would send a request to your API here
    // to update the like count in your database
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
