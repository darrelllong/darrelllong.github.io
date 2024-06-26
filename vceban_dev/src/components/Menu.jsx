// Dependencies
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Assets
import {
  faFileArrowDown,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import cv from "../assets/cv.pdf";

export default function Menu() {
  const menuItems = [
    { label: "About", page: "about" },
    { label: "Publications", page: "publications" },
    { label: "Consultancy", page: "consultancy" },
    { label: "CV", link: cv, icon: faFileArrowDown },
    {
      label: "Laboratory",
      link: "https://www.ssrc.ucsc.edu/index.html",
      icon: faUpRightFromSquare,
    },
    {
      label: "Students",
      link: "https://www.genealogy.math.ndsu.nodak.edu/id.php?id=10794",
      icon: faUpRightFromSquare,
    },
  ];

  return (
    <nav className={useLocation().pathname === "/" ? "dottedBorder" : ""}>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            {item.link ? (
              <a href={item.link} target="_blank" rel="noreferrer">
                {item.label}
                <FontAwesomeIcon icon={item.icon} />
              </a>
            ) : (
              <Link to={`/${item.page}`}>{item.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
