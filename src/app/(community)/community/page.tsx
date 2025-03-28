import { getPosts } from "@/actions";

import PostLists from "../_components/post-lists";

export default async function Community() {
  const postsData = await getPosts();
  const posts = postsData.posts;

  return (
    <section className="flex min-h-screen flex-col gap-4 px-4 py-8">
      <h1 className="text-4xl font-bold text-center">커뮤니티</h1>
      <PostLists posts={posts} />
    </section>
  );
}
