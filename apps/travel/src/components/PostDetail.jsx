import { useParams, useSearchParams, Link } from "react-router-dom";
import { useEditableCollection, useEditMode, EditableText, ImageUpload } from "edit-kit";
import { findPost } from "../data/posts";

export default function PostDetail() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const { isEditMode } = useEditMode();
  const found = findPost(slug);

  // A post created moments ago won't be in the static bundle until the next
  // rebuild (~1 min). Rather than block editing until then, seed a template
  // from what we know so the admin can keep going (add a cover photo, write
  // the body) — the first save just updates the same file that was created.
  const isFreshlyCreated = !found && searchParams.get("new") === "1" && isEditMode;

  if (!found && !isFreshlyCreated) {
    return (
      <section className="post-detail-page">
        <p>
          <Link to="/">← Back to Travel</Link>
        </p>
        <h1>Post not found</h1>
        <p>There's no post at this address.</p>
      </section>
    );
  }

  const initial = found || {
    id: slug,
    slug,
    title: searchParams.get("title") || slug,
    date: new Date().toISOString().slice(0, 10),
    coverImage: null,
    excerpt: "New post — edit this excerpt.",
    body: ["New post — edit this text."],
    gallery: [],
  };

  return <PostDetailEditable file={`travelPost/${slug}`} initial={initial} isFreshlyCreated={isFreshlyCreated} />;
}

function PostDetailEditable({ file, initial, isFreshlyCreated }) {
  const post = useEditableCollection(file, initial);
  const { isEditMode } = useEditMode();
  const p = post.items;
  const gallery = p.gallery || [];

  const commitBody = (e) => {
    const next = e.target.innerText
      .split(/\n{2,}/)
      .map((s) => s.trim())
      .filter(Boolean);
    post.updateField("body", next);
  };

  const addGalleryImage = (path) => {
    if (!path) return;
    post.updateField("gallery", [...gallery, path]);
  };

  const removeGalleryImage = (path) => {
    post.updateField(
      "gallery",
      gallery.filter((g) => g !== path)
    );
  };

  return (
    <section className="post-detail-page">
      <p>
        <Link to="/">← Back to Travel</Link>
      </p>

      {isFreshlyCreated && (
        <p className="post-detail-fresh-notice">
          Just created — it'll appear in the trip list after the next publish (about a minute). Keep editing below;
          your changes save together.
        </p>
      )}

      {p.coverImage && <img className="post-detail-cover" src={p.coverImage} alt="" />}
      {isEditMode && (
        <ImageUpload site="travel" value={p.coverImage} onChange={(path) => post.updateField("coverImage", path)} label="Add cover photo" />
      )}

      <EditableText as="h1" value={p.title} onChange={(v) => post.updateField("title", v)} />
      <EditableText as="p" className="post-detail-date" value={p.date} onChange={(v) => post.updateField("date", v)} />
      <EditableText
        as="p"
        className="post-detail-excerpt"
        value={p.excerpt}
        onChange={(v) => post.updateField("excerpt", v)}
      />

      {isEditMode ? (
        <div className="post-detail-body ek-editable" contentEditable suppressContentEditableWarning onBlur={commitBody}>
          {p.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      ) : (
        <div className="post-detail-body">
          {p.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}

      {(gallery.length > 0 || isEditMode) && (
        <div className="post-detail-gallery-block">
          <h3>Photos</h3>
          <div className="post-detail-gallery">
            {gallery.map((src) => (
              <div className="post-detail-gallery-item" key={src}>
                <img src={src} alt="" />
                {isEditMode && (
                  <button type="button" onClick={() => removeGalleryImage(src)}>
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          {isEditMode && <ImageUpload site="travel" value={null} onChange={addGalleryImage} label="+ Add photo to gallery" />}
        </div>
      )}
    </section>
  );
}
