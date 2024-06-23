// React
import React from "react";
import PropTypes from "prop-types";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
// CSS
import "../assets/css/accordion.scss";

export default function Accordion(props) {
  const title = props.title;
  const body = props.body;
  const [showText, setShowText] = React.useState(props.state);

  return (
    <article className={`accordion dottedBorder ${showText ? "expanded" : ""}`}>
      <header onClick={() => setShowText(!showText)}>
        <h3>{title}</h3>
        <FontAwesomeIcon icon={faChevronRight} />
      </header>
      <main>
        {body.map((data, index) => (
          <p key={index} dangerouslySetInnerHTML={{ __html: data }} />
        ))}
      </main>
    </article>
  );
}

Accordion.propTypes = {
  title: PropTypes.string,
  body: PropTypes.array,
  state: PropTypes.bool,
};
