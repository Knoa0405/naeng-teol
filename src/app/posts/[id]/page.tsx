import { IRouteParams } from "@/types/common";
import { getPost } from "@/actions";
import PostDetail from "../_components/post-detail";

export default async function PostPage({
  params,
}: IRouteParams<{ id: string }>) {
  const { id } = await params;

  const post = await getPost(id);

  return <PostDetail post={post} />;
}
