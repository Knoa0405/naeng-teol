import LikeList from "@/app/(users)/_components/like-list";

export default function MeLikesPage() {
  return (
    <main className="mx-auto flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">좋아요 목록</h1>
      <LikeList />
    </main>
  );
}
