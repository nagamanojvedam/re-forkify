import { useEffect, useRef, useState } from "react";
import SearchList from "./SearchList";
import { useRecipes } from "../contexts/recipesContext";

function RecipeActions() {
  const { bookmarks, openModal } = useRecipes();
  const [showBookmarks, setShowBookmarks] = useState(false);
  const bookmarksRef = useRef();

  useEffect(() => {
    const handleClickOutside = (evnt) => {
      if (bookmarksRef.current && !bookmarksRef.current.contains(evnt.target))
        setShowBookmarks(false);
    };

    if (showBookmarks)
      document.addEventListener("mousedown", handleClickOutside);

    return document.removeEventListener("mousedown", handleClickOutside);
  }, [showBookmarks]);

  return (
    <div className="relative flex">
      {/* Add Recipe Button */}
      <button
        className="flex cursor-pointer items-center justify-between gap-2 rounded-sm px-6 py-8 hover:bg-[#f2efee]"
        onClick={openModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="#f29186"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
        <span className="mt-1 text-[12px] font-semibold text-neutral-600 uppercase">
          Add Recipe
        </span>
      </button>

      {/* Bookmark Button */}
      <div ref={bookmarksRef} className="relative">
        <button
          className="flex cursor-pointer items-center justify-between gap-2 rounded-sm px-6 py-8 hover:bg-[#f2efee]"
          onClick={() => setShowBookmarks((prev) => !prev)}
          aria-expanded={showBookmarks}
          aria-label="Toggle bookmarks list"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="#f29186"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>
          <span className="mt-1 text-[12px] font-semibold text-neutral-600 uppercase">
            Bookmarks
          </span>
        </button>

        {/* Bookmarks Dropdown */}
        {showBookmarks && (
          <div className="absolute top-[calc(100%+16px)] right-[-24px] z-10 max-h-[680px] w-[300px] overflow-y-scroll bg-white shadow-lg [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#f2918680] [&::-webkit-scrollbar-track]:bg-gray-100">
            {bookmarks.length === 0 ? (
              <div className="flex flex-col items-center gap-2 p-6 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#f29186"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
                <span className="text-sm">
                  No bookmarks yet... Find a nice recipe and bookmark it!
                </span>
              </div>
            ) : (
              <SearchList recipes={bookmarks} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeActions;
