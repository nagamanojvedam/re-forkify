import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../utils/recipesApi";

export function useAllRecipes(search) {
  const { data, isPending, error } = useQuery({
    queryKey: ["recipes", search || "all"],
    queryFn: () => getRecipes(search),
  });

  return { data, isPending, error };
}
