import "../assets/css/portrait.scss";

export default function Portrait() {
  return (
    <div className="portrait-frame">
      <img
        src="/darrell-long-2026.jpeg"
        alt="Darrell Long"
        width="4284"
        height="5712"
        fetchPriority="high"
      />
    </div>
  );
}
