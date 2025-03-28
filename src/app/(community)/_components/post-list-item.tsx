"use client";

import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IPost } from "@/types/posts";

interface PostListItemProps {
  item: IPost;
}

const PostListItem = ({ item }: PostListItemProps) => {
  const router = useRouter();

  return (
    <div className="break-inside-avoid mb-4">
      <Card
        className="overflow-hidden cursor-pointer"
        onClick={() => router.push(`/posts/${item.id}`)}
      >
        <CardContent className="p-0">{/* 이미지 영역 */}</CardContent>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg">{item.title}</h3>
          <p className="text-sm text-gray-600">{item.content}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 hover:text-red-500">
              <Heart className="w-4 h-4" />
              <span className="text-sm">{item.likesCount}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-blue-500">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{item.views}</span>
            </button>
          </div>
          <button className="hover:text-gray-600">
            <Share2 className="w-4 h-4" />
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostListItem;
