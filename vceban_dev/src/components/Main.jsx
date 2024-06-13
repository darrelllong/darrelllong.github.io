import React from "react";
import { Context } from "../ContextProvider";
// Components
import About from "./About";
import Publications from "./Publications";
import Consultancy from "./Consultancy";
import Menu from "./Menu";
// CSS
import "../assets/css/home.scss";

export default function Main() {
  const components = {
    about: <About />,
    publications: <Publications />,
    consultancy: <Consultancy />,
    default: <Menu />,
  };

  const { appState } = React.useContext(Context);
  const component = components[appState] || components.default;

  return <main className={appState}>{component}</main>;
}
