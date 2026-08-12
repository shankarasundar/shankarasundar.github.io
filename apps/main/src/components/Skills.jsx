import { skills } from "../data/content";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <p className="section-kicker">Capability</p>
      <h2 className="section-title">Skills I bring in</h2>

      <div className="skills-grid">
        {skills.map((s) => (
          <div className="skill-card" key={s.id}>
            <div className="skill-head">
              <span className="skill-name">{s.name}</span>
              <span className="skill-level">{s.level}%</span>
            </div>
            <div className="skill-bar">
              <div className="skill-bar-fill" style={{ width: `${s.level}%` }} />
            </div>
            <p className="skill-items">{s.items.join(" · ")}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
