// Dependencies
import React from "react";
import PropTypes from "prop-types";
import { ContextProvider } from "./ContextProvider";
import { BrowserRouter, StaticRouter } from "react-router-dom";

// Components
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

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
