import { api } from "@/lib/api-helper";
import { TPost } from "@/types/posts";

import PostListItem from "./post-list-item";

const PostLists = async () => {
  const response = await api.get<{ posts: TPost[]; hasNextPage: boolean }>(
    "posts",
    {
      next: {
        revalidate: 3600,
        tags: ["posts"],
      },
    },
  );

  const data = await response.json();

  return (
    <div className="mx-auto py-4">
      <div className="columns-2 gap-4 md:columns-2 lg:columns-3 xl:columns-4">
        {data.posts.map(item => (
          <PostListItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PostLists;
