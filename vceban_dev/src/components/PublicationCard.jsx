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

export default function PublicationCard({ publication, search }) {
  const path = `${publication.id}`;

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
        {publication.date && (
          <Link to="/publications" onClick={() => search(publication.date)}>
            {publication.date}
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
