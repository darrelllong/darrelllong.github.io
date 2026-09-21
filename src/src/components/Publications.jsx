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
  const { publications, loading, errors } = React.useContext(Context);
  const error = errors.publications;

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

  React.useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  return (
    <>
      <header className="collection-heading">
        <p className="eyebrow">Research archive</p>
        <h1>Publications</h1>
        <p>
          Research publications in storage systems, distributed computing, and
          computer security.
        </p>
      </header>
      <SearchBar
        searchTerm={searchTerm}
        onchange={(value) => {
          search(value);
          setCurrentPage(0);
        }}
      />
      <p className="results-count" role="status">
        {loading
          ? "Loading archive…"
          : error
            ? error
            : `${filteredPublications.length} publication${filteredPublications.length === 1 ? "" : "s"}`}
      </p>
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
          {loading
            ? "Loading…"
            : error
              ? "Please reload the page to try again."
              : "No publications match your search."}
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
