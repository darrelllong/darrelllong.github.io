/* eslint-disable react/prop-types */
import React from "react";
import publications from "../assets/publications.json";
import Pagination from "./Pagination";
import PublicationCard from "./PublicationCard";

export default function Publications({ searchTerm, setSearchTerm }) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const publicationsPerPage = 9;

  const filteredPublications = publications.filter((publication) => {
    const searchString = searchTerm.toLowerCase();
    return (
      publication.title.toLowerCase().includes(searchString) ||
      publication.full_content.toLowerCase().includes(searchString) ||
      publication.author.some((author) =>
        author.toLowerCase().includes(searchString),
      ) ||
      publication.date.toLowerCase().includes(searchString)
    );
  });

  return (
    <>
      <h2>Publications</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <section className="articles">
        {filteredPublications
          .slice(
            currentPage * publicationsPerPage,
            (currentPage + 1) * publicationsPerPage,
          )
          .map((publication, index) => (
            <PublicationCard
              key={index}
              publication={publication}
              setSearchTerm={setSearchTerm}
            />
          ))}
      </section>
      <Pagination
        currentPage={currentPage}
        totalPublications={filteredPublications.length}
        publicationsPerPage={publicationsPerPage}
        changePage={setCurrentPage}
      />
    </>
  );
}
