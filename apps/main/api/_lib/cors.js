// Strict, exact-match CORS so *.shankshub.page subdomains (and only them)
// can call this API with credentials. No wildcard, no suffix matching —
// an attacker-controlled lookalike subdomain must never be accepted.

function allowedOrigins() {
  return (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

// Returns true if the request's Origin header is present and admitted, and
// applies the matching CORS headers to the response. Callers should still
// answer OPTIONS preflights themselves via handlePreflight below.
export function applyCors(req, res) {
  const origin = req.headers.origin;
  const allowed = allowedOrigins();

  // These responses vary per-Origin (session cookies, credentials) — never
  // let Vercel's edge cache one origin's CORS headers and serve them to a
  // different origin. `Vary: Origin` alone isn't reliably honored by the
  // edge cache layer for serverless function responses.
  res.setHeader("Cache-Control", "no-store");

  if (origin && allowed.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Vary", "Origin");
  }
}

// Call at the top of every handler. Returns true if the request was a
// preflight and has already been answered (caller should return immediately).
export function handlePreflight(req, res) {
  applyCors(req, res);
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(204).end();
    return true;
  }
  return false;
}
