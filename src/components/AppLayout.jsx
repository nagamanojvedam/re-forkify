import { useRecipes } from "../contexts/recipesContext";
import AddRecipeModal from "./AddRecipeModal";
import Header from "./Header";
import Recipe from "./Recipe";
import Results from "./Results";

function AppLayout() {
  const { recipeId, isOpenModal } = useRecipes();

  return (
    <>
      <div className="flex items-center justify-center">
        <main className="flex min-h-dvh w-6xl flex-col bg-white">
          <Header />
          <div className="flex">
            <Results />
            <Recipe key={recipeId} />
          </div>
        </main>
      </div>
      {isOpenModal && <AddRecipeModal />}
    </>
  );
}

export default AppLayout;
