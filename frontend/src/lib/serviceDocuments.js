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

const SALON_SERVICE_ORDER = [
  'hair services',
  'skin care',
  'makeup & makeovers',
  'nail care',
  'waxing',
  'mehandi services',
  'bridal services',
];

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
    const image = String(data.image ?? '').trim();
    const offerPercentageRaw = Number(data.offerPercentage);
    const offerPercentage =
      Number.isFinite(offerPercentageRaw) && offerPercentageRaw > 0 ? offerPercentageRaw : 0;
    const offerText = String(data.offerText ?? '').trim();
    return {
      id: docSnap.id,
      title: String(data.title ?? ''),
      description: String(data.description ?? ''),
      price,
      image,
      details: normalizeDetails(data.details),
      offerPercentage,
      offerText,
      createdAt: data.createdAt ?? null,
    };
  });
  const byId = dedupeServicesByDocId(rows);
  const onePerTitle = dedupeOnePerTitlePreferNewest(byId);
  return sortSalonServices(onePerTitle);
}
