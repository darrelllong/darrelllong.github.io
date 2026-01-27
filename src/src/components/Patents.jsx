// Dependencies
import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Context } from "../ContextProvider";
// Components
import Pagination from "./Pagination";
import PatentCard from "./PatentCard";
// Assets
import { faCircleXmark, faSearch } from "@fortawesome/free-solid-svg-icons";
// Styles
import "../assets/css/publications.scss";

export default function Patents({ searchTerm, search }) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const patentsPerPage = 6;
  const { patents } = React.useContext(Context);

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

  return (
    <>
      <h2>Patents</h2>
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
      {filteredPatents.length > 0 ? (
        <section className="publications">
          {filteredPatents
            .slice(
              currentPage * patentsPerPage,
              (currentPage + 1) * patentsPerPage,
            )
            .map((patent, index) => (
              <PatentCard
                key={index}
                patent={patent}
                search={search}
              />
            ))}
        </section>
      ) : (
        <h3>
          No patents found, please refine your search or try again later
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
