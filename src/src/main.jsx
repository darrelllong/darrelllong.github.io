// Dependencies
import React from "react";
import ReactDOM from "react-dom/client";

// Components
import App from "./App.jsx";

// Styles
import "./assets/css/index.scss";

const root = document.getElementById("root");
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// A page rendered at build time already holds its HTML; take it over
if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(root, app);
} else {
  ReactDOM.createRoot(root).render(app);
}
