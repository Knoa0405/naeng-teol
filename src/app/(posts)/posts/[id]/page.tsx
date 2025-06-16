import { api } from "@/lib/api-helper";
import PostDetail from "@/posts-components/post-detail";

import { IRouteParams } from "@/types/common";
import { TPost, TPostParams } from "@/types/posts";

export const generateStaticParams = async () => {
  const response = await api.get<{ posts: TPost[] }>("posts");
  const data = await response.json();

  return data.posts.map(post => ({ id: post.id.toString() }));
};

export const generateMetadata = async ({
  params,
}: IRouteParams<{
  id: TPostParams["id"];
}>) => {
  const { id } = await params;

  const response = await api.get<TPost>(`posts/${id}`, {
    cache: "force-cache",
    next: {
      tags: [`posts/${id}`],
    },
  });

  const data = await response.json();

  return {
    title: data.title,
    description: `${data.content.slice(0, 100)}...`,
    openGraph: {
      title: data.title,
      description: "AI가 만든 새 레시피가 궁금하다면 클릭!",
      images: data.images.map(image => ({
        url: `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${image.image.url}`,
      })),
    },
  };
};

export default async function PostPage({
  params,
}: IRouteParams<{
  id: TPostParams["id"];
}>) {
  const { id } = await params;

  return <PostDetail id={id} />;
}
