"use client";

import { cn } from "@/lib/utils";
import { useRecipeStore } from "@/store";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const headingStyles = {
  h1: "text-2xl font-bold mt-6 mb-4",
  h2: "text-xl font-semibold mt-5 mb-3",
  h3: "text-lg font-medium mt-4 mb-2",
};

const Recipe = () => {
  const recipe = useRecipeStore((state) => state.recipe);

  return (
    <Markdown
      className={cn("flex flex-col p-4 rounded-sm", {
        "border border-green-600": !!recipe.content,
      })}
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 className={headingStyles.h1} {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className={headingStyles.h2} {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className={headingStyles.h3} {...props} />
        ),
      }}
    >
      {recipe.rawContent}
    </Markdown>
  );
};

export default Recipe;
