import { Eye } from "lucide-react";
import Image from "next/image";

import { getComments, getPost } from "@/actions";
import { CommentSection } from "@/components/comments/comment-section";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IPostParams } from "@/types/posts";

import LikeButton from "./like-button";

interface IPostDetailProps {
  id: IPostParams["id"];
}

export default async function PostDetail({ id }: IPostDetailProps) {
  const post = await getPost(id);
  const comments = (await getComments(id)).comments;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-64 sm:h-80">
          <Image
            src="/placeholder.svg?height=400&width=800"
            alt={`${post.title} 이미지`}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>{post.views.toLocaleString()}</span>
            </div>
            <LikeButton initialLikeCount={post.likesCount} />
          </div>
        </div>

        <Separator className="my-4" />

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">재료</h3>
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
          <h3 className="text-lg font-semibold mb-3">조리 방법</h3>
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

        <CommentSection postId={post.id} comments={comments} />
      </CardContent>
    </Card>
  );
}
