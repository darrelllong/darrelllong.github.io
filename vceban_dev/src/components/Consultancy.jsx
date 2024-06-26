// Dependencies
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useForm, ValidationError } from "@formspree/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Assets
import pentexoire from "../assets/img/pentexoire.avif";
import darrell from "../assets/img/DLong.avif";
import ahmed from "../assets/img/AAmer.avif";
import {
  faDatabase,
  faShield,
  faUserSecret,
  faLaptopCode,
  faStore,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
// Styles
import "../assets/css/consultancy.scss";

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

const people = [
  {
    name: "Dr. Darrell Long",
    title: "Founder",
    bio: "Dr. Long is a renowned expert witness with over 30 years of experience in the field of computer science.",
    picture: darrell,
  },
  {
    name: "Dr. Ahmed Amer",
    title: "Senior Consultant",
    bio: "Dr. Amer is a seasoned professional with a background in computer security and cryptography.",
    picture: ahmed,
  },
];

const Person = ({ name, title, bio, picture }) => (
  <li>
    <img src={picture} alt={name} className="person-img" />
    <h3>{name}</h3>
    <h4>{title}</h4>
    <p>{bio}</p>
  </li>
);

Person.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
};

const ContactForm = () => {
  const [submit, sendForm, reset] = useForm("xblrrzqj");
  const [errors, setErrors] = React.useState({});

  const validateInput = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        error = !value && "Name is required.";
        break;
      case "email":
        error = !/\S+@\S+\.\S+/.test(value) && "Email is invalid.";
        break;
      case "message":
        error = !value && "Message is required.";
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const error = validateInput(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const elements = event.target.elements;
    const newErrors = {};
    let formValid = true;

    for (let element of elements) {
      if (element.name) {
        const { name, value } = element;
        const error = validateInput(name, value);
        newErrors[name] = error;
        if (error) {
          formValid = false;
        }
      }
    }

    setErrors(newErrors);

    formValid && sendForm(event);
  };

  if (submit.succeeded) {
    return (
      <p className="success">
        Thank you for considering Pentexoire Consulting, your message was sent.
        <br />
        <Link to="/consultancy" onClick={reset}>
          Send another message
        </Link>
      </p>
    );
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Your name
        <input
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="Your name"
        />
        {errors.name && <span>{errors.name}</span>}
      </label>
      <ValidationError
        className="error"
        prefix="Name"
        field="name"
        errors={submit.errors}
      />
      <label>
        Your email
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Your email"
        />
        {errors.email && <span>{errors.email}</span>}
      </label>
      <ValidationError
        className="error"
        prefix="Email"
        field="email"
        errors={submit.errors}
      />
      <label>
        Your message
        <textarea
          name="message"
          onChange={handleChange}
          placeholder="Please enter your message here"
        />
        {errors.message && <span>{errors.message}</span>}
      </label>
      <ValidationError
        className="error"
        prefix="Message"
        field="message"
        errors={submit.errors}
      />
      <button type="submit" disabled={submit.submitting}>
        Send
      </button>
    </form>
  );
};

export default function Consultancy() {
  return (
    <>
      <section className="dottedBorder darrell">
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
        <ul className="areas">
          {areas.map((area, index) => (
            <Area
              key={index}
              title={area.title}
              body={area.body}
              icon={area.icon}
            />
          ))}
        </ul>
      </section>
      <section className="dottedBorder people">
        <h2>People</h2>
        <p>
          Pentexoire Consulting team is composed of highly experienced and
          knowledgeable professionals who provide a wide range of consultancy
          services. They offer expert witness services and insights across
          multiple industries and technical disciplines. Here are some of the
          key members of the team:
        </p>
        <ul>
          {people.map((person, index) => (
            <Person
              key={index}
              name={person.name}
              title={person.title}
              bio={person.bio}
              picture={person.picture}
            />
          ))}
        </ul>
      </section>
      <section className="contact">
        <h2>Contact</h2>
        <p>
          If you have questions about Dr. Long’s services, want to discuss a
          potential case, or simply want to connect, feel free to reach out on
          social media or fill out the form below.
        </p>
        <ContactForm />
      </section>
    </>
  );
}
