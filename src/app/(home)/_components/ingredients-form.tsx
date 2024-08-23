"use client";

import { TIngredient } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import IngredientInput from "./ingredient-input";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { nanoid } from "nanoid/non-secure";
import { experimental_useObject as useObject } from "ai/react";
import { RecipeSchema } from "@/types/schema";
import { useRecipeStore } from "@/store";

const IngredientsForm = () => {
  const { register, handleSubmit } = useForm();
  const addRecipe = useRecipeStore((state) => state.addRecipe);

  const { object, submit, isLoading } = useObject({
    api: "/api/ai/recipe",
    schema: RecipeSchema,
  });

  const [inputs, setInputs] = useState<TIngredient[]>([
    {
      name: "ingredient-0",
    },
    {
      name: "ingredient-1",
    },
  ]);

  const handleAdd = useCallback(() => {
    const id = nanoid();
    setInputs((prev) => [...prev, { name: `ingredient-${id}` }]);
  }, []);

  const onSubmit = (data: any) => {
    const values = Object.values(data);
    const ingredients = values.toString();

    submit({
      ingredients,
    });
  };

  useEffect(() => {
    if (object?.content && !isLoading) {
      addRecipe({
        content: object.content,
      });
    }
  }, [addRecipe, isLoading, object]);

  return (
    <div className="flex flex-col gap-4 items-center">
      <h3 className="text-xl font-bold">식재료를 추가해주세요</h3>
      <span className="text-sm text-gray-500">
        버튼을 누르고 기다리면 레시피가 나와요
      </span>
      <form className="flex flex-col gap-4 w-full">
        {inputs.map((input, index) => (
          <IngredientInput
            key={input.name}
            id={input.name}
            {...register(input.name)}
            setInputs={setInputs}
            index={index}
          />
        ))}
      </form>
      <Button onClick={handleAdd} className="w-full">
        <PlusIcon className="w-full h-4" />
      </Button>
      <Button className="w-full" onClick={handleSubmit(onSubmit)}>
        제출
      </Button>
    </div>
  );
};

export default IngredientsForm;
