// Server-side allowlist mapping a logical collection key (sent by the
// client) to the real path of the file it may write in the repo. The client
// NEVER sends a raw path — this is the only thing standing between "the
// admin edited a project" and "an attacker overwrote an arbitrary file".
//
// Phase 2/3 (Travel posts, Health sections) will extend this with pattern
// rules (e.g. apps/travel/src/data/posts/<slug>.json); for now it's a fixed
// map of the main site's data files.

const STATIC_FILES = {
  profile: { path: "apps/main/src/data/profile.json", shape: "object" },
  stats: { path: "apps/main/src/data/stats.json", shape: "array" },
  problems: { path: "apps/main/src/data/problems.json", shape: "array" },
  skills: { path: "apps/main/src/data/skills.json", shape: "array" },
  projects: { path: "apps/main/src/data/projects.json", shape: "array" },
  experience: { path: "apps/main/src/data/experience.json", shape: "array" },
  achievements: { path: "apps/main/src/data/achievements.json", shape: "array" },
  education: { path: "apps/main/src/data/education.json", shape: "array" },
  certifications: { path: "apps/main/src/data/certifications.json", shape: "array" },
  personal: { path: "apps/main/src/data/personal.json", shape: "object" },
  stravaActivities: { path: "apps/main/src/data/stravaActivities.json", shape: "array" },
  linkedinPosts: { path: "apps/main/src/data/linkedinPosts.json", shape: "array" },
};

// Belt-and-suspenders: even if STATIC_FILES were ever misconfigured, never
// allow a write under .github/** (workflows, CODEOWNERS, etc).
function isForbidden(path) {
  return path.startsWith(".github/");
}

export function resolveFile(key) {
  const entry = STATIC_FILES[key];
  if (!entry) return null;
  if (isForbidden(entry.path)) return null;
  return entry;
}

export function listKeys() {
  return Object.keys(STATIC_FILES);
}

export function matchesShape(shape, data) {
  if (shape === "array") return Array.isArray(data);
  if (shape === "object") return typeof data === "object" && data !== null && !Array.isArray(data);
  return false;
}

// For array collections, every item needs a stable `id` (string) — this is
// what makes add/remove/reorder safe. Singleton objects have no items to check.
export function itemsHaveIds(data) {
  if (!Array.isArray(data)) return true;
  return data.every((item) => item && typeof item.id === "string" && item.id.length > 0);
}
