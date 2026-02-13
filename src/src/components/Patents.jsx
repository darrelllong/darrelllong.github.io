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
      <SearchBar
        searchTerm={searchTerm}
        onchange={(value) => {
          search(value);
          setCurrentPage(0);
        }}
      />
      {filteredPatents.length > 0 ? (
        <section className="publications">
          {filteredPatents
            .slice(
              currentPage * patentsPerPage,
              (currentPage + 1) * patentsPerPage,
            )
            .map((patent) => (
              <PatentCard
                key={patent.id}
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
