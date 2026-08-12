import { achievements as achievementsData, education as educationData, certifications as certificationsData } from "../data/content";
import { useEditableCollection, EditableText, ItemControls, AddItemButton } from "edit-kit";

export default function Credentials() {
  const achievements = useEditableCollection("achievements", achievementsData);
  const education = useEditableCollection("education", educationData);
  const certifications = useEditableCollection("certifications", certificationsData);

  return (
    <div id="recognition" className="sidebar-block">
      <p className="section-kicker">Recognition</p>
      <h2 className="sidebar-title">Achievements</h2>
      <ul className="achievements-list">
        {achievements.items.map((a) => (
          <li key={a.id}>
            <EditableText as="span" className="achievement-year" value={a.year} onChange={(v) => achievements.updateItem(a.id, { year: v })} />
            <div>
              <EditableText as="p" className="achievement-title" value={a.title} onChange={(v) => achievements.updateItem(a.id, { title: v })} />
              <EditableText as="p" className="achievement-org" value={a.org} onChange={(v) => achievements.updateItem(a.id, { org: v })} />
            </div>
            <ItemControls
              onMoveUp={() => achievements.moveItem(a.id, -1)}
              onMoveDown={() => achievements.moveItem(a.id, 1)}
              onDelete={() => achievements.removeItem(a.id)}
              canMoveUp={achievements.items.indexOf(a) > 0}
              canMoveDown={achievements.items.indexOf(a) < achievements.items.length - 1}
            />
          </li>
        ))}
      </ul>
      <AddItemButton
        label="Add achievement"
        onClick={() => achievements.addItem({ id: `achievement-${Date.now()}`, year: "2026", title: "New achievement", org: "Organization" })}
      />

      <p className="section-kicker sidebar-subsection-gap">Education & Certifications</p>
      <h2 className="sidebar-title">Background</h2>
      <ul className="education-list">
        {education.items.map((ed) => (
          <li key={ed.id}>
            <EditableText as="p" className="education-degree" value={ed.degree} onChange={(v) => education.updateItem(ed.id, { degree: v })} />
            <EditableText
              as="p"
              className="education-school"
              value={`${ed.school} · ${ed.detail}`}
              onChange={(v) => {
                const [school, detail] = v.split("·").map((x) => x.trim());
                education.updateItem(ed.id, { school: school || ed.school, detail: detail || "" });
              }}
            />
            <ItemControls
              onMoveUp={() => education.moveItem(ed.id, -1)}
              onMoveDown={() => education.moveItem(ed.id, 1)}
              onDelete={() => education.removeItem(ed.id)}
              canMoveUp={education.items.indexOf(ed) > 0}
              canMoveDown={education.items.indexOf(ed) < education.items.length - 1}
            />
          </li>
        ))}
      </ul>
      <AddItemButton
        label="Add education"
        onClick={() => education.addItem({ id: `education-${Date.now()}`, degree: "New degree", school: "School", detail: "" })}
      />

      <div className="tag-row">
        {certifications.items.map((c) => (
          <span className="tag" key={c.id}>
            <EditableText as="span" value={c.label} onChange={(v) => certifications.updateItem(c.id, { label: v })} />
            <ItemControls
              onMoveUp={() => certifications.moveItem(c.id, -1)}
              onMoveDown={() => certifications.moveItem(c.id, 1)}
              onDelete={() => certifications.removeItem(c.id)}
              canMoveUp={certifications.items.indexOf(c) > 0}
              canMoveDown={certifications.items.indexOf(c) < certifications.items.length - 1}
            />
          </span>
        ))}
      </div>
      <AddItemButton
        label="Add certification"
        onClick={() => certifications.addItem({ id: `cert-${Date.now()}`, label: "New certification" })}
      />
    </div>
  );
}
