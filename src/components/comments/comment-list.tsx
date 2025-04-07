"use client";

import { z } from "zod";

import { CommentSchema } from "@/types/schema";

import { CommentItem } from "./comment-item";

type Comment = z.infer<typeof CommentSchema>;

interface CommentListProps {
  comments: Comment[];
  allComments: Comment[];
  postId: number;
}

export function CommentList({
  comments,
  allComments,
  postId,
}: CommentListProps) {
  return (
    <div className="space-y-6">
      {comments.length === 0 ? (
        <p className="py-6 text-center text-muted-foreground">
          아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
        </p>
      ) : (
        comments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            allComments={allComments}
            postId={postId}
          />
        ))
      )}
    </div>
  );
}
