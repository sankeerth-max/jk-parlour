/**
 * Site-wide settings (contact, hours) — localStorage only, no backend.
 * Same shape as the former GET /api/settings response.
 */

import {
  STUDIO_ADDRESS,
  SALON_EMAIL,
  WHATSAPP_WA_ME_DEFAULT,
} from '../constants/contact.js';

export const SETTINGS_STORAGE_KEY = 'siteSettings';

export const SETTINGS_UPDATED_EVENT = 'site-settings-updated';

export const DEFAULT_SITE_SETTINGS = {
  address: STUDIO_ADDRESS,
  phone: '',
  whatsapp: WHATSAPP_WA_ME_DEFAULT,
  instagram: 'https://www.instagram.com/jk.makeoverartistry',
  email: SALON_EMAIL,
  workingHours: '9:30 AM – 8:00 PM',
};

export function loadSettings() {
  if (typeof window === 'undefined') {
    return { ...DEFAULT_SITE_SETTINGS };
  }
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SITE_SETTINGS };
    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) {
      return { ...DEFAULT_SITE_SETTINGS };
    }
    return { ...DEFAULT_SITE_SETTINGS, ...parsed };
  } catch {
    return { ...DEFAULT_SITE_SETTINGS };
  }
}

export function persistSettings(settings) {
  const merged = { ...DEFAULT_SITE_SETTINGS, ...settings };
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(merged));
}

export function notifySettingsUpdated() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(SETTINGS_UPDATED_EVENT));
}
