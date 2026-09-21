import "../assets/css/footer.scss";
const links = [
  [
    "Google Scholar",
    "https://scholar.google.com/citations?user=PqdLgQ0AAAAJ&hl=en&oi=ao",
  ],
  ["ORCID", "https://orcid.org/0000-0002-0822-0740"],
  ["GitHub", "https://github.com/darrelllong"],
  ["LinkedIn", "https://www.linkedin.com/in/darrell-d-e-long/"],
  ["Wikipedia", "https://en.wikipedia.org/wiki/Darrell_Long"],
];
export default function Footer() {
  return (
    <footer id="page-footer">
      <div>
        <a className="footer-name" href="/">
          Darrell D. E. Long
        </a>
      </div>
      <nav aria-label="Elsewhere on the web">
        <ul>
          {links.map(([label, url]) => (
            <li key={label}>
              <a href={url}>
                {label} <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
