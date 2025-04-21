"use client";

import { useDeferredValue, useEffect, useState, useTransition } from "react";

import { getImageFromAI } from "@/actions";
import { useRecipeStore } from "@/store";

import RecipeContent from "./recipe-content";
import RecipeImage from "./recipe-image";

const Recipe = () => {
  const recipe = useRecipeStore(state => state.recipe);
  const addRecipe = useRecipeStore(state => state.addRecipe);

  const [imagePath, setImagePath] = useState<string>(
    recipe.images?.[0]?.image?.url || "",
  );
  const [rawContent, setRawContent] = useState<string>(recipe.rawContent || "");
  const [isPending, startTransition] = useTransition();

  const deferredImagePath = useDeferredValue(imagePath);
  const deferredRawContent = useDeferredValue(rawContent);

  useEffect(() => {
    if (!recipe.rawContent || (recipe.images && recipe.images.length > 0)) {
      return;
    }

    const fetchImage = async () => {
      const image = await getImageFromAI({
        title: recipe.title,
        ingredients: recipe.ingredients,
      });
      setImagePath(image.imagePath);

      addRecipe({
        images: [
          {
            order: 0,
            image: {
              url: image.imagePath,
              hash: image.hashFileName,
              alt: "AI generated recipe image",
            },
          },
        ],
      });
    };

    startTransition(fetchImage);
    setRawContent(recipe.rawContent);
  }, [recipe.rawContent, recipe.images, addRecipe]);

  return (
    <section className="flex flex-col rounded-sm">
      {(isPending || deferredImagePath) && (
        <RecipeImage imagePath={deferredImagePath} isLoading={isPending} />
      )}
      <RecipeContent rawContent={deferredRawContent || recipe.rawContent} />
    </section>
  );
};

export default Recipe;
