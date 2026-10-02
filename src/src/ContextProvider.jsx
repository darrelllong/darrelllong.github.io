// Dependencies
import React from "react";
import PropTypes from "prop-types";
import { sortByDateDesc } from "./utils/dateUtils";
import { getPreloaded } from "./preloaded";

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

  // A prerendered page starts with the records it shows (see preloaded.js),
  // and is not loading; the fetch below then brings the rest.
  const initial = getPreloaded();
  const [publications, setPublications] = React.useState(() =>
    sortByDateDesc(initial.publications || []),
  );
  const [patents, setPatents] = React.useState(() =>
    sortByDateDesc(initial.patents || []),
  );
  const [loading, setLoading] = React.useState(
    !(initial.publications || initial.patents),
  );
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    // GitHub Pages caches JSON for ten minutes. Revalidate it so a newly
    // deployed page does not display the previous catalog's content. A
    // catalogue the page carries whole is not fetched again.
    const complete = getPreloaded().complete || [];
    const fetchJson = (url) =>
      fetch(url, { cache: "no-cache" }).then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${url}: ${response.status}`);
        }
        return response.json();
      });

    const pubPromise = (complete.includes("publications")
      ? Promise.resolve()
      : fetchJson("/publications.json")
          .then((data) => setPublications(sortByDateDesc(data)))
    )
      .catch(() =>
        setErrors((previous) => ({
          ...previous,
          publications: "The publication archive could not be loaded.",
        })),
      );

    const patPromise = (complete.includes("patents")
      ? Promise.resolve()
      : fetchJson("/patents.json")
          .then((data) => setPatents(sortByDateDesc(data)))
    )
      .catch(() =>
        setErrors((previous) => ({
          ...previous,
          patents: "The patent archive could not be loaded.",
        })),
      );

    Promise.all([pubPromise, patPromise]).finally(() => setLoading(false));
  }, []);

  return (
    <Context.Provider
      value={{
        pathClass,
        publications,
        patents,
        loading,
        errors,
        dataReady: !loading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
