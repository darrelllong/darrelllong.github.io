// Dependencies
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// Components
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
// Utilities
import { formatPostDate } from "../utils/dateUtils";
import { getAllPosts, getAllTags } from "../utils/blogLoader";
// Styles
import "../assets/css/blog.scss";

export default function Blog({ searchTerm, search }) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [activeTag, setActiveTag] = React.useState(null);
  const [posts, setPosts] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const postsPerPage = 6;
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    Promise.all([getAllPosts(), getAllTags()])
      .then(([p, t]) => {
        setPosts(p);
        setTags(t);
        setLoading(false);
      })
      .catch(() => {
        setError("The blog could not be loaded. Please reload to try again.");
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  const filteredPosts = posts.filter((post) => {
    const matchesTag = !activeTag || post.tags.includes(activeTag);
    const searchString = searchTerm.toLowerCase();
    const matchesSearch =
      !searchString ||
      post.title.toLowerCase().includes(searchString) ||
      post.excerpt.toLowerCase().includes(searchString) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchString));
    return matchesTag && matchesSearch;
  });

  if (loading)
    return (
      <header className="collection-heading">
        <p className="eyebrow">Notes & essays</p>
        <h1>Blog</h1>
        <p>Notes on computing, research, academic history, and life.</p>
      </header>
    );

  return (
    <>
      <header className="collection-heading">
        <p className="eyebrow">Notes & essays</p>
        <h1>Blog</h1>
        <p>Notes on computing, research, academic history, and life.</p>
      </header>
      <SearchBar
        searchTerm={searchTerm}
        onchange={(value) => {
          search(value);
          setCurrentPage(0);
        }}
      />
      {error && <p role="alert">{error}</p>}
      {tags.length > 0 && (
        <div className="tag-filters">
          <button
            aria-pressed={!activeTag}
            className={!activeTag ? "tag active" : "tag"}
            onClick={() => {
              setActiveTag(null);
              setCurrentPage(0);
            }}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              aria-pressed={activeTag === tag}
              className={activeTag === tag ? "tag active" : "tag"}
              onClick={() => {
                setActiveTag(activeTag === tag ? null : tag);
                setCurrentPage(0);
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
      {filteredPosts.length > 0 ? (
        <section className="blog-posts">
          {filteredPosts
            .slice(currentPage * postsPerPage, (currentPage + 1) * postsPerPage)
            .map((post) => (
              <article key={post.slug}>
                <header>
                  <h2>
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                </header>
                <p>{post.excerpt}</p>
                <div className="post-tags">
                  {post.tags.map((tag) => (
                    <button
                      key={tag}
                      className="tag"
                      onClick={() => {
                        setActiveTag(tag);
                        setCurrentPage(0);
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </article>
            ))}
        </section>
      ) : (
        <h3>No posts found, please refine your search or try again later</h3>
      )}
      <Pagination
        currentPage={currentPage}
        totalPublications={filteredPosts.length}
        publicationsPerPage={postsPerPage}
        changePage={setCurrentPage}
      />
    </>
  );
}

Blog.propTypes = {
  searchTerm: PropTypes.string,
  search: PropTypes.func,
};
