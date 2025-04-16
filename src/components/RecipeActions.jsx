import { useState } from "react";
import SearchList from "./SearchList";
import AddRecipeModal from "./AddRecipeModal";
import { useRecipes } from "../contexts/recipesContext";

// const bookmarks = [
//   {
//     publisher: "BBC Good Food",
//     image_url: "http://forkify-api.herokuapp.com/images/2150654_MEDIUM6068.jpg",
//     title: "Pizza bianco with artichoke hearts",
//     id: "664c8f193e7aa067e94e897b",
//   },
//   {
//     publisher: "All Recipes",
//     image_url: "http://forkify-api.herokuapp.com/images/100111309d9.jpg",
//     title: "Double Crust Stuffed Pizza",
//     id: "664c8f193e7aa067e94e8297",
//   },

//   {
//     publisher: "Vintage Mixer",
//     image_url:
//       "http://forkify-api.herokuapp.com/images/CauliflowerPizzaCrustRecipe06fdc.jpg",
//     title: "Cauliflower Pizza Crust Recipe",
//     id: "664c8f193e7aa067e94e8906",
//   },
//   {
//     publisher: "101 Cookbooks",
//     image_url:
//       "http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg",
//     title: "Best Pizza Dough Ever",
//     id: "664c8f193e7aa067e94e8704",
//   },
//   {
//     publisher: "The Pioneer Woman",
//     image_url:
//       "http://forkify-api.herokuapp.com/images/4364270576_302751a2a4f3c1.jpg",
//     title: "PW’s Favorite Pizza",
//     id: "664c8f193e7aa067e94e86ba",
//   },
//   {
//     publisher: "The Pioneer Woman",
//     image_url:
//       "http://forkify-api.herokuapp.com/images/steakhousepizza0b87.jpg",
//     title: "One Basic Pizza Crust",
//     id: "664c8f193e7aa067e94e8673",
//   },
//   {
//     publisher: "The Pioneer Woman",
//     image_url:
//       "http://forkify-api.herokuapp.com/images/5278973957_3f9f9a21c2_o7a1b.jpg",
//     title: "Fig-Prosciutto Pizza with Arugula",
//     id: "664c8f193e7aa067e94e866f",
//   },
//   {
//     publisher: "The Pioneer Woman",
//     image_url: "http://forkify-api.herokuapp.com/images/fruitpizza9a19.jpg",
//     title: "Deep Dish Fruit Pizza",
//     id: "664c8f193e7aa067e94e8658",
//   },
//   {
//     publisher: "Real Simple",
//     image_url: "http://forkify-api.herokuapp.com/images/pizza_30061a5d763.jpg",
//     title: "Salami and Brussels Sprouts Pizza",
//     id: "664c8f193e7aa067e94e8605",
//   },
//   {
//     publisher: "Real Simple",
//     image_url: "http://forkify-api.herokuapp.com/images/pizza_300d938bd58.jpg",
//     title: "English-Muffin Egg Pizzas",
//     id: "664c8f193e7aa067e94e85be",
//   },
// ];

function RecipeActions() {
  const { bookmarks, openModal } = useRecipes();
  const [showBookmarks, setShowBookmarks] = useState(false);
  return (
    <div className="relative flex">
      <div
        className={`absolute top-[100%] right-[-32px] z-10 max-h-[680px] w-full overflow-y-scroll bg-white [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#f2918680] [&::-webkit-scrollbar-track]:bg-gray-100 ${showBookmarks ? "block" : "hidden"}`}
      >
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
              No bookmarks yet...Find a nice recipe and bookmark it!!!
            </span>
          </div>
        ) : (
          <SearchList recipes={bookmarks} />
        )}
      </div>

      <button
        className="flex cursor-pointer items-center justify-between gap-2 px-6 py-8 hover:bg-[#f2efee]"
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
        <span className="mt-1 flex items-center justify-center text-center text-[12px] font-semibold text-neutral-600 uppercase">
          Add Recipe
        </span>
      </button>
      <button
        className="flex cursor-pointer items-center justify-between gap-2 px-6 py-8 hover:bg-[#f2efee]"
        onClick={() => setShowBookmarks((prev) => !prev)}
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

        <span className="mt-1 flex items-center justify-center text-center text-[12px] font-semibold text-neutral-600 uppercase">
          Bookmarks
        </span>
      </button>
    </div>
  );
}

export default RecipeActions;
