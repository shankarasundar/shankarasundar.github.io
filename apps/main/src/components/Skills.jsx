import { skills as skillsData } from "../data/content";
import { useEditableCollection, EditableText, ItemControls, AddItemButton } from "edit-kit";

export default function Skills() {
  const skills = useEditableCollection("skills", skillsData);

  return (
    <section id="skills" className="section">
      <p className="section-kicker">Capability</p>
      <h2 className="section-title">Skills I bring in</h2>

      <div className="skills-grid">
        {skills.items.map((s) => (
          <div className="skill-card" key={s.id}>
            <div className="skill-head">
              <EditableText as="span" className="skill-name" value={s.name} onChange={(v) => skills.updateItem(s.id, { name: v })} />
              <EditableText
                as="span"
                className="skill-level"
                value={`${s.level}%`}
                onChange={(v) => {
                  const level = Math.max(0, Math.min(100, parseInt(v, 10) || 0));
                  skills.updateItem(s.id, { level });
                }}
              />
            </div>
            <div className="skill-bar">
              <div className="skill-bar-fill" style={{ width: `${s.level}%` }} />
            </div>
            <EditableText
              as="p"
              className="skill-items"
              value={s.items.join(" · ")}
              onChange={(v) => skills.updateItem(s.id, { items: v.split("·").map((x) => x.trim()).filter(Boolean) })}
            />
            <ItemControls
              onMoveUp={() => skills.moveItem(s.id, -1)}
              onMoveDown={() => skills.moveItem(s.id, 1)}
              onDelete={() => skills.removeItem(s.id)}
              canMoveUp={skills.items.indexOf(s) > 0}
              canMoveDown={skills.items.indexOf(s) < skills.items.length - 1}
            />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add skill"
        onClick={() => skills.addItem({ id: `skill-${Date.now()}`, name: "New skill", level: 50, items: ["Item"] })}
      />
    </section>
  );
}
