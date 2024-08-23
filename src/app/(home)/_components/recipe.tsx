"use client";

import { useRecipeStore } from "@/store";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Recipe = () => {
  const recipe = useRecipeStore((state) => state.recipe);
  console.log(recipe);
  if (!recipe) {
    return <span>Loading...</span>;
  }

  return <Markdown remarkPlugins={[remarkGfm]}>{recipe.content}</Markdown>;
};
