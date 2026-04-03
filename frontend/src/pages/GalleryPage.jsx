import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { USE_REST_API } from '../config/api.js';

const CATEGORIES = [
  { key: 'Bridal Makeup', label: 'Makeup Services' },
  { key: 'Hair Styling', label: 'Hair Styling' },
  { key: 'Skin Care', label: 'Skin Care' },
  { key: 'Salon Interior', label: 'Salon Interior' },
  { key: 'Before & After', label: 'Before & After' },
];

/** Curated Makeup Services showcase — served from /public/gallery/makeup */
const MAKEUP_SHOWCASE = [
  { imageUrl: '/gallery/makeup/01.png', caption: 'Bridal glamour' },
  { imageUrl: '/gallery/makeup/02.png', caption: 'Festive editorial' },
  { imageUrl: '/gallery/makeup/03.png', caption: 'Full bridal portrait' },
  { imageUrl: '/gallery/makeup/04.png', caption: 'Artist & client' },
  { imageUrl: '/gallery/makeup/05.png', caption: 'Traditional elegance' },
  { imageUrl: '/gallery/makeup/06.png', caption: 'Soft glam' },
  { imageUrl: '/gallery/makeup/07.png', caption: 'Maternity glow' },
];

/** Curated Hair Styling showcase — served from /public/gallery/hair */
const HAIR_SHOWCASE = [
  { imageUrl: '/gallery/hair/01.png', caption: 'Jada & fresh florals' },
  { imageUrl: '/gallery/hair/02.png', caption: 'Romantic half-up' },
  { imageUrl: '/gallery/hair/03.png', caption: 'Fishtail bridal' },
  { imageUrl: '/gallery/hair/04.png', caption: 'Classic braid' },
];

/** Curated Skin Care showcase — served from /public/gallery/skincare */
const SKIN_CARE_SHOWCASE = [
  { imageUrl: '/gallery/skincare/01.png', caption: 'Luminous complexion' },
  { imageUrl: '/gallery/skincare/02.png', caption: 'Prep & polish' },
  { imageUrl: '/gallery/skincare/03.png', caption: 'Radiant reflection' },
];

/** Curated Salon Interior showcase — served from /public/gallery/salon-interior */
const SALON_INTERIOR_SHOWCASE = [
  { imageUrl: '/gallery/salon-interior/01.png', caption: 'Treatment suite' },
  { imageUrl: '/gallery/salon-interior/02.png', caption: 'Reception' },
];

/** Before & After pairs — order: before → after for each look — /public/gallery/before-after */
const BEFORE_AFTER_SHOWCASE = [
  { imageUrl: '/gallery/before-after/01-before.png', caption: 'Before · natural' },
  { imageUrl: '/gallery/before-after/02-after.png', caption: 'After · bridal glam' },
  { imageUrl: '/gallery/before-after/03-before.png', caption: 'Before · prep' },
  { imageUrl: '/gallery/before-after/04-after.png', caption: 'After · event ready' },
];

