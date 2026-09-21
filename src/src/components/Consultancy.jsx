// Dependencies
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useForm, ValidationError } from "@formspree/react";
// Assets
import pentexoire from "../assets/img/pentexoire.avif";
// Styles
import "../assets/css/consultancy.scss";

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
        Your message has been sent to Pentexoire Consulting. Thank you.
        <br />
        <Link to="/consultancy/" onClick={reset}>
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
          placeholder="Describe your consulting inquiry"
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
  const [people, setPeople] = React.useState([]);
  React.useEffect(() => {
    fetch("/pentexoire.json", { cache: "no-cache" })
      .then((response) => response.json())
      .then((data) => setPeople(data))
      .catch((error) => console.error("Error fetching file:", error));
  }, []);

  return (
    <>
      <section className="dottedBorder darrell">
        <p className="eyebrow">Pentexoire Consulting</p>
        <h1>Consultancy</h1>
        <p>
          Dr. Darrell D. E. Long provides technical consulting and expert witness
          services through his firm, Pentexoire Consulting.
        </p>
        <img src={pentexoire} alt="Pentexoire Consulting" />
        <h2>Areas of experience</h2>
        <ul className="experience-areas">
          <li>Storage systems and data protection</li>
          <li>Operating systems and virtualization</li>
          <li>Cloud and high-performance computing</li>
          <li>Communications and networking</li>
          <li>Security, cryptography, and privacy</li>
          <li>Database systems</li>
          <li>Streaming media and content delivery</li>
          <li>Electronic commerce</li>
        </ul>
      </section>
      <section className="dottedBorder people">
        <h2>People</h2>
        <p>
          Pentexoire Consulting provides technical analysis and expert witness
          services in computer science.
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
          To inquire about consulting or expert witness services, or to discuss a
          potential case, please use the form below.
        </p>
        <ContactForm />
      </section>
    </>
  );
}
