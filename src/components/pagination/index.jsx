import React, { useEffect, useState, useMemo } from "react";
import Pagination from "react-bootstrap/Pagination";

function MyPagination({
  total = 0,
  currentPage = 1,
  itemsPerPage = 10,
  onPageChange,
}) {
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    if (total > 0 && itemsPerPage > 0)
      setTotalPages(Math.ceil(total / itemsPerPage));
  }, [total, itemsPerPage]);

  const paginationItems = useMemo(() => {
    const pages = [];

    if (currentPage > 1) {
      pages.push(
        <Pagination.Prev
          key="prev"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
      );
    }

    for (let page = 1; page <= totalPages; page++) {
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

    if (currentPage < totalPages) {
      pages.push(
        <Pagination.Next
          key="next"
          onClick={() => onPageChange(currentPage + 1)}
        />
      );
    }

    return pages;
  }, [totalPages, currentPage, onPageChange]);

  if (totalPages === 0) return null;

  return <Pagination bsPrefix="pagination-custom">{paginationItems}</Pagination>;
}

export default MyPagination;
