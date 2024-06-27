// Dependencies
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Assets
import {
  faFileArrowDown,
  faUsers,
  faCalendar,
  faCaretLeft,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
// Styles
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
  return (
    <header className="dottedBorder">
      {title && <h2>{title}</h2>}
      {author && (
        <section>
          <FontAwesomeIcon icon={faUsers} fixedWidth />
          <ul>
            {author.map((name, index) => (
              <li key={index}>
                <Link
                  to="/publications"
                  onClick={() => {
                    search(name);
                  }}
                >
                  {name}
                  {index === author.length - 1 ? "" : ","}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      {date && (
        <Link
          to="/publications"
          onClick={() => {
            search(date);
          }}
        >
          <FontAwesomeIcon icon={faCalendar} fixedWidth />
          {date}
        </Link>
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
  if (!publication) {
    return (
      <>
        <h2>No publication found</h2>
        <Link to="/publications">Go back</Link>
      </>
    );
  }

  const lines = [];
  if (publication.full_content) {
    lines.push(...publication.full_content.split("\n"));
  }

  const prev =
    publication.id > 1
      ? `/publications/${publication.id - 1}`
      : `/publications/${total}`;

  const next =
    publication.id < total
      ? `/publications/${publication.id + 1}`
      : "/publications/1";

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
      <nav className="main-nav">
        <Link to={prev}>
          <FontAwesomeIcon icon={faCaretLeft} />
          Previous publication
        </Link>
        <Link to="/publications">Back to all publications</Link>
        <Link to={next}>
          Next publication
          <FontAwesomeIcon icon={faCaretRight} />
        </Link>
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
