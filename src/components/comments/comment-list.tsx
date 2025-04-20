import { getComments } from "@/actions";

import CommentItem from "./comment-item";

interface CommentListProps {
  postId: string;
}

const CommentList = async ({ postId }: CommentListProps) => {
  const { comments } = await getComments(postId);

  const rootComments = comments.filter(comment => comment.parentId === null);

  return (
    <div className="space-y-6">
      {rootComments.length === 0 ? (
        <p className="py-6 text-center text-muted-foreground">
          아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
        </p>
      ) : (
        rootComments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            allComments={comments}
            postId={postId}
          />
        ))
      )}
    </div>
  );
};

export default CommentList;
