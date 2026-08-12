import { Link } from "react-router-dom";

export default function SectionCard({ section }) {
  return (
    <Link className="section-card" to={`/sections/${section.slug}`}>
      <div
        className={section.coverImage ? "section-card-image" : "section-card-image section-card-image-empty"}
        style={section.coverImage ? { backgroundImage: `url(${section.coverImage})` } : undefined}
      >
        <div className="section-card-scrim">
          <h2>{section.title}</h2>
        </div>
      </div>
      <p className="section-card-excerpt">{section.excerpt}</p>
    </Link>
  );
}
