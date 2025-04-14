import { Eye } from "lucide-react";

import Image from "next/image";

import { getPost } from "@/actions";
import CommentSection from "@/components/comments/comment-section";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TPostParams } from "@/types/posts";

import LikeButton from "./like-button";

interface IPostDetailProps {
  id: TPostParams["id"];
}

export default async function PostDetail({ id }: IPostDetailProps) {
  const post = await getPost(id);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-64 sm:h-80">
          <Image
            src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${post.images[0].image.url}`}
            alt={`${post.title} 이미지`}
            fill
            className="object-contain"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>{post.views.toLocaleString()}</span>
            </div>
            <LikeButton initialLikeCount={post.likesCount} postId={post.id} />
          </div>
        </div>

        <Separator className="my-4" />

        <div className="mb-6">
          <h3 className="mb-3 text-lg font-semibold">재료</h3>
          <ul className="grid grid-cols-2 gap-2">
            {post.ingredients.map(ingredient => (
              <li key={ingredient} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold">조리 방법</h3>
          <ol className="space-y-3">
            {post.content
              .split(/\d+\.\s+/)
              .filter(Boolean)
              .map((step, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">
                    {index + 1}
                  </span>
                  <p>{step.trim()}</p>
                </li>
              ))}
          </ol>
        </div>
        <CommentSection postId={post.id} />
      </CardContent>
    </Card>
  );
}
