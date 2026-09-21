// Dependencies
import React from "react";
import { Context } from "../ContextProvider";
import PropTypes from "prop-types";
import PageMetadata from "./PageMetadata";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Assets
import {
  faFileArrowDown,
  faArrowUpRightFromSquare,
  faUsers,
  faCalendar,
  faCaretLeft,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
// Utilities
import { formatDate } from "../utils/dateUtils";
import { formatVenue } from "../utils/publicationUtils";
// Styles
import "../assets/css/publication.scss";

const BibTeX = ({ bibTeX }) => {
  if (!bibTeX) {
    return null;
  }

  // Find entry type and citation key
  const entryTypes = [
    "@article",
    "@inproceedings",
    "@book",
    "@incollection",
    "@techreport",
    "@misc",
  ];
  const entryType = entryTypes.find((t) => bibTeX[t]) || "@article";
  const citationKey = bibTeX[entryType] || "unknown";

  // 3-letter month abbreviations are BibTeX macros, don't quote them
  const threeLetterMonths = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
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
  if (bibTeX.institution)
    fields.push(`  institution  = {${bibTeX.institution}}`);
  if (bibTeX.organization)
    fields.push(`  organization = {${bibTeX.organization}}`);
  if (bibTeX.address) fields.push(`  address      = {${bibTeX.address}}`);
  if (bibTeX.volume) fields.push(`  volume       = {${bibTeX.volume}}`);
  if (bibTeX.number) fields.push(`  number       = {${bibTeX.number}}`);
  if (bibTeX.pages) fields.push(`  pages        = {${bibTeX.pages}}`);
  if (bibTeX.month)
    fields.push(`  month        = ${formatMonth(bibTeX.month)}`);
  if (bibTeX.year) fields.push(`  year         = {${bibTeX.year}}`);
  if (bibTeX.doi) fields.push(`  doi          = {${bibTeX.doi}}`);
  if (bibTeX.note) fields.push(`  note         = {${bibTeX.note}}`);

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
  if (!paragraphs?.length) {
    return null;
  }

  return (
    <section className="abstract">
      <h3>Abstract</h3>
      {paragraphs.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </section>
  );
};

Abstract.propTypes = {
  paragraphs: PropTypes.array,
};

const Header = ({ title, author, bibTeX, url, urlLabel, search }) => {
  const displayDate = formatDate(bibTeX);

  return (
    <header>
      {title && <h1>{title}</h1>}
      {formatVenue(bibTeX) && <p className="publication-venue">{formatVenue(bibTeX)}</p>}
      {bibTeX?.note && <p className="publication-note">{bibTeX.note}</p>}
      {author && (
        <section>
          <FontAwesomeIcon icon={faUsers} fixedWidth />
          <ul>
            {author.map((name, index) => (
              <li key={index}>
                <Link
                  to="/publications/"
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
          to="/publications/"
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
          <FontAwesomeIcon
            icon={urlLabel ? faArrowUpRightFromSquare : faFileArrowDown}
            fixedWidth
          />
          {urlLabel || "View full paper"}
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
  urlLabel: PropTypes.string,
  search: PropTypes.func,
};

const Publication = ({ publication, publications, search }) => {
  const { loading, errors } = React.useContext(Context);
  const error = errors.publications;
  // Always render same structure for consistent layout
  if (!publication) {
    return (
      <>
        <PageMetadata
          noIndex={!loading}
          title={`${loading ? "Loading" : "Publication not found"} | Darrell Long`}
        />
        <article>
          <header>
            <h1>
              {loading
                ? "Loading…"
                : error
                  ? "Archive unavailable"
                  : "Publication not found"}
            </h1>
          </header>
        </article>
        <nav className="main-nav">
          <Link to="/publications/">Back to all publications</Link>
        </nav>
      </>
    );
  }

  const description = (
    publication.short_description ||
    publication.full_content?.split("\n")[0] ||
    ""
  ).slice(0, 160);

  const lines = [];
  if (publication.full_content) {
    lines.push(...publication.full_content.split("\n"));
  }

  const currentIndex = publications.findIndex((p) => p.id === publication.id);
  const prevPub =
    publications[
      (currentIndex - 1 + publications.length) % publications.length
    ];
  const nextPub = publications[(currentIndex + 1) % publications.length];
  const prev = `/publications/${prevPub.id}/`;
  const next = `/publications/${nextPub.id}/`;

  return (
    <>
      <PageMetadata
        title={`${publication.title} | Darrell Long`}
        description={description}
      />
      <article>
        <Header {...publication} search={search} />
        <Abstract paragraphs={lines} />
        <footer>
          <BibTeX bibTeX={publication.bibTeX} />
          {publication.url && (
            <a href={publication.url} target="_blank" rel="noreferrer">
              {publication.urlLabel || "View full paper"}{" "}
              <FontAwesomeIcon
                icon={publication.urlLabel ? faArrowUpRightFromSquare : faFileArrowDown}
              />
            </a>
          )}
        </footer>
      </article>
      <nav className="main-nav">
        <Link to={prev}>
          <FontAwesomeIcon icon={faCaretLeft} />
          Previous publication
        </Link>
        <Link to="/publications/">Back to all publications</Link>
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
