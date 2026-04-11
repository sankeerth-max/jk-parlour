import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.js';

const SERVICES_COLLECTION = 'services';

/** Default catalog — inserted only when `services` is empty */
const SALON_SERVICES_SEED = [
  {
    title: 'Hair Services',
    description:
      'Precision cuts, styling, and restorative care in a calm salon setting.',
    price: 150,
    image: '/services-hair.png',
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
    price: 300,
    image: '/services-skin-care.png',
    details: [
      'Basic Cleanup',
      'Fruit Facial',
      'Gold Facial',
      'Anti-Aging Treatments',
      'Acne Treatment Facial',
      'De-tan Treatment',
      'Hydrating & Glow Therapy',
    ],
  },
  {
    title: 'Makeup & Makeovers',
    description: 'Soft glam and event-ready looks with a refined, natural finish.',
    price: 3000,
    image: '/services-makeup.png',
    details: [
      'Party Makeup',
      'Engagement Makeup',
      'HD Makeup',
      'Airbrush Makeup',
      'Natural Glam Look',
      'Reception Makeup',
      'Photoshoot Makeup',
    ],
  },
  {
    title: 'Nail Care',
    description: 'Manicure and pedicure care for polished, healthy nails.',
    price: 100,
    image: '/services-nail-care.png',
    details: [
      'Manicure',
      'Pedicure',
      'Gel Nail Polish',
      'Nail Art',
      'French Tips',
      'Nail Extension',
      'Nail Repair',
    ],
  },
  {
    title: 'Waxing',
    description: 'Smooth, hygienic waxing from face to body.',
    price: 80,
    image: '/services-waxing.png',
    details: [
      'Full Arms Wax',
      'Full Legs Wax',
      'Underarm Wax',
      'Face Wax',
      'Full Body Wax',
      'Rica Wax',
      'Chocolate Wax',
    ],
  },
  {
    title: 'Mehendi Services',
    description:
      'Beautiful mehendi designs for all occasions including bridal, engagement, and festive events.',
    price: 299,
    image: '/services-mehandi.png',
    details: [
      'Bridal Mehendi',
      'Engagement Mehendi',
      'Arabic Designs',
      'Traditional Designs',
      'Minimal Mehendi',
    ],
  },
  {
    title: 'Bridal Services',
    description: 'Complete bridal looks with premium finishing for your celebration.',
    price: 4999,
    image: '/services-bridal.png',
    details: [
      'Bridal Makeup',
      'Bridal Hairstyling',
      'Saree Draping',
      'Pre-Bridal Skincare',
      'Trial Makeup Session',
      'Jewelry Setting',
      'Complete Bridal Package',
    ],
  },
];

/**
 * Serialized queue so React Strict Mode / parallel calls cannot run two
 * empty-collection seeds at once (which would duplicate every document).
 */
let seedTail = Promise.resolve();

/**
 * If `services` has no documents, inserts the default salon catalog.
 * Safe to call on every app load — skips when data already exists.
 * @returns {Promise<{ seeded: boolean, skipped: boolean }>}
 */
export function seedSalonServicesIfEmpty() {
  const work = async () => {
    const colRef = collection(db, SERVICES_COLLECTION);
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      return { seeded: false, skipped: true };
    }

    for (const row of SALON_SERVICES_SEED) {
      await addDoc(colRef, {
        title: row.title,
        description: row.description,
        price: row.price,
        image: row.image,
        details: row.details,
        createdAt: serverTimestamp(),
      });
    }

    console.log('Services Seeded Successfully');
    return { seeded: true, skipped: false };
  };

  const p = seedTail.then(() => work());
  seedTail = p.catch(() => {});
  return p;
}
