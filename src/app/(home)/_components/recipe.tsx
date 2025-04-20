"use client";

import {
  Suspense,
  useDeferredValue,
  useEffect,
  useState,
  useTransition,
} from "react";

import { Loader2 } from "lucide-react";

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
      const image = await getImageFromAI(recipe.rawContent);
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
      <Suspense
        fallback={
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
          </div>
        }
      >
        {deferredImagePath && (
          <RecipeImage imagePath={deferredImagePath} isLoading={isPending} />
        )}
      </Suspense>
      <Suspense
        fallback={<Loader2 className="h-8 w-8 animate-spin text-gray-600" />}
      >
        <RecipeContent rawContent={deferredRawContent} />
      </Suspense>
    </section>
  );
};

export default Recipe;
