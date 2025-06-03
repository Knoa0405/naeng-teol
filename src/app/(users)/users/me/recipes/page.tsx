"use client";

import RecipeList from "@/app/(users)/_components/recipe-list";

export default function MeRecipesPage() {
  return (
    <main className="mx-auto flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">내 레시피</h1>
      <RecipeList />
    </main>
  );
}
