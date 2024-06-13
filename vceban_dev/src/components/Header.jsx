import React from "react";
import logo from "../assets/img/DLong.avif";
import { Context } from "../ContextProvider";
// Components
import Hamburger from "./Hamburger";
import Menu from "./Menu";
// CSS
import "../assets/css/header.scss";

export default function Header() {
  const { appState, setAppState } = React.useContext(Context);
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

  const setAppStateToMenuAndGoHome = () => {
    setAppState("menu");
    window.location.hash = "home";
  };

  return (
    <header className={appState} id="page-header">
      <h1 onClick={() => setAppStateToMenuAndGoHome()}>Darrell Long</h1>
      <img
        src={logo}
        className="App-logo"
        alt="Darrell Long"
        onClick={() => setAppStateToMenuAndGoHome()}
      />
      {showHamburger(appState, windowWidth) && (
        <Hamburger setAppState={setAppStateToMenuAndGoHome} />
      )}
      {showMenu(appState, windowWidth) && <Menu />}
    </header>
  );
}