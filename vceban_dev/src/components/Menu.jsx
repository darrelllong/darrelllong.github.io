import React from "react";
import { Context } from "../ContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileArrowDown,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import cv from "../assets/cv.pdf";

export default function Menu() {
  const { appState, setAppState } = React.useContext(Context);

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
    <nav className={["menu", "home"].includes(appState) ? "dottedBorder" : ""}>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            {item.link ? (
              <a href={item.link} target="_blank" rel="noreferrer">
                {item.label}
                <FontAwesomeIcon icon={item.icon} />
              </a>
            ) : (
              <a href={`#${item.page}`} onClick={() => setAppState(item.page)}>
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
