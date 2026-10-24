/**
 * Validates pipeline-generated article JSON files and the topic queue.
 * Run: pnpm validate:content
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const articlesDir = join(root, "client/src/data/articles");
const authorsFile = readFileSync(join(root, "client/src/data/authors.ts"), "utf8");
const curatedFile = readFileSync(join(root, "client/src/data/feedContent.ts"), "utf8");

const authorSlugs = [...authorsFile.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);

const articleSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, "id must be kebab-case"),
  authorSlug: z.string().refine((slug) => authorSlugs.includes(slug), "authorSlug not in authors.ts roster"),
  community: z.string().min(3),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "publishedAt must be YYYY-MM-DD"),
  title: z.string().min(20).max(160),
  deck: z.string().min(30).max(300),
  image: z.string().refine((v) => v.startsWith("https://") || /^[\w.-]+$/.test(v), "image must be https URL or asset filename"),
  imageAlt: z.string().min(10),
  category: z.string().min(2),
  contentType: z.enum(["article", "video", "shorts", "tool"]),
  isAiAssisted: z.boolean().optional(),
  sponsored: z.boolean().optional(),
  cta: z.string().optional(),
  body: z
    .array(z.string().min(4))
    .min(4)
    .refine((blocks) => {
      const substantive = blocks.filter((block) => {
        if (block.startsWith("## ")) return false;
        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
        const isList = lines.length > 1 && lines.every((l) => l.startsWith("- ") || /^\d+\.\s/.test(l));
        return isList || block.length >= 80;
      });
      return substantive.length >= 4;
    }, "articles need at least 4 substantive blocks (paragraphs ≥80 chars or lists)")
    .refine(
      (blocks) => blocks.every((block) => block.startsWith("## ") || block.length >= 40 || block.split("\n").length > 1),
      "non-heading blocks must be substantive (≥40 chars or multi-line lists)",
    ),
  quote: z.string().optional(),
  tags: z.object({
    topics: z.array(z.string()).min(1),
    audience: z.array(z.string()).min(1),
    geography: z.string().min(2),
    activityType: z.string().min(2),
  }),
  sources: z.array(z.object({ label: z.string().min(5), url: z.string().url() })).min(2, "articles need at least 2 sources"),
  comments: z.string().optional(),
  shares: z.string().optional(),
  likes: z.string().optional(),
});

let failures = 0;
const seenIds = new Set<string>();

const files = readdirSync(articlesDir).filter((file) => file.endsWith(".json"));
for (const file of files) {
  const raw = JSON.parse(readFileSync(join(articlesDir, file), "utf8"));
  const result = articleSchema.safeParse(raw);
  if (!result.success) {
    failures++;
    console.error(`✗ ${file}`);
    for (const issue of result.error.issues) console.error(`    ${issue.path.join(".")}: ${issue.message}`);
    continue;
  }
  if (seenIds.has(result.data.id) || curatedFile.includes(`id: "${result.data.id}"`)) {
    failures++;
    console.error(`✗ ${file}: duplicate id "${result.data.id}"`);
    continue;
  }
  seenIds.add(result.data.id);
  console.log(`✓ ${file} (${result.data.id} · ${result.data.authorSlug})`);
}

console.log(`\n${files.length} article(s) checked, ${failures} failure(s).`);
if (failures > 0) process.exit(1);
