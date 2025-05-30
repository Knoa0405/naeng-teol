import { useState } from "react";

import { useSession } from "next-auth/react";
import useSWR from "swr";

import { deletePostLike, postPostLike } from "@/actions";
import { useToast } from "@/components/hooks/use-toast";
import { fetcher } from "@/lib/api-helper";
import { TPostLike } from "@/types/posts/like";

interface IUseGetLikeProps {
  postId: string;
}

const useGetLike = ({ postId }: IUseGetLikeProps) => {
  const session = useSession();
  const [liked, setLiked] = useState(false);
  const { toast } = useToast();

  const { error } = useSWR<TPostLike>(
    session.status === "authenticated" ? `/api/posts/${postId}/like` : null,
    url =>
      fetcher(url, {
        cache: "no-store",
      }),
    {
      onSuccess: data => {
        if (!data) return;
        if (data.postId === Number(postId)) {
          setLiked(true);
        }
      },
    },
  );

  const handlePostLike = async () => {
    try {
      setLiked(true);
      await postPostLike(Number(postId));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "좋아요 추가 실패",
        description: "로그인 후 시도해주세요.",
      });
    }
  };

  const handleDeleteLike = async () => {
    try {
      setLiked(false);
      await deletePostLike(Number(postId));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "좋아요 취소 실패",
        description: "로그인 후 시도해주세요.",
      });
    }
  };

  return { liked, handlePostLike, handleDeleteLike, error };
};

export default useGetLike;
