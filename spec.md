# Specification

## Summary
**Goal:** Add a standalone admin portal login page with hardcoded credentials, a "Remember Me" option, and route protection for all admin pages.

**Planned changes:**
- Create an admin login page at `/admin-login` with username and password fields, authenticating against hardcoded credentials (`baslxr` / `bas12345`)
- Show an error message when incorrect credentials are entered
- Add a "Remember Me" checkbox that saves/clears credentials in localStorage and pre-fills fields on return visits
- Store the authenticated session in sessionStorage (or React context) so the session persists on page refresh but clears when the browser is closed
- Protect all existing admin routes by redirecting unauthenticated users to `/admin-login`
- Add a logout button in the admin layout that clears the session and redirects to the login page

**User-visible outcome:** Admins can log in via a dedicated login page using the hardcoded credentials, optionally save their credentials with "Remember Me," and all admin routes are protected from unauthenticated access.
