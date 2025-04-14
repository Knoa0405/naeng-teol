import PostDetail from "../../_components/post-detail";

import { auth } from "@/auth";

import { IRouteParams } from "@/types/common";
import { TPostParams } from "@/types/posts";

export default async function PostPage({
  params,
}: IRouteParams<{
  id: TPostParams["id"];
}>) {
  const { id } = await params;

  const session = await auth();
  console.log(session, "session");

  return <PostDetail id={id} />;
}
