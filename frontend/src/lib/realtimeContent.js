import {
  SALON_EMAIL,
  STUDIO_ADDRESS,
  WHATSAPP_WA_ME_DEFAULT,
} from '../constants/contact.js';

export const DEFAULT_SITE_SETTINGS = {
  address: STUDIO_ADDRESS,
  phone: '',
  whatsapp: WHATSAPP_WA_ME_DEFAULT,
  instagram: 'https://www.instagram.com/jk.makeoverartistry',
  email: SALON_EMAIL,
  workingHours: '9:30 AM – 8:00 PM',
};

export const DEFAULT_TESTIMONIALS = [
  {
    id: 'fallback-priya',
    name: 'Priya',
    message:
      'This was the best bridal experience. The team made me feel confident and beautiful from trial to the final look.',
    rating: 5,
    source: 'Direct',
  },
  {
    id: 'fallback-meenakshi',
    name: 'Meenakshi',
    message:
      'The skincare glow is unreal. Everything felt premium, clean, and personalized for my skin type.',
    rating: 5,
    source: 'Direct',
  },
  {
    id: 'fallback-ananya',
    name: 'Ananya',
    message:
      'Professional makeup and hair styling with a calm, luxury vibe. I loved how natural and elegant the final result looked.',
    rating: 5,
    source: 'Direct',
  },
];

export function mapTestimonialsSnapshot(snapshot) {
  return snapshot.docs
    .map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: String(data.name ?? '').trim(),
        message: String(data.message ?? '').trim(),
        rating: Number(data.rating) || 5,
        source: String(data.source ?? 'Direct').trim(),
        createdAt: data.createdAt ?? null,
      };
    })
    .filter((x) => x.name && x.message);
}

export function mapOffersSnapshot(snapshot) {
  return snapshot.docs
    .map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        title: String(data.title ?? '').trim(),
        description: String(data.description ?? '').trim(),
        discountPercentage: Number(data.discountPercentage) || 0,
        startDate: String(data.startDate ?? '').trim(),
        endDate: String(data.endDate ?? '').trim(),
        isActive: data.isActive !== false,
      };
    })
    .filter((x) => x.title);
}

export function mapAppointmentsSnapshot(snapshot) {
  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      name: String(data.name ?? ''),
      phone: String(data.phone ?? ''),
      email: String(data.email ?? ''),
      service: String(data.service ?? ''),
      category: String(data.category ?? ''),
      price: String(data.price ?? ''),
      date: String(data.date ?? ''),
      timeSlot: String(data.timeSlot ?? ''),
      message: String(data.message ?? ''),
      status: String(data.status ?? 'Pending'),
      createdAt: data.createdAt ?? null,
    };
  });
}
