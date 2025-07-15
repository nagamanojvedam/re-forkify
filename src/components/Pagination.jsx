function Pagination({ currentPage, setCurrentPage, totalPages }) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const incrementPage = () => {
    if (!isLastPage) setCurrentPage((prev) => prev + 1);
  };

  const decrementPage = () => {
    if (!isFirstPage) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="flex items-center justify-evenly p-4">
      {!isFirstPage ? (
        <button
          className="cursor-pointer transition-all duration-150 ease-linear hover:scale-110"
          onClick={decrementPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="#f48982"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>
        </button>
      ) : (
        <div className="h-5 w-5" />
      )}
      <span className="rounded-full bg-[#f9f5f3] px-3 py-1 text-sm font-semibold tracking-wider text-[#f48982]">
        {currentPage}
      </span>
      {!isLastPage ? (
        <button
          className="cursor-pointer transition-all duration-150 ease-linear hover:scale-110"
          onClick={incrementPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="#f48982"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      ) : (
        <div className="h-5 w-5" />
      )}
    </div>
  );
}

export default Pagination;
