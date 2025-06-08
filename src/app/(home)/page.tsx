import Image from "next/image";

import IngredientsForm from "./_components/ingredients-form";
import Recipe from "./_components/recipe";
import TutorialModal from "./_components/tutorial-modal";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-4 px-4 py-8">
      <Image
        src="/refrigerator.png"
        alt="refrigerator"
        width={80}
        height={80}
        className="mx-auto"
      />
      <h1 className="text-center text-3xl font-bold">냉장고 털기</h1>
      <IngredientsForm />
      <Recipe />
      <TutorialModal />
    </main>
  );
}
