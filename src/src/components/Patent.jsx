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
  faCertificate,
} from "@fortawesome/free-solid-svg-icons";
// Styles
import "../assets/css/publication.scss";

const BibTeX = ({ bibTeX }) => {
  if (!bibTeX) {
    return null;
  }

  // For patents, use @misc entry type
  const entryType = "@misc";
  const citationKey = bibTeX["@misc"] || "unknown";

  // Build fields array
  const fields = [];
  if (bibTeX.author) fields.push(`  author = {${bibTeX.author}}`);
  if (bibTeX.title) fields.push(`  title  = {${bibTeX.title}}`);
  if (bibTeX.note) fields.push(`  note   = {${bibTeX.note}}`);
  if (bibTeX.month) fields.push(`  month  = ${bibTeX.month}`);
  if (bibTeX.year) fields.push(`  year   = {${bibTeX.year}}`);

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

const Header = ({ title, author, bibTeX, patent_number, url, search }) => {
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
                  to="/patents"
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
      {patent_number && (
        <section>
          <FontAwesomeIcon icon={faCertificate} fixedWidth />
          U.S. Patent {patent_number}
        </section>
      )}
      {displayDate && (
        <Link
          to="/patents"
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
          Download patent PDF from USPTO
        </a>
      )}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  author: PropTypes.array,
  bibTeX: PropTypes.object,
  patent_number: PropTypes.string,
  url: PropTypes.string,
  search: PropTypes.func,
};

const Description = ({ text }) => {
  if (!text) {
    return null;
  }

  return (
    <main>
      <h3>Description</h3>
      <p>{text}</p>
    </main>
  );
};

Description.propTypes = {
  text: PropTypes.string,
};

const Patent = ({ patent, total, search }) => {
  // Always render same structure for consistent layout
  if (!patent) {
    return (
      <>
        <article>
          <header>
            <h2>Loading...</h2>
          </header>
        </article>
        <nav className="main-nav">
          <Link to="/patents">Back to all patents</Link>
        </nav>
      </>
    );
  }

  const prev =
    patent.id > 1
      ? `/patents/${patent.id - 1}`
      : `/patents/${total}`;

  const next =
    patent.id < total
      ? `/patents/${patent.id + 1}`
      : "/patents/1";

  return (
    <>
      <article>
        <Header {...patent} search={search} />
        <Description text={patent.short_description} />
        <footer>
          <BibTeX bibTeX={patent.bibTeX} />
          {patent.url && (
            <a href={patent.url} target="_blank" rel="noreferrer">
              Download patent PDF from USPTO <FontAwesomeIcon icon={faFileArrowDown} />
            </a>
          )}
        </footer>
      </article>
      <nav className="main-nav">
        <Link to={prev}>
          <FontAwesomeIcon icon={faCaretLeft} />
          Previous patent
        </Link>
        <Link to="/patents">Back to all patents</Link>
        <Link to={next}>
          Next patent
          <FontAwesomeIcon icon={faCaretRight} />
        </Link>
      </nav>
    </>
  );
};

Patent.propTypes = {
  patent: PropTypes.object,
  total: PropTypes.number,
  search: PropTypes.func,
};

export default Patent;
