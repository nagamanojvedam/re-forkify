import SearchList from "./SearchList";
import Pagination from "./Pagination";
import { useAllRecipes } from "../hooks/useAllRecipes";
import { useRecipes } from "../contexts/recipesContext";
import { useEffect, useState } from "react";

// const fakeData = {
//   status: "success",
//   results: 53,
//   data: {
//     recipes: [
//       {
//         publisher: "BBC Good Food",
//         image_url:
//           "http://forkify-api.herokuapp.com/images/2150654_MEDIUM6068.jpg",
//         title: "Pizza bianco with artichoke hearts",
//         id: "664c8f193e7aa067e94e897b",
//       },
//       {
//         publisher: "All Recipes",
//         image_url: "http://forkify-api.herokuapp.com/images/100111309d9.jpg",
//         title: "Double Crust Stuffed Pizza",
//         id: "664c8f193e7aa067e94e8297",
//       },
//       {
//         publisher: "Vintage Mixer",
//         image_url:
//           "http://forkify-api.herokuapp.com/images/CauliflowerPizzaCrustRecipe06fdc.jpg",
//         title: "Cauliflower Pizza Crust Recipe",
//         id: "664c8f193e7aa067e94e8906",
//       },
//       {
//         publisher: "101 Cookbooks",
//         image_url:
//           "http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg",
//         title: "Best Pizza Dough Ever",
//         id: "664c8f193e7aa067e94e8704",
//       },
//       {
//         publisher: "The Pioneer Woman",
//         image_url:
//           "http://forkify-api.herokuapp.com/images/4364270576_302751a2a4f3c1.jpg",
//         title: "PW’s Favorite Pizza",
//         id: "664c8f193e7aa067e94e86ba",
//       },
//       {
//         publisher: "The Pioneer Woman",
//         image_url:
//           "http://forkify-api.herokuapp.com/images/steakhousepizza0b87.jpg",
//         title: "One Basic Pizza Crust",
//         id: "664c8f193e7aa067e94e8673",
//       },
//       {
//         publisher: "The Pioneer Woman",
//         image_url:
//           "http://forkify-api.herokuapp.com/images/5278973957_3f9f9a21c2_o7a1b.jpg",
//         title: "Fig-Prosciutto Pizza with Arugula",
//         id: "664c8f193e7aa067e94e866f",
//       },
//       {
//         publisher: "The Pioneer Woman",
//         image_url: "http://forkify-api.herokuapp.com/images/fruitpizza9a19.jpg",
//         title: "Deep Dish Fruit Pizza",
//         id: "664c8f193e7aa067e94e8658",
//       },
//       {
//         publisher: "Real Simple",
//         image_url:
//           "http://forkify-api.herokuapp.com/images/pizza_30061a5d763.jpg",
//         title: "Salami and Brussels Sprouts Pizza",
//         id: "664c8f193e7aa067e94e8605",
//       },
//       {
//         publisher: "Real Simple",
//         image_url:
//           "http://forkify-api.herokuapp.com/images/pizza_300d938bd58.jpg",
//         title: "English-Muffin Egg Pizzas",
//         id: "664c8f193e7aa067e94e85be",
//       },

//       {
//         publisher: "What's Gaby Cooking",
//         image_url: "http://forkify-api.herokuapp.com/images/IMG_15866d21.jpg",
//         title: "Grilled BBQ Chicken Pizza",
//         id: "664c8f193e7aa067e94e8a12",
//       },
//     ],
//   },
// };

const pageCount = 10;

function Results() {
  const { searchTerm } = useRecipes();
  const { data: recipes, isPending, error } = useAllRecipes(searchTerm);
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    setCurrentPage(1)
  },[recipes]) 
  
  const paginatedRecipies = recipes?.slice((currentPage - 1) * pageCount,(currentPage -1)* pageCount + pageCount -1)
  const totalPages = Math.ceil(recipes?.length/pageCount)


  return (
    <div className="flex w-1/4 flex-col justify-between py-6">
      {isPending && <div className="loader"></div>}
      {error && (
        <div className="flex flex-col items-center justify-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#f48982"
            className="size-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
            />
          </svg>

          <span>No recipies found</span>
        </div>
      )}
      {(paginatedRecipies?.length === 0) && (
          <div className="p-2 text-center text-neutral-700">
            No recipes or start searching for recipes.
          </div>,
        )}

      {paginatedRecipies && <SearchList recipes={paginatedRecipies} />}

      <div className="space-y-4">
        {recipes?.length > 0 && <Pagination currentPage = {currentPage} setCurrentPage={setCurrentPage} totalPages = {totalPages}/>}
        <footer className="flex items-center justify-start space-x-1 bg-gradient-to-r from-fuchsia-500 to-blue-500 bg-clip-text px-4 text-[10px] text-transparent">
          <span> Cloned with</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#da23ff"
            className="inline size-3"
          >
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>{" "}
          <span>by</span> <span className="underline">Naga Manoj Vedam</span>
        </footer>
      </div>
    </div>
  );
}

export default Results;
