import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";
import { TRecipe } from "@/types/recipe";

const headingStyles = {
  h1: "text-2xl font-bold mt-6 mb-4",
  h2: "text-xl font-semibold mt-5 mb-3",
  h3: "text-lg font-medium mt-4 mb-2",
};

interface RecipeContentProps {
  rawContent: TRecipe["rawContent"];
}

const RecipeContent = ({ rawContent }: RecipeContentProps) => {
  return (
    <Markdown
      className={cn("flex flex-col rounded-sm p-4", {
        "border border-primary": !!rawContent,
      })}
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ ...props }) => <h1 className={headingStyles.h1} {...props} />,
        h2: ({ ...props }) => <h2 className={headingStyles.h2} {...props} />,
        h3: ({ ...props }) => <h3 className={headingStyles.h3} {...props} />,
        ul: ({ ...props }) => (
          <ul className="my-2 flex flex-wrap gap-4" {...props} />
        ),
        ol: ({ ...props }) => <ol className="flex-col gap-10" {...props} />,
        li: ({ ...props }) => (
          <li
            className="flex items-start gap-1 pb-2 before:text-primary before:content-['•']"
            {...props}
          />
        ),
      }}
    >
      {rawContent}
    </Markdown>
  );
};

export default RecipeContent;
