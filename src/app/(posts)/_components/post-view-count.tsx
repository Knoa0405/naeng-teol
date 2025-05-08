"use client";

import { useEffect, useState } from "react";

import { Eye } from "lucide-react";

import { api } from "@/lib/api-helper";

const PostViewCount = ({ postId }: { postId: string }) => {
  const [views, setViews] = useState(0);

  useEffect(() => {
    const fetchViews = async () => {
      const response = await api.patch<{ views: number }>(
        `/api/posts/${postId}/views`,
      );

      const data = await response.json();

      setViews(data.views);
    };

    fetchViews();
  }, [postId]);

  return (
    <>
      <Eye className="h-4 w-4" />
      <span>{views.toLocaleString()}</span>
    </>
  );
};

export default PostViewCount;
