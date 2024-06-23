import React from "react";
import PropTypes from "prop-types";
import { Context } from "../ContextProvider";
/* Font Awesome icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileArrowDown,
  faSquareCaretRight,
} from "@fortawesome/free-solid-svg-icons";

export default function PublicationCard({ publication, search }) {
  const { handleWindowHistory } = React.useContext(Context);
  const path = `publication-${publication.id}`;

  return (
    <article>
      <header>
        <h3>
          <a href={path} onClick={(e) => handleWindowHistory(e, path)}>
            {publication.title}
          </a>
        </h3>
        {publication.author && (
          <ul className="authors">
            {publication.author.map((author, index, authors) => (
              <li key={index}>
                <a
                  href="/publications"
                  onClick={(e) =>
                    handleWindowHistory(e, "publications", search(author))
                  }
                >
                  {author}
                  {index === authors.length - 1 ? "" : ","}
                </a>
              </li>
            ))}
          </ul>
        )}
        {publication.date && (
          <a
            href="/publications"
            onClick={(e) =>
              handleWindowHistory(e, "publications", search(publication.date))
            }
          >
            {publication.date}
          </a>
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
        <a href={path} onClick={(e) => handleWindowHistory(e, path)}>
          Read more
          <FontAwesomeIcon icon={faSquareCaretRight} />
        </a>
      </footer>
    </article>
  );
}

PublicationCard.propTypes = {
  publication: PropTypes.object.isRequired,
  search: PropTypes.func.isRequired,
};
