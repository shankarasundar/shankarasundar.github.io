import { useCallback, useState } from "react";
import { useEditMode } from "./EditModeContext.jsx";

// The integration point each component uses in place of the raw JSON import.
// `initialData` is the statically-imported array (or object) for `file`.
export function useEditableCollection(file, initialData) {
  const { isEditMode, markDirty } = useEditMode();
  const [items, setItemsState] = useState(initialData);

  const commit = useCallback(
    (next) => {
      setItemsState(next);
      markDirty(file, next);
    },
    [file, markDirty]
  );

  const updateItem = useCallback(
    (id, patch) => {
      commit(items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
    },
    [items, commit]
  );

  const addItem = useCallback(
    (template) => {
      commit([...items, template]);
    },
    [items, commit]
  );

  const removeItem = useCallback(
    (id) => {
      commit(items.filter((item) => item.id !== id));
    },
    [items, commit]
  );

  const moveItem = useCallback(
    (id, direction) => {
      const index = items.findIndex((item) => item.id === id);
      if (index === -1) return;
      const target = index + direction;
      if (target < 0 || target >= items.length) return;
      const next = items.slice();
      [next[index], next[target]] = [next[target], next[index]];
      commit(next);
    },
    [items, commit]
  );

  // For singleton objects (profile, personal) rather than arrays.
  const updateField = useCallback(
    (key, value) => {
      commit({ ...items, [key]: value });
    },
    [items, commit]
  );

  return { items, isEditable: isEditMode, updateItem, addItem, removeItem, moveItem, updateField };
}
