import React from "react";
import styles from "../assets/css/hamburger.module.scss";

// eslint-disable-next-line react/prop-types
export default function Hamburger({ menuState, setMenuState }) {
  return (
    <button
      className={`${styles["hamburger-btn"]} ${menuState && styles["is-active"]}`}
      onClick={() => setMenuState(!menuState)}
    >
      <span className={styles["hamburger-container"]}>
        <span className={styles["hamburger-line"]}></span>
      </span>
    </button>
  );
}
