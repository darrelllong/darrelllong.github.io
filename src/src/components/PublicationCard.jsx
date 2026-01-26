// Dependencies
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Assets
import {
  faFileArrowDown,
  faSquareCaretRight,
} from "@fortawesome/free-solid-svg-icons";

// Format month abbreviation to full name
const monthNames = {
  jan: "January", feb: "February", mar: "March", apr: "April",
  may: "May", jun: "June", jul: "July", aug: "August",
  sep: "September", oct: "October", nov: "November", dec: "December"
};

const formatDate = (bibTeX) => {
  if (!bibTeX?.year) return null;
  const month = bibTeX.month ? monthNames[bibTeX.month.toLowerCase()] : null;
  return month ? `${month} ${bibTeX.year}` : `${bibTeX.year}`;
};

export default function PublicationCard({ publication, search }) {
  const path = `${publication.id}`;
  const displayDate = formatDate(publication.bibTeX);

  return (
    <article>
      <header>
        <h3>
          <Link to={path}>{publication.title}</Link>
        </h3>
        {publication.author && (
          <ul className="authors">
            {publication.author.map((author, index, authors) => (
              <li key={index}>
                <Link to="/publications" onClick={() => search(author)}>
                  {author}
                  {index === authors.length - 1 ? "" : ","}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {displayDate && (
          <Link to="/publications" onClick={() => search(String(publication.bibTeX?.year || ""))}>
            {displayDate}
          </Link>
        )}
      </header>
      <main>
        {publication.short_description && (
          <p>{publication.short_description}</p>
        )}
      </main>
      <footer>
        {publication.url && (
          <a href={publication.url} target="_blank" rel="noreferrer">
            Download
            <FontAwesomeIcon icon={faFileArrowDown} />
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

PublicationCard.propTypes = {
  publication: PropTypes.object.isRequired,
  search: PropTypes.func.isRequired,
};
