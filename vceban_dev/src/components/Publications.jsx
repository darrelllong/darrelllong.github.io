import React from "react";
import publications from "./publications.json";
import Pagination from "./Pagination";
import Publication from "./Publication";

export default function Publications() {
  const [currentPage, setCurrentPage] = React.useState(0);
  const publicationsPerPage = 9;

  return (
    <>
      <h2>Publications</h2>
      <div className="publications-list">
        {publications
          .slice(
            currentPage * publicationsPerPage,
            (currentPage + 1) * publicationsPerPage,
          )
          .map((publication, index) => (
            <Publication key={index} publication={publication} />
          ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPublications={publications.length}
        publicationsPerPage={publicationsPerPage}
        changePage={setCurrentPage}
      />
    </>
  );
}
