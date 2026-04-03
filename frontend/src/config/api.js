/**
 * REST API base URL — set at build time only, e.g. VITE_API_BASE=https://api.example.com/api
 * No host is hardcoded in source. Leave unset for a static / Firebase-only public site.
 */
function normalizeApiBase(raw) {
  if (raw == null) return '';
  const s = String(raw).trim();
  if (!s) return '';
  return s.replace(/\/$/, '');
}

export const REST_API_BASE = normalizeApiBase(import.meta.env.VITE_API_BASE);

/** True when the Express API should be called (settings, gallery, booking list, admin). */
export const USE_REST_API =
  Boolean(REST_API_BASE) &&
  (import.meta.env.PROD || import.meta.env.VITE_USE_BACKEND === 'true');
