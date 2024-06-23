import React from "react";
import PropTypes from "prop-types";
import publications from "../assets/publications.json";
import Pagination from "./Pagination";
import PublicationCard from "./PublicationCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faSearch } from "@fortawesome/free-solid-svg-icons";
import "../assets/css/publications.scss";

export default function Publications({ searchTerm, search }) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const publicationsPerPage = 6;

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
      <form
        className="search-bar dottedBorder"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => {
            search(e.target.value);
            setCurrentPage(0);
          }}
        />
        <FontAwesomeIcon
          icon={searchTerm !== "" ? faCircleXmark : faSearch}
          flip="horizontal"
          onClick={() => {
            search("");
            setCurrentPage(0);
          }}
        />
      </form>
      {filteredPublications.length > 0 ? (
        <section className="publications">
          {filteredPublications
            .slice(
              currentPage * publicationsPerPage,
              (currentPage + 1) * publicationsPerPage,
            )
            .map((publication, index) => (
              <PublicationCard
                key={index}
                publication={publication}
                search={search}
              />
            ))}
        </section>
      ) : (
        <h3>No publications found, please refine your search</h3>
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
