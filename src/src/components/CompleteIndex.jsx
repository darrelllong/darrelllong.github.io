// Dependencies
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// Styles
import "../assets/css/complete-index.scss";

// Every record of a collection, as a link in the page's HTML. A list shows
// six records at a time, and its page buttons change what is shown without
// changing the address, so the list itself links to six records only: a
// crawler would reach the others by following previous and next from one
// record to the following, as far as eighteen pages from the home page.
export default function CompleteIndex({ label, items, wide = false }) {
  if (!items.length) return null;
  return (
    <details className={wide ? "complete-index wide" : "complete-index"}>
      <summary>
        {label}
        <span aria-hidden="true">+</span>
      </summary>
      <ul>
        {items.map(({ to, title, note }) => (
          <li key={to}>
            <span>{note}</span>
            <Link to={to}>{title}</Link>
          </li>
        ))}
      </ul>
    </details>
  );
}

CompleteIndex.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      note: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  wide: PropTypes.bool,
};
