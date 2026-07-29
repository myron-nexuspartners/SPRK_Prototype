## ADDENDUM C: Site Analytics Setup

To track user behavior, retention, and the success metrics defined in the PID, we must implement robust analytics in the next iteration.

### Recommended Stack
1. **Google Analytics 4 (GA4)**: The industry standard for traffic, user demographics, and basic engagement. Free.
2. **PostHog or Mixpanel**: Open-source/affordable event-based analytics. Crucial for tracking specific actions within SPRK*Studio (e.g., "User clicked Trim", "User selected TikTok", "User completed Export").
3. **Vercel/Netlify Analytics**: Since the prototype is on Netlify, enabling their built-in server-side analytics provides accurate, ad-blocker-proof traffic data for a small monthly fee.

### Implementation Steps (Next Iteration)
1. **Create Accounts**: Set up a GA4 property and a Mixpanel/PostHog project.
2. **Install SDKs**: Add the tracking scripts to the React application.
3. **SPA Routing**: Configure the analytics tools to track "virtual pageviews" since React doesn't trigger full page reloads on navigation.
4. **Custom Event Tracking**: Instrument key buttons and workflows in the code:
   ```javascript
   // Example tracking implementation
   analytics.track('studio_export_started', {
     platforms: ['tiktok', 'sprk'],
     videoLength: 15,
     effectsUsed: ['launch_pulse']
   });
   ```
5. **Conversion Funnels**: Build dashboards in the analytics tool to track the drop-off rate between the 6 steps of the SPRK*Studio workflow.
