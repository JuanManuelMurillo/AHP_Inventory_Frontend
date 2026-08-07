"use client";

import { useMemo, useState } from "react";
import "@/shared/css/components/molecules/Pagination.css";

/**
 * usePagination
 * Maneja el estado de página actual y devuelve el slice de datos correspondiente.
 * Reutilizable para cualquier arreglo (printers, brands, series, etc).
 *
 * @param {Array} items - arreglo completo de datos
 * @param {number} pageSize - elementos por página
 */
export function usePagination(items = [], pageSize = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  // Si el arreglo se reduce (ej. por un filtro) y la página actual queda fuera de rango, la ajustamos.
  const safePage = Math.min(currentPage, totalPages);

  const paginatedItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, safePage, pageSize]);

  function goToPage(page) {
    const clamped = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(clamped);
  }

  return {
    currentPage: safePage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage: () => goToPage(safePage + 1),
    prevPage: () => goToPage(safePage - 1),
  };
}

/**
 * Genera el arreglo de páginas a mostrar, insertando "..." cuando hay muchas.
 * Ej: [1, "...", 4, 5, 6, "...", 20]
 */
function getPageRange(currentPage, totalPages, siblingCount = 1) {
  const totalNumbers = siblingCount * 2 + 5; // primera, última, actual, 2 siblings, 2 dots

  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  const range = [1];

  if (showLeftDots) range.push("...");

  for (let page = leftSibling; page <= rightSibling; page++) {
    if (page !== 1 && page !== totalPages) range.push(page);
  }

  if (showRightDots) range.push("...");

  range.push(totalPages);

  return range;
}

/**
 * Pagination
 * Componente controlado: no guarda estado propio, recibe currentPage/totalPages
 * y notifica cambios via onPageChange. Úsalo junto con usePagination o con tu
 * propio estado si la paginación viene del servidor.
 *
 * Usa las clases nativas de Bootstrap (.pagination, .page-item, .page-link),
 * así que basta con tener bootstrap.css importado en tu proyecto. Los chevrons
 * usan Bootstrap Icons (bi bi-chevron-left / bi bi-chevron-right); si no los
 * tienes instalados, cambia esos <i> por "«" y "»".
 *
 * @param {number} currentPage
 * @param {number} totalPages
 * @param {(page: number) => void} onPageChange
 * @param {number} [siblingCount=1] - páginas vecinas a mostrar a cada lado de la actual
 * @param {string} [size] - "sm" | "lg" para pagination-sm / pagination-lg
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  size,
  className = "",
}) {
  if (totalPages <= 1) return null;

  const pages = getPageRange(currentPage, totalPages, siblingCount);
  const sizeClass = size ? `pagination-${size}` : "";

  return (
    <nav aria-label="Paginación">
      <ul className={`pagination pagination-custom justify-content-center ${sizeClass} ${className}`}>
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            type="button"
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Página anterior"
          >
            <i className="bi bi-chevron-left" aria-hidden="true"></i>
          </button>
        </li>

        {pages.map((page, idx) =>
          page === "..." ? (
            <li key={`dots-${idx}`} className="page-item disabled">
              <span className="page-link">…</span>
            </li>
          ) : (
            <li
              key={page}
              className={` page-item ${page === currentPage ? "active" : ""}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              <button
                type="button"
                className="page-link"
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          )
        )}

        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button
            type="button"
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Página siguiente"
          >
            <i className="bi bi-chevron-right" aria-hidden="true"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
}