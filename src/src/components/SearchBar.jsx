import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({ searchTerm, onchange }) {
  return (
    <form
      className="search-bar dottedBorder"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => onchange(e.target.value)}
      />
      <FontAwesomeIcon
        icon={searchTerm !== "" ? faCircleXmark : faSearch}
        flip="horizontal"
        onClick={() => onchange("")}
      />
    </form>
  );
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onchange: PropTypes.func.isRequired,
};
