import React from "react";
import PropTypes from "prop-types";
import { Context } from "../ContextProvider";
/* Font Awesome icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileArrowDown,
  faUsers,
  faCalendar,
  faCaretLeft,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/publication.scss";

const BibTeX = ({ bibTeX }) => {
  if (!bibTeX) {
    return null;
  }

  return (
    <section>
      <h3>BibTeX</h3>
      <div>
        <pre>
          {`@article{${bibTeX["@article"]},
  ${bibTeX.author ? `author    = {${bibTeX.author}},` : ""}
  ${bibTeX.title ? `title     = {${bibTeX.title}},` : ""}
  ${bibTeX.journal ? `journal   = {${bibTeX.journal}},` : ""}
  ${bibTeX.pages ? `pages     = {${bibTeX.pages}},` : ""}
  ${bibTeX.volume ? `volume    = {${bibTeX.volume}},` : ""}
  ${bibTeX.number ? `number    = {${bibTeX.number}},` : ""}
  ${bibTeX.month ? `month     = {${bibTeX.month}},` : ""}
  ${bibTeX.year ? `year      = {${bibTeX.year}},` : ""}
}`
            .split("\n")
            .filter((line) => line.trim() !== "")
            .join("\n")}
        </pre>
      </div>
    </section>
  );
};

BibTeX.propTypes = {
  bibTeX: PropTypes.object,
};

const Abstract = ({ paragraphs }) => {
  if (!paragraphs) {
    return null;
  }

  return (
    <main className="dottedBorder">
      <h3>Abstract</h3>
      {paragraphs.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </main>
  );
};

Abstract.propTypes = {
  paragraphs: PropTypes.array,
};

const Header = ({ title, author, date, url, search }) => {
  const { handleWindowHistory } = React.useContext(Context);
  return (
    <header className="dottedBorder">
      {title && <h2>{title}</h2>}
      {author && (
        <section>
          <FontAwesomeIcon icon={faUsers} fixedWidth />
          <ul>
            {author.map((name, index) => (
              <li key={index}>
                <a
                  href="/publications"
                  onClick={(e) => {
                    handleWindowHistory(e, "publications", search(name));
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
            handleWindowHistory(e, "publications", search(date));
          }}
        >
          <FontAwesomeIcon icon={faCalendar} fixedWidth />
          {date}
        </a>
      )}
      {url && (
        <a href={url} target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faFileArrowDown} fixedWidth />
          Dowload full paper PDF
        </a>
      )}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  author: PropTypes.array,
  date: PropTypes.string,
  url: PropTypes.string,
  search: PropTypes.func,
};

const Publication = ({ publication, total, search }) => {
  const { handleWindowHistory } = React.useContext(Context);

  if (!publication) {
    return (
      <>
        <h2>No publication found</h2>
        <a
          href="/publications"
          onClick={(e) => {
            handleWindowHistory(e, "publications");
          }}
        >
          Go back
        </a>
      </>
    );
  }

  const lines = [];
  if (publication.full_content) {
    lines.push(...publication.full_content.split("\n"));
  }

  const prev =
    publication.id > 1
      ? `publication-${publication.id - 1}`
      : `publication-${total}`;

  const next =
    publication.id < total
      ? `publication-${publication.id + 1}`
      : "publication-1";

  return (
    <>
      <article>
        <Header {...publication} search={search} />
        <Abstract paragraphs={lines} />
        <footer>
          <BibTeX bibTeX={publication.bibTeX} />
          {publication.url && (
            <a href={publication.url} target="_blank" rel="noreferrer">
              Dowload full paper PDF <FontAwesomeIcon icon={faFileArrowDown} />
            </a>
          )}
        </footer>
      </article>
      <nav>
        <a
          href={`/${prev}`}
          onClick={(e) => {
            handleWindowHistory(e, prev);
          }}
        >
          <FontAwesomeIcon icon={faCaretLeft} />
          Previous publication
        </a>
        <a
          href="/publications"
          onClick={(e) => {
            handleWindowHistory(e, "publications");
          }}
        >
          Back to all publications
        </a>
        <a
          href={`/${next}`}
          onClick={(e) => {
            handleWindowHistory(e, next);
          }}
        >
          Next publication
          <FontAwesomeIcon icon={faCaretRight} />
        </a>
      </nav>
    </>
  );
};

Publication.propTypes = {
  publication: PropTypes.object,
  total: PropTypes.number,
  search: PropTypes.func,
};

export default Publication;
