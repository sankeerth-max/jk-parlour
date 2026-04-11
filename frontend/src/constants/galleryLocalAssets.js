/**
 * Curated local images merged with Firestore `gallery` rows (by category).
 * Paths are under `public/`.
 */
export const GALLERY_LOCAL_ITEMS_BY_CATEGORY = {
  'Hair Styling': [
    '/gallery/hair-styling/01.png',
    '/gallery/hair-styling/02.png',
    '/gallery/hair-styling/03.png',
    '/gallery/hair-styling/04.png',
  ],
  'Salon Interior': [
    '/gallery/salon-interior/01.png',
    '/gallery/salon-interior/02.png',
  ],
};

/** Same person: left = before, right = after */
export const GALLERY_BEFORE_AFTER_PAIRS = [
  {
    before: '/gallery/before-after/01.png',
    after: '/gallery/before-after/04.png',
  },
  {
    before: '/gallery/before-after/03.png',
    after: '/gallery/before-after/02.png',
  },
];
