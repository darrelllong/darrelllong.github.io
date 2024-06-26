// Dependencies
import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Context } from "../ContextProvider";
// Components
import About from "./About";
import Publications from "./Publications";
import Consultancy from "./Consultancy";
import Menu from "./Menu";
import Publication from "./Publication";
// Publications
import publications from "../assets/publications.json";
// Styles
import "../assets/css/home.scss";

export default function Main() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const location = useLocation();
  const { pathClass } = React.useContext(Context);

  const matchPublication = location.pathname.match(/^\/publications\/(\d+)$/);
  const publicationId = matchPublication
    ? parseInt(matchPublication[1], 10)
    : null;

  return (
    <main className={`dottedBorder ${pathClass(location.pathname)}`}>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route
          path="/publications"
          element={
            <Publications searchTerm={searchTerm} search={setSearchTerm} />
          }
        />
        <Route path="/consultancy" element={<Consultancy />} />
        <Route
          path={`/publications/:id`}
          element={
            publicationId !== null && (
              <Publication
                publication={publications.find(
                  (pub) => pub.id === publicationId,
                )}
                total={publications.length}
                search={setSearchTerm}
              />
            )
          }
        />
        <Route path="/" element={<Menu />} />
        <Route
          path="*"
          element={
            <>
              <h2>Oops... This page doesn&apos;t exist</h2>
              <Link to="/">Go back to the home page</Link>
            </>
          }
        />
      </Routes>
    </main>
  );
}
