"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useRouter } from "next/navigation";

import useSWR from "swr";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Loader from "@/components/ui/loader";
import { fetcher } from "@/lib/api-helper";

import { TPostLike } from "@/types/posts/like";

type TLike = TPostLike & {
  post: {
    id: string;
    title: string;
    content: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  };
};

const LikeList = () => {
  const router = useRouter();

  const { data: likes, isLoading } = useSWR<TLike[]>(
    "/api/users/me/likes",
    fetcher,
  );

  if (isLoading || !likes) {
    return (
      <section className="mx-auto flex h-screen items-center justify-center">
        <Loader />
      </section>
    );
  }

  return (
    <main className="space-y-4">
      {likes.map(like => (
        <Card
          onClick={() => {
            router.push(`/posts/${like.post.id}`);
          }}
          key={like.id}
          className="cursor-pointer hover:bg-accent/50"
        >
          <CardHeader className="p-4">
            <h3 className="text-lg font-semibold">{like.post.title}</h3>
            <p className="text-sm text-muted-foreground">
              {format(new Date(like.createdAt), "yyyy년 MM월 dd일", {
                locale: ko,
              })}
            </p>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {like.post.content}
            </p>
          </CardContent>
        </Card>
      ))}
    </main>
  );
};

export default LikeList;
