// Dependencies
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// Components
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
// Utilities
import { getAllPosts, getAllTags } from "../utils/blogLoader";
// Styles
import "../assets/css/blog.scss";

export default function Blog({ searchTerm, search }) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [activeTag, setActiveTag] = React.useState(null);
  const postsPerPage = 6;
  const posts = getAllPosts();
  const tags = getAllTags();

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

  return (
    <>
      <h2>Blog</h2>
      <SearchBar
        searchTerm={searchTerm}
        onchange={(value) => {
          search(value);
          setCurrentPage(0);
        }}
      />
      {tags.length > 0 && (
        <div className="tag-filters">
          <button
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
            .slice(
              currentPage * postsPerPage,
              (currentPage + 1) * postsPerPage,
            )
            .map((post) => (
              <article key={post.slug}>
                <header>
                  <h3>
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <time dateTime={post.date}>{post.date}</time>
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
