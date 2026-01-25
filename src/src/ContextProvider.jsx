// Dependencies
import React from "react";
import PropTypes from "prop-types";

export const Context = React.createContext();

export const ContextProvider = ({ children }) => {
  const pathClass = (path) => {
    if (path === "/") {
      return "home";
    }
    if (/\d$/.test(path)) {
      return "publication";
    }
    return path.replace(/\//g, "");
  };
  const [showMenu, setShowMenu] = React.useState(false);

  const [publications, setPublications] = React.useState([]);
  React.useEffect(() => {
    fetch("/publications.json")
      .then((response) => response.json())
      .then((data) => {
        // Sort publications by date, newest first
        const sorted = data.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });
        setPublications(sorted);
      })
      .catch((error) => console.error("Error fetching the JSON file:", error));
  }, []);

  return (
    <Context.Provider
      value={{ pathClass, showMenu, setShowMenu, publications }}
    >
      {children}
    </Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
