import { useEditMode } from "./EditModeContext.jsx";

// Small per-item toolbar (▲▼ reorder, delete) — drop this inside an existing
// item card/row rather than restructuring how the list itself renders.
export function ItemControls({ onMoveUp, onMoveDown, onDelete, canMoveUp, canMoveDown }) {
  const { isEditMode } = useEditMode();
  if (!isEditMode) return null;

  return (
    <div className="ek-item-controls">
      <button type="button" onClick={onMoveUp} disabled={!canMoveUp} aria-label="Move up">
        ▲
      </button>
      <button type="button" onClick={onMoveDown} disabled={!canMoveDown} aria-label="Move down">
        ▼
      </button>
      <button type="button" onClick={onDelete} className="ek-item-delete" aria-label="Delete">
        ✕
      </button>
    </div>
  );
}

export function AddItemButton({ onClick, label = "Add item" }) {
  const { isEditMode } = useEditMode();
  if (!isEditMode) return null;

  return (
    <button type="button" className="ek-add-item" onClick={onClick}>
      + {label}
    </button>
  );
}
