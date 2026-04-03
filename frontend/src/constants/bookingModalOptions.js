export const BOOKING_SERVICE_OPTIONS = [
  'Hair Services',
  'Skin Care',
  'Makeup',
  'Waxing',
  'Nail Care',
  'Mehendi',
];

/** Map UI/category titles to a valid dropdown value (e.g. Services page labels). */
export function mapToBookingServiceOption(raw) {
  if (raw == null || raw === '') return '';
  const s = String(raw).trim();
  if (BOOKING_SERVICE_OPTIONS.includes(s)) return s;
  const aliases = {
    'Makeup & Makeovers': 'Makeup',
    'Bridal Services': 'Makeup',
  };
  const mapped = aliases[s];
  return mapped && BOOKING_SERVICE_OPTIONS.includes(mapped) ? mapped : '';
}
