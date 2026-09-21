import "../assets/css/portrait.scss";
import portrait from "../portrait.json";

export default function Portrait() {
  return (
    <div className="portrait-frame">
      <img
        src={portrait.src}
        alt={portrait.alt}
        width={portrait.width}
        height={portrait.height}
        fetchPriority="high"
      />
    </div>
  );
}
