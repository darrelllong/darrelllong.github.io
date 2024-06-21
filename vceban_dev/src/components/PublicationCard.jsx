/* eslint-disable react/prop-types */
import React from "react";
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
        <h2>
          <a href={path} onClick={(e) => handleWindowHistory(e, path, path)}>
            {publication.title}
          </a>
        </h2>
        <ul className="authors">
          {publication.author.map((author, index) => (
            <li key={index}>
              <a
                href="/publications"
                onClick={(e) =>
                  handleWindowHistory(
                    e,
                    "publications",
                    "publications",
                    search(author),
                  )
                }
              >
                {author}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/publications"
          onClick={(e) =>
            handleWindowHistory(
              e,
              "publications",
              "publications",
              search(publication.date),
            )
          }
        >
          {publication.date}
        </a>
      </header>
      <main>
        <p>{publication.short_description}</p>
      </main>
      <footer>
        <a href={publication.url} target="_blank" rel="noreferrer">
          Download <FontAwesomeIcon icon={faFileArrowDown} />
        </a>
        <a href={path} onClick={(e) => handleWindowHistory(e, path, path)}>
          Read more <FontAwesomeIcon icon={faSquareCaretRight} />
        </a>
      </footer>
    </article>
  );
}
