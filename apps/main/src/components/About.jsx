import { stats, problems } from "../data/content";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="stats-grid">
        {stats.map((s) => (
          <div className="stat" key={s.id}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <p className="section-kicker">Problems I solve</p>
      <h2 className="section-title">Where I create leverage</h2>

      <div className="problems-grid">
        {problems.map((p) => (
          <div className="problem-card" key={p.id}>
            <span className="problem-tag">{p.tag}</span>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
