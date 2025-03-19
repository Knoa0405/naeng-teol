import { IRouteParams } from "@/types/common";
import PostDetail from "../_components/post-detail";
import { IPostParams } from "@/types/posts";

export default async function PostPage({
  params,
}: IRouteParams<{
  id: IPostParams["id"];
}>) {
  const { id } = await params;

  return <PostDetail id={id} />;
}
