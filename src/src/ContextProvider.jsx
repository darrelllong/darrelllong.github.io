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
    // Month abbreviation to number (0-11)
    const monthToNum = {
      jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
      jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
    };

    fetch("/publications.json")
      .then((response) => response.json())
      .then((data) => {
        // Sort publications by year and month, newest first
        const sorted = data.sort((a, b) => {
          const yearA = a.bibTeX?.year || 0;
          const yearB = b.bibTeX?.year || 0;
          if (yearB !== yearA) return yearB - yearA;
          // Same year, sort by month
          const monthA = monthToNum[a.bibTeX?.month?.toLowerCase()] ?? 0;
          const monthB = monthToNum[b.bibTeX?.month?.toLowerCase()] ?? 0;
          return monthB - monthA;
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
