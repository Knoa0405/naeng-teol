"use client";

import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TPost } from "@/types/posts";

interface PostListItemProps {
  item: TPost;
}

const PostListItem = ({ item }: PostListItemProps) => {
  const router = useRouter();

  return (
    <div className="mb-4 break-inside-avoid">
      <Card
        className="cursor-pointer overflow-hidden"
        onClick={() => router.push(`/posts/${item.id}`)}
      >
        <CardContent className="p-0">{/* 이미지 영역 */}</CardContent>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-sm text-gray-600">{item.content}</p>
        </CardContent>
        <CardFooter className="flex justify-between p-4 pt-0">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 hover:text-red-500">
              <Heart className="h-4 w-4" />
              <span className="text-sm">{item.likesCount}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-blue-500">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{item._count.comments}</span>
            </button>
          </div>
          <button className="hover:text-gray-600">
            <Share2 className="h-4 w-4" />
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostListItem;
