// React
import React from "react";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
// CSS
import "../assets/css/accordion.scss";

/* eslint-disable react/prop-types */
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
