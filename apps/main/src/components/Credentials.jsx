import { achievements, education, certifications } from "../data/content";

export default function Credentials() {
  return (
    <div id="recognition" className="sidebar-block">
      <p className="section-kicker">Recognition</p>
      <h2 className="sidebar-title">Achievements</h2>
      <ul className="achievements-list">
        {achievements.map((a) => (
          <li key={a.id}>
            <span className="achievement-year">{a.year}</span>
            <div>
              <p className="achievement-title">{a.title}</p>
              <p className="achievement-org">{a.org}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="section-kicker sidebar-subsection-gap">Education & Certifications</p>
      <h2 className="sidebar-title">Background</h2>
      <ul className="education-list">
        {education.map((ed) => (
          <li key={ed.id}>
            <p className="education-degree">{ed.degree}</p>
            <p className="education-school">
              {ed.school} · {ed.detail}
            </p>
          </li>
        ))}
      </ul>
      <div className="tag-row">
        {certifications.map((c) => (
          <span className="tag" key={c.id}>
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}
