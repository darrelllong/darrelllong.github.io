// Dependencies
import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Assets
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

export default function Pagination(props) {
  const { totalPublications, publicationsPerPage, currentPage, changePage } =
    props;
  const totalPages = Math.ceil(totalPublications / publicationsPerPage);
  const lastPage = totalPages - 1;
  const displayPages = 8;

  const renderPageNumbers = () => {
    const pageNumbers = [];

    const addPageButton = (pageNumber) => {
      const active = currentPage === pageNumber;
      pageNumbers.push(
        <button
          key={pageNumber}
          onClick={() => changePage(pageNumber)}
          disabled={active}
          className={active ? "active" : undefined}
        >
          {pageNumber + 1}
        </button>,
      );
    };

    const addEllipsis = (key, page) => {
      pageNumbers.push(
        <button key={key} onClick={() => changePage(page)}>
          ...
        </button>,
      );
    };

    if (totalPages <= displayPages) {
      // If total pages are less than or equal to displayPages, show all page buttons
      for (let i = 0; i < totalPages; i++) {
        addPageButton(i);
      }
    } else {
      // Always show the first page button
      addPageButton(0);

      // ellipsis-start point to the page in between of current and first page
      if (currentPage > 3) {
        addEllipsis("ellipsis-start", Math.floor((1 + currentPage) / 2));
      }

      // Calculate startPage and endPage for the range of page buttons to display
      const startPageRange = Math.min(
        currentPage - 2,
        totalPages - displayPages + 2,
      );
      const startPage = Math.max(1, startPageRange);
      const endPage = startPage + displayPages - 3;

      for (let i = startPage; i < endPage; i++) {
        addPageButton(i); // Add page buttons for the calculated range
      }

      // ellipsis-end point to the page in between of current and last page
      if (currentPage < totalPages - 4) {
        addEllipsis("ellipsis-end", Math.floor((lastPage + currentPage) / 2));
      }

      // Always show the last page button
      addPageButton(lastPage);
    }

    return pageNumbers;
  };

  if (totalPublications) {
    return (
      <nav>
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 0}
          className="prev"
        >
          <FontAwesomeIcon icon={faCaretLeft} />
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === lastPage}
          className="next"
        >
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
      </nav>
    );
  }
}

Pagination.propTypes = {
  totalPublications: PropTypes.number.isRequired,
  publicationsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
};
