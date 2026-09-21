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
import { getAllPosts, getPostBySlug } from "../utils/blogLoader";
// Styles
import "katex/dist/katex.min.css";
import "../assets/css/blog.scss";

export default function BlogPost({ search }) {
  const { slug } = useParams();
  const [post, setPost] = React.useState(null);
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let active = true;
    setLoading(true);
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
        <PageMetadata title="Post not found | Darrell Long" noIndex />
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
        title={`${post.title} | Darrell Long`}
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
