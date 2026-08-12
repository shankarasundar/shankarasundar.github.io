import { projects as projectsData, profile } from "../data/content";
import { useEditableCollection, EditableText, ItemControls, AddItemButton } from "edit-kit";

export default function Projects() {
  const projects = useEditableCollection("projects", projectsData);

  return (
    <section id="projects" className="section">
      <p className="section-kicker">Case studies</p>
      <h2 className="section-title">Selected work</h2>

      <div className="projects-grid">
        {projects.items.map((p) => (
          <article className="project-card" key={p.id}>
            <EditableText as="h3" value={p.title} onChange={(v) => projects.updateItem(p.id, { title: v })} />
            <EditableText as="p" className="project-org" value={p.org} onChange={(v) => projects.updateItem(p.id, { org: v })} />

            <div className="project-block">
              <span className="project-label">Problem</span>
              <EditableText as="p" value={p.problem} onChange={(v) => projects.updateItem(p.id, { problem: v })} />
            </div>
            <div className="project-block">
              <span className="project-label">Approach</span>
              <EditableText as="p" value={p.approach} onChange={(v) => projects.updateItem(p.id, { approach: v })} />
            </div>
            <div className="project-block">
              <span className="project-label">Outcome</span>
              <EditableText as="p" value={p.outcome} onChange={(v) => projects.updateItem(p.id, { outcome: v })} />
            </div>

            <div className="tag-row">
              {p.tags.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
            <ItemControls
              onMoveUp={() => projects.moveItem(p.id, -1)}
              onMoveDown={() => projects.moveItem(p.id, 1)}
              onDelete={() => projects.removeItem(p.id)}
              canMoveUp={projects.items.indexOf(p) > 0}
              canMoveDown={projects.items.indexOf(p) < projects.items.length - 1}
            />
          </article>
        ))}
      </div>
      <AddItemButton
        label="Add project"
        onClick={() =>
          projects.addItem({
            id: `project-${Date.now()}`,
            title: "New project",
            org: "Organization · Role · Year",
            problem: "Problem",
            approach: "Approach",
            outcome: "Outcome",
            tags: [],
          })
        }
      />

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
