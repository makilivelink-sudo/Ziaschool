const PORTAL_AUTH_KEY = 'zia_portal_session';

export const DEMO_ADMIN_EMAIL = 'contactofwaheed@gmail.com';
export const DEMO_ADMIN_PASSWORD = 'Zia@12345';

export function getPortalSession() {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.sessionStorage.getItem(PORTAL_AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isPortalAuthenticated() {
  return Boolean(getPortalSession());
}

export function setPortalSession(session) {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(PORTAL_AUTH_KEY, JSON.stringify(session));
}

export function clearPortalSession() {
  if (typeof window === 'undefined') return;
  window.sessionStorage.removeItem(PORTAL_AUTH_KEY);
}

export function createPortalSession({ email, role = 'admin', name = 'Admin' }) {
  return {
    email,
    role,
    name,
    signedInAt: new Date().toISOString(),
  };
}
