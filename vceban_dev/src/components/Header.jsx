// React
import React from "react";
import { Context } from "../ContextProvider";
// Components
import Hamburger from "./Hamburger";
import Menu from "./Menu";
// CSS
import "../assets/css/header.scss";
// Assets
import logo from "../assets/img/DLong.avif";

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

  const showHamburger = (appState, windowWidth) => {
    if (["menu", "home"].includes(appState)) {
      return false;
    }
    if (windowWidth >= 768) {
      return false;
    }
    return true;
  };

  const showMenu = () => {
    if (["menu", "home"].includes(appState)) {
      return false;
    }
    if (windowWidth < 768) {
      return false;
    }
    return true;
  };

  return (
    <header className={appState} id="page-header">
      <h1
        onClick={(e) => {
          handleWindowHistory(e, "menu", "/home");
        }}
      >
        Darrell Long
      </h1>
      <img
        src={logo}
        className="App-logo"
        alt="Darrell Long"
        onClick={(e) => {
          handleWindowHistory(e, "menu", "/home");
        }}
      />
      {showHamburger(appState, windowWidth) && (
        <Hamburger setAppState={handleWindowHistory} />
      )}
      {showMenu(appState, windowWidth) && <Menu />}
    </header>
  );
}
