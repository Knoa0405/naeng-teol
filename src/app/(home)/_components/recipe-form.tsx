import { useActionState } from "react";

import { ReloadIcon } from "@radix-ui/react-icons";

import { useRouter } from "next/navigation";

import { signInWithGoogle } from "@/actions";
import { saveRecipe } from "@/actions";
import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useRecipeStore } from "@/store";

const RecipeForm = () => {
  const router = useRouter();
  const recipe = useRecipeStore(state => state.recipe);
  const handleSaveRecipe = async () => {
    try {
      const response = await saveRecipe({
        recipe,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      if (!("error" in response) && response.post) {
        router.push(`/posts/${response.post.id}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          case "User not found":
            toast({
              variant: "destructive",
              title: "레시피 저장 실패",
              description: "로그인 후 이용해주세요",
              action: (
                <ToastAction
                  altText="로그인"
                  onClick={() => signInWithGoogle()}
                >
                  로그인
                </ToastAction>
              ),
            });
            break;
        }
      }
    }
  };

  const [, saveRecipeAction, isSaveRecipePending] = useActionState(
    handleSaveRecipe,
    undefined,
  );

  return (
    <form action={saveRecipeAction} className="flex w-full flex-col">
      {recipe.content && (
        <Button type="submit" disabled={isSaveRecipePending}>
          {isSaveRecipePending ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              레시피 저장중
            </>
          ) : (
            "레시피 저장"
          )}
        </Button>
      )}
    </form>
  );
};

export default RecipeForm;
