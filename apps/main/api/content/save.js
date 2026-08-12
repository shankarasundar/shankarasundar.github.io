import { handlePreflight } from "../_lib/cors.js";
import { isAuthenticated } from "../_lib/session.js";
import { resolveFile, matchesShape, itemsHaveIds } from "../_lib/allowlist.js";
import { getFile, putFile } from "../_lib/github.js";

export default async function handler(req, res) {
  if (handlePreflight(req, res)) return;

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!isAuthenticated(req)) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const { file, data, expectedSha, expectCreate } = req.body || {};

  if (!file || typeof file !== "string") {
    res.status(400).json({ error: "Missing or invalid 'file'" });
    return;
  }

  const entry = resolveFile(file);
  if (!entry) {
    res.status(403).json({ error: `'${file}' is not an editable collection` });
    return;
  }

  if (data === undefined) {
    res.status(400).json({ error: "Missing 'data'" });
    return;
  }
  if (!matchesShape(entry.shape, data)) {
    res.status(400).json({ error: `'${file}' must be ${entry.shape === "array" ? "an array" : "an object"}` });
    return;
  }
  if (!itemsHaveIds(data)) {
    res.status(400).json({ error: `Every item in '${file}' needs a non-empty string 'id'` });
    return;
  }

  try {
    // Re-fetch the current sha ourselves rather than trusting the client's
    // copy blindly — expectedSha (if provided) is only used to detect a
    // conflict against what the admin last saw.
    const current = await getFile(entry.path);

    if (expectCreate && current.data !== null) {
      res.status(409).json({ error: "An item with that identifier already exists" });
      return;
    }

    if (expectedSha && current.sha && expectedSha !== current.sha) {
      res.status(409).json({
        error: "The file changed since you last loaded it",
        currentSha: current.sha,
        currentData: current.data,
      });
      return;
    }

    const { sha } = await putFile(entry.path, data, {
      sha: current.sha, // undefined/null => GitHub treats this as a create
      message: `Admin edit: update ${file}`,
    });

    res.status(200).json({ ok: true, file, sha });
  } catch (err) {
    if (err.status === 409) {
      res.status(409).json({ error: "Save conflict, please reload and retry" });
      return;
    }
    console.error("content/save failed:", err);
    res.status(500).json({ error: "Save failed" });
  }
}
