// Dependencies
import React from "react";
import PropTypes from "prop-types";
import { ContextProvider } from "./ContextProvider";
import { BrowserRouter, StaticRouter } from "react-router-dom";
import { config } from "@fortawesome/fontawesome-svg-core";
// Before the components and their styles: see autoAddCss below
import "@fortawesome/fontawesome-svg-core/styles.css";

// Components
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

// Font Awesome's stylesheet gives an icon its size. Left to itself the library
// adds it from script, so a prerendered page drew its icons at the full width
// of their container until the script ran, and then moved everything below
// them. It is part of the site's stylesheet instead, ahead of the site's own
// rules, as it was when the script put it first in the head.
config.autoAddCss = false;

// The site inside its router: the browser's in the page, and a static one
// when a page is rendered at build time (entry-server.jsx).
export function Site() {
  return (
    <ContextProvider>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <Main />
      <Footer />
    </ContextProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/">
      <Site />
    </BrowserRouter>
  );
}

export function StaticApp({ url }) {
  return (
    <StaticRouter basename="/" location={url}>
      <Site />
    </StaticRouter>
  );
}

StaticApp.propTypes = {
  url: PropTypes.string.isRequired,
};
