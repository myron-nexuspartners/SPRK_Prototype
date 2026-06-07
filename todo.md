# SPRK Redesign & Structural Fixes Checklist

## 1. Global Layout & Scroll Layering Fixes (Phase 2)
- [x] Fix CSS Grid overlapping columns in `Discover.tsx`, `Os.tsx`, and `Pavilion.tsx`
- [x] Wrap sticky aside elements inside standard columns to prevent grid boundary collapses
- [x] Configure nested sticky wrapper div (`sticky top-24`) for clean scrolling without column collisions
- [x] Adjust global z-indexes (`SharedLayout.tsx` nav `z-40`, dropdown `z-[100]`, page content `z-10`) to prevent overlays

## 2. SPRK-OS Claude-Style AI Workspace Rebuild (Phase 3)
- [ ] Left Sidebar: Implement handsketch options (`Projects`, `Files`, `Search`, `Templates`, `Agents`, `Plugins`, `Library`)
- [ ] Center Column: Implement prominent Claude-style clean chat/prompt console with file dropzone
- [ ] Right Tool Panel: Integrate handsketch editing tools (`Post Overlays`, `Hook Creators`, `Channel Builders`, `Title/Tags/Thumbs`, `Measurement & Reporting`)
- [ ] Clean, light-themed premium workspace feel worthy of $299/month

## 3. SPRK Pavilion Spotify-Style Marketplace Rebuild (Phase 4)
- [ ] Left Sidebar: Implement custom search field and taxonomy filter panel (Content Type & Interest Category)
- [ ] Main display: Top Featured Creators horizontal scrolling ribbon showing `yourSPRK` landing page cards
- [ ] Main display: Rich streaming-style grid of video tiles, articles, shorts, and streams
- [ ] Implement live client-side state filtering so clicking left filters dynamically refreshes the main content feed
- [ ] Redesign Smart Contract escrow deployment modal to look like a premium corporate checkout

## 4. Quality Control & Validation (Phase 5)
- [ ] Verify zero scroll collisions or overlapping columns on mobile, tablet, and desktop
- [ ] Check console logs to ensure no duplicate React keys or warnings
- [ ] Validate all internal cross-links and coming-soon fallbacks
