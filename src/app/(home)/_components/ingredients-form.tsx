"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import IngredientInput from "./ingredient-input";
import { Button } from "@/components/ui/button";
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { nanoid } from "nanoid/non-secure";
import { experimental_useObject as useObject } from "ai/react";
import { RecipeSchema } from "@/types/schema";
import { useRecipeStore } from "@/store";
import { Input } from "@/components/ui/input";
import { createFormData, pipe } from "@/lib/utils";
import { getIngredientsFromAIVision, saveRecipe } from "@/actions";
import { TInputIngredient } from "@/types/recipe";
import RecipeCategories, { TCategoryOption } from "./recipe-categories";
import { uploadFileToS3 } from "@/lib/upload-s3";
import { getImageFile } from "@/lib/get-image-file";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

const IngredientsForm = () => {
  const { register, handleSubmit } = useForm({
    shouldUnregister: true,
  });

  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const recipe = useRecipeStore((state) => state.recipe);

  const [imagePreviewURL, setImagePreviewURL] = useState<string | null>(null);

  const [categories, setCategories] = useState<TCategoryOption[]>([]);
  const [inputs, setInputs] = useState<TInputIngredient[]>([]);
  const [isPending, setIsPending] = useState(false);

  const { submit, isLoading: isRecipeLoading } = useObject({
    api: "/api/ai/recipe",
    schema: RecipeSchema,
    onError: console.error,
    onFinish: ({ object }) => {
      if (object) {
        addRecipe({
          title: object.title || "",
          ingredients:
            object.ingredients?.filter(
              (ingredient): ingredient is string => ingredient !== undefined
            ) || [],
          content: object.content || "",
          rawContent: object.rawContent || "",
          referenceLink:
            object.referenceLink?.filter((link) => link !== undefined) || [],
        });
      }
    },
  });

  const handleAddInput = useCallback(({ content = "" } = {}) => {
    setInputs((prev) => [...prev, { id: `ingredient-${nanoid()}`, content }]);
  }, []);

  const getIngredientsFromImage = async (image: File): Promise<string[]> => {
    try {
      const ingredients = await pipe<File, string[]>(
        createFormData,
        getImageFile,
        uploadFileToS3,
        getIngredientsFromAIVision
      )(image);

      return ingredients;
    } catch (error) {
      console.error("이미지에서 재료 추출 중 오류 발생:", error);
      return [];
    }
  };

  const handleSaveRecipe = async () => {
    await saveRecipe({
      recipe,
    });
  };

  const onSubmit = async (data: any) => {
    try {
      setIsPending(true);
      const { image, ...rest } = data;

      const ingredientsFromImage = image[0]
        ? await getIngredientsFromImage(image[0])
        : [];

      const allIngredients = [...Object.values(rest), ...ingredientsFromImage];

      submit({
        ingredients: allIngredients.toString(),
        categories: categories.toString(),
      });
    } catch (error) {
      console.error("재료 제출 중 오류 발생:", error);
    } finally {
      setIsPending(false);
    }
  };

  const isLoading = isRecipeLoading || isPending;

  useEffect(() => {
    return () => {
      if (imagePreviewURL) {
        URL.revokeObjectURL(imagePreviewURL);
      }
    };
  }, [imagePreviewURL]);

  return (
    <div className="flex flex-col gap-4 items-center">
      <h3 className="text-xl font-bold">식재료를 추가해주세요</h3>
      <span className="text-sm text-gray-500">
        버튼을 누르고 기다리면 레시피가 나와요
      </span>
      {imagePreviewURL && (
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <Image
            src={imagePreviewURL}
            alt="image preview"
            fill
            className="h-full w-full rounded-md object-cover"
          />
        </AspectRatio>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <Input
          key="image"
          id="image"
          type="file"
          accept="image/*"
          {...register("image")}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setImagePreviewURL(URL.createObjectURL(file));
            }
          }}
        />
        <RecipeCategories setCategories={setCategories} />
        {inputs.map((input, index) => (
          <IngredientInput
            key={input.id}
            id={input.id}
            defaultValue={input.content}
            {...register(input.id)}
            setInputs={setInputs}
            index={index}
          />
        ))}
        <Button
          type="button"
          onClick={() => handleAddInput()}
          className="w-full"
        >
          <PlusIcon className="w-full h-4" />
        </Button>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              레시피 생성중
            </>
          ) : recipe.content ? (
            "레시피 다시 만들기"
          ) : (
            "레시피 만들기"
          )}
        </Button>
        {recipe.content && (
          <Button type="button" onClick={handleSaveRecipe}>
            레시피 저장
          </Button>
        )}
      </form>
    </div>
  );
};

export default IngredientsForm;
