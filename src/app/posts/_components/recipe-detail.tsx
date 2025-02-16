"use client";

import { IRecipe } from "@/types/recipe";

interface IRecipeDetailProps {
  recipe: IRecipe;
}

export default function RecipeDetail({ recipe }: IRecipeDetailProps) {
  return (
    <div className="recipe-detail">
      <h1 className="text-4xl font-bold">{recipe.title}</h1>
      <ul>
        {recipe.ingredients.map((ingredient: any) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <div>
        <h2 className="text-2xl font-bold">Instructions</h2>
      </div>
    </div>
  );
}
