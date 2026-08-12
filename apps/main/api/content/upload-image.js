import { handlePreflight } from "../_lib/cors.js";
import { isAuthenticated } from "../_lib/session.js";
import { resolveUploadDir, isSafeImageFilename } from "../_lib/allowlist.js";
import { putBinaryFile } from "../_lib/github.js";

// Vercel's serverless functions have a hard ~4.5MB request body limit at the
// platform level (no per-route override). Base64 grows content by ~4/3, so
// this caps the decoded image at roughly 3MB — comfortably under that limit
// with headroom for the JSON wrapper, and the client resizes images before
// upload so real photos land well under this anyway.
const MAX_BASE64_LENGTH = 4_200_000;

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

  const { site, filename, dataBase64 } = req.body || {};

  const dest = resolveUploadDir(site);
  if (!dest) {
    res.status(403).json({ error: `Uploads are not allowed for '${site}'` });
    return;
  }

  if (!filename || !isSafeImageFilename(filename)) {
    res.status(400).json({ error: "Invalid filename — use a simple name ending in .jpg/.png/.webp/.gif" });
    return;
  }

  if (!dataBase64 || typeof dataBase64 !== "string") {
    res.status(400).json({ error: "Missing image data" });
    return;
  }
  if (dataBase64.length > MAX_BASE64_LENGTH) {
    res.status(400).json({ error: "Image is too large — please use a smaller photo" });
    return;
  }

  const uniqueName = `${Date.now()}-${filename}`;
  const path = `${dest.dir}/${uniqueName}`;

  try {
    await putBinaryFile(path, dataBase64, { message: `Upload image: ${uniqueName}` });
    res.status(200).json({ ok: true, path: `${dest.publicPath}/${uniqueName}` });
  } catch (err) {
    console.error("upload-image failed:", err);
    res.status(500).json({ error: "Upload failed" });
  }
}
