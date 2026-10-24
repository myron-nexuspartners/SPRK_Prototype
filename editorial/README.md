# SPRK Editorial Pipeline

How weekly article generation works for the SPRK prototype.

## The loop

1. **Topics in.** Myron adds topics to `topics-queue.json` (or tells the agent in chat / the editorial dashboard). Status: `suggested`.
2. **Suggestions back.** The agent proposes an angle, author, category, and tag set for each topic. Myron confirms, edits, or replaces. Approved items get status `approved`.
3. **Research & write.** For each approved topic the agent researches the subject on the live web, collects factual sources, and writes the piece — headline, subhead (deck), body, pull-quote, tags, and a hero image. Every factual claim must trace to a listed source. Status: `in_progress`.
4. **Publish.** The finished article lands as a JSON file in `client/src/data/articles/` and is validated with `pnpm validate:content`. The app picks it up automatically — feed, article page, author page, filters. Status: `published`.
5. **Deploy.** Work happens on a feature branch. Nothing reaches the production URL without Myron's explicit approval.

## Cadence

Target: 5–7 pieces per week, attributed across the SPRK Studio contributor roster (`client/src/data/authors.ts`) so every contributor's article list grows over time.

## Article file format

See `client/src/data/feedContent.ts` (`GeneratedArticleJson`) for the authoritative type. Required: `id` (kebab-case slug, unique), `authorSlug` (must exist in authors.ts), `community`, `publishedAt` (ISO date), `title`, `deck`, `image` (https URL or wireframe asset filename), `imageAlt`, `category`, `contentType`, `body` (array of paragraphs), `tags` ({ topics[], audience[], geography, activityType }), `sources` ([{ label, url }]).

## Editorial standards

- No invented facts, statistics, or quotes. Numbers come from the listed sources.
- Hero images must be licensed for use (Unsplash/Pexels) — no hotlinked press images.
- Every AI-assisted piece carries `isAiAssisted: true`; the site renders the SPRK Studio disclosure with it.
- Bylines rotate across the roster; match the beat to the topic.
