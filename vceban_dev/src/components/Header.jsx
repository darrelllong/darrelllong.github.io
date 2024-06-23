// React
import React from "react";
import { Context } from "../ContextProvider";
// Components
import Hamburger from "./Hamburger";
import Menu from "./Menu";
// CSS
import "../assets/css/header.scss";
// Assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnchor } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const { appState, handleWindowHistory } = React.useContext(Context);
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

  const isAppStateMenuOrHome = (appState) => {
    return ["menu", "home"].includes(appState);
  };

  const showHamburger = (appState, windowWidth) => {
    if (isAppStateMenuOrHome(appState)) {
      return false;
    }
    if (windowWidth >= 968) {
      return false;
    }
    return true;
  };

  const showMenu = (appState, windowWidth) => {
    if (isAppStateMenuOrHome(appState)) {
      return false;
    }
    if (windowWidth < 968) {
      return false;
    }
    return true;
  };

  return (
    <header
      className={isAppStateMenuOrHome(appState) ? appState : undefined}
      id="page-header"
    >
      <FontAwesomeIcon
        icon={faAnchor}
        className="logo"
        alt="Logo"
        fixedWidth
        onClick={(e) => {
          handleWindowHistory(e, "home");
        }}
      />
      <h1
        onClick={(e) => {
          handleWindowHistory(e, "home");
        }}
      >
        Darrell Long
      </h1>
      {showHamburger(appState, windowWidth) && (
        <Hamburger setAppState={handleWindowHistory} />
      )}
      {showMenu(appState, windowWidth) && <Menu />}
    </header>
  );
}
