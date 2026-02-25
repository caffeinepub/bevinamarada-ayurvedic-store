# Specification

## Summary
**Goal:** Fix slow admin panel loading after login and update the store location on the Contact page.

**Planned changes:**
- Optimize `AdminGuard` to parallelize authentication check, actor initialization, and profile/role fetches using `Promise.all`, and show a loading spinner or skeleton immediately instead of a blank screen.
- Add stale-while-revalidate caching to React Query hooks (stock items, sales data, trial status) with a `staleTime` of at least 30 seconds so repeated dashboard visits use cached data instead of triggering full refetches.
- Update the Contact page to replace the existing Google Maps iframe src and any "Get Directions" links with the new store location URL: `https://maps.app.goo.gl/T6HCLQMn9kQqAW8x6?g_st=aw`.

**User-visible outcome:** Admin users see a responsive loading indicator immediately after login instead of a blank screen, dashboard navigation feels faster due to caching, and the Contact page now shows the correct store location on the map.
