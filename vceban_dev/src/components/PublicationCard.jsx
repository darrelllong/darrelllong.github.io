/* eslint-disable react/prop-types */
import React from "react";
import { Context } from "../ContextProvider";
/* Font Awesome icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileArrowDown,
  faSquareCaretRight,
} from "@fortawesome/free-solid-svg-icons";

export default function PublicationCard({ publication, setSearchTerm }) {
  const { setAppState } = React.useContext(Context);

  const showPublication = (e, id) => {
    const publication = `publication-${id}`;
    e.preventDefault();
    setAppState(publication);
    window.history.pushState({}, "", publication);
  };

  const searchPaper = (e, term) => {
    e.preventDefault();
    setSearchTerm(term);
  };

  return (
    <article>
      <header>
        <h2>
          <a
            href={`/publication-${publication.id}`}
            onClick={(e) => showPublication(e, publication.id)}
          >
            {publication.title}
          </a>
        </h2>
        <ul className="authors">
          {publication.author.map((author, index) => (
            <li key={index}>
              <a href="/publications" onClick={(e) => searchPaper(e, author)}>
                {author}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/publications"
          onClick={(e) => searchPaper(e, publication.date)}
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
        <a
          href={`/publication-${publication.id}`}
          onClick={(e) => showPublication(e, publication.id)}
        >
          Read more <FontAwesomeIcon icon={faSquareCaretRight} />
        </a>
      </footer>
    </article>
  );
}
