/**
 * Curated local images under /public/gallery/{category}/ — shown first in Studio Gallery,
 * then any Firestore `gallery` docs for the same category.
 */

/** @typedef {{ image: string, caption?: string }} GalleryShowcaseItem */

/** @type {Record<string, GalleryShowcaseItem[]>} */
export const GALLERY_SHOWCASE_BY_CATEGORY = {
  'Makeup Services': [
    { image: '/gallery/makeup/01.png', caption: 'Bridal glamour' },
    { image: '/gallery/makeup/02.png', caption: 'Festive editorial' },
    { image: '/gallery/makeup/03.png', caption: 'Full bridal portrait' },
    { image: '/gallery/makeup/04.png', caption: 'Artist & client' },
    { image: '/gallery/makeup/05.png', caption: 'Traditional elegance' },
    { image: '/gallery/makeup/06.png', caption: 'Soft glam' },
    { image: '/gallery/makeup/07.png', caption: 'Maternity glow' },
  ],
  'Hair Styling': [
    { image: '/gallery/hair/01.png', caption: 'Jada & fresh florals' },
    { image: '/gallery/hair/02.png', caption: 'Romantic half-up' },
    { image: '/gallery/hair/03.png', caption: 'Fishtail bridal' },
    { image: '/gallery/hair/04.png', caption: 'Classic braid' },
  ],
  'Skin Care': [
    { image: '/gallery/skincare/01.png', caption: 'Luminous complexion' },
    { image: '/gallery/skincare/02.png', caption: 'Prep & polish' },
    { image: '/gallery/skincare/03.png', caption: 'Radiant reflection' },
  ],
  'Salon Interior': [
    { image: '/gallery/salon-interior/01.png', caption: 'Treatment suite' },
    { image: '/gallery/salon-interior/02.png', caption: 'Reception' },
  ],
  'Before & After': [
    { image: '/gallery/before-after/01-before.png', caption: 'Before · natural' },
    { image: '/gallery/before-after/02-after.png', caption: 'After · bridal glam' },
    { image: '/gallery/before-after/03-before.png', caption: 'Before · prep' },
    { image: '/gallery/before-after/04-after.png', caption: 'After · event ready' },
  ],
};
