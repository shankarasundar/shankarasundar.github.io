import { achievements, education, certifications } from "../data/content";

export default function Recognition() {
  return (
    <section id="recognition" className="section">
      <div className="recognition-grid">
        <div>
          <p className="section-kicker">Recognition</p>
          <h2 className="section-title">Achievements</h2>
          <ul className="achievements-list">
            {achievements.map((a) => (
              <li key={`${a.year}-${a.title}`}>
                <span className="achievement-year">{a.year}</span>
                <div>
                  <p className="achievement-title">{a.title}</p>
                  <p className="achievement-org">{a.org}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="section-kicker">Education & Certifications</p>
          <h2 className="section-title">Background</h2>
          <ul className="education-list">
            {education.map((ed) => (
              <li key={ed.degree}>
                <p className="education-degree">{ed.degree}</p>
                <p className="education-school">
                  {ed.school} · {ed.detail}
                </p>
              </li>
            ))}
          </ul>
          <div className="tag-row">
            {certifications.map((c) => (
              <span className="tag" key={c}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
