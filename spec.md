# Specification

## Summary
**Goal:** Fix admin portal routing/visibility and apply a consistent neon dark black-and-green theme across the entire Bevinamarada Ayurvedic Store application.

**Planned changes:**
- Ensure `/admin-login` route renders the AdminLogin page correctly
- Fix login flow so admin/admin123 credentials redirect to `/owner-dashboard`
- Ensure AdminGuard correctly reads `sessionStorage` keys `admin-session` and `adminSessionActive`, protecting all admin routes without redirecting authenticated users
- Verify all admin routes (`/owner-dashboard`, `/admin/stock`, `/admin/sales`, `/admin/revenue`, `/admin/customers`, `/admin/enquiries`, `/admin/income`, `/admin/trending`, `/admin/products`, `/admin/reports`) render inside AdminLayout with full sidebar navigation
- Update `frontend/src/index.css` CSS custom properties to use a near-black background (`#0a0a0a`/`#0d0d0d`) and neon green accents (`#00ff88`/`#39ff14`)
- Update `frontend/tailwind.config.js` with neon dark color tokens applied globally
- Apply neon dark theme (dark cards, neon glow effects on buttons, nav links, cards, headings) across all public and admin pages
- Remove all remnants of conflicting light or blue themes

**User-visible outcome:** The admin portal is fully accessible and functional behind session-based auth, and every page — public and admin — displays a consistent neon dark black-and-green visual theme with glowing accents.
