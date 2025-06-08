"use client";

import { useState } from "react";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Controller, useForm } from "react-hook-form";

import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PreviewImage from "@/components/ui/preview-image";
import { TagsInput } from "@/components/ui/tags-input";
import { useRecipeStore } from "@/store";
import { RecipeSchema } from "@/types/schema";

import RecipeCategories, { TCategoryOption } from "./recipe-categories";

import RecipeForm from "./recipe-form";

import { getIngredientsFromImage } from "../_lib/utils";

const IngredientsForm = () => {
  const { toast } = useToast();
  const recipe = useRecipeStore(state => state.recipe);
  const addRecipe = useRecipeStore(state => state.addRecipe);
  const resetRecipe = useRecipeStore(state => state.resetRecipe);

  const [imagePreviewURL, setImagePreviewURL] = useState<string | null>(null);
  const [categories, setCategories] = useState<TCategoryOption[]>([]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting },
  } = useForm<{
    ingredients: string[];
    image: File | undefined;
  }>({
    shouldUnregister: true,
    defaultValues: {
      ingredients: [],
      image: undefined,
    },
  });

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
              (ingredient): ingredient is string => ingredient !== undefined,
            ) || [],
          content: object.content || "",
          rawContent: object.rawContent || "",
        });
      }
    },
  });

  const onSubmit = async (data: any) => {
    try {
      if (recipe.content) {
        resetRecipe();
      }

      const { image, ingredients } = data;

      const ingredientsFromImage = image?.[0]
        ? await getIngredientsFromImage(image[0])
        : [];

      const allIngredients: string[] = [
        ...ingredients,
        ...ingredientsFromImage,
      ].filter(ingredient => ingredient !== "");

      // 이미지가 있는데 식재료를 추출하지 못했을 때
      if (image?.[0] && ingredientsFromImage.length === 0) {
        toast({
          variant: "destructive",
          title: "이미지에서 식재료를 추출하지 못했어요",
          description: "좀더 명확한 이미지로 시도해주세요",
        });
      }

      if (allIngredients.length === 0) {
        toast({
          variant: "destructive",
          title: "식재료가 없어 레시피를 만들 수 없어요",
          description: "식재료를 추가해주세요",
        });
        return;
      }

      submit({
        ingredients: allIngredients.toString(),
        categories: categories.toString(),
      });

      setValue("ingredients", allIngredients);
    } catch (error) {
      console.error("재료 제출 중 오류 발생:", error);
    } finally {
    }
  };

  const isLoading = isRecipeLoading || isSubmitting;

  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-center text-sm text-gray-500">
        냉장고 속 사진을 찍어서 식재료를 추출해보세요.
        <br />
        레시피 생성 버튼을 누르고 기다리면 레시피가 나와요.
      </span>
      <PreviewImage imagePreviewURL={imagePreviewURL} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <Input
          key="image"
          id="image"
          type="file"
          accept="image/*"
          {...register("image")}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
              setImagePreviewURL(URL.createObjectURL(file));
            }
          }}
        />
        <RecipeCategories setCategories={setCategories} />
        <Controller
          control={control}
          name="ingredients"
          render={({ field }) => (
            <TagsInput
              id="ingredients"
              placeholder="식재료를 입력하고 엔터를 눌러주세요"
              value={field.value}
              onValueChange={field.onChange}
            />
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full/2">
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
      </form>
      <RecipeForm />
    </div>
  );
};

export default IngredientsForm;
