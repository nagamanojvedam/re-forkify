import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "./components/AppLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RecipesProvider } from "./contexts/recipesContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecipesProvider>
        <AppLayout />
      </RecipesProvider>
      {import.meta.env.VITE_REACT_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

export default App;
