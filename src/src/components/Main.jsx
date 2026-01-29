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
import Publication from "./Publication";
import Patents from "./Patents";
import Patent from "./Patent";
import Consultancy from "./Consultancy";
import Menu from "./Menu";
// Styles
import "../assets/css/home.scss";

export default function Main() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { pathClass, publications, patents, showMenu, setShowMenu } =
    React.useContext(Context);

  React.useEffect(() => {
    const disableMenu = () => {
      if (location.pathname === "/" || window.innerWidth > 968) {
        setShowMenu(false);
      }
    };
    disableMenu();
    window.addEventListener("resize", disableMenu);
    return () => window.removeEventListener("resize", disableMenu);
  }, [location.pathname, setShowMenu]);

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirectPath = params.get("redirect");
    if (redirectPath) {
      navigate(redirectPath, { replace: true });
    }
  }, [location, navigate]);

  const matchPublication = location.pathname.match(/^\/publications\/(\d+)\/?$/);
  const publicationId = matchPublication
    ? parseInt(matchPublication[1], 10)
    : null;

  const matchPatent = location.pathname.match(/^\/patents\/(\d+)\/?$/);
  const patentId = matchPatent
    ? parseInt(matchPatent[1], 10)
    : null;

  return (
    <main
      className={`${pathClass(location.pathname)} ${showMenu && location.pathname !== "/" ? "menuShown" : ""}`}
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
          path="/patents"
          element={
            <Patents searchTerm={searchTerm} search={setSearchTerm} />
          }
        />
        <Route
          path="/publications/:id"
          element={
            <Publication
              publication={publications.find(
                (pub) => pub.id === publicationId,
              )}
              total={publications.length}
              search={setSearchTerm}
            />
          }
        />
        <Route
          path="/patents/:id"
          element={
            <Patent
              patent={patents.find(
                (pat) => pat.id === patentId,
              )}
              total={patents.length}
              search={setSearchTerm}
            />
          }
        />
        <Route path="/" element={<Menu />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {showMenu && location.pathname !== "/" && <Menu />}
      <div className="decorativeBar" />
    </main>
  );
}
