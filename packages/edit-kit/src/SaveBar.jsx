import { useEditMode } from "./EditModeContext.jsx";

export function SaveBar() {
  const { isAdmin, hasDirtyChanges, pendingFiles, saveAll, discardAll, saveState, saveError } = useEditMode();

  if (!isAdmin || !hasDirtyChanges) return null;

  return (
    <div className="ek-save-bar">
      <span className="ek-save-bar-status">
        {saveState === "saving" && "Saving…"}
        {saveState === "saved" && "Saved — publishing, live in about a minute."}
        {saveState === "error" && `Save failed: ${saveError}`}
        {saveState === "idle" && `${pendingFiles.length} section${pendingFiles.length === 1 ? "" : "s"} changed`}
      </span>
      <div className="ek-save-bar-actions">
        <button type="button" onClick={discardAll} disabled={saveState === "saving"}>
          Discard
        </button>
        <button type="button" className="ek-save-bar-save" onClick={saveAll} disabled={saveState === "saving"}>
          Save all
        </button>
      </div>
    </div>
  );
}
