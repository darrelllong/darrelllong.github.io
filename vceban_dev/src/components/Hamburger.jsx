// Dependencies
import React from "react";
import { Context } from "../ContextProvider";
// Styles
import styles from "../assets/css/hamburger.module.scss";

export default function Hamburger() {
  const { showMenu, setShowMenu } = React.useContext(Context);

  return (
    <button
      className={
        styles["hamburger-btn"] + (showMenu ? ` ${styles["is-active"]}` : "")
      }
      onClick={(e) => {
        e.preventDefault();
        setShowMenu(!showMenu);
      }}
    >
      <span className={styles["hamburger-container"]}>
        <span className={styles["hamburger-line"]}></span>
      </span>
    </button>
  );
}
