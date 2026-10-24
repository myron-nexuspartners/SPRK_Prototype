# SPRK Editorial Lab — Authorship & Writing Standards

Living document. Updated every time the writing system or the roster changes. Last updated: **2026-07-28** (v1.1 — added structure conventions after Myron's readability review).

---

## 1. Writing standards

### Voice
- Human cadence, no AI tells: no "In today's fast-paced world," no "it's important to note," no symmetrical listicle filler, no em-dash addiction, no closing paragraph that begins "In conclusion."
- Each contributor has a distinct register (see roster). The byline should be guessable from the prose.
- Confidence with receipts: every factual claim traces to a listed source. No invented statistics, quotes, or events. Numbers are attributed in-text ("industry trackers put…", "reporting this year describes…") and linked in Sources.

### Structure (added 2026-07-28)
Readers should be able to skim the skeleton and still learn something. Every article uses the structural toolkit **where the content genuinely calls for it** — structure signals critical thinking; decorative structure signals the opposite.

- **Blank line between every paragraph.** Rendered automatically by the article template; body blocks are discrete paragraphs, never wall-of-text.
- **Subheads (`## `)** — 2–3 per piece, at real hinge points in the argument. Written as claims or questions, not labels ("Why the block keeps working," not "Background").
- **Bulleted lists (`- `)** — for parallel evidence, comparisons, and feature sets. Use **claim → warrant** form: bold the claim, follow with the reasoning or evidence that earns it.
- **Numbered lists (`1. `)** — only for genuine sequences: playbooks, ordered steps, ranked priorities.
- **Bold (`**…**`)** — the claim half of claim→warrant bullets, and sparingly for load-bearing phrases in prose.
- **Pull-quote** — one per piece, the article's thesis in its most portable form.
- When NOT to structure: narrative and essay pieces (e.g., culture criticism) may run prose-forward with subheads only. Bullets in an elegy are a tell.

### Argument quality
- **Claim → warrant discipline:** no assertion stands alone; the next sentence (or the bullet's second half) says why the reader should believe it.
- Name the counterargument or risk at least once per piece ("The uncomfortable part…", "There is a risk worth naming…").
- End on synthesis, not summary — the last paragraph should say something the first paragraph couldn't have.

### Sourcing & imagery
- Minimum 2 sources (validator-enforced), target 3–4. Prefer primary/reputable; label each source with publication + article title.
- Hero images: licensed stock (Unsplash/Pexels) with accurate alt text. No hotlinked press images. AI-generated imagery only if/when Myron enables it.
- Every AI-assisted piece carries `isAiAssisted: true` → the site renders the SPRK Studio disclosure automatically.

### Disclosure (site-wide)
> "SPRK Studio contributors research and write with AI assistance under human editorial review."

Rendered on every contributor page and in the author box of every AI-assisted article. Defined once in `client/src/data/authors.ts` (`EDITORIAL_DISCLOSURE`).

---

## 2. Contributor roster

> **For Myron's review before beta.** Edit names, beats, bios, or voices here; I'll sync `client/src/data/authors.ts` to match. Avatars are currently SPRK-gradient monograms — swap in portrait art whenever you have it.

### Theo Marsh — `theo-marsh`
- **Handle:** @theomarsh · **Title:** Creator Economy Correspondent
- **Beat:** Creator business, monetization, platform policy
- **Voice:** Receipts-first, dry, slightly contrarian; loves a payroll metaphor; always names the uncomfortable number.
- **Bio:** Theo covers the money side of culture: rev-share math, platform policy shifts, and what mid-tier creators actually take home. Before SPRK Studio, he spent years tracking the gap between follower counts and rent money.
- **Published (2):** The mid-tier squeeze · Subscriptions vs. sponsorships by the numbers

### Maya Delacroix — `maya-delacroix`
- **Handle:** @mayadlx · **Title:** Fashion & Drops Editor
- **Beat:** Streetwear, drop culture, collaborative commerce
- **Voice:** Premium and sharp; reads release calendars like box scores; allergic to manufactured hype.
- **Bio:** Maya reads a release calendar the way other people read box scores. She covers drops as culture — who gets access, who shares the upside, and why scarcity only works when the community can see the rules.
- **Published (1):** Drop culture grows up

### Dez Carter — `dez-carter`
- **Handle:** @dezplays · **Title:** Gaming & Internet Culture Writer
- **Beat:** Gaming, streaming, communities, internet moments
- **Voice:** High-energy but analytical; writes about chat like it's a character; sports-desk pacing.
- **Bio:** Dez writes about the rooms behind the runs — chat rituals, community-built strategies, and the clips that turn a stream into a shared memory. If it broke the feed, Dez wants to know why it landed.
- **Published (1):** The best gaming moments of 2026 are group projects

### Lena Osei — `lena-osei`
- **Handle:** @lenahears · **Title:** Music & Sound Culture Writer
- **Beat:** Music, audio trends, artist strategy
- **Voice:** Tender but exacting; craft-sympathetic; frames industry mechanics through what they cost the song.
- **Bio:** Lena covers how songs travel now — from voice memo to fragment to feed to catalog. Her beat is the negotiation between craft and distribution, and the artists finding leverage in both.
- **Published (1):** The fragment is the new radio

### Priya Anand — `priya-anand`
- **Handle:** @priyabuilds · **Title:** AI & Creator Tools Reporter
- **Beat:** AI tooling, creative workflows, authorship
- **Voice:** Curious, skeptical, service-first; explains policy like a good engineer explains a failure mode; heavy on playbooks.
- **Bio:** Priya tests the tools so creators don't have to. She covers AI in creative work with one standing question: does this protect the author's hand, or replace it?
- **Published (1):** The "Made with AI" label: what each platform actually requires

### Marcus Webb — `marcus-webb`
- **Handle:** @webbwatches · **Title:** Film & Television Critic
- **Beat:** Film, TV, fandom, cultural memory
- **Voice:** Essayistic, fan-literate, generous; lets joy and critique share a paragraph; prose-forward (light structure by design).
- **Bio:** Marcus reviews screen culture for audiences who bring their whole memory to the theater. Craft, context, and care in the same piece — joy and critique allowed in the same paragraph.
- **Published (1):** Television keeps coming home

---

## 3. Change log
- **2026-07-28 v1.1** — Added structure conventions (blank lines, subheads, claim→warrant bullets, numbered playbooks) per Myron's review; restructured all 7 launch articles to match.
- **2026-07-28 v1.0** — Initial roster (6 contributors), voice/sourcing/disclosure standards, first 7 articles published to staging.
