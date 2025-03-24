import React from "react";

import { IPost } from "@/types/posts";

import PostListItem from "./post-list-item";

interface PostListsProps {
  posts: IPost[];
}

const PostLists = ({ posts }: PostListsProps) => {
  return (
    <div className="container mx-auto p-4">
      <div className="columns-2 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
        {posts.map(item => (
          <PostListItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PostLists;
