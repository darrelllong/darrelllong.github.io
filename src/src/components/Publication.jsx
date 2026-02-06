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
// Utilities
import { formatDate } from "../utils/dateUtils";
// Styles
import "../assets/css/publication.scss";

const BibTeX = ({ bibTeX }) => {
  if (!bibTeX) {
    return null;
  }

  // Find entry type and citation key
  const entryTypes = ["@article", "@inproceedings", "@book", "@incollection", "@techreport", "@misc"];
  const entryType = entryTypes.find((t) => bibTeX[t]) || "@article";
  const citationKey = bibTeX[entryType] || "unknown";

  // 3-letter month abbreviations are BibTeX macros, don't quote them
  const threeLetterMonths = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  const formatMonth = (month) => {
    if (!month) return null;
    const m = month.toLowerCase();
    return threeLetterMonths.includes(m) ? m : `{${month}}`;
  };

  // Build fields array
  const fields = [];
  if (bibTeX.author) fields.push(`  author       = {${bibTeX.author}}`);
  if (bibTeX.title) fields.push(`  title        = {${bibTeX.title}}`);
  if (bibTeX.journal) fields.push(`  journal      = {${bibTeX.journal}}`);
  if (bibTeX.booktitle) fields.push(`  booktitle    = {${bibTeX.booktitle}}`);
  if (bibTeX.publisher) fields.push(`  publisher    = {${bibTeX.publisher}}`);
  if (bibTeX.editor) fields.push(`  editor       = {${bibTeX.editor}}`);
  if (bibTeX.institution) fields.push(`  institution  = {${bibTeX.institution}}`);
  if (bibTeX.organization) fields.push(`  organization = {${bibTeX.organization}}`);
  if (bibTeX.address) fields.push(`  address      = {${bibTeX.address}}`);
  if (bibTeX.volume) fields.push(`  volume       = {${bibTeX.volume}}`);
  if (bibTeX.number) fields.push(`  number       = {${bibTeX.number}}`);
  if (bibTeX.pages) fields.push(`  pages        = {${bibTeX.pages}}`);
  if (bibTeX.month) fields.push(`  month        = ${formatMonth(bibTeX.month)}`);
  if (bibTeX.year) fields.push(`  year         = {${bibTeX.year}}`);

  return (
    <section>
      <h3>BibTeX</h3>
      <div>
        <pre>{`${entryType}{${citationKey},\n${fields.join(",\n")}\n}`}</pre>
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

const Header = ({ title, author, bibTeX, url, search }) => {
  const displayDate = formatDate(bibTeX);

  return (
    <header>
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
      {displayDate && (
        <Link
          to="/publications"
          onClick={() => {
            search(String(bibTeX?.year || ""));
          }}
        >
          <FontAwesomeIcon icon={faCalendar} fixedWidth />
          {displayDate}
        </Link>
      )}
      {url && (
        <a href={url} target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faFileArrowDown} fixedWidth />
          Download full paper PDF
        </a>
      )}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  author: PropTypes.array,
  bibTeX: PropTypes.object,
  url: PropTypes.string,
  search: PropTypes.func,
};

const Publication = ({ publication, publications, search }) => {
  // Always render same structure for consistent layout
  if (!publication) {
    return (
      <>
        <article>
          <header>
            <h2>Loading...</h2>
          </header>
        </article>
        <nav className="main-nav">
          <Link to="/publications">Back to all publications</Link>
        </nav>
      </>
    );
  }

  const lines = [];
  if (publication.full_content) {
    lines.push(...publication.full_content.split("\n"));
  }

  const currentIndex = publications.findIndex((p) => p.id === publication.id);
  const prevPub = publications[(currentIndex - 1 + publications.length) % publications.length];
  const nextPub = publications[(currentIndex + 1) % publications.length];
  const prev = `/publications/${prevPub.id}`;
  const next = `/publications/${nextPub.id}`;

  return (
    <>
      <article>
        <Header {...publication} search={search} />
        <Abstract paragraphs={lines} />
        <footer>
          <BibTeX bibTeX={publication.bibTeX} />
          {publication.url && (
            <a href={publication.url} target="_blank" rel="noreferrer">
              Download full paper PDF <FontAwesomeIcon icon={faFileArrowDown} />
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
  publications: PropTypes.array,
  search: PropTypes.func,
};

export default Publication;
