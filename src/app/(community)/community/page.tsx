import PostLists from "../_components/post-lists";
import { getPosts } from "@/actions";

export default async function Community() {
  const postsData = await getPosts();
  const posts = (await postsData.json()).posts;

  return (
    <section className="flex min-h-screen flex-col gap-4 px-4 py-8">
      <h1 className="text-4xl font-bold text-center">커뮤니티</h1>
      <PostLists posts={posts} />
    </section>
  );
}
