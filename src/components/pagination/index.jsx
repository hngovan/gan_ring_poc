import React, { useEffect, useState, useMemo } from "react";
import Pagination from "react-bootstrap/Pagination";

function MyPagination({
  total = 0,
  currentPage = 1,
  itemsPerPage = 10,
  onPageChange = () => {},
  limit = 3,
  between = true,
  ellipsis = "...",
  first = false,
  last = false,
}) {
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    if (total > 0 && itemsPerPage > 0)
      setTotalPages(Math.ceil(total / itemsPerPage));
  }, [total, itemsPerPage]);

  const paginationItems = useMemo(() => {
    const pages = [];
    let startPage = Math.max(1, currentPage - limit);
    let endPage = Math.min(totalPages, currentPage + limit);

    if (first && currentPage > 1) {
      pages.push(
        <Pagination.First
          key="first"
          onClick={() => {
            onPageChange(1);
          }}
        />
      );
    }

    if (currentPage > 1) {
      pages.push(
        <Pagination.Prev
          key="prev"
          onClick={() => {
            onPageChange(currentPage - 1);
          }}
          disabled={currentPage === 1}
        />
      );
    }

    if (between && startPage > 1) {
      pages.push(
        <Pagination.Ellipsis key="startEllipsis" disabled aria-label="More">
          {ellipsis}
        </Pagination.Ellipsis>
      );
    }

    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <Pagination.Item
          key={page}
          data-page={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Pagination.Item>
      );
    }

    if (between && endPage < totalPages) {
      pages.push(
        <Pagination.Ellipsis key="endEllipsis" disabled aria-label="More">
          {ellipsis}
        </Pagination.Ellipsis>
      );
    }

    if (currentPage < totalPages) {
      pages.push(
        <Pagination.Next
          key="next"
          onClick={() => {
            onPageChange(currentPage + 1);
          }}
          disabled={currentPage === totalPages}
        />
      );
    }

    if (last && currentPage < totalPages) {
      pages.push(
        <Pagination.Last
          key="last"
          onClick={() => {
            onPageChange(totalPages);
          }}
        />
      );
    }

    return pages;
  }, [totalPages, currentPage, onPageChange, limit, between, ellipsis]);

  if (totalPages === 0) return null;

  return (
    <Pagination bsPrefix="pagination-custom">{paginationItems}</Pagination>
  );
}

export default MyPagination;
