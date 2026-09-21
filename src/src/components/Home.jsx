import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../ContextProvider";
import { getAllPosts } from "../utils/blogLoader";
import { formatPostDate } from "../utils/dateUtils";
import Portrait from "./Portrait";
import "../assets/css/home.scss";

export default function Home() {
  const { publications } = useContext(Context);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    let active = true;
    getAllPosts()
      .then((data) => {
        if (active) setPosts(data.slice(0, 3));
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <section className="home-intro" aria-labelledby="home-title">
        <div className="intro-copy">
          <h1 id="home-title">
            Darrell D. E. Long
            <span className="name-rule" />
          </h1>
          <p className="intro-role">
            Distinguished Professor of Engineering, emeritus
            <br />
            <span>University of California, Santa Cruz</span>
          </p>
          <p className="intro-role">
            Distinguished Visiting Scholar
            <br />
            <span>Santa Clara University</span>
          </p>
          <p className="intro-description">
            My research concerns data storage, distributed systems, reliability,
            and computer security.
          </p>
          <div className="intro-links">
            <Link className="button-link" to="/publications/">
              Publications <span aria-hidden="true">↗</span>
            </Link>
            <Link className="text-link" to="/about/">
              Biography <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <figure className="intro-portrait">
          <Portrait />
          <figcaption>
            <span>Fellow, IEEE</span>
            <span>Fellow, AAAS</span>
          </figcaption>
        </figure>
      </section>
      <div
        className="research-topics"
        role="group"
        aria-label="Research topics"
      >
        <span className="eyebrow">Research areas</span>
        <span>Storage systems</span>
        <span>Distributed computing</span>
        <span>Reliability & fault tolerance</span>
        <span>Computer security</span>
      </div>
      <div className="home-columns">
        <section className="recent-research" aria-labelledby="research-title">
          <div className="section-heading">
            <div>
              <h2 id="research-title">Recent research</h2>
            </div>
            <Link to="/publications/" className="text-link">
              All publications <span aria-hidden="true">↗</span>
            </Link>
          </div>
          {publications.slice(0, 3).map((pub) => (
            <article className="research-entry" key={pub.id}>
              <span className="entry-year">{pub.bibTeX?.year}</span>
              <div>
                <h3>
                  <Link to={`/publications/${pub.id}/`}>{pub.title}</Link>
                </h3>
                <p>{pub.author.join(", ")}</p>
                <span className="entry-venue">
                  {(pub.bibTeX?.booktitle || pub.bibTeX?.journal || "").replace(
                    /\\&/g,
                    "&",
                  )}
                </span>
              </div>
              <Link
                className="entry-arrow"
                to={`/publications/${pub.id}/`}
                aria-label={`Read ${pub.title}`}
              >
                ↗
              </Link>
            </article>
          ))}
          {!publications.length && (
            <p className="section-note">
              Browse the <Link to="/publications/">publication archive</Link>{" "}
              for papers, abstracts, and citations.
            </p>
          )}
        </section>
        <section className="recent-writing" aria-labelledby="writing-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Notes & essays</p>
              <h2 id="writing-title">Latest writing</h2>
            </div>
            <Link to="/blog/" className="text-link">
              The blog <span aria-hidden="true">↗</span>
            </Link>
          </div>
          {posts.map((post) => (
            <article className="writing-entry" key={post.slug}>
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <h3>
                <Link to={`/blog/${post.slug}/`}>{post.title}</Link>
              </h3>
              <p>{post.excerpt}</p>
            </article>
          ))}
          {!posts.length && (
            <p className="section-note">
              Read <Link to="/blog/">notes and essays</Link> on research,
              computing, and academic life.
            </p>
          )}
        </section>
      </div>
      <section className="home-connections" aria-label="More of my work">
        <div>
          <h2>Professional links</h2>
        </div>
        <div>
          <a href="https://www.crss.us/">
            Systems & storage research archive <span aria-hidden="true">↗</span>
          </a>
          <a href="https://www.genealogy.math.ndsu.nodak.edu/id.php?id=10794">
            Students & academic genealogy <span aria-hidden="true">↗</span>
          </a>
          <Link to="/consultancy/">
            Consulting & expert witness work <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
