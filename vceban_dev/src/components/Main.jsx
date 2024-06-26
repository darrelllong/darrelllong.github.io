// Dependencies
import React from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
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
  const location = useLocation();
  const navigate = useNavigate();
  const { pathClass, publications, showMenu, setShowMenu } =
    React.useContext(Context);

  const disableMenu = () => {
    if (location.pathname === "/") {
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

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirectPath = params.get("redirect");
    if (redirectPath) {
      navigate(redirectPath, { replace: true });
    }
  }, [location, navigate]);

  const matchPublication = location.pathname.match(/^\/publications\/(\d+)$/);
  const publicationId = matchPublication
    ? parseInt(matchPublication[1], 10)
    : null;

  return (
    <main
      className={`dottedBorder ${pathClass(location.pathname)} ${showMenu && location.pathname !== "/" ? "menuShown" : ""}`}
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
            publicationId !== null ? (
              <Publication
                publication={publications.find(
                  (pub) => pub.id === publicationId,
                )}
                total={publications.length}
                search={setSearchTerm}
              />
            ) : (
              <Route path="*" element={<Navigate to="/" replace />} />
            )
          }
        />
        <Route path="/" element={<Menu />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {showMenu && location.pathname !== "/" && <Menu />}
    </main>
  );
}
