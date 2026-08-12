import PostCard from "./PostCard";

export default function PostGrid({ posts }) {
  if (posts.length === 0) {
    return <p className="post-grid-empty">No trips logged yet.</p>;
  }

  return (
    <div className="post-grid">
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
}
