// Dependencies
import React from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { Context } from "../ContextProvider";
// Components
import About from "./About";
import Publications from "./Publications";
import Publication from "./Publication";
import PublicationRedirect from "./PublicationRedirect";
import publicationRedirects from "../publicationRedirects.json";
import Patents from "./Patents";
import Patent from "./Patent";
import Consultancy from "./Consultancy";
import Blog from "./Blog";
const BlogPost = React.lazy(() => import("./BlogPost"));
import Home from "./Home";
import PageMetadata from "./PageMetadata";
// Styles
import "../assets/css/home.scss";

export default function Main() {
  const [searchTerms, setSearchTerms] = React.useState({});
  const location = useLocation();
  const collection = location.pathname.split("/")[1];
  const searchTerm = searchTerms[collection] || "";
  const setSearchTerm = (value) =>
    setSearchTerms((previous) => ({ ...previous, [collection]: value }));
  const navigate = useNavigate();
  const { pathClass, publications, patents } = React.useContext(Context);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirectPath = params.get("redirect");
    const validRoutes = [
      "/about",
      "/publications",
      "/patents",
      "/consultancy",
      "/blog",
    ];
    if (
      redirectPath &&
      (validRoutes.includes(redirectPath) ||
        /^\/(?:publications|patents)\/\d+\/?$/.test(redirectPath) ||
        /^\/blog\/[\w-]+\/?$/.test(redirectPath))
    ) {
      navigate(redirectPath, { replace: true });
    }
  }, [location, navigate]);

  const matchPublication = location.pathname.match(
    /^\/publications\/(\d+)\/?$/,
  );
  const publicationId = matchPublication
    ? parseInt(matchPublication[1], 10)
    : null;

  const matchPatent = location.pathname.match(/^\/patents\/(\d+)\/?$/);
  const patentId = matchPatent ? parseInt(matchPatent[1], 10) : null;

  return (
    <main
      id="main-content"
      tabIndex="-1"
      className={pathClass(location.pathname)}
    >
      {location.pathname.split("/").filter(Boolean).length <= 1 && (
        <PageMetadata
          title={
            location.pathname === "/"
              ? "Dr. Darrell D. E. Long"
              : `${{ about: "About", publications: "Publications", patents: "Patents", blog: "Blog", consultancy: "Consultancy" }[collection] || "Dr. Darrell Long"} | Dr. Darrell Long`
          }
          description={
            collection === "about"
              ? "Biography of Dr. Darrell Long: education, storage research, SSRC and CRSS, teaching, doctoral students, and national service."
              : collection === "consultancy"
              ? "Technical consulting and expert witness services in computer science from Dr. Darrell Long and Pentexoire Consulting."
              : undefined
          }
        />
      )}
      <Routes>
        <Route path="/about" element={<About />} />
        <Route
          path="/publications"
          element={
            <Publications searchTerm={searchTerm} search={setSearchTerm} />
          }
        />
        <Route path="/consultancy" element={<Consultancy />} />
        <Route
          path="/blog"
          element={<Blog searchTerm={searchTerm} search={setSearchTerm} />}
        />
        <Route
          path="/blog/:slug"
          element={
            <React.Suspense fallback={<p role="status">Loading post…</p>}>
              <BlogPost search={setSearchTerm} />
            </React.Suspense>
          }
        />
        <Route
          path="/patents"
          element={<Patents searchTerm={searchTerm} search={setSearchTerm} />}
        />
        <Route
          path="/publications/:id"
          element={
            publicationRedirects[publicationId] ? (
              <PublicationRedirect to={publicationRedirects[publicationId]} />
            ) : (
              <Publication
                publication={publications.find((pub) => pub.id === publicationId)}
                publications={publications}
                search={setSearchTerm}
              />
            )
          }
        />
        <Route
          path="/patents/:id"
          element={
            <Patent
              patent={patents.find((pat) => pat.id === patentId)}
              patents={patents}
              search={setSearchTerm}
            />
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}
