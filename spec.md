# Bevinamarada Ayurvedic Store

## Current State
The app is a full admin panel for an Ayurvedic pharmacy store. It has:
- AdminLogin page with session-based authentication (username: baslxr, password: bas12345, remember-me)
- AdminGuard + AdminLayout with collapsible mobile sidebar
- OwnerDashboard with metric cards (Total Revenue, Today's Revenue, Total Sales, Total Products) and Low Stock warnings
- StockManagement page + StockItemForm dialog for CRUD on stock items
- SalesReports page with daily/monthly/product tabs and PDF export
- CustomerManagement, EnquiryManagement, ProductManagement, ProfilePage, and other admin pages
- Current theme: Ayurvedic warm palette (cream background, deep forest green, amber gold) using OKLCH tokens in src/index.css and tailwind.config.js
- Backend (Motoko) is fully functional: addStockItem, updateStockItem, deleteStockItem, getAllStockItems, addSale, getSalesReports, etc. all work correctly

## Requested Changes (Diff)

### Add
- Dark neon design system: deep dark background (#111 / oklch dark values), neon green + cyan + blue accent colors, soft neon glow on cards/buttons/borders/icons
- Glowing CSS dividers: a `.neon-divider` utility class — thin line with a soft box-shadow neon glow, used between dashboard sections and card groups
- Neon glow animations: `neon-pulse` keyframes for pulsing border glow, `neon-hover` transition on cards
- Login page glassmorphism: animated background gradient + floating particle dots (CSS-only or lightweight canvas), centered glass card with backdrop-blur, neon glow border, smooth input focus animations, neon glowing submit button
- Eye icon password toggle already exists — verify it works in new design
- Dashboard metric cards: neon border glow ring on all 4 metric cards, hover scale+glow animation

### Modify
- **CRITICAL BUG FIX - StockItemForm submit**: The form submission calls `addMutation.mutateAsync` / `updateMutation.mutateAsync` which requires the backend actor. If `actor` is null/undefined (not yet connected), the mutation throws and the form silently fails. Fix: add a proper try/catch in `handleSubmit`, show a visible error message in the UI when submission fails, and also ensure the `useActor` hook is properly initialized before the mutation fires. Show a toast/alert with the error message so the user knows why it failed.
- **index.css / tailwind.config.js**: Replace the warm Ayurvedic color palette with dark neon palette. Background: #0f0f0f (oklch ~0.09). Card: #1a1a1a (oklch ~0.14). Foreground: white/light gray. Primary: neon green (oklch ~0.75 0.22 150). Accent: neon cyan (oklch ~0.75 0.18 200). Secondary accent: neon blue (oklch ~0.65 0.22 250). Keep semantic token names (primary, card, background, etc.) — just update their values.
- **AdminLogin page**: Full redesign — dark futuristic background with animated gradient/particles, centered glassmorphism card (bg-white/5 backdrop-blur-xl), neon glow border, animated input focus, neon glowing submit button, eye toggle for password
- **AdminLayout sidebar**: Dark sidebar background matching new dark theme, neon accent active state (neon green left border + glow), proper mobile slide-in drawer
- **AdminDashboard**: Cards get neon border glow on hover
- **OwnerDashboard**: Metric cards get neon border glow effect and hover animation. Add glowing `.neon-divider` between metrics and quick actions section.
- **SalesReports**: Ensure data displays correctly in the new dark theme with proper contrast
- **All pages**: Replace all Ayurvedic warm color references (cream, forest, sage, gold) with the new dark neon palette tokens. Ensure all text, borders, and backgrounds have proper contrast on dark backgrounds.
- **AdminGuard loading screen**: Update to dark theme spinner
- **Mobile optimization**: Ensure all pages are properly responsive — cards stack correctly, no overlapping elements, touch-friendly button sizes (min 44px tap targets), smooth scroll, sidebar works as proper slide-in overlay

### Remove
- Warm Ayurvedic gradient classes (gradient-forest, gradient-sage, gradient-gold, gradient-hero, gradient-card-*) — replace with dark neon equivalents
- Herbal background overlay reference
- All references to forest/sage/gold/cream color tokens in component files
- The left brand panel on the login page (replace entire login with the new glassmorphism dark design)

## Implementation Plan

1. **Update CSS design system** (src/index.css + tailwind.config.js):
   - Replace OKLCH token values with dark neon palette
   - Add neon glow shadow utilities (shadow-neon-green, shadow-neon-cyan, shadow-neon-blue)
   - Add `.neon-divider` utility class
   - Add neon keyframe animations (neon-pulse, float for particles)
   - Add dark gradient utilities for the new theme
   - Remove/replace Ayurvedic-specific gradient classes

2. **Fix StockItemForm bug**:
   - Wrap handleSubmit in try/catch
   - Add `error` state, display error message in the form UI
   - Add guard: if actor is not available, show "Please wait, connecting..." message and disable submit

3. **Redesign AdminLogin page**:
   - Animated dark background with CSS particle dots / gradient animation
   - Single centered glass card (max-w-md, backdrop-blur, neon border)
   - Neon input focus animations
   - Neon glowing submit button
   - Keep all existing logic (session storage, remember-me, credentials)

4. **Update AdminLayout**:
   - Dark sidebar with neon active states
   - Mobile drawer with proper z-index and backdrop

5. **Update OwnerDashboard**:
   - Metric cards with neon border glow + hover animation
   - Add neon-divider between sections

6. **Update AdminDashboard, SalesReports, StockManagement, and all other admin pages**:
   - Apply dark theme consistently
   - Neon accent colors on interactive elements

7. **Update AdminGuard** loading screen to dark theme

8. **Validate**: typecheck + lint + build pass