function GalleryPage({ apiBase }) {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].key);

  useEffect(() => {
    if (!USE_REST_API) return undefined;
    const ac = new AbortController();
    fetch(`${apiBase}/gallery`, { signal: ac.signal })
      .then((res) => res.json())
      .then(setItems)
      .catch(() => {});
    return () => ac.abort();
  }, [apiBase]);

  const filtered = items.filter((i) => i.category === activeCategory);
  const isMakeupTab = activeCategory === 'Bridal Makeup';
  const isHairTab = activeCategory === 'Hair Styling';
  const isSkinTab = activeCategory === 'Skin Care';
  const isSalonTab = activeCategory === 'Salon Interior';
  const isBeforeAfterTab = activeCategory === 'Before & After';
  const usePremiumLayout =
    isMakeupTab || isHairTab || isSkinTab || isSalonTab || isBeforeAfterTab;

  const staticShowcaseItems = isMakeupTab
    ? MAKEUP_SHOWCASE.map((row, i) => ({
        _id: `makeup-showcase-${i}`,
        imageUrl: row.imageUrl,
        caption: row.caption,
        category: 'Bridal Makeup',
      }))
    : isHairTab
      ? HAIR_SHOWCASE.map((row, i) => ({
          _id: `hair-showcase-${i}`,
          imageUrl: row.imageUrl,
          caption: row.caption,
          category: 'Hair Styling',
        }))
      : isSkinTab
        ? SKIN_CARE_SHOWCASE.map((row, i) => ({
            _id: `skincare-showcase-${i}`,
            imageUrl: row.imageUrl,
            caption: row.caption,
            category: 'Skin Care',
          }))
        : isSalonTab
          ? SALON_INTERIOR_SHOWCASE.map((row, i) => ({
              _id: `salon-showcase-${i}`,
              imageUrl: row.imageUrl,
              caption: row.caption,
              category: 'Salon Interior',
            }))
          : isBeforeAfterTab
            ? BEFORE_AFTER_SHOWCASE.map((row, i) => ({
                _id: `before-after-showcase-${i}`,
                imageUrl: row.imageUrl,
                caption: row.caption,
                category: 'Before & After',
              }))
            : [];

  const displayItems = usePremiumLayout ? [...staticShowcaseItems, ...filtered] : filtered;

  /* Before & After: 2 columns so each pair reads left → right on one row */
  const gridClassName = `grid grid-cols-1 ${
    isBeforeAfterTab ? 'sm:grid-cols-2 max-w-5xl mx-auto' : 'sm:grid-cols-2 lg:grid-cols-3'
  } ${usePremiumLayout ? 'gap-6 sm:gap-8 md:gap-10 xl:gap-12' : 'gap-5 sm:gap-6 md:gap-8'}`;

  const galleryGrid = (
    <div className={gridClassName}>
      {displayItems.map((item, index) => (
        <motion.div
          key={item._id}
          initial={usePremiumLayout ? { opacity: 0, y: 16 } : false}
          whileInView={usePremiumLayout ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.42) }}
          className={
            usePremiumLayout
              ? 'relative group aspect-[3/4] rounded-2xl bg-white p-2.5 md:p-3 shadow-[0_22px_55px_-18px_rgba(26,22,20,0.2)] ring-1 ring-ink/[0.07]'
              : 'relative overflow-hidden rounded-xl group aspect-[3/4]'
          }
        >
          <div
            className={
              usePremiumLayout
                ? 'relative h-full w-full overflow-hidden rounded-xl bg-ink/[0.03]'
                : 'relative h-full w-full overflow-hidden'
            }
          >
            <img
              src={item.imageUrl}
              alt={item.caption || item.category || 'Gallery'}
              className="h-full w-full object-cover object-center img-zoom-hover"
              loading="lazy"
            />
            {item.caption && (
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 pt-12 bg-gradient-to-t from-ink/80 via-ink/35 to-transparent">
                <p className="text-[11px] md:text-xs font-medium tracking-[0.2em] uppercase text-white/95">
                  {item.caption}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      ))}
      {!displayItems.length && (
        <p className="text-sm text-muted col-span-full text-center py-12">
          Images will appear here once added.
        </p>
      )}
    </div>
  );

  return (
    <motion.section
      className="section-padding-lg bg-cream"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className="lux-container">
        <div className="mb-12 md:mb-20 text-center md:text-left">
          <p className="section-title">Gallery</p>
          <h1 className="section-heading mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Studio Gallery
          </h1>
          <p className="section-subtitle mx-auto md:mx-0">
            Browse through makeup transformations, hairstyles, skincare results, and the
            ambience of our studio.
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-2.5 sm:gap-3 mb-10 md:mb-14">
          {CATEGORIES.map(({ key, label }) => (
            <motion.button
              key={key}
              type="button"
              onClick={() => setActiveCategory(key)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-[11px] sm:text-xs md:text-sm font-medium tracking-[0.1em] transition-all duration-300 ${
                activeCategory === key
                  ? 'bg-btn text-white border border-btn'
                  : 'bg-white text-ink border border-border hover:border-champagne hover:text-champagne'
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.button>
          ))}
        </div>

        {usePremiumLayout ? (
          <div className="rounded-3xl bg-white/80 backdrop-blur-sm border border-border/60 shadow-[0_32px_80px_-24px_rgba(26,22,20,0.12)] p-4 sm:p-6 md:p-10 lg:p-12">
            {galleryGrid}
          </div>
        ) : (
          galleryGrid
        )}
      </div>
    </motion.section>
  );
}

export default GalleryPage;
