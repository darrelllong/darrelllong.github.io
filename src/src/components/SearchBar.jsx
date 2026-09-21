import PropTypes from "prop-types";
import { useId } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
export default function SearchBar({ searchTerm, onchange }) {
  const id = useId();
  return (
    <form
      className="search-bar"
      role="search"
      onSubmit={(event) => event.preventDefault()}
    >
      <label className="sr-only" htmlFor={id}>
        Search this collection
      </label>
      <FontAwesomeIcon icon={faSearch} />
      <input
        id={id}
        type="search"
        placeholder="Search by title, name, or keyword…"
        value={searchTerm}
        onChange={(event) => onchange(event.target.value)}
      />
      {searchTerm && (
        <button
          type="button"
          onClick={() => onchange("")}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </form>
  );
}
SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onchange: PropTypes.func.isRequired,
};
