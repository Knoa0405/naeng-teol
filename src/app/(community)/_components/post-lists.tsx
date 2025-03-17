import React from "react";
import PostListItem from "./post-list-item";
import { IPost } from "@/types/posts";

interface PostListsProps {
  posts: IPost[];
}

const PostLists = ({ posts }: PostListsProps) => {
  return (
    <div className="container mx-auto p-4">
      <div className="columns-2 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
        {posts.map((item) => (
          <PostListItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PostLists;
