# Revised SPRK Prototype Verification Notes

The revised public preview was checked at `/home` and `/article/elden-ring-blindfolded` on the exposed production server.

## Confirmed homepage behavior

The `/home` route loads successfully with the revised SPRK Home Feed. The left navigation now exposes a **Collapse nav** control in the full state and switches to **Expand nav** when collapsed. The nav includes explicit prototype pathways for **SPRK*OS Editor**, **SPRK*Pavilion Landing**, and **SPRK*AI Beta**, alongside Home, Explore, Short Clips, Articles, Events, Creators, and Collections.

The homepage feed now includes a richer list of image-backed posts. Cards link into article routes, including non-feature posts such as `/article/elden-ring-blindfolded`. Ad, creator, clip, and feed imagery uses real photographic image URLs rather than abstract placeholder boxes.

## Confirmed article behavior

The dynamic article route `/article/elden-ring-blindfolded` loads with the shared article template. It renders post-specific title, deck, hero image, body copy, quote, creator context, engagement controls, related article cards, and comments.

The main center article column no longer includes embedded `AdCarousel` components or in-body advertisement interruptions. Ads remain available in the surrounding shell/side rail only, preserving an uninterrupted reading flow.

## Confirmed navigation behavior

The top and side navigation provide direct paths to `/pavilion` and `/os`. The collapsible nav behavior was manually tested and changes the rail from labeled navigation to icon-style compact navigation.
