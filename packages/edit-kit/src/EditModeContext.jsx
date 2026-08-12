import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getSession, login as apiLogin, logout as apiLogout, saveContent } from "./api.js";

const EditModeContext = createContext(null);

export function EditModeProvider({ apiBase = "", children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditMode, setEditMode] = useState(true);
  const [checkedSession, setCheckedSession] = useState(false);
  const [pending, setPending] = useState({}); // { [file]: { data, sha } }
  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved | error
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    getSession(apiBase)
      .then((res) => setIsAdmin(Boolean(res.authenticated)))
      .catch(() => setIsAdmin(false))
      .finally(() => setCheckedSession(true));
  }, [apiBase]);

  const login = useCallback(
    async (password) => {
      await apiLogin(apiBase, password);
      setIsAdmin(true);
    },
    [apiBase]
  );

  const logout = useCallback(async () => {
    await apiLogout(apiBase).catch(() => {});
    setIsAdmin(false);
    setPending({});
  }, [apiBase]);

  const markDirty = useCallback((file, data, { expectCreate } = {}) => {
    setPending((prev) => ({ ...prev, [file]: { data, sha: prev[file]?.sha, expectCreate } }));
  }, []);

  const discardAll = useCallback(() => {
    setPending({});
    setSaveState("idle");
    setSaveError(null);
    // Local component state was already mutated optimistically — the
    // simplest correct way back to the last-published copy is a reload.
    window.location.reload();
  }, []);

  const saveAll = useCallback(async () => {
    const files = Object.keys(pending);
    if (files.length === 0) return;

    setSaveState("saving");
    setSaveError(null);

    try {
      for (const file of files) {
        const { data, sha, expectCreate } = pending[file];
        await saveContent(apiBase, file, data, { expectedSha: sha, expectCreate });
      }
      setPending({});
      setSaveState("saved");
    } catch (err) {
      setSaveState("error");
      setSaveError(err.message || "Save failed");
      throw err;
    }
  }, [apiBase, pending]);

  const value = useMemo(
    () => ({
      isAdmin,
      isEditMode: isAdmin && isEditMode,
      setEditMode,
      checkedSession,
      login,
      logout,
      markDirty,
      discardAll,
      saveAll,
      pendingFiles: Object.keys(pending),
      hasDirtyChanges: Object.keys(pending).length > 0,
      saveState,
      saveError,
    }),
    [isAdmin, isEditMode, checkedSession, login, logout, markDirty, discardAll, saveAll, pending, saveState, saveError]
  );

  return <EditModeContext.Provider value={value}>{children}</EditModeContext.Provider>;
}

export function useEditMode() {
  const ctx = useContext(EditModeContext);
  if (!ctx) throw new Error("useEditMode must be used within an EditModeProvider");
  return ctx;
}
