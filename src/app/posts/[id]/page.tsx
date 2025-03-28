import { IRouteParams } from "@/types/common";
import { IPostParams } from "@/types/posts";

import PostDetail from "../_components/post-detail";

export default async function PostPage({
  params,
}: IRouteParams<{
  id: IPostParams["id"];
}>) {
  const { id } = await params;

  return <PostDetail id={id} />;
}
