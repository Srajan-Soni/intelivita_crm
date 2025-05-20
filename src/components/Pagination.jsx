import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-4 space-x-1">
      {[...Array(totalPages).keys()].map((n) => {
        const pageNum = n + 1;
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`px-3 py-1 rounded-md text-sm transition hover:cursor-pointer font-medium ${
              currentPage === pageNum
                ? 'bg-blue-600 text-white shadow'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {pageNum}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
