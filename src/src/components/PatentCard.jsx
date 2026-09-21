// Dependencies
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Assets
import {
  faArrowUpRightFromSquare,
  faSquareCaretRight,
} from "@fortawesome/free-solid-svg-icons";
// Utilities
import { formatDate } from "../utils/dateUtils";

export default function PatentCard({ patent, search }) {
  const path = `/patents/${patent.id}/`;
  const displayDate = formatDate(patent.bibTeX);

  return (
    <article>
      <header>
        <h2>
          <Link to={path}>{patent.title}</Link>
        </h2>
        {patent.author && (
          <ul className="authors">
            {patent.author.map((author, index, authors) => (
              <li key={index}>
                <Link to="/patents/" onClick={() => search(author)}>
                  {author}
                  {index === authors.length - 1 ? "" : ","}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {patent.patent_number && (
          <span className="patent-number">
            U.S. Patent {patent.patent_number}
          </span>
        )}
        {displayDate && (
          <Link
            to="/patents/"
            onClick={() => search(String(patent.bibTeX?.year || ""))}
          >
            {displayDate}
          </Link>
        )}
      </header>
      <section className="abstract">
        {patent.short_description && <p>{patent.short_description}</p>}
      </section>
      <footer>
        {patent.url && (
          <a href={patent.url} target="_blank" rel="noreferrer">
            View at Google Patents
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </a>
        )}
        <Link to={path}>
          Read more
          <FontAwesomeIcon icon={faSquareCaretRight} />
        </Link>
      </footer>
    </article>
  );
}

PatentCard.propTypes = {
  patent: PropTypes.object.isRequired,
  search: PropTypes.func.isRequired,
};
