import { useRecipes } from "../contexts/recipesContext";
const { VITE_API_KEY: apiKey } = import.meta.env;

function SearchList({ recipes }) {
  return (
    <ul className="max-h-screen overflow-y-scroll">
      {recipes.map((recipe) => (
        <Item recipe={recipe} key={recipe.id} />
      ))}
    </ul>
  );
}

function Item({ recipe }) {
  const { recipeId, setRecipeId } = useRecipes();
  return (
    <li
      className={`flex cursor-pointer items-center gap-2 px-4 py-3 uppercase transition-all duration-200 ease-linear hover:-translate-y-1 hover:bg-[#f9f5f3] ${recipe.id === recipeId ? "bg-[#f9f5f3]" : ""} `}
      onClick={() => setRecipeId(recipe.id)}
    >
      <img
        src={recipe.image_url}
        alt={`${recipe.title} image`}
        className="h-12 w-12 rounded-full"
      />
      <div className="relative grow">
        <h2 className="text-[12px] text-[#f6a882]">
          {recipe.title.length > 20
            ? recipe.title.slice(0, 20) + "..."
            : recipe.title}
        </h2>
        <span className="text-[10px] text-[#afabb1]">{recipe.publisher}</span>
        {recipe?.key === apiKey && (
          <div className="absolute right-0 bottom-0 rounded-full bg-[#eeeae8] p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#f6a882"
              className="size-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
        )}
      </div>
    </li>
  );
}

export default SearchList;
