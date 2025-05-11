"use client";

import {
  Suspense,
  useDeferredValue,
  useEffect,
  useState,
  useTransition,
} from "react";

import { getImageFromAI } from "@/actions";
import Loader from "@/components/ui/loader";
import { useRecipeStore } from "@/store";

import RecipeContent from "./recipe-content";
import RecipeImage from "./recipe-image";
import RecipeVideos from "./recipe-videos";

const Recipe = () => {
  const recipe = useRecipeStore(state => state.recipe);
  const addRecipe = useRecipeStore(state => state.addRecipe);

  const [imagePath, setImagePath] = useState<string>(
    recipe.images?.[0]?.image?.url || "",
  );
  const [rawContent, setRawContent] = useState<string>(recipe.rawContent);
  const [isPending, startTransition] = useTransition();

  const deferredImagePath = useDeferredValue(imagePath);
  const deferredRawContent = useDeferredValue(rawContent);

  useEffect(() => {
    if (!recipe.title || (recipe.images && recipe.images.length > 0)) {
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
  }, [
    recipe.rawContent,
    recipe.images,
    addRecipe,
    recipe.title,
    recipe.ingredients,
  ]);

  return (
    <section className="flex flex-col rounded-sm">
      {(isPending || deferredImagePath) && (
        <RecipeImage imagePath={deferredImagePath} isLoading={isPending} />
      )}
      <RecipeContent rawContent={deferredRawContent || recipe.rawContent} />
      <Suspense fallback={<Loader />}>
        <RecipeVideos />
      </Suspense>
    </section>
  );
};

export default Recipe;
