"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import IngredientInput from "./ingredient-input";
import { Button } from "@/components/ui/button";
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { nanoid } from "nanoid/non-secure";
import { experimental_useObject as useObject } from "ai/react";
import { RecipeSchema } from "@/types/schema";
import { useIngredientsStore, useRecipeStore } from "@/store";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { handleFileUpload } from "@/lib/utils";
import { getIngredientsFromImage, saveRecipe } from "@/actions";
import { TInputIngredient } from "@/types/recipe";
import { useRouter } from "next/navigation";

const categoryOptions = [
  { value: 'korean', label: '한식' },
  { value: 'chinese', label: '중식' },
  { value: 'japanese', label: '일식' },
  { value: 'western', label: '양식' },
  { value: 'dessert', label: '디저트' },
  { value: 'etc', label: '기타' }
];

type categoryOptionType = typeof categoryOptions[number]['label'] | []

const IngredientsForm = () => {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm({
    shouldUnregister: true,
  });

  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const recipe = useRecipeStore((state) => state.recipe);
  const addIngredient = useIngredientsStore((state) => state.addIngredient);
  const [imagePreviewURL, setImagePreviewURL] = useState<string | null>(null);
  const [categories, setCategories] = useState<categoryOptionType[]>([])
  const [inputs, setInputs] = useState<TInputIngredient[]>([]);
  const [isBaseLoading, setIsBaseLoading] = useState(false);

  const { object, submit, isLoading } = useObject({
    api: "/api/ai/recipe",
    schema: RecipeSchema,
    onError: console.log,
  });

  const handleAdd = useCallback(({ content = "" } = {}) => {
    setInputs((prev) => [...prev, { id: `ingredient-${nanoid()}`, content }]);
  }, []);

  const handleImageUpload = async (image: File) => {
    const res = await handleFileUpload(image);
    const ingredients = await res.pipe(getIngredientsFromImage);
    ingredients.forEach((ingredient: string) =>
      handleAdd({ content: ingredient })
    );
    return ingredients;
  };

  const handleSaveRecipe = async () => {
    // const savedRecipe = await saveRecipe({ recipe, authorId: session.user.id });
    // console.log(savedRecipe);
  };

  const handleClickCategory = (category: categoryOptionType) => {
    setCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((cat) => cat !== category);
      } else {
        return [...prev, category];
      }
    });
  }

  const onSubmit = async (data: any) => {
    try {
      setIsBaseLoading(true);
      const { image, ...rest } = data;

      addIngredient(rest);
      const ingredients = image?.[0]
        ? [...Object.values(rest), ...(await handleImageUpload(image[0]))]
        : [...Object.values(rest)];

      submit({ ingredients: ingredients.toString(), categories: categories.toString() });
    } catch (error) {
      console.error("재료 제출 중 오류 발생:", error);
    } finally {
      setIsBaseLoading(false);
    }
  };

  useEffect(() => {
    if (object?.content && !isLoading) {
      addRecipe({
        title: object.title || "",
        ingredients:
          object.ingredients?.filter(
            (ingredient): ingredient is string => ingredient !== undefined
          ) || [],
        content: object.content || "",
        rawContent: object.rawContent || "",
      });
    }
  }, [addRecipe, isLoading, object]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "image" && value.image?.[0]) {
        setImagePreviewURL(URL.createObjectURL(value.image[0]));
      }
    });

    return () => {
      if (imagePreviewURL) {
        URL.revokeObjectURL(imagePreviewURL);
      }
      subscription.unsubscribe();
    };
  }, [watch, imagePreviewURL]);

  const isSubmitting = isLoading || isBaseLoading;

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
      <form className="flex flex-col gap-4 w-full">
        <Input
          key="image"
          id="image"
          type="file"
          accept="image/*"
          {...register("image")}
        />
        <div>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="div">카테고리</label>
          <div className="flex gap-1">
            {categoryOptions.map((category) => (
              // FIXME: Button 컴포넌트 사용시, 클릭시마다 url path 바뀌면서 리다이렉트 발생
              <div
                key={category.value}
                className={`px-2 rounded-full ${categories.includes(category.label) ? 'bg-lime-200' : 'bg-lime-50'} text-slate-400 border-2 border-lime-300`}
                onClick={() => handleClickCategory(category.label)}
              >
                {category.label}
              </div>
            ))}
          </div>
        </div>
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
      </form>
      <Button onClick={() => handleAdd()} className="w-full">
        <PlusIcon className="w-full h-4" />
      </Button>
      <Button
        disabled={isSubmitting}
        className="w-full"
        onClick={handleSubmit(onSubmit)}
      >
        {isSubmitting ? (
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
        <Button onClick={handleSaveRecipe}>레시피 저장</Button>
      )}
    </div>
  );
};

export default IngredientsForm;
