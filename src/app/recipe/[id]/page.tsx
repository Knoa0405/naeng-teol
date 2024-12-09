import { IRouteParams } from "@/types/common";
import RecipeDetail from "@/app/recipe/_components/recipe-detail";

export default async function RecipePage({
  params,
}: IRouteParams<{ id: string }>) {
  const { id } = await params;

  return <RecipeDetail id={id} />;
}
