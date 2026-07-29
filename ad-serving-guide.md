## ADDENDUM B: Ad Serving & Monetization Strategy

To monetize the `the-sprk.com` editorial pages (HomeFeed and Article pages), we need to integrate a programmatic ad serving solution. 

### The Solutions & Traffic Thresholds
Ad networks act as brokers between publishers (SPRK) and advertisers. The top tier networks offer the highest RPMs (Revenue Per Mille/Thousand impressions) but require minimum traffic:
- **Google AdSense**: No minimum traffic requirement. Easy to set up, but generally offers the lowest revenue. Good for starting out.
- **Ezoic**: Historically required 10k sessions/month, but currently has **no minimum traffic requirement** for their "Access Now" program. Uses AI to optimize ad placements. Better revenue than AdSense.
- **Mediavine**: Requires **50,000 sessions per month**. Known for excellent creator support, high-quality ads, and very high RPMs. This is the target for mid-tier creators.
- **AdThrive (Raptive)**: Requires **100,000 pageviews per month**. Premium tier, highest payouts.

### Implementation Plan for SPRK
1. **Phase 1 (Launch - <50k sessions)**: Start with **Ezoic**. It provides better returns than AdSense and has no minimum traffic barrier.
2. **Phase 2 (Growth - >50k sessions)**: Migrate to **Mediavine**. Their focus on creator content and lifestyle/entertainment aligns perfectly with SPRK's brand and will maximize revenue.

### How to Connect Ad Serving
1. **Apply to the Network**: Go to Ezoic.com (or Mediavine when ready) and apply with the `the-sprk.com` domain.
2. **DNS/Nameserver Integration**: Ezoic works best when integrated at the DNS level (Cloudflare/name registrar). This allows their AI to inject ads server-side without slowing down the React app.
3. **Ad.txt Configuration**: You must host an `ads.txt` file at the root of your domain (e.g., `the-sprk.com/ads.txt`). The ad network will provide this file; it proves to advertisers that the network is authorized to sell your inventory.
4. **React Integration**: For a Single Page Application (SPA) like SPRK built in React, traditional ad tags don't always refresh correctly when users navigate between routes (e.g., from Home to Article). We must use the ad network's specific SPA integration method (usually a custom React component or a `useEffect` hook that triggers an ad refresh on route change).
5. **Ad Zones**: In our code, we define empty `<div>` containers with specific IDs (e.g., `<div id="sprk-ad-zone-a"></div>`). The ad network's script targets these divs and injects the ads.

### Costs & Visibility
- **Costs**: Ad networks are generally **free to join**. They make money by taking a percentage of the ad revenue (typically 15-25%). You do not pay them out of pocket.
- **Increasing Visibility**: Advertisers bid more for "highly viewable" ads. To maximize revenue:
  - Keep ads near the top of the page or sticky in the sidebar.
  - Ensure fast page load times (Lazy load images).
  - Use larger ad formats (e.g., 300x600 in the sidebar, 728x90 or 970x250 in the feed).
  - Maintain a good ad density (around 30% ads to 70% content) to balance revenue without ruining the user experience.

---

## ADDENDUM C: Site Analytics Setup
