import { profile } from "../data/content";

export default function Contact() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="section contact-section">
      <p className="section-kicker">Let's talk</p>
      <h2 className="section-title">Get in touch</h2>
      <p className="contact-lead">
        Open to conversations on enterprise AI deployment, presales strategy and service-management
        transformation.
      </p>

      <div className="contact-links">
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>

      <p className="contact-footer">
        © {year} {profile.name} · {profile.location}
      </p>
    </footer>
  );
}
