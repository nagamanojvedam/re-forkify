import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRecipe as createRecipeApi } from "../utils/recipesApi";

export function useCreateRecipe() {
  const queryClient = useQueryClient();
  const { mutate: createRecipe, isPending } = useMutation({
    mutationFn: createRecipeApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });

  return { createRecipe, isPending };
}
