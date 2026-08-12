import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEditMode, saveContent } from "edit-kit";
import Hero from "./Hero";
import SectionGrid from "./SectionGrid";
import { sections } from "../data/sections";

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function SectionList() {
  const { apiBase, isEditMode } = useEditMode();
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);

  const heroImage = sections.find((s) => s.coverImage)?.coverImage;

  const handleAdd = async () => {
    const title = window.prompt("Section title:");
    if (!title) return;
    const slug = slugify(title);
    if (!slug) {
      setStatus({ type: "error", message: "Couldn't derive a URL slug from that title." });
      return;
    }

    const section = {
      id: slug,
      slug,
      title,
      coverImage: null,
      excerpt: "New section — edit this excerpt.",
      body: ["New section — edit this text."],
      gallery: [],
    };

    setStatus({ type: "pending", message: "Creating…" });
    try {
      await saveContent(apiBase, `healthSection/${slug}`, section, { expectCreate: true });
      navigate(`/sections/${slug}?new=1&title=${encodeURIComponent(title)}`);
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to create section" });
    }
  };

  return (
    <>
      <Hero backgroundImage={heroImage} sectionCount={sections.length} />

      <section className="section-list-page">
        {isEditMode && (
          <div className="add-section-block">
            <button type="button" className="add-section-button" onClick={handleAdd}>
              + New section
            </button>
            {status && <span className={`add-section-status add-section-status-${status.type}`}>{status.message}</span>}
          </div>
        )}

        <SectionGrid sections={sections} />
      </section>
    </>
  );
}
