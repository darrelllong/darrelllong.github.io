import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export default function Menu({ open, onNavigate }) {
  return (
    <nav
      id="primary-navigation"
      className={`menu${open ? " is-open" : ""}`}
      aria-label="Main navigation"
    >
      <ul>
        {[
          ["About", "about"],
          ["Publications", "publications"],
          ["Patents", "patents"],
          ["Blog", "blog"],
          ["Consultancy", "consultancy"],
        ].map(([label, path]) => (
          <li key={path}>
            <NavLink to={`/${path}/`} onClick={onNavigate}>
              {label}
            </NavLink>
          </li>
        ))}
        <li>
          <a className="cv-link" href="/cv.pdf">
            CV <span aria-hidden="true">↗</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
Menu.propTypes = { open: PropTypes.bool, onNavigate: PropTypes.func };
