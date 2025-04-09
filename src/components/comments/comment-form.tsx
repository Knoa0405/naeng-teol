"use client";

import { useState } from "react";

import { useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Textarea from "@/components/ui/textarea";

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>;
  isSubmitting?: boolean;
  placeholder?: string;
  initialValue?: string;
  buttonText?: string;
  onCancel?: () => void;
  parentId?: number;
}

export function CommentForm({
  onSubmit,
  isSubmitting = false,
  placeholder = "댓글을 입력하세요",
  initialValue = "",
  buttonText = "댓글 작성",
  onCancel,
  parentId,
}: CommentFormProps) {
  const { data: session } = useSession();
  const [content, setContent] = useState(initialValue);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    await onSubmit(content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
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
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
          placeholder={placeholder}
          className="min-h-[80px] resize-none"
          disabled={isSubmitting}
        />

        <div className="flex justify-end gap-2">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              취소
            </Button>
          )}

          <Button type="submit" disabled={!content.trim() || isSubmitting}>
            {buttonText}
          </Button>
        </div>
      </div>
    </form>
  );
}
