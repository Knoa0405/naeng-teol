import { Suspense } from "react";

import IngredientsForm from "./_components/ingredients-form";
import Loader from "./_components/loader";
import Recipe from "./_components/recipe";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-4 px-4 py-8">
      <h1 className="text-center text-4xl font-bold">냉장고 털기</h1>
      <IngredientsForm />
      <Suspense fallback={<Loader />}>
        <Recipe />
      </Suspense>
    </main>
  );
}
