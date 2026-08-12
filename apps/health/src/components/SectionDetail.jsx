import { useParams, useSearchParams, Link } from "react-router-dom";
import { useEditableCollection, useEditMode, EditableText, ImageUpload } from "edit-kit";
import { findSection } from "../data/sections";

export default function SectionDetail() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const { isEditMode } = useEditMode();
  const found = findSection(slug);

  // A section created moments ago won't be in the static bundle until the
  // next rebuild (~1 min). Seed a template so the admin can keep editing
  // (add a photo, write the body) without waiting — the first save just
  // updates the same file "create" already made.
  const isFreshlyCreated = !found && searchParams.get("new") === "1" && isEditMode;

  if (!found && !isFreshlyCreated) {
    return (
      <section className="section-detail-page">
        <p>
          <Link to="/">← Back to Health & Wellbeing</Link>
        </p>
        <h1>Section not found</h1>
        <p>There's no section at this address.</p>
      </section>
    );
  }

  const initial = found || {
    id: slug,
    slug,
    title: searchParams.get("title") || slug,
    coverImage: null,
    excerpt: "New section — edit this excerpt.",
    body: ["New section — edit this text."],
    gallery: [],
  };

  return <SectionDetailEditable file={`healthSection/${slug}`} initial={initial} isFreshlyCreated={isFreshlyCreated} />;
}

function SectionDetailEditable({ file, initial, isFreshlyCreated }) {
  const section = useEditableCollection(file, initial);
  const { isEditMode } = useEditMode();
  const s = section.items;
  const gallery = s.gallery || [];

  const commitBody = (e) => {
    const next = e.target.innerText
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean);
    section.updateField("body", next);
  };

  const addGalleryImage = (path) => {
    if (!path) return;
    section.updateField("gallery", [...gallery, path]);
  };

  const removeGalleryImage = (path) => {
    section.updateField(
      "gallery",
      gallery.filter((g) => g !== path)
    );
  };

  return (
    <section className="section-detail-page">
      <p>
        <Link to="/">← Back to Health & Wellbeing</Link>
      </p>

      {isFreshlyCreated && (
        <p className="section-detail-fresh-notice">
          Just created — it'll appear in the section list after the next publish (about a minute). Keep editing
          below; your changes save together.
        </p>
      )}

      {s.coverImage && <img className="section-detail-cover" src={s.coverImage} alt="" />}
      {isEditMode && (
        <ImageUpload
          site="health"
          value={s.coverImage}
          onChange={(path) => section.updateField("coverImage", path)}
          label="Add cover photo"
        />
      )}

      <EditableText as="h1" value={s.title} onChange={(v) => section.updateField("title", v)} />
      <EditableText
        as="p"
        className="section-detail-excerpt"
        value={s.excerpt}
        onChange={(v) => section.updateField("excerpt", v)}
      />

      {isEditMode ? (
        <div
          className="section-detail-body ek-editable"
          contentEditable
          suppressContentEditableWarning
          onBlur={commitBody}
        >
          {s.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      ) : (
        <div className="section-detail-body">
          {s.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}

      {(gallery.length > 0 || isEditMode) && (
        <div className="section-detail-gallery-block">
          <h3>Photos</h3>
          <div className="section-detail-gallery">
            {gallery.map((src) => (
              <div className="section-detail-gallery-item" key={src}>
                <img src={src} alt="" />
                {isEditMode && (
                  <button type="button" onClick={() => removeGalleryImage(src)}>
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          {isEditMode && (
            <ImageUpload site="health" value={null} onChange={addGalleryImage} label="+ Add photo to gallery" />
          )}
        </div>
      )}
    </section>
  );
}
