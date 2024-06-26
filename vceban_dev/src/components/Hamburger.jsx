// Dependencies
import React from "react";
import { Link } from "react-router-dom";
// Styles
import styles from "../assets/css/hamburger.module.scss";

// eslint-disable-next-line react/prop-types
export default function Hamburger() {
  return (
    <Link to="/menu" className={styles["hamburger-btn"]}>
      <span className={styles["hamburger-container"]}>
        <span className={styles["hamburger-line"]}></span>
      </span>
    </Link>
  );
}
