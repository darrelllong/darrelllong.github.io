// Dependencies
import React from "react";
import PropTypes from "prop-types";
import PageMetadata from "./PageMetadata";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Assets
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
// Utilities
import { formatPostDate } from "../utils/dateUtils";
import {
  getAllPosts,
  getPostBySlug,
  getPreloadedPost,
  getPreloadedPosts,
} from "../utils/blogLoader";
// Styles
import "katex/dist/katex.min.css";
import "../assets/css/blog.scss";

export default function BlogPost({ search }) {
  const { slug } = useParams();
  // A prerendered page starts with its post (see preloaded.js)
  const [post, setPost] = React.useState(() => getPreloadedPost(slug));
  const [posts, setPosts] = React.useState(() => getPreloadedPosts() || []);
  const [loading, setLoading] = React.useState(post === null);

  React.useEffect(() => {
    let active = true;
    if (getPreloadedPost(slug) === null) setLoading(true);
    Promise.all([getPostBySlug(slug), getAllPosts()])
      .then(([p, all]) => {
        if (!active) return;
        setPost(p);
        setPosts(all);
        setLoading(false);
      })
      .catch(() => {
        if (active) {
          setPost(null);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) return <p role="status">Loading post…</p>;

  if (!post) {
    return (
      <>
        <PageMetadata title="Post not found | Dr. Darrell Long" noIndex />
        <article className="blog-article">
          <header>
            <h1>Post not found</h1>
          </header>
        </article>
        <nav className="main-nav">
          <Link to="/blog/">Back to all posts</Link>
        </nav>
      </>
    );
  }

  const currentIndex = posts.findIndex((p) => p.slug === post.slug);
  const prevPost = posts[(currentIndex - 1 + posts.length) % posts.length];
  const nextPost = posts[(currentIndex + 1) % posts.length];

  return (
    <>
      <PageMetadata
        title={`${post.title} | Dr. Darrell Long`}
        description={post.excerpt || ""}
      />
      <article className="blog-article">
        <header>
          <h1>{post.title}</h1>
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          {post.tags.length > 0 && (
            <div className="post-tags">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  to="/blog/"
                  className="tag"
                  onClick={() => search && search(tag)}
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>
        <div className="blog-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              p({ node, children, ...props }) {
                const content = node.children.filter(
                  (child) => child.type !== "text" || child.value.trim(),
                );
                if (content.length > 1 && content.every(
                  (child) => child.type === "element" && child.tagName === "img",
                )) {
                  return (
                    <div className="portrait-gallery" role="group" aria-label="Family portraits, oldest generation first" tabIndex={0}>
                      {content.map(({ properties }) => (
                        <figure key={properties.src}>
                          <img src={properties.src} alt={properties.alt} loading="lazy" />
                          <figcaption>{properties.title || properties.alt}</figcaption>
                        </figure>
                      ))}
                    </div>
                  );
                }
                return <p {...props}>{children}</p>;
              },
              // A table takes the width its content needs, out to the width
              // of main, and scrolls beyond that; see .table-wide in blog.scss
              table({ children, ...props }) {
                return (
                  <div className="table-wide">
                    <div className="table-scroll">
                      <table {...props}>{children}</table>
                    </div>
                  </div>
                );
              },
              a({ href, children, ...props }) {
                if (href && href.startsWith("/")) {
                  return <Link to={href}>{children}</Link>;
                }
                return (
                  <a href={href} {...props}>
                    {children}
                  </a>
                );
              },
            }}
          >
            {post.body}
          </ReactMarkdown>
        </div>
      </article>
      {posts.length > 1 && (
        <nav className="main-nav">
          <Link to={`/blog/${prevPost.slug}/`}>
            <FontAwesomeIcon icon={faCaretLeft} />
            Previous post
          </Link>
          <Link to="/blog/">Back to all posts</Link>
          <Link to={`/blog/${nextPost.slug}/`}>
            Next post
            <FontAwesomeIcon icon={faCaretRight} />
          </Link>
        </nav>
      )}
    </>
  );
}

BlogPost.propTypes = {
  search: PropTypes.func,
};
