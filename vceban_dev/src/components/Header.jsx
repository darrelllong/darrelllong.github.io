// Dependencies
import React from "react";
import { Context } from "../ContextProvider";
import { Link, useLocation } from "react-router-dom";
// Components
import Hamburger from "./Hamburger";
import Menu from "./Menu";
// Styles
import "../assets/css/header.scss";
// Assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnchor } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const { pathClass } = React.useContext(Context);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isHome = () => {
    return useLocation().pathname === "/";
  };

  const showHamburger = (windowWidth) => {
    if (isHome()) {
      return false;
    }
    if (windowWidth >= 968) {
      return false;
    }
    return true;
  };

  const showMenu = (windowWidth) => {
    if (isHome()) {
      return false;
    }
    if (windowWidth < 968) {
      return false;
    }
    return true;
  };

  return (
    <header className={pathClass(useLocation().pathname)} id="page-header">
      <Link to="/" className="logo">
        <FontAwesomeIcon icon={faAnchor} alt="Logo" fixedWidth />
      </Link>
      <Link to="/" className="h1-logo">
        <h1>Darrell Long</h1>
      </Link>
      {showHamburger(windowWidth) && <Hamburger />}
      {showMenu(windowWidth) && <Menu />}
    </header>
  );
}
