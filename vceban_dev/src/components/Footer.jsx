// React
import React from "react";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faOrcid,
  faGoogleScholar,
  faWikipediaW,
} from "@fortawesome/free-brands-svg-icons";
// CSS
import "../assets/css/footer.scss";

const socialMediaLinks = [
  { url: "https://github.com/darrelllong", icon: faGithub },
  { url: "https://www.linkedin.com/in/darrell-d-e-long/", icon: faLinkedin },
  { url: "https://orcid.org/0000-0002-0822-0740", icon: faOrcid },
  {
    url: "https://scholar.google.com/citations?user=PqdLgQ0AAAAJ&hl=en&oi=ao",
    icon: faGoogleScholar,
  },
  { url: "https://en.wikipedia.org/wiki/Darrell_Long", icon: faWikipediaW },
];

export default function Footer() {
  return (
    <footer id="page-footer">
      <ul>
        {socialMediaLinks.map((link, index) => (
          <li key={index}>
            <a href={link.url} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={link.icon} />
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
