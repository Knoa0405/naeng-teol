"use client";

import { Dispatch, HTMLAttributes, SetStateAction, forwardRef } from "react";

import { MinusIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TInputIngredient } from "@/types/recipe";

type TIngredientInputProps = HTMLAttributes<HTMLInputElement> & {
  id: string;
  setInputs: Dispatch<SetStateAction<TInputIngredient[]>>;
  index: number;
};

const IngredientInput = forwardRef<HTMLInputElement, TIngredientInputProps>(
  ({ setInputs, index, ...props }, ref) => {
    const handleRemove = () => {
      setInputs(prev => prev.filter(input => input.id !== props.id));
    };

    return (
      <>
        <label className="font-semibold">재료 {index + 1}</label>
        <div className="flex gap-4">
          <Input {...props} ref={ref} />
          <Button type="button" onClick={handleRemove}>
            <MinusIcon className="w-4 h-4" />
          </Button>
        </div>
      </>
    );
  },
);

IngredientInput.displayName = "IngredientInput";

export default IngredientInput;
