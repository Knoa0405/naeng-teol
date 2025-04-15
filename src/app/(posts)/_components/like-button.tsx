"use client";

import { useEffect, useState } from "react";

import { Heart } from "lucide-react";

import { deletePostLike, postPostLike } from "@/actions";
import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-helper";
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
      // TODO: session 을 가져오려면 클라이언트에서 호출해야 하는데 서버에서 호출하면 안됨
      // 이유는 클라이언트에서는 브라우저 쿠키를 사용하여 세션을 관리하기 때문에 서버액션이나 서버 컴포넌트 호출하면 쿠키를 가져오지 못하기 때문
      // 서버 액션에서 인위적으로 쿠키를 넣어주는 방법도 있지만 아직은 클라이언트에서 호출하는 방법으로 해결
      const response = await api.get(`/api/posts/${postId}/like`);

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
