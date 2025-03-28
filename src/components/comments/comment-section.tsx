"use client";

import { useState } from "react";

import { AlertCircle } from "lucide-react";
import { useSession } from "next-auth/react";

import { z } from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CommentSchema } from "@/types/schema";

import { CommentForm } from "./comment-form";
import { CommentList } from "./comment-list";

type Comment = z.infer<typeof CommentSchema>;

interface CommentSectionProps {
  postId: number;
  comments?: Comment[];
}

export function CommentSection({ postId, comments = [] }: CommentSectionProps) {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 최상위 댓글만 필터링 (parentId가 null)
  const rootComments = comments.filter(comment => comment.parentId === null);

  const handleCommentSubmit = async (content: string) => {
    if (!session?.user) return;

    setIsSubmitting(true);
    try {
      // API 요청 - 실제 구현 시 추가 필요
      console.log("댓글 작성:", content);

      // 성공 시 새로고침 또는 상태 업데이트 로직
    } catch (error) {
      console.error("댓글 작성 오류:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>댓글</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {session?.user ? (
          <CommentForm
            onSubmit={handleCommentSubmit}
            isSubmitting={isSubmitting}
            placeholder="요리 후기나 궁금한 점을 남겨보세요"
          />
        ) : (
          <Alert variant="default">
            <AlertCircle size={16} />
            <AlertTitle>로그인이 필요해요!</AlertTitle>
            <AlertDescription>
              맛있는 요리 후기를 남기고 싶으신가요? 로그인하고 함께 이야기해요
              😊
            </AlertDescription>
          </Alert>
        )}

        <CommentList
          comments={rootComments}
          allComments={comments}
          postId={postId}
        />
      </CardContent>
    </Card>
  );
}
