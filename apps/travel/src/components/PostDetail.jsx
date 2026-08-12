import { useParams, Link } from "react-router-dom";
import { useEditableCollection, useEditMode, EditableText } from "edit-kit";
import { findPost } from "../data/posts";

export default function PostDetail() {
  const { slug } = useParams();
  const initial = findPost(slug);

  if (!initial) {
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

  return <PostDetailEditable file={`travelPost/${slug}`} initial={initial} />;
}

function PostDetailEditable({ file, initial }) {
  const post = useEditableCollection(file, initial);
  const { isEditMode } = useEditMode();
  const p = post.items;

  const commitBody = (e) => {
    const next = e.target.innerText
      .split(/\n{2,}/)
      .map((s) => s.trim())
      .filter(Boolean);
    post.updateField("body", next);
  };

  return (
    <section className="post-detail-page">
      <p>
        <Link to="/">← Back to Travel</Link>
      </p>

      {p.coverImage && <img className="post-detail-cover" src={p.coverImage} alt="" />}

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
    </section>
  );
}
