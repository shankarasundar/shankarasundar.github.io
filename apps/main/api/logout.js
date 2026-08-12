import { handlePreflight } from "./_lib/cors.js";
import { buildClearCookie } from "./_lib/session.js";

export default function handler(req, res) {
  if (handlePreflight(req, res)) return;

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  res.setHeader("Set-Cookie", buildClearCookie());
  res.status(200).json({ authenticated: false });
}
