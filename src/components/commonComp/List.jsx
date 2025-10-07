import { useState } from "react";

export default function List({ items, itemsPerPage = 5, renderItem }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

return (
  <div>
    <ul className="space-y-4">{currentItems.map(renderItem)}</ul>

    {/* Paginación */}
    <div className="flex justify-center gap-2 mt-4">
      <button
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Anterior
      </button>

      {getPageNumbers().map((page, i) => (
        <button
          key={i}
          onClick={() => typeof page === "number" && setCurrentPage(page)}
          disabled={page === "..."}
          className={`px-3 py-1 rounded ${
            currentPage === page ? "bg-amber-600 text-white" : "bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>

    {/* Información de paginación */}
    <p className="text-center text-gray-600 mt-2">
      Página {currentPage} de {totalPages} • {items.length} elementos.
    </p>
  </div>
);
}