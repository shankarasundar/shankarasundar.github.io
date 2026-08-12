// Every post is its own JSON file under ./posts/ so creating one is a
// single new file (a GitHub "create", not a rewrite of one big array).
// Vite's glob import enumerates them at build time.
const modules = import.meta.glob("./posts/*.json", { eager: true });

export const posts = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function findPost(slug) {
  return posts.find((p) => p.slug === slug) || null;
}
