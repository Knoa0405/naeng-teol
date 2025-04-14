import PostLists from "../_components/post-lists";

export const dynamic = "force-dynamic";

export default function Community() {
  return (
    <section className="container flex min-h-screen flex-col gap-4 py-8">
      <h1 className="text-center text-4xl font-bold">커뮤니티</h1>
      <PostLists />
    </section>
  );
}
