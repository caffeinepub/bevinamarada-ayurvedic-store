# Bevinamarada Ayurvedic Store

## Current State

A full-stack Ayurvedic pharmacy management app with:
- Public pages: Home, Products, About Us, Contact
- Admin portal with login (username: baslxr, password: bas12345)
- Admin pages: Owner Dashboard, Stock Management, Product Management, Customers, Sales Reports, Enquiries
- Backend: Motoko with stock items, sales, user profiles, trial status
- Design theme: pharma/Ayurvedic (forest greens, gold, sage)

## Requested Changes (Diff)

### Add
- Profile button in admin top-right header area (with admin name and logout option)
- Missing `shadow-modal` and `shadow-pharma-sm` utility classes in tailwind/CSS
- Profile page route accessible from admin layout header

### Modify

**Critical Bug Fixes:**
1. **Admin login session bug**: `AdminLogin.tsx` sets `admin-session` to `'true'` but `AdminGuard.tsx` checks for value `'active'` — admin can never log in. Fix both to use consistent value `'active'`.
2. **Remember Me not working**: Login page has checkbox but never saves to localStorage when checked. Fix to save session to localStorage when rememberMe is checked.
3. **AdminGuard loading screen**: Uses neon CSS classes (`bg-neon-black`, `text-neon-green`) that don't match pharma theme. Fix to use pharma theme classes.
4. **SalesReports.tsx**: Entire page uses neon/cyber theme CSS classes (`bg-neon-surface`, `text-neon-green`, `border-neon-green`, `font-mono`, `neon-text-glow`, `animate-pulse-glow`, etc.) — completely mismatched with pharma theme. Rewrite to use pharma theme consistently.
5. **ProfilePage.tsx**: Uses non-existent Tailwind classes (`text-forest-800`, `from-forest-500`, `to-sage-600`, `border-forest-100`, `from-saffron-400`, `to-gold-500`, `text-forest-600`, etc.) that are not in tailwind.config.js. Rewrite to use the actual defined color tokens (`text-forest`, `bg-sage-light`, etc.)
6. **Profile page not in routes**: ProfilePage exists but is not routed or accessible. Add it as `/admin/profile` and link from admin header.

**UI Improvements:**
7. Add a profile/user avatar button in the AdminLayout mobile header (top-right) and desktop sidebar bottom that shows admin name and links to profile.
8. Make all admin page headers and cards consistent with pharma theme — no leftover neon/cyber styling.
9. Sales Reports PDF export: update the PDF template to use a clean pharma-themed style instead of neon/dark styling.
10. Improve overall spacing, typography consistency across admin pages.

### Remove
- All neon/cyber theme remnants from SalesReports, AdminGuard loading state, and any other admin pages that still have `neon-*` CSS classes.

## Implementation Plan

1. Fix `AdminLogin.tsx`: Change `sessionStorage.setItem('admin-session', 'true')` to `'active'` and implement proper localStorage save when rememberMe is checked.
2. Fix `AdminGuard.tsx`: Update loading state to use pharma theme (white bg, forest spinner).
3. Rewrite `SalesReports.tsx`: Replace all neon classes with pharma theme equivalents. Styled tables, cards with white/forest/sage colors. Update PDF export template styling.
4. Fix `ProfilePage.tsx`: Replace all undefined color tokens with valid ones from tailwind.config.js.
5. Add `/admin/profile` route in `App.tsx`.
6. Update `AdminLayout.tsx`: Add profile route link in sidebar footer and in mobile header (user icon).
7. Add `shadow-modal` and `shadow-pharma-sm` to tailwind.config.js.
8. Run typecheck and build to verify no errors.
