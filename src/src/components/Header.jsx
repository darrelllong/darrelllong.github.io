import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Menu from "./Menu";
import "../assets/css/header.scss";

export default function Header() {
  const { pathname } = useLocation();
  const [openPath, setOpenPath] = useState(null);
  const toggle = useRef(null);
  const isOpen = openPath === pathname;

  return (
    <header
      id="page-header"
      onKeyDown={(event) => {
        if (event.key === "Escape" && isOpen) {
          setOpenPath(null);
          toggle.current?.focus();
        }
      }}
    >
      <Link
        to="/"
        className="brand"
        onClick={() => setOpenPath(null)}
        aria-label="Dr. Darrell Long — home"
      >
        <img src="/logo.avif" alt="" width="42" height="42" />
        <span>Dr. Darrell Long</span>
      </Link>
      <button
        ref={toggle}
        type="button"
        className="menu-toggle"
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        onClick={() => setOpenPath(isOpen ? null : pathname)}
      >
        {isOpen ? "Close" : "Menu"}
        <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
      </button>
      <Menu open={isOpen} onNavigate={() => setOpenPath(null)} />
    </header>
  );
}
