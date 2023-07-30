import { useState, useEffect } from "react";

import { CaretLeft, CaretRight } from "phosphor-react";

export function Pagination({
  itemsPerPage = 10,
  totalItems,
  onPageChange,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(Number(totalItems) / itemsPerPage);

  useEffect(() => {
    if (onPageChange) {
      onPageChange(currentPage);
    }
  }, [currentPage, onPageChange]);

  const pageNumbers = Array.from({ length: totalPages }).map(
    (_, index) => index + 1
  );

  return (
    <div className="flex items-center justify-between  bg-white py-3">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          className={`relative inline-flex items-center rounded-sm border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-50"
          }`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Anterior
        </button>
        <button
          className={`relative ml-3 inline-flex items-center rounded-sm border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-50"
          }`}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Próximo
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-sm shadow-sm"
            aria-label="Pagination"
          >
            <button
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-50"
              }`}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              <span className="sr-only">Previous</span>
              <CaretLeft />
            </button>
            {pageNumbers.map((pageNumber, index) => (
              <button
                key={index}
                className={`relative inline-flex items-center  text-sm font-semibold px-4 py-2 ring-1 ring-inset ring-gray-300 ${
                  pageNumber === currentPage
                    ? "z-10 bg-gray-900 text-white focus-visible:outline focus-visible:outline-2  focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                    : "text-gray-900 hover:bg-gray-50 focus:outline-offset-0"
                }`}
                disabled={pageNumber === currentPage}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
            <button
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-50"
              }`}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <span className="sr-only">Next</span>
              <CaretRight />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
