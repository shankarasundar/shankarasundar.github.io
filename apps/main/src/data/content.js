// Thin re-export shim: real data lives in the per-collection JSON files
// alongside this one. Keeping this file means every component's existing
// `import { x } from "../data/content"` line stays unchanged.
export { default as profile } from "./profile.json";
export { default as stats } from "./stats.json";
export { default as problems } from "./problems.json";
export { default as skills } from "./skills.json";
export { default as projects } from "./projects.json";
export { default as experience } from "./experience.json";
export { default as achievements } from "./achievements.json";
export { default as education } from "./education.json";
export { default as personal } from "./personal.json";
export { default as stravaActivities } from "./stravaActivities.json";
export { default as linkedinPosts } from "./linkedinPosts.json";
export { default as certifications } from "./certifications.json";
