import { useMutation } from "@tanstack/react-query";
import { createRecipe as createRecipeApi } from "../utils/recipesApi";

export function useCreateRecipe() {
  const { mutate: createRecipe, isPending } = useMutation({
    mutationFn: createRecipeApi,
  });

  return { createRecipe, isPending };
}
