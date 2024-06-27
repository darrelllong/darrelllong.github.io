// Dependencies
import React from "react";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { Context } from "../ContextProvider";
// Components
import About from "./About";
import Publications from "./Publications";
import Consultancy from "./Consultancy";
import Menu from "./Menu";
import Publication from "./Publication";
// Styles
import "../assets/css/home.scss";

export default function Main() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const location = useLocation().pathname;
  const { pathClass, publications, showMenu, setShowMenu } =
    React.useContext(Context);

  const disableMenu = () => {
    if (location === "/") {
      setShowMenu(false);
    }
    if (window.innerWidth > 968) {
      setShowMenu(false);
    }
  };

  React.useEffect(() => {
    disableMenu();
    const handleResize = () => disableMenu();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const matchPublication = location.match(/^\/publications\/(\d+)$/);
  const publicationId = matchPublication
    ? parseInt(matchPublication[1], 10)
    : null;

  return (
    <main
      className={`dottedBorder ${pathClass(location)} ${showMenu && location != "/" ? "menuShown" : ""}`}
    >
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
        <Route
          path="/react/:section"
          element={
            <Navigate to={`/${location.pathname.split("/react/")[1]}`} />
          }
        />
        <Route
          path="/react/publications/:id"
          element={
            <Navigate
              to={`/publications/${location.pathname.split("/react/publications/")[1]}`}
            />
          }
        />
      </Routes>
      {showMenu && location != "/" && <Menu />}
    </main>
  );
}
