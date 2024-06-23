import React from "react";
import styles from "../assets/css/hamburger.module.scss";
import { Context } from "../ContextProvider";

// eslint-disable-next-line react/prop-types
export default function Hamburger() {
  const { handleWindowHistory } = React.useContext(Context);
  return (
    <button
      className={styles["hamburger-btn"]}
      onClick={(e) => {
        handleWindowHistory(e, "menu");
      }}
    >
      <span className={styles["hamburger-container"]}>
        <span className={styles["hamburger-line"]}></span>
      </span>
    </button>
  );
}
