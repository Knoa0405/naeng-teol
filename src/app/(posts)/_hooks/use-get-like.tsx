import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import { postPostLike } from "@/actions";
import { useToast } from "@/components/hooks/use-toast";
import { api } from "@/lib/api-helper";
interface IUseGetLikeProps {
  postId: string;
}

const useGetLike = ({ postId }: IUseGetLikeProps) => {
  const session = useSession();
  const [liked, setLiked] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const getLike = async () => {
      // TODO: session 을 가져오려면 클라이언트에서 호출해야 하는데 서버에서 호출하면 안됨
      // 이유는 클라이언트에서는 브라우저 쿠키를 사용하여 세션을 관리하기 때문에 서버액션이나 서버 컴포넌트 호출하면 쿠키를 가져오지 못하기 때문
      // 서버 액션에서 인위적으로 쿠키를 넣어주는 방법도 있지만 아직은 클라이언트에서 호출하는 방법으로 해결
      try {
        const response = await api.get(`/api/posts/${postId}/like`);
        const data = await response.json();

        if (response.ok && data !== null) {
          setLiked(true);
        }
      } catch (error) {
        console.error(error, "error in useGetLike");
      }
    };

    if (session.status === "authenticated") {
      getLike();
    }
  }, [postId, toast, session]);

  const handlePostLike = async () => {
    try {
      const response = await postPostLike(Number(postId));

      if (response.id) {
        setLiked(true);
      }
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
      const response = await api.delete(`/api/posts/${postId}/like`);

      if (response.ok) {
        setLiked(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "좋아요 취소 실패",
        description: "로그인 후 시도해주세요.",
      });
    }
  };

  return { liked, handlePostLike, handleDeleteLike };
};

export default useGetLike;
