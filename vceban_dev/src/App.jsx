/* eslint-disable no-unused-vars */
/* React and hooks */
import React from "react";
/* Font Awesome icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/* Social media and brand icons */
import {
  faGithub,
  faLinkedin,
  faOrcid,
  faGoogleScholar,
  faWikipediaW,
} from "@fortawesome/free-brands-svg-icons";
/* Solid icons */
import {
  faBars,
  faFileArrowDown,
  faUpRightFromSquare,
  faChevronDown,
  faChevronRight,
  faSquareCaretRight,
  faCaretLeft,
  faCaretRight,
  faMagnifyingGlass,
  faUsers,
  faCalendar,
  faDatabase,
  faShield,
  faUserSecret,
  faLaptopCode,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
/* Logo */
import logo from "/logo.svg";
/* Components */
import Hamburger from "./components/Hamburger";

export default function App() {
  const [navMenuState, setNavMenuState] = React.useState(false);
  return (
    <>
      <h1>Hello world</h1>
      <p>123</p>
      <img src={logo} className="App-logo" alt="logo" />
      <FontAwesomeIcon icon={faUsers} />
      <Hamburger menuState={navMenuState} setMenuState={setNavMenuState} />
    </>
  );
}
