import RecipeLists from "../_components/recipe-lists";

export default function Community() {
  return (
    <section className="flex min-h-screen flex-col gap-4 px-4 py-8">
      <h1 className="text-4xl font-bold text-center">커뮤니티</h1>
      <RecipeLists />
    </section>
  );
}
