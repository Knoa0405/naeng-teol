"use client";

import { useState } from "react";

import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";

import { z } from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { CommentSchema } from "@/types/schema";

import { CommentForm } from "./comment-form";

type Comment = z.infer<typeof CommentSchema>;

interface CommentItemProps {
  comment: Comment;
  allComments: Comment[];
  postId: number;
  isReply?: boolean;
}

export function CommentItem({
  comment,
  allComments,
  postId,
  isReply = false,
}: CommentItemProps) {
  const { data: session } = useSession();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 현재 댓글에 대한 답글 찾기
  const replies = allComments.filter(reply => reply.parentId === comment.id);

  const isAuthor = session?.user?.email === comment.author.email;
  const likesCount = comment.likesCount || 0;

  const handleReplySubmit = async (content: string) => {
    if (!session?.user) return;

    setIsSubmitting(true);
    try {
      // API 요청 - 실제 구현 시 추가 필요
      console.log("답글 작성:", content, "to commentId:", comment.id);

      // 성공 시 폼 닫기
      setShowReplyForm(false);
    } catch (error) {
      console.error("답글 작성 오류:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async () => {
    if (!session?.user) return;

    try {
      // API 요청 - 실제 구현 시 추가 필요
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("좋아요 오류:", error);
    }
  };

  const handleDelete = async () => {
    if (!isAuthor) return;

    try {
      // API 요청 - 실제 구현 시 추가 필요
      console.log("댓글 삭제:", comment.id);
    } catch (error) {
      console.error("댓글 삭제 오류:", error);
    }
  };

  return (
    <div
      className={cn("space-y-4", {
        "border-b pb-4": !isReply,
      })}
    >
      <div className={cn("flex gap-3")}>
        <Avatar
          className={cn("h-10 w-10", {
            "h-8 w-8": isReply,
          })}
        >
          <AvatarImage
            src={comment.author.avatar || comment.author.image || undefined}
            alt={comment.author.name || "사용자"}
          />
          <AvatarFallback>
            {(comment.author.name?.[0] || "?").toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium">
                {comment.author.name || "익명"}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                  locale: ko,
                })}
              </span>
            </div>

            {isAuthor && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>댓글 관리</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleDelete}>
                    삭제하기
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <p className="my-2 text-sm">{comment.content}</p>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-muted-foreground"
              onClick={handleLike}
            >
              <Heart
                className={`h-4 w-4 mr-1 ${isLiked ? "fill-primary text-primary" : ""}`}
              />
              <span>{likesCount}</span>
            </Button>

            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-muted-foreground"
                onClick={() => setShowReplyForm(!showReplyForm)}
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                <span>답글</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {showReplyForm && (
        <div className="ml-12 mt-2">
          <CommentForm
            onSubmit={handleReplySubmit}
            isSubmitting={isSubmitting}
            placeholder="답글을 입력하세요"
            buttonText="답글 작성"
            onCancel={() => setShowReplyForm(false)}
            parentId={comment.id}
          />
        </div>
      )}

      {replies.length > 0 && (
        <div className="ml-12 space-y-4">
          {replies.map(reply => (
            <CommentItem
              key={reply.id}
              comment={reply}
              allComments={allComments}
              postId={postId}
              isReply={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
