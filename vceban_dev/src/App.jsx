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
/* Context provider */
import { ContextProvider } from "./ContextProvider";
/* Components */
import Header from "./components/Header";
import Main from "./components/Main";

export default function App() {
  return (
    <>
      <ContextProvider>
        <Header />
        <Main />
      </ContextProvider>
    </>
  );
}
