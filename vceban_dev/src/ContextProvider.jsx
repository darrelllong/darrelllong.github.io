import React, { useEffect } from "react";

const getValueFromUrl = (url) => {
  const validPaths = ["home", "about", "publications", "consultancy"];
  const publicationRegex = /^publication-\d+$/;
  if (url.includes("/")) {
    url = url.split("/").pop();
    if (validPaths.includes(url) || publicationRegex.test(url)) {
      return url;
    }
  } else {
    return null;
  }
};

export const Context = React.createContext();

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  const state = getValueFromUrl(window.location.pathname) || "menu";
  const [appState, setAppState] = React.useState(state);

  const handleWindowHistory = (e, state, callback) => {
    e.preventDefault();
    setAppState(state);
    window.history.pushState({}, "", `/${state}`);
    if (callback) {
      callback();
    }
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handlePopState = (e) => {
      e.preventDefault();
      const newUrlValue = getValueFromUrl(window.location.pathname) || "menu";
      setAppState(newUrlValue);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <Context.Provider
      value={{
        appState,
        setAppState,
        handleWindowHistory,
      }}
    >
      {children}
    </Context.Provider>
  );
};
