import React from "react";
import { Context } from "../ContextProvider";
// Components
import About from "./About";
import Publications from "./Publications";
import Consultancy from "./Consultancy";
import Menu from "./Menu";
import Publication from "./Publication";
// CSS
import "../assets/css/home.scss";
// Publications
import publications from "../assets/publications.json";

export default function Main() {
  const components = {
    about: <About />,
    publications: <Publications />,
    consultancy: <Consultancy />,
    default: <Menu />,
  };

  const { appState } = React.useContext(Context);

  let component;
  if (appState.startsWith("publication-")) {
    const id = parseInt(appState.split("-")[1], 10);
    const publication = publications.find((pub) => pub.id === id);
    component = <Publication publication={publication} />;
  } else {
    component = components[appState] || components.default;
  }

  return <main className={`dottedBorder ${appState}`}>{component}</main>;
}
