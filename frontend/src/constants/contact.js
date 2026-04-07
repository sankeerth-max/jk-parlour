/**
 * Main salon WhatsApp (India).
 * Display: local 10-digit. API URL uses country code + number, digits only.
 */
export const WHATSAPP_DISPLAY = '8072965181';
export const WHATSAPP_WA_ME_DEFAULT = '918072965181';
export const WHATSAPP_STANDARD_MESSAGE =
  'Hello, I would like to book an appointment at Sri Karthika Bridal Studio';

/** Public salon email (also used when settings.email is empty) */
export const SALON_EMAIL = 'sivanga285@gmail.com';

/** Default studio address — used when API settings have no address */
export const STUDIO_ADDRESS =
  'First Floor, Sunthara Vinayagar Kovil Street, Near Ulavar Santhai, Kallakurichi, Tamil Nadu 606202';

/** Digits only for WhatsApp API (e.g. 918072965181) */
export function whatsappWaMeDigits(custom) {
  const raw = String(custom ?? WHATSAPP_WA_ME_DEFAULT).replace(/\D/g, '');
  if (!raw) return WHATSAPP_WA_ME_DEFAULT;
  if (raw.length === 10) return `91${raw}`;
  return raw;
}

export function whatsappWaMeUrl(custom, message = WHATSAPP_STANDARD_MESSAGE) {
  const phone = whatsappWaMeDigits(custom);
  const text = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${phone}&text=${text}`;
}

/** Local 10-digit Indian number string derived from WhatsApp digits */
export function whatsappLocalNumber(custom) {
  const d = whatsappWaMeDigits(custom);
  if (d.length >= 10) return d.slice(-10);
  return WHATSAPP_DISPLAY;
}

/** Display line e.g. +91 80729 65181 — uses settings.phone if set, else same as WhatsApp */
export function salonPhoneDisplay(phoneSetting, whatsappSetting) {
  if (phoneSetting && String(phoneSetting).trim()) {
    const raw = String(phoneSetting).replace(/\s/g, '');
    if (raw.startsWith('+')) return String(phoneSetting).trim();
    if (/^\d{10}$/.test(raw)) {
      return `+91 ${raw.slice(0, 5)} ${raw.slice(5)}`;
    }
    return String(phoneSetting).trim();
  }
  const ten = whatsappLocalNumber(whatsappSetting);
  return `+91 ${ten.slice(0, 5)} ${ten.slice(5)}`;
}

/** tel: href — falls back to WhatsApp number when phone is not in settings */
export function salonTelHref(phoneSetting, whatsappSetting) {
  if (phoneSetting && String(phoneSetting).trim()) {
    const raw = String(phoneSetting).replace(/\s/g, '');
    if (raw.startsWith('+')) return `tel:${raw}`;
    if (/^\d{10}$/.test(raw)) return `tel:+91${raw}`;
    return `tel:${raw}`;
  }
  return `tel:+91${whatsappLocalNumber(whatsappSetting)}`;
}
