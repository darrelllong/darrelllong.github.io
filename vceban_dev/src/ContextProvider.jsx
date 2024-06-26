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

  return <Context.Provider value={{ pathClass }}>{children}</Context.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
