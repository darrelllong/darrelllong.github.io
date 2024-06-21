/* eslint-disable react/prop-types */
import React from "react";
import { Context } from "../ContextProvider";
/* Font Awesome icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileArrowDown,
  faUsers,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

const BibTeX = ({ bibTeX }) => {
  if (!bibTeX) {
    return null;
  }

  return (
    <section>
      <h3>BibTeX</h3>
      <pre>
        {`@article{${bibTeX["@article"]},
  author       = {${bibTeX.author}},
  title        = {${bibTeX.title}},
  journal      = {${bibTeX.journal}},
  pages        = {${bibTeX.pages}},
  volume       = {${bibTeX.volume}},
  number       = {${bibTeX.number}},
  month        = {${bibTeX.month}},
  year         = {${bibTeX.year}},
}`}
      </pre>
    </section>
  );
};

const Abstract = ({ paragraphs }) => {
  if (!paragraphs) {
    return null;
  }

  return (
    <main>
      <h3>Abstract</h3>
      {paragraphs.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </main>
  );
};

const Header = ({ title, author, date, url, search }) => {
  const { handleWindowHistory } = React.useContext(Context);
  return (
    <header>
      {title && <h2>{title}</h2>}
      {author && (
        <section>
          <FontAwesomeIcon icon={faUsers} />
          <ul>
            {author.map((name, index) => (
              <li key={index}>
                <a
                  href="/publications"
                  onClick={(e) => {
                    handleWindowHistory(
                      e,
                      "publications",
                      "publications",
                      search(name),
                    );
                  }}
                >
                  {name}
                  {index === author.length - 1 ? "" : ","}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
      {date && (
        <a
          href="/publications"
          onClick={(e) => {
            handleWindowHistory(
              e,
              "publications",
              "publications",
              search(date),
            );
          }}
        >
          <FontAwesomeIcon icon={faCalendar} />
          {date}
        </a>
      )}
      {url && (
        <a href={url} target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faFileArrowDown} />
          Dowload full paper PDF
        </a>
      )}
    </header>
  );
};

const Publication = ({ publication, search }) => {
  if (!publication) {
    return null;
  }

  const lines = [];
  if (publication.full_content) {
    lines.push(...publication.full_content.split("\n"));
  }

  return (
    <article>
      <Header
        title={publication.title}
        author={publication.author}
        date={publication.date}
        url={publication.url}
        search={search}
      />
      <Abstract paragraphs={lines} />
      <footer>
        <BibTeX bibTeX={publication.bibTeX} />
        {publication.url && (
          <a href={publication.url} target="_blank" rel="noreferrer">
            Dowload full paper PDF
          </a>
        )}
      </footer>
    </article>
  );
};

export default Publication;
