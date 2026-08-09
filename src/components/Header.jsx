import { profile } from "../data/content";
import headshot from "../assets/images/headshot.jpg";

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
  return (
    <header className="hero">
      <div className="hero-decor" aria-hidden="true" />
      <nav className="nav">
        <span className="nav-brand">{profile.name}</span>
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
          <p className="hero-kicker">{profile.tagline}</p>
          <h1>{profile.name}</h1>
          <p className="hero-title">{profile.title}</p>
          <p className="hero-bio">{profile.bio}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={`mailto:${profile.email}`}>
              Get in touch
            </a>
            <a className="btn btn-ghost" href="#projects">
              See case studies
            </a>
          </div>
          <p className="hero-location">{profile.location}</p>
        </div>

        <div className="hero-photo-wrap">
          <div className="hero-photo-ring" />
          <img className="hero-photo" src={headshot} alt={profile.name} />
        </div>
      </div>
    </header>
  );
}
