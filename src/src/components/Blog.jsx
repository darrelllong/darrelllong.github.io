// Dependencies
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// Components
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
// Utilities
import { formatPostDate } from "../utils/dateUtils";
import {
  getAllPosts,
  getAllTags,
  getPreloadedPosts,
  tagsOf,
} from "../utils/blogLoader";
// Styles
import "../assets/css/blog.scss";

export default function Blog({ searchTerm, search }) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [activeTag, setActiveTag] = React.useState(null);
  // A prerendered page starts with its posts (see preloaded.js)
  const [posts, setPosts] = React.useState(() => getPreloadedPosts() || []);
  const [tags, setTags] = React.useState(() => tagsOf(posts));
  const [loading, setLoading] = React.useState(posts.length === 0);
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

  const selectTag = (tag) => {
    setActiveTag(tag);
    // A post's tag link arrives as a search. Replace it when choosing a topic.
    search("");
    setCurrentPage(0);
  };

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
          setActiveTag(null);
          setCurrentPage(0);
        }}
      />
      {error && <p role="alert">{error}</p>}
      {tags.length > 0 && (
        <div className="tag-filters">
          <button
            aria-pressed={!activeTag}
            className={!activeTag ? "tag active" : "tag"}
            onClick={() => selectTag(null)}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              aria-pressed={activeTag === tag}
              className={activeTag === tag ? "tag active" : "tag"}
              onClick={() => selectTag(activeTag === tag ? null : tag)}
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
                      onClick={() => selectTag(tag)}
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
