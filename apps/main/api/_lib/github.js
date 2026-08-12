// Thin wrapper around the GitHub Contents API. This is the ONLY place that
// ever touches GITHUB_TOKEN. Every write is a real commit to `main`, which
// is what triggers Vercel's rebuild — there is no separate deploy step here.

function apiBase() {
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  if (!owner || !repo) throw new Error("GITHUB_REPO_OWNER/GITHUB_REPO_NAME not set");
  return `https://api.github.com/repos/${owner}/${repo}`;
}

function authHeaders() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is not set");
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

function branch() {
  return process.env.GITHUB_BRANCH || "main";
}

// Returns { data, sha } for an existing file, or { data: null, sha: null }
// if it doesn't exist yet (so callers can distinguish "update" vs "create").
export async function getFile(path) {
  const res = await fetch(`${apiBase()}/contents/${path}?ref=${branch()}`, {
    headers: authHeaders(),
  });

  if (res.status === 404) return { data: null, sha: null };
  if (!res.ok) throw new Error(`GitHub GET ${path} failed: ${res.status} ${await res.text()}`);

  const json = await res.json();
  const content = Buffer.from(json.content, "base64").toString("utf8");
  return { data: JSON.parse(content), sha: json.sha };
}

// Commits `data` (any JSON-serializable value) to `path`. Pass the sha you
// last read to update an existing file; omit it to create a new one — the
// GitHub API itself enforces the "sha required to update" rule and returns
// a 409/422 on a stale sha, which callers surface as a conflict.
export async function putFile(path, data, { sha, message } = {}) {
  const body = {
    message: message || `Update ${path} via admin edit`,
    content: Buffer.from(JSON.stringify(data, null, 2) + "\n", "utf8").toString("base64"),
    branch: branch(),
  };
  if (sha) body.sha = sha;

  const res = await fetch(`${apiBase()}/contents/${path}`, {
    method: "PUT",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (res.status === 409 || res.status === 422) {
    const detail = await res.json().catch(() => ({}));
    const err = new Error("conflict");
    err.status = 409;
    err.detail = detail;
    throw err;
  }
  if (!res.ok) throw new Error(`GitHub PUT ${path} failed: ${res.status} ${await res.text()}`);

  const json = await res.json();
  return { sha: json.content.sha };
}
