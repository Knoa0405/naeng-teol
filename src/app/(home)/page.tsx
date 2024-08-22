import IngredientsForm from "./_components/ingredients-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 px-16 py-8">
      <h1 className="text-4xl font-bold">냉장고 털기</h1>
      <IngredientsForm />
    </main>
  );
}
