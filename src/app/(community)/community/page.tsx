import { ErrorBoundary } from "next/dist/client/components/error-boundary";

import PostLists from "@/community-components/post-lists";

import CommunityError from "./error";

export default function Community() {
  return (
    <main className="flex min-h-screen flex-col gap-4 py-8">
      <h1 className="text-center text-2xl font-bold">커뮤니티</h1>
      <ErrorBoundary errorComponent={CommunityError}>
        <PostLists />
      </ErrorBoundary>
    </main>
  );
}
