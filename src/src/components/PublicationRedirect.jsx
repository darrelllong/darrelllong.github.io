import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function PublicationRedirect({ to }) {
  const external = to.startsWith("https://");
  useEffect(() => {
    if (external) window.location.replace(to);
  }, [external, to]);
  return external ? (
    <p>This record has moved to its <a href={to}>source in the research archive</a>.</p>
  ) : <Navigate to={to} replace />;
}

PublicationRedirect.propTypes = { to: PropTypes.string.isRequired };
