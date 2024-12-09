"use client";

import { useEffect, useState } from "react";
import Loader from "@/app/(home)/_components/loader";

export default function RecipeDetail({ id }: { id: string }) {
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    async function fetchRecipe() {
      const response = await fetch(`/api/recipes/${id}`);
      const data = await response.json();

      setRecipe(data);
    }

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <Loader />;
  }

  return (
    <div className="recipe-detail">
      <h1 className="text-4xl font-bold">{recipe.name}</h1>
      <p>{recipe.description}</p>
      <ul>
        {recipe.ingredients.map((ingredient: any) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <div>
        <h2 className="text-2xl font-bold">Instructions</h2>
        <p>{recipe.instructions}</p>
      </div>
    </div>
  );
}
