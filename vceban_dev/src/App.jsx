/* eslint-disable no-unused-vars */
/* React and hooks */
import React from "react";
/* Font Awesome icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <ContextProvider>
        <Header />
        <Main />
        <Footer />
      </ContextProvider>
    </>
  );
}
