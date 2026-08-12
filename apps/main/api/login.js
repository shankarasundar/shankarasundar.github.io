import bcrypt from "bcryptjs";
import { handlePreflight } from "./_lib/cors.js";
import { createSessionToken, buildSetCookie } from "./_lib/session.js";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function handler(req, res) {
  if (handlePreflight(req, res)) return;

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const password = req.body?.password;
  const hash = process.env.ADMIN_PASSWORD_HASH;

  if (!password || !hash) {
    await delay(300 + Math.random() * 200);
    res.status(401).json({ authenticated: false, error: "Invalid password" });
    return;
  }

  const ok = await bcrypt.compare(password, hash);
  if (!ok) {
    await delay(300 + Math.random() * 200);
    res.status(401).json({ authenticated: false, error: "Invalid password" });
    return;
  }

  const token = createSessionToken();
  res.setHeader("Set-Cookie", buildSetCookie(token));
  res.status(200).json({ authenticated: true });
}
