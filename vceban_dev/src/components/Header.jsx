import React from "react";
import logo from "/logo.svg";
import { Context } from "../ContextProvider";
// Components
import Hamburger from "./Hamburger";

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

  const showMenu = (appState, windowWidth) => {
    if (["menu", "home"].includes(appState)) {
      return false;
    }
    if (windowWidth > 768) {
      return false;
    }
    return true;
  };

  return (
    <header className={appState}>
      <h1>Darrell Long</h1>
      <img
        src={logo}
        className="App-logo"
        alt="logo"
        width="135"
        height="142"
      />
      {showMenu(appState, windowWidth) && (
        <Hamburger setAppState={setAppState} />
      )}
    </header>
  );
}
