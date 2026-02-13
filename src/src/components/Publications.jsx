// Dependencies
import React from "react";
import PropTypes from "prop-types";
import { Context } from "../ContextProvider";
// Components
import Pagination from "./Pagination";
import PublicationCard from "./PublicationCard";
import SearchBar from "./SearchBar";
// Styles
import "../assets/css/publications.scss";

export default function Publications({ searchTerm, search }) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const publicationsPerPage = 6;
  const { publications } = React.useContext(Context);

  const filteredPublications = publications.filter((publication) => {
    const searchString = searchTerm.toLowerCase();
    const year = String(publication.bibTeX?.year || "");
    return (
      publication.title.toLowerCase().includes(searchString) ||
      publication.author.some((author) =>
        author.toLowerCase().includes(searchString),
      ) ||
      year.includes(searchString)
    );
  });

  return (
    <>
      <h2>Publications</h2>
      <SearchBar
        searchTerm={searchTerm}
        onchange={(value) => {
          search(value);
          setCurrentPage(0);
        }}
      />
      {filteredPublications.length > 0 ? (
        <section className="publications">
          {filteredPublications
            .slice(
              currentPage * publicationsPerPage,
              (currentPage + 1) * publicationsPerPage,
            )
            .map((publication) => (
              <PublicationCard
                key={publication.id}
                publication={publication}
                search={search}
              />
            ))}
        </section>
      ) : (
        <h3>
          No publications found, please refine your search or try again later
        </h3>
      )}
      <Pagination
        currentPage={currentPage}
        totalPublications={filteredPublications.length}
        publicationsPerPage={publicationsPerPage}
        changePage={setCurrentPage}
      />
    </>
  );
}

Publications.propTypes = {
  searchTerm: PropTypes.string,
  search: PropTypes.func,
};
