import { useRecipes } from "../contexts/recipesContext";
import AddRecipeModal from "./AddRecipeModal";
import Header from "./Header";
import Recipe from "./Recipe";
import Results from "./Results";

function AppLayout() {
  const { isOpenModal } = useRecipes();

  return (
    <>
      <div className="flex min-h-dvh items-center justify-center bg-gray-50 px-4">
        <main className="flex min-h-dvh w-full max-w-6xl flex-col bg-white shadow-md">
          <Header />
          <div className="flex flex-col md:flex-row">
            <Results />
            <Recipe />
          </div>
        </main>
      </div>
      {isOpenModal && <AddRecipeModal />}
    </>
  );
}

export default AppLayout;
