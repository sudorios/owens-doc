import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  isLoading = false
}) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="mt-4 flex items-center justify-between border-t border-gray-700/50 pt-4">
      <div className="text-sm text-gray-400">
        Mostrando {startItem} a {endItem} de {totalItems} usuarios
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className={`px-3 py-1 rounded-lg text-sm ${
            currentPage === 1 || isLoading
              ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Anterior
        </button>
        <span className="text-sm text-gray-400">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || isLoading}
          className={`px-3 py-1 rounded-lg text-sm ${
            currentPage >= totalPages || isLoading
              ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Pagination;
