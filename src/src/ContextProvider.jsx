// Dependencies
import React from "react";
import PropTypes from "prop-types";
import { sortByDateDesc } from "./utils/dateUtils";

export const Context = React.createContext();

export const ContextProvider = ({ children }) => {
  const pathClass = (path) => {
    if (path === "/") {
      return "home";
    }
    if (/^\/patents\/\d+\/?$/.test(path)) {
      return "patent";
    }
    if (/^\/publications\/\d+\/?$/.test(path)) {
      return "publication";
    }
    if (/^\/blog\/[\w-]+\/?$/.test(path)) {
      return "blogpost";
    }
    return path.replace(/\//g, "");
  };
  const [showMenu, setShowMenu] = React.useState(false);

  const [publications, setPublications] = React.useState([]);
  const [patents, setPatents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchJson = (url) =>
      fetch(url).then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${url}: ${response.status}`);
        }
        return response.json();
      });

    const pubPromise = fetchJson("/publications.json")
      .then((data) => setPublications(sortByDateDesc(data)))
      .catch((error) => console.error("Error fetching publications:", error));

    const patPromise = fetchJson("/patents.json")
      .then((data) => setPatents(sortByDateDesc(data)))
      .catch((error) => console.error("Error fetching patents:", error));

    Promise.all([pubPromise, patPromise]).finally(() => setLoading(false));
  }, []);

  return (
    <Context.Provider
      value={{ pathClass, showMenu, setShowMenu, publications, patents, loading, dataReady: !loading }}
    >
      {children}
    </Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
