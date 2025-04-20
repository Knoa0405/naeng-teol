import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import CommentForm from "./comment-form";
import CommentList from "./comment-list";

interface CommentSectionProps {
  postId: string;
}

const CommentSection = ({ postId }: CommentSectionProps) => {
  return (
    <Card className="m-4 pt-2">
      <CardHeader className="p-4">
        <CardTitle className="p-0">댓글</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-4">
        <CommentForm postId={postId} />
        <CommentList postId={postId} />
      </CardContent>
    </Card>
  );
};

export default CommentSection;
