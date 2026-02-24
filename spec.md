# Specification

## Summary
**Goal:** Fix the mobile sidebar so it no longer overlaps dashboard content, replacing it with a slide-in drawer toggled by a hamburger button.

**Planned changes:**
- Hide the left sidebar by default on mobile screens (below md breakpoint)
- Add a hamburger/menu toggle button in the top bar, visible only on mobile
- Implement the sidebar as a slide-in drawer from the left when toggled on mobile
- Add a semi-transparent dark backdrop overlay behind the open drawer; tapping it closes the drawer
- Make the main content area full viewport width on mobile when the sidebar is closed (no reserved left margin)
- Keep the desktop sidebar layout completely unchanged

**User-visible outcome:** On mobile, the sidebar no longer overlaps content. Users can open and close the sidebar via a hamburger button, with the drawer sliding in as an overlay over a dimmed backdrop. The main content fills the full screen width when the drawer is closed.
