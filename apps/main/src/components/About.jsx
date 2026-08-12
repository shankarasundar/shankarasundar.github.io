import { stats as statsData, problems as problemsData } from "../data/content";
import { useEditableCollection, EditableText, ItemControls, AddItemButton } from "edit-kit";

export default function About() {
  const stats = useEditableCollection("stats", statsData);
  const problems = useEditableCollection("problems", problemsData);

  return (
    <section id="about" className="section">
      <div className="stats-grid">
        {stats.items.map((s) => (
          <div className="stat" key={s.id}>
            <EditableText as="div" className="stat-value" value={s.value} onChange={(v) => stats.updateItem(s.id, { value: v })} />
            <EditableText as="div" className="stat-label" value={s.label} onChange={(v) => stats.updateItem(s.id, { label: v })} />
            <ItemControls
              onMoveUp={() => stats.moveItem(s.id, -1)}
              onMoveDown={() => stats.moveItem(s.id, 1)}
              onDelete={() => stats.removeItem(s.id)}
              canMoveUp={stats.items.indexOf(s) > 0}
              canMoveDown={stats.items.indexOf(s) < stats.items.length - 1}
            />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add stat"
        onClick={() => stats.addItem({ id: `stat-${Date.now()}`, value: "New stat", label: "Description" })}
      />

      <p className="section-kicker">Problems I solve</p>
      <h2 className="section-title">Where I create leverage</h2>

      <div className="problems-grid">
        {problems.items.map((p) => (
          <div className="problem-card" key={p.id}>
            <span className="problem-tag">{p.tag}</span>
            <EditableText as="h3" value={p.title} onChange={(v) => problems.updateItem(p.id, { title: v })} />
            <EditableText as="p" value={p.body} onChange={(v) => problems.updateItem(p.id, { body: v })} />
            <ItemControls
              onMoveUp={() => problems.moveItem(p.id, -1)}
              onMoveDown={() => problems.moveItem(p.id, 1)}
              onDelete={() => problems.removeItem(p.id)}
              canMoveUp={problems.items.indexOf(p) > 0}
              canMoveDown={problems.items.indexOf(p) < problems.items.length - 1}
            />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add problem"
        onClick={() =>
          problems.addItem({
            id: `problem-${Date.now()}`,
            tag: String(problems.items.length + 1).padStart(2, "0"),
            title: "New problem",
            body: "Description",
          })
        }
      />
    </section>
  );
}
