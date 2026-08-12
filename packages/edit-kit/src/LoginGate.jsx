import { useState } from "react";
import { useEditMode } from "./EditModeContext.jsx";

export function LoginGate() {
  const { checkedSession, isAdmin, login, logout } = useEditMode();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (!checkedSession) return null;

  if (isAdmin) {
    return (
      <button type="button" className="ek-admin-link" onClick={logout}>
        Log out (admin)
      </button>
    );
  }

  if (!open) {
    return (
      <button type="button" className="ek-admin-link" onClick={() => setOpen(true)}>
        Admin
      </button>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await login(password);
      setOpen(false);
      setPassword("");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="ek-login-form" onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="Admin password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
      />
      <button type="submit" disabled={submitting || !password}>
        {submitting ? "..." : "Log in"}
      </button>
      <button type="button" onClick={() => setOpen(false)}>
        Cancel
      </button>
      {error && <span className="ek-login-error">{error}</span>}
    </form>
  );
}
