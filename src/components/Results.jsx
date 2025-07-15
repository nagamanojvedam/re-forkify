import SearchList from "./SearchList";
import Pagination from "./Pagination";
import { useAllRecipes } from "../hooks/useAllRecipes";
import { useRecipes } from "../contexts/recipesContext";
import { useEffect, useState } from "react";

const pageCount = 10;

function Results() {
  const { searchTerm } = useRecipes();
  const { data: recipes, isPending, error } = useAllRecipes(searchTerm);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [recipes]);

  const paginatedRecipes = recipes?.slice(
    (currentPage - 1) * pageCount,
    (currentPage - 1) * pageCount + pageCount,
  );

  const totalPages = Math.ceil(recipes?.length / pageCount);

  return (
    <div className="flex w-1/4 flex-col justify-between py-6">
      {/* 🟡 No search term yet */}
      {!searchTerm && <div className="h-8" />}

      {/* 🟢 Loading spinner only if searchTerm exists */}
      {isPending && searchTerm && <div className="loader"></div>}

      {/* 🔴 Error display */}
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
          <span>Something went wrong</span>
        </div>
      )}

      {/* ⚠️ No results after search */}
      {paginatedRecipes?.length === 0 && searchTerm && !isPending && !error && (
        <div className="p-2 text-center text-neutral-700">
          No recipes match your search.
        </div>
      )}

      {/* ✅ Show list if recipes available */}
      {paginatedRecipes && <SearchList recipes={paginatedRecipes} />}

      <div className="space-y-4">
        {recipes?.length > 0 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        )}
        <footer className="flex items-center justify-start space-x-1 bg-gradient-to-r from-fuchsia-500 to-blue-500 bg-clip-text px-4 text-[10px] text-transparent">
          <span>Cloned with</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#da23ff"
            className="inline size-3"
          >
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
          <span>by</span> <span className="underline">Naga Manoj Vedam</span>
        </footer>
      </div>
    </div>
  );
}

export default Results;
