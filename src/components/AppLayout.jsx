import { useRecipes } from "../contexts/recipesContext";
import AddRecipeModal from "./AddRecipeModal";
import Header from "./Header";
import Recipe from "./Recipe";
import Results from "./Results";

function AppLayout() {
  const { isOpenModal } = useRecipes();

  return (
    <>
      <div className="flex min-h-dvh items-center justify-center bg-gradient-to-br from-[#f7d686] to-[#f48a82] px-4">
        <main className="mt-16 flex min-h-screen w-full max-w-6xl flex-col rounded-t-xl bg-white shadow-md">
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
