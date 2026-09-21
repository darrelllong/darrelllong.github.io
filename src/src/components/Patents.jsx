// Dependencies
import React from "react";
import PropTypes from "prop-types";
import { Context } from "../ContextProvider";
// Components
import Pagination from "./Pagination";
import PatentCard from "./PatentCard";
import SearchBar from "./SearchBar";
// Styles
import "../assets/css/publications.scss";

export default function Patents({ searchTerm, search }) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const patentsPerPage = 6;
  const { patents, loading, errors } = React.useContext(Context);
  const error = errors.patents;

  const filteredPatents = patents.filter((patent) => {
    const searchString = searchTerm.toLowerCase();
    const year = String(patent.bibTeX?.year || "");
    const patentNumber = patent.patent_number || "";
    return (
      patent.title.toLowerCase().includes(searchString) ||
      patent.author.some((author) =>
        author.toLowerCase().includes(searchString),
      ) ||
      year.includes(searchString) ||
      patentNumber.includes(searchString)
    );
  });

  React.useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  return (
    <>
      <header className="collection-heading">
        <p className="eyebrow">Research archive</p>
        <h1>Patents</h1>
        <p>Inventions in storage, networking, and computer systems.</p>
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
            : `${filteredPatents.length} patent${filteredPatents.length === 1 ? "" : "s"}`}
      </p>
      {filteredPatents.length > 0 ? (
        <section className="publications">
          {filteredPatents
            .slice(
              currentPage * patentsPerPage,
              (currentPage + 1) * patentsPerPage,
            )
            .map((patent) => (
              <PatentCard key={patent.id} patent={patent} search={search} />
            ))}
        </section>
      ) : (
        <h3>
          {loading
            ? "Loading…"
            : error
              ? "Please reload the page to try again."
              : "No patents match your search."}
        </h3>
      )}
      <Pagination
        currentPage={currentPage}
        totalPublications={filteredPatents.length}
        publicationsPerPage={patentsPerPage}
        changePage={setCurrentPage}
      />
    </>
  );
}

Patents.propTypes = {
  searchTerm: PropTypes.string,
  search: PropTypes.func,
};
