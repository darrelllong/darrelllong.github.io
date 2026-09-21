import PropTypes from "prop-types";
import "../assets/css/accordion.scss";
export default function Accordion({ title, body, state }) {
  return (
    <details className="accordion" open={state}>
      <summary>
        {title}
        <span aria-hidden="true">+</span>
      </summary>
      <div>
        {body.map((paragraph, index) => (
          <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
        ))}
      </div>
    </details>
  );
}
Accordion.propTypes = {
  title: PropTypes.string,
  body: PropTypes.array,
  state: PropTypes.bool,
};
