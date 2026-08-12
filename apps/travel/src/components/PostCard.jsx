import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <Link className="post-card" to={`/posts/${post.slug}`}>
      <div
        className={post.coverImage ? "post-card-image" : "post-card-image post-card-image-empty"}
        style={post.coverImage ? { backgroundImage: `url(${post.coverImage})` } : undefined}
      >
        <div className="post-card-scrim">
          <span className="post-card-date">{post.date}</span>
          <h2>{post.title}</h2>
        </div>
      </div>
      <p className="post-card-excerpt">{post.excerpt}</p>
    </Link>
  );
}
