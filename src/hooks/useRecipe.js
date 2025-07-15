import { useQuery } from "@tanstack/react-query";
import { getRecipe } from "../utils/recipesApi";

export function useRecipe(id) {
  const { data, isPending, error } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipe(id),
  });

  return { data, isPending, error };
}
