// Dependencies
import React from "react";
import { ContextProvider } from "./ContextProvider";
import { BrowserRouter as Router } from "react-router-dom";
// Components
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router basename="/">
      <ContextProvider>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        <Main />
        <Footer />
      </ContextProvider>
    </Router>
  );
}
