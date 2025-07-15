import { createContext, useContext, useState } from "react";

const RecipesContext = createContext();

function RecipesProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipeId, setRecipeId] = useState(null);
  const [bookmarks, setBookmarks] = useState(
    () => JSON.parse(localStorage.getItem("bookmarks")) || [],
  );

  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const handleAddBookmark = (newBookmark) => {
    setBookmarks((prev) => {
      const updated = [...prev, newBookmark];
      localStorage.setItem(
        "bookmarks",
        JSON.stringify([...bookmarks, newBookmark]),
      );
      return updated;
    });
  };

  const handleDeleteBookmark = (bookmarkId) => {
    setBookmarks((prev) => {
      const updated = prev.filter((item) => item.id !== bookmarkId);
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <RecipesContext.Provider
      value={{
        searchTerm,
        recipeId,
        bookmarks,
        isOpenModal,
        openModal,
        closeModal,
        setSearchTerm,
        setRecipeId,
        handleAddBookmark,
        handleDeleteBookmark,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
}

function useRecipes() {
  const context = useContext(RecipesContext);

  if (context === undefined)
    throw Error("useRecipes must be used within a RecipesProvider");

  return context;
}

export { RecipesProvider, useRecipes };
