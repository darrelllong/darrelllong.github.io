// Dependencies
import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Assets
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
// Utilities
import { getAllPosts, getPostBySlug } from "../utils/blogLoader";
// Styles
import "../assets/css/blog.scss";

export default function BlogPost({ search }) {
  const { slug } = useParams();
  const [post, setPost] = React.useState(null);
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    Promise.all([getPostBySlug(slug), getAllPosts()]).then(([p, all]) => {
      setPost(p);
      setPosts(all);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return null;

  if (!post) {
    return (
      <>
        <article className="blog-article">
          <header>
            <h2>Post not found</h2>
          </header>
        </article>
        <nav className="main-nav">
          <Link to="/blog">Back to all posts</Link>
        </nav>
      </>
    );
  }

  const currentIndex = posts.findIndex((p) => p.slug === post.slug);
  const prevPost = posts[(currentIndex - 1 + posts.length) % posts.length];
  const nextPost = posts[(currentIndex + 1) % posts.length];

  return (
    <>
      <Helmet>
        <title>{post.title} | Darrell Long</title>
        <meta name="description" content={post.excerpt || ""} />
      </Helmet>
      <article className="blog-article">
        <header>
          <h2>{post.title}</h2>
          <time dateTime={post.date}>{post.date}</time>
          {post.tags.length > 0 && (
            <div className="post-tags">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  to="/blog"
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
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.body}
          </ReactMarkdown>
        </div>
      </article>
      {posts.length > 1 && (
        <nav className="main-nav">
          <Link to={`/blog/${prevPost.slug}`}>
            <FontAwesomeIcon icon={faCaretLeft} />
            Previous post
          </Link>
          <Link to="/blog">Back to all posts</Link>
          <Link to={`/blog/${nextPost.slug}`}>
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
