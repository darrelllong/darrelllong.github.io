import React from "react";

function getValueFromUrl(url) {
  if (url.includes("#")) {
    return url.split("#")[1];
  } else {
    return null;
  }
}

export const Context = React.createContext();

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  const state = getValueFromUrl(window.location.hash) || "menu";
  const [appState, setAppState] = React.useState(state);

  return (
    <Context.Provider
      value={{
        appState,
        setAppState,
      }}
    >
      {children}
    </Context.Provider>
  );
};
