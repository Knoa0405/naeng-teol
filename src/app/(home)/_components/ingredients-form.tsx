"use client";

import { useCallback, useEffect, useState } from "react";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { nanoid } from "nanoid/non-secure";
import Image from "next/image";
import { useForm } from "react-hook-form";

import { useToast } from "@/components/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TagsInput } from "@/components/ui/tags-input";
import { useRecipeStore } from "@/store";
import { TInputIngredient } from "@/types/recipe";
import { RecipeSchema } from "@/types/schema";

import IngredientInput from "./ingredient-input";
import RecipeCategories, { TCategoryOption } from "./recipe-categories";

import RecipeForm from "./recipe-form";

import { getIngredientsFromImage } from "../_lib/utils";

const IngredientsForm = () => {
  const { toast } = useToast();
  const recipe = useRecipeStore(state => state.recipe);

  const { register, handleSubmit } = useForm({
    shouldUnregister: true,
  });

  const addRecipe = useRecipeStore(state => state.addRecipe);
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
              (ingredient): ingredient is string => ingredient !== undefined,
            ) || [],
          content: object.content || "",
          rawContent: object.rawContent || "",
        });
      }
    },
  });

  const handleAddInput = useCallback(({ content = "" } = {}) => {
    setInputs(prev => [...prev, { id: `ingredient-${nanoid()}`, content }]);
  }, []);

  const onSubmit = async (data: any) => {
    try {
      setIsPending(true);
      const { image, ...rest } = data;

      const ingredientsFromImage = image[0]
        ? await getIngredientsFromImage(image[0])
        : [];

      const allIngredients = [
        ...Object.values(rest),
        ...ingredientsFromImage,
      ].filter(ingredient => ingredient !== "");

      // 이미지가 있는데 식재료를 추출하지 못했을 때
      if (image[0] && ingredientsFromImage.length === 0) {
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
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) {
              setImagePreviewURL(URL.createObjectURL(file));
            }
          }}
        />
        <TagsInput
          tags={inputs}
          setTags={setInputs}
          placeholder="식재료를 입력해주세요"
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
      </form>
      <RecipeForm />
    </div>
  );
};

export default IngredientsForm;
