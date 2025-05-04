// const fakeData = {
//   status: "success",
//   data: {
//     recipe: {
//       publisher: "All Recipes",
//       ingredients: [
//         {
//           quantity: 1.5,
//           unit: "tsps",
//           description: "white sugar",
//         },
//         {
//           quantity: 1,
//           unit: "cup",
//           description: "warm water",
//         },
//         {
//           quantity: 1.5,
//           unit: "tsps",
//           description: "active dry yeast",
//         },
//         {
//           quantity: 1,
//           unit: "tbsp",
//           description: "olive oil",
//         },
//         {
//           quantity: 0.5,
//           unit: "tsp",
//           description: "salt",
//         },
//         {
//           quantity: 2,
//           unit: "cups",
//           description: "all-purpose flour",
//         },
//         {
//           quantity: 1,
//           unit: "",
//           description: "can crushed tomatoes",
//         },
//         {
//           quantity: 1,
//           unit: "tbsp",
//           description: "packed brown sugar",
//         },
//         {
//           quantity: 0.5,
//           unit: "tsp",
//           description: "garlic powder",
//         },
//         {
//           quantity: 1,
//           unit: "tsp",
//           description: "olive oil",
//         },
//         {
//           quantity: 0.5,
//           unit: "tsp",
//           description: "salt",
//         },
//         {
//           quantity: 3,
//           unit: "cups",
//           description: "shredded mozzarella cheese divided",
//         },
//         {
//           quantity: 0.5,
//           unit: "pound",
//           description: "bulk italian sausage",
//         },
//         {
//           quantity: 1,
//           unit: "",
//           description: "package sliced pepperoni",
//         },
//         {
//           quantity: 1,
//           unit: "",
//           description: "package sliced fresh mushrooms",
//         },
//         {
//           quantity: 1,
//           unit: "",
//           description: "green bell pepper chopped",
//         },
//         {
//           quantity: 1,
//           unit: "",
//           description: "red bell pepper chopped",
//         },
//       ],
//       source_url:
//         "http://allrecipes.com/Recipe/Double-Crust-Stuffed-Pizza/Detail.aspx",
//       image_url: "http://forkify-api.herokuapp.com/images/100111309d9.jpg",
//       title: "Double Crust Stuffed Pizza",
//       servings: 4,
//       cooking_time: 120,
//       id: "664c8f193e7aa067e94e8297",
//     },
//   },
// };

import Fraction from "fraction.js";
import { useRecipes } from "../contexts/recipesContext";
import { useRecipe } from "../hooks/useRecipe";
import { apiKey } from "../utils/config";
import { useEffect, useState } from "react";

function Recipe() {
  const { bookmarks, recipeId, handleAddBookmark, handleDeleteBookmark } =
    useRecipes();
  const { data: recipe, isPending, error } = useRecipe(recipeId);

  const isBookmarked = bookmarks.find((item) => item.id === recipeId);

  const [multiplier, setMultiplier] = useState(1);

  useEffect(() => {
    setMultiplier(recipe?.servings);
  }, [recipe]);

  const handleDecreaseServings = () => {
    if (multiplier === 1) setMultiplier(1);
    else setMultiplier((prev) => prev - 1);
  };

  const handleIncreaseServings = () => {
    setMultiplier((prev) => prev + 1);
  };

  const handleBookmark = () => {
    if (isBookmarked) {
      handleDeleteBookmark(recipe.id);
    } else handleAddBookmark(recipe);
  };

  return (
    <div className="relative min-h-screen w-3/4 bg-[#f9f5f3]">
      {!recipeId && (
        <div className="mx-auto flex w-fit items-center gap-4 p-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="#f39084"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
            />
          </svg>
          <span>
            Start by searching for a recipe or an ingredient. Have fun!
          </span>
        </div>
      )}
      {isPending && recipeId && <div className="loader"></div>}
      {error && recipeId && (
        <div className="w-3/4 text-center">
          <p className="gap-4 p-16">
            There was an error loading recipe. Please try again or search for
            another recipe
          </p>
        </div>
      )}
      {recipe && (
        <>
          {" "}
          <div className="relative h-[300px] w-full">
            <img
              src={recipe.image_url}
              alt={`${recipe.title} image`}
              className="h-full w-full object-cover"
            />
            <div className="absolute top-0 left-0 h-full w-full bg-[#f58e83]/45" />
          </div>
          <div className="absolute top-[240px] left-[20%] -skew-y-6 bg-gradient-to-b from-[#fbda89] to-[#f48c82] box-decoration-slice p-4 text-3xl font-semibold text-white uppercase">
            {recipe.title}
          </div>
          <div className="flex justify-between bg-[#f9f5f3] px-24 py-8 pt-18">
            <div className="flex items-center gap-8">
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#f48c82"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <p className="text-sm uppercase">
                  <span className="font-semibold">{recipe.cooking_time}</span>
                  {` Minutes`}
                </p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#f48c82"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                  />
                </svg>
                <p className="text-sm uppercase">
                  <span className="font-semibold">{multiplier}</span>
                  {` Servings`}
                </p>
                <div className="flex items-center">
                  <button
                    className="cursor-pointer transition-all duration-100 ease-linear hover:-translate-y-0.5"
                    onClick={handleDecreaseServings}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#f48c82"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                  <button
                    className="cursor-pointer transition-all duration-100 ease-linear hover:-translate-y-0.5"
                    onClick={handleIncreaseServings}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#f48c82"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              {recipe?.key === apiKey ? (
                <div className="rounded-full bg-[#eeeae8] p-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="#f38e82"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </div>
              ) : (
                <div className="h-5 w-5" />
              )}

              {/* bookmark button */}
              <button
                className="cursor-pointer rounded-full bg-gradient-to-r from-[#fbda89] to-[#f48c82] p-2 transition-all duration-100 ease-linear hover:scale-110"
                onClick={() => handleBookmark()}
              >
                {isBookmarked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="white"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 bg-[#f2efee] px-16 py-10">
            <h3 className="text-center font-bold text-[#f39282] uppercase">
              Recipe Ingredients
            </h3>
            <ul className="grid grid-cols-2 gap-5 text-sm text-neutral-500">
              {recipe.ingredients.map((item, idx) => (
                <li key={idx + 1} className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#f39282"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>

                  {/* <span>{`${item.quantity !== null ? new Fraction((multiplier / recipe.servings) * item.quantity).toFraction(true) : ""} ${item.unit || ""} ${item.description}`}</span> */}
                  <span>{`${
                    item.quantity !== null &&
                    !isNaN(item.quantity) &&
                    !isNaN(multiplier) &&
                    !isNaN(recipe.servings)
                      ? new Fraction(
                          (multiplier / recipe.servings) * item.quantity,
                        ).toFraction(true)
                      : ""
                  } ${item.unit || ""} ${item.description}`}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-6 p-12 text-center">
            <h3 className="text-lg font-bold text-[#f39282] uppercase">
              How to cook it
            </h3>
            <p className="text-sm text-neutral-500">
              This recipe was carefully designed and tested by{" "}
              <span className="font-bold">{recipe.publisher}</span>.<br />{" "}
              Please check out directions at their website.
            </p>

            <a
              href={recipe.source_url}
              target="_blank"
              className="mx-auto w-fit cursor-pointer rounded-full bg-gradient-to-r from-[#fbda89] to-[#f48c82] px-6 py-3 text-[12px] text-white uppercase transition-all duration-200 ease-linear hover:scale-110"
            >
              Directions &rarr;
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default Recipe;
