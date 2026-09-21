import { useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

export default function PageMetadata({
  title,
  noIndex = false,
  description = "Research, writing, and academic work by computer scientist Darrell D. E. Long.",
}) {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = title;
    const updateMeta = (attribute, name, content) => {
      let element = document.head.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.append(element);
      }
      element.content = content;
    };
    const canonicalUrl = `https://darrelllong.github.io${pathname.replace(/\/$/, "")}/`;
    updateMeta("name", "description", description);
    updateMeta("name", "robots", noIndex ? "noindex" : "index, follow");
    updateMeta("property", "og:title", title);
    updateMeta("property", "og:description", description);
    updateMeta("property", "og:url", canonicalUrl);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = canonicalUrl;
  }, [title, description, pathname, noIndex]);
  return null;
}
PageMetadata.propTypes = {
  title: PropTypes.string.isRequired,
  noIndex: PropTypes.bool,
  description: PropTypes.string,
};
