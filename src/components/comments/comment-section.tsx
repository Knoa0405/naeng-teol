"use client";

import { useState } from "react";

import { AlertCircle } from "lucide-react";
import { useSession } from "next-auth/react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { IComment } from "@/types/posts/comments";

import { CommentForm } from "./comment-form";
import { CommentList } from "./comment-list";

// 더미 데이터 정의
const DUMMY_USERS = [
  {
    id: "user1",
    name: "홍길동",
    email: "hong@example.com",
    image: "https://github.com/shadcn.png",
    avatar: null,
    emailVerified: new Date(),
    role: "USER" as const,
    updatedAt: new Date(),
    bio: null,
    instagram: null,
    createdAt: new Date(),
    isDeleted: false,
  },
  {
    id: "user2",
    name: "김요리",
    email: "kim@example.com",
    image: "https://github.com/shadcn.png",
    avatar: null,
    emailVerified: new Date(),
    role: "USER" as const,
    updatedAt: new Date(),
    bio: null,
    instagram: null,
    createdAt: new Date(),
    isDeleted: false,
  },
  {
    id: "user3",
    name: "박맛있다",
    email: "park@example.com",
    image: "https://github.com/shadcn.png",
    avatar: null,
    emailVerified: new Date(),
    role: "USER" as const,
    updatedAt: new Date(),
    bio: null,
    instagram: null,
    createdAt: new Date(),
    isDeleted: false,
  },
];

// 1시간 전, 30분 전, 5분 전 시간 생성
const now = new Date();
const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
const thirtyMinAgo = new Date(now.getTime() - 30 * 60 * 1000);
const fiveMinAgo = new Date(now.getTime() - 5 * 60 * 1000);

const DUMMY_COMMENTS: IComment[] = [
  {
    id: 1,
    authorId: "user1",
    createdAt: oneHourAgo,
    content: "맛있어 보이네요! 저도 집에서 한번 해봐야겠어요~",
    postId: 1,
    parentId: null,
    updatedAt: oneHourAgo,
    likesCount: 3,
    isDeleted: false,
    author: DUMMY_USERS[0],
  },
  {
    id: 2,
    authorId: "user2",
    createdAt: thirtyMinAgo,
    content: "양파를 좀 더 넣으면 더 맛있을 것 같아요!",
    postId: 1,
    parentId: null,
    updatedAt: thirtyMinAgo,
    likesCount: 1,
    isDeleted: false,
    author: DUMMY_USERS[1],
  },
  {
    id: 3,
    authorId: "user3",
    createdAt: fiveMinAgo,
    content: "김치를 조금 더 익힌 걸로 하면 더 감칠맛이 날 것 같네요",
    postId: 1,
    parentId: 1, // 첫 번째 댓글의 대댓글
    updatedAt: fiveMinAgo,
    likesCount: 0,
    isDeleted: false,
    author: DUMMY_USERS[2],
  },
  {
    id: 4,
    authorId: "user1",
    createdAt: fiveMinAgo,
    content: "맞아요! 저도 양파를 조금 더 넣었더니 훨씬 맛있더라고요",
    postId: 1,
    parentId: 2, // 두 번째 댓글의 대댓글
    updatedAt: fiveMinAgo,
    likesCount: 2,
    isDeleted: false,
    author: DUMMY_USERS[0],
  },
];

interface CommentSectionProps {
  postId: number;
  comments?: IComment[];
}

export function CommentSection({
  postId,
  comments = DUMMY_COMMENTS,
}: CommentSectionProps) {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localComments, setLocalComments] = useState<IComment[]>(comments);

  // 최상위 댓글만 필터링 (parentId가 null)
  const rootComments = localComments.filter(
    comment => comment.parentId === null,
  );

  const handleCommentSubmit = async (content: string) => {
    if (!session?.user) return;

    setIsSubmitting(true);
    try {
      // 새 댓글 객체 생성
      const newComment: any = {
        id: localComments.length + 1,
        authorId: session.user.id || "temp-user-id",
        createdAt: new Date(),
        content,
        postId,
        parentId: null,
        updatedAt: new Date(),
        likesCount: 0,
        isDeleted: false,
        author: {
          id: session.user.id || "temp-user-id",
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
          avatar: null,
          emailVerified: null,
          role: "USER" as const,
          updatedAt: new Date(),
          bio: null,
          instagram: null,
          createdAt: new Date(),
          isDeleted: false,
        },
      };

      // 댓글 목록에 새 댓글 추가
      setLocalComments(prev => [...prev, newComment]);
    } catch (error) {
      console.error("댓글 작성 오류:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader className="p-4">
        <CardTitle className="p-0">댓글</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-4">
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
          allComments={localComments}
          postId={postId}
        />
      </CardContent>
    </Card>
  );
}
