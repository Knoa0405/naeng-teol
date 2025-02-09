import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Dispatch, SetStateAction } from "react";

export const CATEGORY_OPTIONS = [
  { value: "korean", label: "한식" },
  { value: "chinese", label: "중식" },
  { value: "japanese", label: "일식" },
  { value: "western", label: "양식" },
  { value: "dessert", label: "디저트" },
  { value: "etc", label: "기타" },
] as const;

export type TCategoryOption = (typeof CATEGORY_OPTIONS)[number]["label"];

interface RecipeCategoriesProps {
  setCategories: Dispatch<SetStateAction<TCategoryOption[]>>;
}

const RecipeCategories = ({ setCategories }: RecipeCategoriesProps) => {
  const handleClickCategory = (currentCategory: string[]) => {
    const currentCategoryLabels = currentCategory
      .map(
        (category) =>
          CATEGORY_OPTIONS.find((option) => option.value === category)?.label
      )
      .filter((label) => label !== undefined);

    setCategories(currentCategoryLabels);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="div">카테고리</label>
      <ToggleGroup type="multiple" onValueChange={handleClickCategory}>
        {CATEGORY_OPTIONS.map((category) => (
          <ToggleGroupItem key={category.value} value={category.value}>
            {category.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default RecipeCategories;
