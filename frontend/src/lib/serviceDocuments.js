export function millisFromCreatedAt(createdAt) {
  if (!createdAt) return 0;
  if (typeof createdAt.toMillis === 'function') return createdAt.toMillis();
  if (typeof createdAt.seconds === 'number') return createdAt.seconds * 1000;
  return 0;
}

export function normalizeDetails(raw) {
  if (!raw || !Array.isArray(raw)) return [];
  return raw.map((x) => String(x).trim()).filter(Boolean);
}

function dedupeServicesByDocId(rows) {
  const byId = new Map();
  for (const row of rows) {
    if (row.id) byId.set(row.id, row);
  }
  return Array.from(byId.values());
}

export function canonicalTitleKey(title) {
  let k = String(title ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
  if (k === 'mehendi services') k = 'mehandi services';
  return k;
}

function dedupeOnePerTitlePreferNewest(rows) {
  const sorted = [...rows].sort(
    (a, b) => millisFromCreatedAt(b.createdAt) - millisFromCreatedAt(a.createdAt)
  );
  const seen = new Set();
  const out = [];
  for (const row of sorted) {
    const key = canonicalTitleKey(row.title) || `__id:${row.id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(row);
  }
  return out;
}

/**
 * Fixed hero images per catalog title (canonical keys). Overrides Firestore `image`
 * so Services + Admin stay consistent with the studio’s chosen assets.
 */
export const SERVICE_CARD_IMAGE_BY_TITLE_KEY = {
  'bridal services': '/services-bridal.png',
  'hair services': '/services-hair.png',
  'skin care': '/services-skin-care.png',
  'makeup & makeovers': '/services-makeup.png',
  'makeup and makeovers': '/services-makeup.png',
  'nail care': '/services-nail-care.png',
  'waxing': '/services-waxing.png',
  'mehandi services': '/services-mehandi.png',
  'mehendi services': '/services-mehandi.png',
};

/** Bumps when replacing public/service-*.png so browsers fetch new files. */
const SERVICE_IMAGE_CACHE = 'v=20260411';

export const SKIN_CARE_SERVICE_IMAGE = SERVICE_CARD_IMAGE_BY_TITLE_KEY['skin care'];

function withServiceImageCache(path) {
  if (!path || typeof path !== 'string') return path;
  if (!path.startsWith('/services-')) return path;
  return path.includes('?') ? path : `${path}?${SERVICE_IMAGE_CACHE}`;
}

/**
 * Resolves the fixed card image for a service title. Firestore titles vary
 * ("Makeup and Makeovers", typos, extra words) so we match exact keys first,
 * then safe keyword rules (skin care before bridal to avoid pre-bridal skincare).
 */
export function resolveServiceCardImage(rawTitle) {
  const m = SERVICE_CARD_IMAGE_BY_TITLE_KEY;
  const k = canonicalTitleKey(rawTitle);
  const variants = [
    k,
    k.replace(/\s*&\s*/g, ' and '),
    k.replace(/\s+and\s+/g, ' & '),
  ];
  for (const key of variants) {
    if (m[key]) return m[key];
  }

  if (/\bskin(?:\s*)care\b|\bskincare\b/i.test(k)) return m['skin care'];
  if (/\b(waxing|wax)\b/i.test(k)) return m['waxing'];
  if (/\bnail\b/i.test(k)) return m['nail care'];
  if (/\bmehandi\b|\bmehendi\b|\bhenna\b/i.test(k)) return m['mehandi services'];
  if (/\bmakeup\b/i.test(k)) return m['makeup & makeovers'];
  if (/\bbridal\b/i.test(k)) return m['bridal services'];
  if (/\bhair\b/i.test(k)) return m['hair services'];

  return null;
}

const SALON_SERVICE_ORDER = [
  'hair services',
  'skin care',
  'makeup & makeovers',
  'nail care',
  'waxing',
  'mehandi services',
  'bridal services',
];

/** Canonical copy for the Mehendi / Mehandi service (overrides messy Firestore text). */
const MEHENDI_SERVICE_CATALOG = {
  title: 'Mehendi Services',
  description:
    'Beautiful mehendi designs for all occasions including bridal, engagement, and festive events.',
  price: 299,
  details: [
    'Bridal Mehendi',
    'Engagement Mehendi',
    'Arabic Designs',
    'Traditional Designs',
    'Minimal Mehendi',
  ],
};

function applyMehendiServiceCatalog(row) {
  if (canonicalTitleKey(row.title) !== 'mehandi services') return row;
  return {
    ...row,
    title: MEHENDI_SERVICE_CATALOG.title,
    description: MEHENDI_SERVICE_CATALOG.description,
    price: MEHENDI_SERVICE_CATALOG.price,
    details: [...MEHENDI_SERVICE_CATALOG.details],
  };
}

function sortSalonServices(rows) {
  return [...rows].sort((a, b) => {
    const ka = canonicalTitleKey(a.title);
    const kb = canonicalTitleKey(b.title);
    const ia = SALON_SERVICE_ORDER.indexOf(ka);
    const ib = SALON_SERVICE_ORDER.indexOf(kb);
    const aKnown = ia !== -1;
    const bKnown = ib !== -1;
    if (aKnown && bKnown) return ia - ib;
    if (aKnown) return -1;
    if (bKnown) return 1;
    return a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
  });
}

export function mapVisibleServicesFromSnapshot(snapshot) {
  const rows = snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    const priceRaw = data.price;
    const price =
      typeof priceRaw === 'number' && !Number.isNaN(priceRaw)
        ? priceRaw
        : Number(priceRaw) || 0;
    let image = String(data.image ?? data.imageUrl ?? '').trim();
    const resolved = resolveServiceCardImage(String(data.title ?? ''));
    if (resolved) image = withServiceImageCache(resolved);
    else if (image) image = withServiceImageCache(image);
    const offerPercentageRaw = Number(data.offerPercentage);
    const offerPercentage =
      Number.isFinite(offerPercentageRaw) && offerPercentageRaw > 0 ? offerPercentageRaw : 0;
    const offerText = String(data.offerText ?? '').trim();
    return applyMehendiServiceCatalog({
      id: docSnap.id,
      title: String(data.title ?? ''),
      description: String(data.description ?? ''),
      price,
      image,
      details: normalizeDetails(data.details),
      offerPercentage,
      offerText,
      createdAt: data.createdAt ?? null,
    });
  });
  const byId = dedupeServicesByDocId(rows);
  const onePerTitle = dedupeOnePerTitlePreferNewest(byId);
  return sortSalonServices(onePerTitle);
}
