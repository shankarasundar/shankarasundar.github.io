export { EditModeProvider, useEditMode } from "./EditModeContext.jsx";
export { useEditableCollection } from "./useEditableCollection.js";
export { EditableText } from "./EditableText.jsx";
export { ItemControls, AddItemButton } from "./EditableList.jsx";
export { LoginGate } from "./LoginGate.jsx";
export { SaveBar } from "./SaveBar.jsx";

// styles.css is not re-exported here (CSS can't be re-exported from a JS
// barrel) — consuming apps import it directly:
//   import "edit-kit/src/styles.css";
