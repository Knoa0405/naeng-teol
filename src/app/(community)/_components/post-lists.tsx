import { IPost } from "@/types/posts";

import PostListItem from "./post-list-item";

interface PostListsProps {
  posts: IPost[];
}

const PostLists = ({ posts }: PostListsProps) => {
  return (
    <div className="mx-auto py-4">
      <div className="columns-2 gap-4 md:columns-2 lg:columns-3 xl:columns-4">
        {posts.map(item => (
          <PostListItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PostLists;
