"use client";

import { Heart } from "lucide-react";

import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

import useGetLike from "../_hooks/use-get-like";

const LikeButton = () => {
  const path = usePathname();

  const postId = path.split("/").pop() ?? "";

  const { liked, handlePostLike, handleDeleteLike, likeCount, setLikeCount } =
    useGetLike({ postId });

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
