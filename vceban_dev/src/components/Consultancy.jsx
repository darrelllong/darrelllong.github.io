import React from "react";
import PropTypes from "prop-types";
import pentexoire from "../assets/img/pentexoire.avif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDatabase,
  faShield,
  faUserSecret,
  faLaptopCode,
  faStore,
  faFire,
} from "@fortawesome/free-solid-svg-icons";

const areas = [
  {
    title: "Storage",
    body: "Expertise in storage technologies, data management, and related patents.",
    icon: faDatabase,
  },
  {
    title: "Computer Security",
    body: "In-depth knowledge of cybersecurity principles, protocols, and best practices.",
    icon: faShield,
  },
  {
    title: "Cryptography",
    body: "Comprehensive understanding of cryptographic algorithms, protocols, and applications.",
    icon: faUserSecret,
  },
  {
    title: "Operating Systems",
    body: "Proficiency in operating system architecture, functionality, and design principles.",
    icon: faLaptopCode,
  },
  {
    title: "Electronic Commerce",
    body: "Experience in e-commerce platforms, digital transactions, and online business models.",
    icon: faStore,
  },
];

const Area = ({ title, body, icon = faFire }) => (
  <li>
    <h3>
      <FontAwesomeIcon icon={icon} />
      {title}
    </h3>
    <p>{body}</p>
  </li>
);

Area.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  icon: PropTypes.object,
};

export default function Consultancy() {
  return (
    <>
      <h2>Consultancy</h2>
      <p>
        Dr. Darrell D. E. Long provides consultancy services and owns the{" "}
        <a href="http://pentexoire.com/" target="_blank" rel="noreferrer">
          Pentexoire Consulting
        </a>{" "}
        agency.
      </p>
      <img src={pentexoire} alt="Pentexoire Consulting" />
      <p>
        With dozens of cases under his belt, Dr. Long specializes in providing
        expert witness services across a range of industries and disciplines,
        including but not limited to:
      </p>
      <ul>
        {areas.map((area, index) => (
          <Area
            key={index}
            title={area.title}
            body={area.body}
            icon={area.icon}
          />
        ))}
      </ul>
    </>
  );
}
