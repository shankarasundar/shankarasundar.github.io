// Stateless, HMAC-signed session cookie. No session store/DB — the token
// itself carries an expiry and a signature that only this server can produce
// or verify (SESSION_SECRET never leaves the server).
import crypto from "node:crypto";

export const COOKIE_NAME = "shankshub_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function b64url(input) {
  return Buffer.from(input).toString("base64url");
}

function sign(payload) {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set");
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createSessionToken() {
  const payload = b64url(JSON.stringify({ exp: Date.now() + MAX_AGE_SECONDS * 1000 }));
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  let expectedSignature;
  try {
    expectedSignature = sign(payload);
  } catch {
    return false;
  }

  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSignature);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  try {
    const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof exp === "number" && Date.now() < exp;
  } catch {
    return false;
  }
}

export function getCookie(req, name) {
  const header = req.headers.cookie;
  if (!header) return null;
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return null;
}

function cookieDomain() {
  // e.g. "shankshub.page" -> ".shankshub.page" so the cookie is shared
  // across all *.shankshub.page subdomains (main, travel, health).
  const domain = process.env.COOKIE_DOMAIN;
  return domain ? `Domain=${domain}; ` : "";
}

export function buildSetCookie(token) {
  return (
    `${COOKIE_NAME}=${encodeURIComponent(token)}; ` +
    `${cookieDomain()}Path=/; HttpOnly; Secure; SameSite=None; Max-Age=${MAX_AGE_SECONDS}`
  );
}

export function buildClearCookie() {
  return `${COOKIE_NAME}=; ${cookieDomain()}Path=/; HttpOnly; Secure; SameSite=None; Max-Age=0`;
}

export function isAuthenticated(req) {
  return verifySessionToken(getCookie(req, COOKIE_NAME));
}
