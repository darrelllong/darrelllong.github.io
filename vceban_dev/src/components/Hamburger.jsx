import React from "react";
import styles from "../assets/css/hamburger.module.scss";

// eslint-disable-next-line react/prop-types
export default function Hamburger({ setAppState }) {
  return (
    <button
      className={styles["hamburger-btn"]}
      onClick={() => {
        setAppState("menu");
        window.location.hash = "home";
      }}
    >
      <span className={styles["hamburger-container"]}>
        <span className={styles["hamburger-line"]}></span>
      </span>
    </button>
  );
}
