import { experience } from "../data/content";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <p className="section-kicker">Track record</p>
      <h2 className="section-title">Experience</h2>

      <div className="timeline">
        {experience.map((e) => (
          <div className="timeline-item" key={e.id}>
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-head">
                <h3>{e.role}</h3>
                <span className="timeline-period">{e.period}</span>
              </div>
              <p className="timeline-org">{e.org}</p>
              <ul>
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div className="tag-row">
                {e.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
