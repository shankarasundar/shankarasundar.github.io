import { profile } from "../data/content";

const NAV = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Experience", "#experience"],
  ["Contact", "#contact"],
];

export default function Header() {
  return (
    <header className="hero">
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
    </header>
  );
}
