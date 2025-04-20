"use client";

import { useActionState } from "react";

import { AlertCircle } from "lucide-react";
import { useSession } from "next-auth/react";

import { postComment } from "@/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Textarea from "@/components/ui/textarea";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";

interface CommentFormProps {
  postId: string;
  parentId?: number;
}

const CommentForm = ({ postId, parentId }: CommentFormProps) => {
  const { data: session } = useSession();

  const handleCommentSubmit = async (prevState: any, formData: FormData) => {
    const content = formData.get("content");

    if (!content || typeof content !== "string") {
      throw new Error("Content is required");
    }

    const comment = await postComment({
      postId: Number(postId),
      content,
      parentId,
    });

    return comment;
  };

  const [state, formAction, isPending] = useActionState(
    handleCommentSubmit,
    null,
  );

  if (!session?.user) {
    return (
      <Alert variant="default">
        <AlertCircle size={16} />
        <AlertTitle>로그인이 필요해요!</AlertTitle>
        <AlertDescription>
          맛있는 요리 후기를 남기고 싶으신가요? 로그인하고 함께 이야기해요 😊
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form action={formAction} className="flex gap-2">
      <Avatar className="h-10 w-10 flex-shrink-0">
        <AvatarImage
          src={session?.user?.image || undefined}
          alt={session?.user?.name || "사용자"}
        />
        <AvatarFallback>
          {(session?.user?.name?.[0] || "?").toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-2">
        <Textarea
          name="content"
          placeholder="댓글을 입력하세요"
          className="min-h-[80px] resize-none"
        />

        <div className="flex justify-end gap-2">
          <Button type="reset" variant="outline">
            취소
          </Button>

          <Button type="submit" disabled={isPending}>
            댓글 작성
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
