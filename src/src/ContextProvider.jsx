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
    // Parse various date formats: "Apr 1, 1991", "July 1996", "1989"
    const parseDate = (dateStr) => {
      if (!dateStr) return new Date(0);
      // Try standard parsing first (works for "Apr 1, 1991")
      let date = new Date(dateStr);
      if (!isNaN(date.getTime())) return date;
      // Handle "Month Year" format (e.g., "July 1996")
      const monthYear = dateStr.match(/^([A-Za-z]+)\s+(\d{4})$/);
      if (monthYear) {
        return new Date(`${monthYear[1]} 1, ${monthYear[2]}`);
      }
      // Handle year-only (e.g., "1989")
      const yearOnly = dateStr.match(/^(\d{4})$/);
      if (yearOnly) {
        return new Date(`Jan 1, ${yearOnly[1]}`);
      }
      return new Date(0);
    };

    fetch("/publications.json")
      .then((response) => response.json())
      .then((data) => {
        // Sort publications by date, newest first
        const sorted = data.sort((a, b) => {
          const dateA = parseDate(a.date);
          const dateB = parseDate(b.date);
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
