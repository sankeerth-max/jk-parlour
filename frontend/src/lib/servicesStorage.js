/** @typedef {{ id: string, title: string, description: string, startsFrom: string, image: string, details: string[] }} StoredService */

export const STORAGE_KEY = 'services';

export const SERVICES_UPDATED_EVENT = 'services-updated';

/** Default catalog — used when localStorage is empty or invalid */
const FALLBACK_SERVICES = [
  {
    title: 'Hair Services',
    description: 'Precision cuts, styling, and restorative care in a calm salon setting.',
    startsFrom: '₹150',
    image: '/services-hair.jpg',
    details: [
      'Hair Cut (Layer / Step / U Cut)',
      'Hair Styling (Blow Dry, Curls, Straightening)',
      'Hair Spa (Repair & Nourishment)',
      'Hair Smoothening & Straightening',
      'Hair Coloring (Global, Highlights, Balayage)',
      'Keratin & Hair Botox Treatments',
      'Scalp Treatments (Hair Fall & Dandruff Control)',
    ],
  },
  {
    title: 'Skin Care',
    description: 'Glow-focused facials and rituals tailored to your skin.',
    startsFrom: '₹300',
    image: '/services-skincare.jpg',
    details: [
      'Basic & Advanced Facials (Gold, Diamond, Hydra)',
      'Clean-Up & Detan Treatments',
      'Skin Polishing',
      'Anti-Aging & Brightening Facials',
      'Acne Treatment',
      'Under Eye Care',
    ],
  },
  {
    title: 'Makeup & Makeovers',
    description: 'Soft glam and event-ready looks with a refined, natural finish.',
    startsFrom: '₹3,000',
    image: '/services-makeup.jpg',
    details: [
      'Party Makeup',
      'Engagement & Reception Makeup',
      'HD & Airbrush Makeup',
      'Natural & Glam Makeup Looks',
      'Hairstyling for Events',
      'Saree Draping',
    ],
  },
  {
    title: 'Nail Care',
    description: 'Manicure and pedicure care for polished, healthy nails.',
    startsFrom: '₹100',
    image: '/services-nails.jpg',
    details: [
      'Manicure & Spa Manicure',
      'Pedicure & Spa Pedicure',
      'Gel Polish',
      'Nail Art & Nail Extensions',
      'Nail Refill & Removal',
    ],
  },
  {
    title: 'Waxing',
    description: 'Smooth, hygienic waxing from face to body.',
    startsFrom: '₹80',
    image: '/services-waxing.jpg',
    details: [
      'Full Body Waxing',
      'Arms & Legs Waxing',
      'Underarms Waxing',
      'Face Waxing',
      'Bikini Waxing',
      'Rica & Chocolate Wax',
    ],
  },
  {
    title: 'Bridal Services',
    description: 'Complete bridal looks with premium finishing for your celebration.',
    startsFrom: '₹4,999',
    image: '/makeup-bridal-signature.png',
    details: [
      'Bridal Makeup Packages',
      'Pre-Bridal Skincare Packages',
      'Bridal Hair Styling',
      'Trial Makeup Session',
      'Mehandi for Bride',
      'Family Makeup Services',
    ],
  },
  {
    title: 'Mehendi Services',
    description: 'Intricate henna designs for weddings and special occasions.',
    startsFrom: '₹500',
    image: '/services-mehendi.jpg',
    details: ['Bridal Mehendi', 'Party Mehendi', 'Custom Motifs', 'Aftercare Guidance'],
  },
];

export function getDefaultServices() {
  return FALLBACK_SERVICES.map((s, index) => ({
    ...s,
    id: `default-${index}`,
  }));
}

function normalizeService(raw, index) {
  const title = String(raw?.title ?? 'Service').trim() || 'Service';
  const description = String(raw?.description ?? '').trim();
  const startsFrom = String(raw?.startsFrom ?? raw?.price ?? '—').trim() || '—';
  const image = String(raw?.image ?? '/services-makeup.jpg');
  let details = Array.isArray(raw?.details) ? raw.details.map(String).filter(Boolean) : [];
  if (!details.length) {
    const lines = description.split('\n').map((l) => l.trim()).filter(Boolean);
    details = lines.length ? lines : ['Details on request'];
  }
  const id = String(raw?.id ?? `svc-${index}`);
  return { id, title, description, startsFrom, image, details };
}

/** Read services from localStorage, or defaults when missing/empty/invalid */
export function loadServices() {
  if (typeof window === 'undefined') return getDefaultServices();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultServices();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return getDefaultServices();
    return parsed.map((s, i) => normalizeService(s, i));
  } catch {
    return getDefaultServices();
  }
}

/** Write normalized services to localStorage */
export function persistServices(services) {
  const normalized = services.map((s, i) => normalizeService(s, i));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
}

export function notifyServicesUpdated() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(SERVICES_UPDATED_EVENT));
}
