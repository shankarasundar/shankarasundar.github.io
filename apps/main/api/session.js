import { handlePreflight } from "./_lib/cors.js";
import { isAuthenticated } from "./_lib/session.js";

export default function handler(req, res) {
  if (handlePreflight(req, res)) return;

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  res.status(200).json({ authenticated: isAuthenticated(req) });
}
