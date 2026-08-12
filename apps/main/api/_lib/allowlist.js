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

// Dynamic patterns for one-file-per-item collections (Travel posts, later
// Health sections). `prefix` is how the client names the item; the slug
// after it is validated before ever being interpolated into a path.
const SLUG_PATTERN = /^[a-z0-9-]+$/;

const DYNAMIC_PATTERNS = [
  {
    prefix: "travelPost/",
    shape: "object",
    toPath: (slug) => `apps/travel/src/data/posts/${slug}.json`,
  },
];

// Belt-and-suspenders: even if STATIC_FILES were ever misconfigured, never
// allow a write under .github/** (workflows, CODEOWNERS, etc).
function isForbidden(path) {
  return path.startsWith(".github/");
}

export function resolveFile(key) {
  const entry = STATIC_FILES[key];
  if (entry) {
    if (isForbidden(entry.path)) return null;
    return entry;
  }

  for (const pattern of DYNAMIC_PATTERNS) {
    if (!key.startsWith(pattern.prefix)) continue;
    const slug = key.slice(pattern.prefix.length);
    if (!SLUG_PATTERN.test(slug)) return null;
    const path = pattern.toPath(slug);
    if (isForbidden(path)) return null;
    return { path, shape: pattern.shape };
  }

  return null;
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

// Where uploaded images are allowed to land. `site` is a short name the
// client sends (never a raw path); `publicPath` is the URL path the file
// is served at once built (Vite serves everything under public/ at "/").
const UPLOAD_DESTINATIONS = {
  travel: { dir: "apps/travel/public/uploads", publicPath: "/uploads" },
};

const FILENAME_PATTERN = /^[a-z0-9][a-z0-9._-]{0,80}$/i;
const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

export function resolveUploadDir(site) {
  return UPLOAD_DESTINATIONS[site] || null;
}

export function isSafeImageFilename(filename) {
  if (!FILENAME_PATTERN.test(filename)) return false;
  const ext = filename.slice(filename.lastIndexOf(".")).toLowerCase();
  return ALLOWED_EXTENSIONS.has(ext);
}
