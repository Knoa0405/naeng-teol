"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";
import { useRecipeStore } from "@/store";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useEffect, useState, useMemo } from "react";
import { getImageFromAI } from "@/actions";
import Image from "next/image";

const headingStyles = {
  h1: "text-2xl font-bold mt-6 mb-4",
  h2: "text-xl font-semibold mt-5 mb-3",
  h3: "text-lg font-medium mt-4 mb-2",
};

const Recipe = () => {
  const recipe = useRecipeStore(state => state.recipe);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const stringifiedIngredients = useMemo(
    () => recipe.ingredients.toString(),
    [recipe.ingredients],
  );

  useEffect(() => {
    if (!recipe.rawContent) {
      return;
    }

    const fetchImage = async () => {
      setIsLoading(true);
      const image = await getImageFromAI(recipe.rawContent);
      setImageUrl(image.imageUrl);
      setIsLoading(false);
    };

    fetchImage();
  }, [stringifiedIngredients]);

  if (!recipe.rawContent) {
    return null;
  }

  return (
    <section className="flex flex-col rounded-sm">
      <div className="flex flex-col gap-4 pb-4">
        <AspectRatio
          ratio={16 / 9}
          className="bg-muted relative overflow-hidden rounded-md"
        >
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-in-out",
              isLoading ? "opacity-100" : "opacity-20",
            )}
          >
            <div className="w-full h-full animate-pulse bg-gray-200" />
          </div>
          <Image
            src={imageUrl || "/placeholder.png"}
            alt="generated image from ai"
            fill
            className={cn(
              "h-full w-full rounded-md object-cover transition-opacity duration-700 ease-in-out",
              isLoading ? "opacity-20" : "opacity-100",
            )}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4dHRsdHR4dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0XFyAeIRshIRshHRsdIR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </AspectRatio>
      </div>
      <Markdown
        className={cn("flex flex-col p-4 rounded-sm", {
          "border border-green-600": !!recipe.content,
        })}
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ ...props }) => <h1 className={headingStyles.h1} {...props} />,
          h2: ({ ...props }) => <h2 className={headingStyles.h2} {...props} />,
          h3: ({ ...props }) => <h3 className={headingStyles.h3} {...props} />,
        }}
      >
        {recipe.rawContent}
      </Markdown>
    </section>
  );
};

export default Recipe;
