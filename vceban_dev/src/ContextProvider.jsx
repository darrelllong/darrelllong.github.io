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
    fetch("/react/publications.json")
      .then((response) => response.json())
      .then((data) => setPublications(data))
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
