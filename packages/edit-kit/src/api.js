// Thin fetch wrapper for the shared admin API. `apiBase` is "" for the main
// site (same-origin, relative /api/... calls) and an absolute URL like
// "https://shankshub.page/api" for apps/travel and apps/health, which call
// the main site's API cross-origin so the login session stays shared.

async function request(apiBase, path, options = {}) {
  const res = await fetch(`${apiBase}/api${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(body.error || `Request failed (${res.status})`);
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return body;
}

export function getSession(apiBase) {
  return request(apiBase, "/session");
}

export function login(apiBase, password) {
  return request(apiBase, "/login", { method: "POST", body: JSON.stringify({ password }) });
}

export function logout(apiBase) {
  return request(apiBase, "/logout", { method: "POST" });
}

export function saveContent(apiBase, file, data, { expectedSha, expectCreate } = {}) {
  return request(apiBase, "/content/save", {
    method: "POST",
    body: JSON.stringify({ file, data, expectedSha, expectCreate }),
  });
}
