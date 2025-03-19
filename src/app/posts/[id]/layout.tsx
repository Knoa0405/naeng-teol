import { getPost } from "@/actions";

export default async function PostsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <section className="px-4 py-8">
      <h1 className="text-4xl font-bold">{post.title}</h1>
      {children}
    </section>
  );
}
