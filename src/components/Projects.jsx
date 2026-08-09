import { projects, profile } from "../data/content";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <p className="section-kicker">Case studies</p>
      <h2 className="section-title">Selected work</h2>

      <div className="projects-grid">
        {projects.map((p) => (
          <article className="project-card" key={p.title}>
            <h3>{p.title}</h3>
            <p className="project-org">{p.org}</p>

            <div className="project-block">
              <span className="project-label">Problem</span>
              <p>{p.problem}</p>
            </div>
            <div className="project-block">
              <span className="project-label">Approach</span>
              <p>{p.approach}</p>
            </div>
            <div className="project-block">
              <span className="project-label">Outcome</span>
              <p>{p.outcome}</p>
            </div>

            <div className="tag-row">
              {p.tags.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <p className="projects-footnote">
        Code and hands-on experiments live on{" "}
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        .
      </p>
    </section>
  );
}
