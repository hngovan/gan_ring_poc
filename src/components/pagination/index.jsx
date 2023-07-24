import React, { useEffect, useCallback, useState, useMemo } from "react";
import Pagination from "react-bootstrap/Pagination";
import PropTypes from "prop-types";

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

  const onPageChangeHandler = useCallback(
    (page) => {
      onPageChange(page);
    },
    [onPageChange]
  );

  const paginationItems = useMemo(() => {
    const pages = [];
    const totalPages = Math.ceil(total / itemsPerPage);
    let startPage = Math.max(1, currentPage - limit);
    let endPage = Math.min(totalPages, currentPage + limit);

    if (first && currentPage > 1) {
      pages.push(
        <Pagination.First
          key="first"
          onClick={() => {
            onPageChangeHandler(1);
          }}
        />
      );
    }

    // Prev
    if (currentPage > 1) {
      pages.push(
        <Pagination.Prev
          key="prev"
          onClick={() => {
            onPageChangeHandler(currentPage - 1);
          }}
          disabled={currentPage === 1}
        />
      );
    }

    // Ellipsis "..."
    if (between && startPage > 1) {
      pages.push(
        <Pagination.Ellipsis key="startEllipsis" disabled aria-label="More">
          {ellipsis}
        </Pagination.Ellipsis>
      );
    }

    // Page
    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <Pagination.Item
          key={page}
          data-page={page}
          active={page === currentPage}
          onClick={() => onPageChangeHandler(page)}
        >
          {page}
        </Pagination.Item>
      );
    }

    // Ellipsis "..."
    if (between && endPage < totalPages) {
      pages.push(
        <Pagination.Ellipsis key="endEllipsis" disabled aria-label="More">
          {ellipsis}
        </Pagination.Ellipsis>
      );
    }

    // Next
    if (currentPage < totalPages) {
      pages.push(
        <Pagination.Next
          key="next"
          onClick={() => {
            onPageChangeHandler(currentPage + 1);
          }}
          disabled={currentPage === totalPages}
        />
      );
    }

    // Last
    if (last && currentPage < totalPages) {
      pages.push(
        <Pagination.Last
          key="last"
          onClick={() => {
            onPageChangeHandler(totalPages);
          }}
        />
      );
    }

    return pages;
  }, [totalPages, currentPage, onPageChangeHandler, limit, between, ellipsis]);

  if (totalPages === 0) return null;

  return (
    <Pagination bsPrefix="pagination-custom">{paginationItems}</Pagination>
  );
}

MyPagination.propTypes = {
  total: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  limit: PropTypes.number,
  between: PropTypes.bool,
  ellipsis: PropTypes.string,
  first: PropTypes.bool,
  last: PropTypes.bool,
};

export default MyPagination;
