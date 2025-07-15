import { useState } from "react";
import { useRecipes } from "../contexts/recipesContext";

function SearchInput() {
  const { setSearchTerm } = useRecipes();
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = search.trim();
    if (!trimmed) return;

    setSearchTerm(trimmed);
    setSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative grow">
      <input
        type="text"
        placeholder="Search over 1,00,000 recipes..."
        className="w-full rounded-full bg-white px-4 py-2 placeholder:text-neutral-300 focus:outline-2 focus:outline-offset-2 focus:outline-[#f48c828f]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="absolute top-0 right-0 flex h-full cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-[#fbda89] to-[#f48c82] px-8 text-[12px] font-medium text-white uppercase transition-all duration-200 hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <span>Search</span>
      </button>
    </form>
  );
}

export default SearchInput;
