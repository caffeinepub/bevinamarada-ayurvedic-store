# Specification

## Summary
**Goal:** Replace the cyber/neon dark theme with a clean, professional pharma-grade UI theme, fix contrast and dialog overlap issues, and update admin login credentials.

**Planned changes:**
- Remove all neon glow effects, scanline effects, cyber grid backgrounds, and related animations (pulseGlow, neonFlicker) from CSS and Tailwind config
- Replace cyber/sci-fi fonts (Orbitron, Rajdhani, Share Tech Mono) with professional pharma-appropriate fonts (e.g., Inter/Nunito for body, Poppins/DM Sans for headings)
- Apply a light, clinical pharma color palette (white, soft greens, muted teals, light grays, accent blues) across all pages and components
- Fix all text/UI contrast issues across AdminDashboard, OwnerDashboard, StockManagement, CustomerManagement, ProductManagement, SalesReports, AdminLogin, Home, and all admin layout components
- Fix "Add Items" and "Add Customer" dialogs so they render fully above background content with opaque backdrops and solid backgrounds
- Apply consistent pharma card styles (white/light backgrounds, subtle box shadows, rounded corners) across all public and admin pages
- Update admin login credentials from username `admin` / password `admin123` to username `baslxr` / password `bas12345`
- Update the pharma-style logo and hero background image assets

**User-visible outcome:** The entire app displays a polished, professional pharma-style UI with no cyber/neon elements, all text is clearly legible, dialogs render correctly above page content, and the admin portal is accessible using the new credentials (baslxr / bas12345).
