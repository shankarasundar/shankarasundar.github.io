import SectionCard from "./SectionCard";

export default function SectionGrid({ sections }) {
  if (sections.length === 0) {
    return <p className="section-grid-empty">No sections yet.</p>;
  }

  return (
    <div className="section-grid">
      {sections.map((section) => (
        <SectionCard section={section} key={section.id} />
      ))}
    </div>
  );
}
