"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const CommunityError = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">커뮤니티 로드 실패</h1>
      <Button onClick={() => router.refresh()}>Retry</Button>
    </div>
  );
};

export default CommunityError;
