import { profile as profileData } from "../data/content";
import headshot from "../assets/images/headshot.jpg";
import { useEditableCollection, EditableText } from "edit-kit";

const NAV = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Experience", "#experience"],
  ["Personal", "#activities"],
  ["Posts", "#posts"],
  ["Contact", "#contact"],
];

export default function Header() {
  const profile = useEditableCollection("profile", profileData);
  const p = profile.items;

  return (
    <header className="hero">
      <div className="hero-decor" aria-hidden="true" />
      <nav className="nav">
        <span className="nav-brand">{p.name}</span>
        <div className="nav-links">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </div>
      </nav>

      <div className="hero-content">
        <div className="hero-text">
          <EditableText as="p" className="hero-kicker" value={p.tagline} onChange={(v) => profile.updateField("tagline", v)} />
          <EditableText as="h1" value={p.name} onChange={(v) => profile.updateField("name", v)} />
          <EditableText as="p" className="hero-title" value={p.title} onChange={(v) => profile.updateField("title", v)} />
          <EditableText as="p" className="hero-bio" value={p.bio} onChange={(v) => profile.updateField("bio", v)} />
          <div className="hero-actions">
            <a className="btn btn-primary" href={`mailto:${p.email}`}>
              Get in touch
            </a>
            <a className="btn btn-ghost" href="#projects">
              See case studies
            </a>
          </div>
          <EditableText as="p" className="hero-location" value={p.location} onChange={(v) => profile.updateField("location", v)} />
        </div>

        <div className="hero-photo-wrap">
          <div className="hero-photo-ring" />
          <img className="hero-photo" src={headshot} alt={p.name} />
        </div>
      </div>
    </header>
  );
}
