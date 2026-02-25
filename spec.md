# Specification

## Summary
**Goal:** Fix the mobile navigation menu in PublicLayout.tsx so it behaves as a proper full-screen overlay drawer.

**Planned changes:**
- Rebuild the mobile menu as a fixed full-screen overlay (position fixed, top-0 left-0, 100vw × 100vh) with a solid opaque background matching the Ayurvedic green/brown theme, so no page content is visible behind it.
- Stack all navigation links vertically, centered horizontally and vertically, with adequate spacing so no items overlap each other, the logo, or any header elements.
- Position a clearly visible close (X) button in the top-right corner of the overlay that fully dismisses the menu and restores normal page state.
- Lock body scroll (overflow-hidden) when the menu is open and restore it when the menu is closed, with no layout shift.

**User-visible outcome:** On mobile, tapping the hamburger icon opens a clean full-screen menu overlay with properly spaced, centered navigation links and a working close button; background content is completely hidden and non-scrollable while the menu is open.
