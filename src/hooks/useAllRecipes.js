import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../utils/recipesApi";

export function useAllRecipes(search) {
  const { data, isPending, error } = useQuery({
    queryKey: ["recipes", search.trim()],
    queryFn: () => getRecipes(search),
    enabled: Boolean(search.trim()),
  });

  return { data, isPending, error };
}
