import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEditMode, saveContent } from "edit-kit";
import Hero from "./Hero";
import PostGrid from "./PostGrid";
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
  const { apiBase, isEditMode } = useEditMode();
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);

  const heroImage = posts.find((p) => p.coverImage)?.coverImage;

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
      gallery: [],
    };

    setStatus({ type: "pending", message: "Creating…" });
    try {
      await saveContent(apiBase, `travelPost/${slug}`, post, { expectCreate: true });
      navigate(`/posts/${slug}?new=1&title=${encodeURIComponent(title)}`);
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to create post" });
    }
  };

  return (
    <>
      <Hero backgroundImage={heroImage} tripCount={posts.length} />

      <section className="post-list-page">
        {isEditMode && (
          <div className="add-post-block">
            <button type="button" className="add-post-button" onClick={handleAdd}>
              + New post
            </button>
            {status && <span className={`add-post-status add-post-status-${status.type}`}>{status.message}</span>}
          </div>
        )}

        <PostGrid posts={posts} />
      </section>
    </>
  );
}
