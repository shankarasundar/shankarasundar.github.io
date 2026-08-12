// Every section is its own JSON file under ./sections/ so adding one is a
// single new file, not a rewrite of one big array.
const modules = import.meta.glob("./sections/*.json", { eager: true });

export const sections = Object.values(modules).map((m) => m.default);

export function findSection(slug) {
  return sections.find((s) => s.slug === slug) || null;
}
