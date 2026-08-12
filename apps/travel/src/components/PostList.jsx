import { useState } from "react";
import { Link } from "react-router-dom";
import { useEditMode, saveContent } from "edit-kit";
import { posts } from "../data/posts";

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function PostList() {
  const { isEditMode } = useEditMode();
  const [status, setStatus] = useState(null);

  const handleAdd = async () => {
    const title = window.prompt("Post title:");
    if (!title) return;
    const slug = slugify(title);
    if (!slug) {
      setStatus({ type: "error", message: "Couldn't derive a URL slug from that title." });
      return;
    }

    const post = {
      id: slug,
      slug,
      title,
      date: new Date().toISOString().slice(0, 10),
      coverImage: null,
      excerpt: "New post — edit this excerpt.",
      body: ["New post — edit this text."],
    };

    setStatus({ type: "pending", message: "Creating…" });
    try {
      await saveContent("https://www.shankshub.page", `travelPost/${slug}`, post, { expectCreate: true });
      setStatus({
        type: "success",
        message: `Created "${title}" — publishing now, it'll appear in this list in about a minute. Refresh to check.`,
      });
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to create post" });
    }
  };

  return (
    <section className="post-list-page">
      <h1>Travel</h1>
      <p className="page-lede">Trip notes, photos and stories.</p>

      {isEditMode && (
        <div className="add-post-block">
          <button type="button" className="add-post-button" onClick={handleAdd}>
            + New post
          </button>
          {status && <span className={`add-post-status add-post-status-${status.type}`}>{status.message}</span>}
        </div>
      )}

      <div className="post-grid">
        {posts.map((p) => (
          <Link className="post-card" to={`/posts/${p.slug}`} key={p.id}>
            {p.coverImage && <img className="post-card-cover" src={p.coverImage} alt="" />}
            <div className="post-card-body">
              <span className="post-card-date">{p.date}</span>
              <h2>{p.title}</h2>
              <p>{p.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
