import PostDetail from "../../_components/post-detail";

import { IRouteParams } from "@/types/common";
import { TPostParams } from "@/types/posts";

export default async function PostPage({
  params,
}: IRouteParams<{
  id: TPostParams["id"];
}>) {
  const { id } = await params;

  return <PostDetail id={id} />;
}
