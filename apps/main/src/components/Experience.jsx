import { experience as experienceData } from "../data/content";
import { useEditableCollection, EditableText, ItemControls, AddItemButton } from "edit-kit";

export default function Experience() {
  const experience = useEditableCollection("experience", experienceData);

  return (
    <section id="experience" className="section">
      <p className="section-kicker">Track record</p>
      <h2 className="section-title">Experience</h2>

      <div className="timeline">
        {experience.items.map((e) => (
          <div className="timeline-item" key={e.id}>
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-head">
                <EditableText as="h3" value={e.role} onChange={(v) => experience.updateItem(e.id, { role: v })} />
                <EditableText
                  as="span"
                  className="timeline-period"
                  value={e.period}
                  onChange={(v) => experience.updateItem(e.id, { period: v })}
                />
              </div>
              <EditableText as="p" className="timeline-org" value={e.org} onChange={(v) => experience.updateItem(e.id, { org: v })} />
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
              <ItemControls
                onMoveUp={() => experience.moveItem(e.id, -1)}
                onMoveDown={() => experience.moveItem(e.id, 1)}
                onDelete={() => experience.removeItem(e.id)}
                canMoveUp={experience.items.indexOf(e) > 0}
                canMoveDown={experience.items.indexOf(e) < experience.items.length - 1}
              />
            </div>
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add role"
        onClick={() =>
          experience.addItem({
            id: `role-${Date.now()}`,
            role: "New role",
            org: "Organization",
            period: "Year — Year",
            bullets: [],
            tags: [],
          })
        }
      />
    </section>
  );
}
