export interface StaffAuthor {
  slug: string;
  name: string;
  handle: string;
  title: string;
  beat: string;
  bio: string;
  chips: { culture: string; vibe: string; focus: string };
  metric: string;
}

/**
 * SPRK Studio contributor roster. Every generated article is attributed to one
 * of these contributors via `authorSlug`, and their article lists grow
 * automatically as new pieces are published.
 */
export const EDITORIAL_DISCLOSURE =
  "SPRK Studio contributors research and write with AI assistance under human editorial review.";

export const staffAuthors: StaffAuthor[] = [
  {
    slug: "theo-marsh",
    name: "Theo Marsh",
    handle: "@theomarsh",
    title: "Creator Economy Correspondent",
    beat: "Creator business, monetization, platform policy",
    bio: "Theo covers the money side of culture: rev-share math, platform policy shifts, and what mid-tier creators actually take home. Before SPRK Studio, he spent years tracking the gap between follower counts and rent money.",
    chips: { culture: "Creator Economy", vibe: "Receipts-First", focus: "Monetization & Policy" },
    metric: "SPRK Studio",
  },
  {
    slug: "maya-delacroix",
    name: "Maya Delacroix",
    handle: "@mayadlx",
    title: "Fashion & Drops Editor",
    beat: "Streetwear, drop culture, collaborative commerce",
    bio: "Maya reads a release calendar the way other people read box scores. She covers drops as culture — who gets access, who shares the upside, and why scarcity only works when the community can see the rules.",
    chips: { culture: "Drop Culture", vibe: "Premium / Sharp", focus: "Collaborative Commerce" },
    metric: "SPRK Studio",
  },
  {
    slug: "dez-carter",
    name: "Dez Carter",
    handle: "@dezplays",
    title: "Gaming & Internet Culture Writer",
    beat: "Gaming, streaming, communities, internet moments",
    bio: "Dez writes about the rooms behind the runs — chat rituals, community-built strategies, and the clips that turn a stream into a shared memory. If it broke the feed, Dez wants to know why it landed.",
    chips: { culture: "Streaming Rooms", vibe: "High-Energy", focus: "Community Mechanics" },
    metric: "SPRK Studio",
  },
  {
    slug: "lena-osei",
    name: "Lena Osei",
    handle: "@lenahears",
    title: "Music & Sound Culture Writer",
    beat: "Music, audio trends, artist strategy",
    bio: "Lena covers how songs travel now — from voice memo to fragment to feed to catalog. Her beat is the negotiation between craft and distribution, and the artists finding leverage in both.",
    chips: { culture: "Sound Culture", vibe: "Tender / Analytical", focus: "Artist Strategy" },
    metric: "SPRK Studio",
  },
  {
    slug: "priya-anand",
    name: "Priya Anand",
    handle: "@priyabuilds",
    title: "AI & Creator Tools Reporter",
    beat: "AI tooling, creative workflows, authorship",
    bio: "Priya tests the tools so creators don't have to. She covers AI in creative work with one standing question: does this protect the author's hand, or replace it?",
    chips: { culture: "Creative Tooling", vibe: "Curious / Skeptical", focus: "Workflow & Authorship" },
    metric: "SPRK Studio",
  },
  {
    slug: "marcus-webb",
    name: "Marcus Webb",
    handle: "@webbwatches",
    title: "Film & Television Critic",
    beat: "Film, TV, fandom, cultural memory",
    bio: "Marcus reviews screen culture for audiences who bring their whole memory to the theater. Craft, context, and care in the same piece — joy and critique allowed in the same paragraph.",
    chips: { culture: "Screen Culture", vibe: "Fan-Literate", focus: "Ensemble & Legacy Work" },
    metric: "SPRK Studio",
  },
];

export function getStaffAuthor(slug?: string) {
  return staffAuthors.find((author) => author.slug === slug);
}

const avatarGradients = [
  ["#FF6B35", "#CC0055"],
  ["#1E2235", "#4A5278"],
  ["#E8003D", "#8E7A8A"],
  ["#CC0055", "#1E2235"],
  ["#4A5278", "#FF6B35"],
  ["#8E7A8A", "#E8003D"],
];

/** Deterministic SPRK-gradient monogram avatar (inline SVG, no external service). */
export function authorAvatar(author: StaffAuthor) {
  const initials = author.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const index = staffAuthors.findIndex((a) => a.slug === author.slug);
  const [from, to] = avatarGradients[(index + avatarGradients.length) % avatarGradients.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="160" height="160" fill="url(#g)"/><text x="80" y="80" dy="0.36em" text-anchor="middle" font-family="system-ui,sans-serif" font-size="56" font-weight="800" fill="#FFFFFF">${initials}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
