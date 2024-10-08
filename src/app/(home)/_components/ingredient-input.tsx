"use client";

import { Dispatch, HTMLAttributes, SetStateAction, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TIngredient } from "@/types";
import { MinusIcon } from "@radix-ui/react-icons";
import { useIngredientsStore } from "@/store";

type TIngredientInputProps = HTMLAttributes<HTMLInputElement> & {
  id: string;
  setInputs: Dispatch<SetStateAction<TIngredient[]>>;
  index: number;
};

const IngredientInput = forwardRef<HTMLInputElement, TIngredientInputProps>(
  ({ setInputs, index, ...props }, ref) => {
    const removeIngredient = useIngredientsStore(
      (state) => state.removeIngredient
    );

    const handleRemove = () => {
      setInputs((prev) => prev.filter((input) => input.id !== props.id));
      removeIngredient(props.id);
    };

    return (
      <div>
        <label className="font-semibold">재료 {index + 1}</label>
        <div className="flex gap-4">
          <Input {...props} ref={ref} />
          <Button type="button" onClick={handleRemove}>
            <MinusIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }
);

IngredientInput.displayName = "IngredientInput";

export default IngredientInput;
