import { IRouteParams } from "@/types/common";
import RecipeDetail from "@/app/posts/_components/recipe-detail";
import { getRecipe } from "@/actions";

export default async function RecipePage({
  params,
}: IRouteParams<{ id: string }>) {
  const { id } = await params;

  const recipe = await getRecipe(id);

  return <RecipeDetail recipe={recipe} />;
}
