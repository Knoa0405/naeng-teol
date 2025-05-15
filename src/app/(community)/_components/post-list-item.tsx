"use client";

import { Heart, MessageCircle, Share2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { toast } from "@/components/hooks/use-toast";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TPost } from "@/types/posts";

interface PostListItemProps {
  item: TPost;
}

const PostListItem = ({ item }: PostListItemProps) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    router.push(`/posts/${item.id}`);
  };

  const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    navigator.share({
      title: item.title,
      text: item.content,
      url: `${window.location.origin}/posts/${item.id}`,
    });

    navigator.clipboard.writeText(`${window.location.origin}/posts/${item.id}`);
    toast({
      variant: "default",
      title: "링크가 복사되었습니다.",
      description: "링크를 공유해주세요.",
    });
  };

  return (
    <li className="mb-4 break-inside-avoid">
      <Card
        as="article"
        className="cursor-pointer overflow-hidden"
        onClick={handleClick}
      >
        <CardContent className="p-0">
          <Image
            src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${item.images[0].image.url}`}
            className="h-full w-full object-cover"
            alt={item.title}
            width={300}
            height={200}
          />
        </CardContent>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="line-clamp-3 text-sm text-gray-600">{item.content}</p>
        </CardContent>
        <CardFooter className="flex justify-between p-4 pt-0">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 hover:text-red-500">
              <Heart className="h-4 w-4" />
              <span className="text-sm">{item.likesCount}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-blue-500">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{item._count?.comments}</span>
            </button>
          </div>
          <button
            type="button"
            className="rounded-md p-2 hover:bg-gray-100 hover:text-gray-600"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </button>
        </CardFooter>
      </Card>
    </li>
  );
};

export default PostListItem;
