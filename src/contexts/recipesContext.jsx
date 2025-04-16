import { createContext, useContext, useState } from "react";

const RecipesContext = createContext();

function RecipesProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipeId, setRecipeId] = useState("");
  const [bookmarks, setBookmarks] = useState(
    () => JSON.parse(localStorage.getItem("bookmarks")) || [],
  );

  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const handleAddBookmark = (newBookmark) => {
    setBookmarks((prev) => [...prev, newBookmark]);
    localStorage.setItem(
      "bookmarks",
      JSON.stringify([...bookmarks, newBookmark]),
    );
  };
  const handleDeleteBookmark = (bookmarkId) => {
    const newBookmarks = bookmarks.filter((item) => item.id !== bookmarkId);
    setBookmarks(newBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
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
    throw Error("Cannot use recipes context outside its provider");

  return context;
}

export { RecipesProvider, useRecipes };
