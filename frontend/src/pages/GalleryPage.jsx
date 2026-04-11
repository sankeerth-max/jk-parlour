import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.js';
import { GALLERY_CATEGORIES } from '../constants/galleryCategories.js';
import { GALLERY_LOCAL_ITEMS_BY_CATEGORY } from '../constants/galleryLocalAssets.js';

const GALLERY_COLLECTION = 'gallery';

const PLACEHOLDER_IMAGE = '/gallery/makeup/01.png';

function mapGalleryDocs(snapshot) {
  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      image: String(data.imageUrl ?? data.image ?? '').trim(),
      category: String(data.category ?? '').trim(),
    };
  });
}

export default function GalleryPage() {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState(GALLERY_CATEGORIES[0]);

  useEffect(() => {
    const colRef = collection(db, GALLERY_COLLECTION);
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        setItems(mapGalleryDocs(snapshot));
      },
      () => {
        setItems([]);
      }
    );
    return () => unsubscribe();
  }, []);

  const filtered = useMemo(() => {
    const fromFirestore = items.filter((item) => item.category === activeCategory);
    const localPaths = GALLERY_LOCAL_ITEMS_BY_CATEGORY[activeCategory];
    if (!localPaths?.length) return fromFirestore;

    const merged = [];
    const seen = new Set();
    localPaths.forEach((src, idx) => {
      merged.push({
        id: `local-gallery-${activeCategory}-${idx}`,
        image: src,
        category: activeCategory,
      });
      seen.add(src);
    });
    for (const item of fromFirestore) {
      if (item.image && !seen.has(item.image)) {
        merged.push(item);
        seen.add(item.image);
      }
    }
    return merged;
  }, [items, activeCategory]);

  const isHairStyling = activeCategory === 'Hair Styling';

  return (
    <motion.section
      className="section-padding-lg bg-cream min-h-screen"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
    >
      <div className="lux-container max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16 text-center md:text-left">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted mb-3">
            Gallery
          </p>
          <h1
            className="text-3xl sm:text-4xl md:text-[2.75rem] font-semibold text-ink tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Studio Gallery
          </h1>
          <p className="text-muted text-sm sm:text-base max-w-2xl mx-auto md:mx-0 leading-relaxed">
            Moments from our studio — makeup, hair, skin, our space, and transformations.
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-2.5 sm:gap-3 mb-10 md:mb-14">
          {GALLERY_CATEGORIES.map((label) => {
            const isActive = activeCategory === label;
            return (
              <motion.button
                key={label}
                type="button"
                onClick={() => setActiveCategory(label)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-[11px] sm:text-xs font-medium tracking-[0.12em] uppercase transition-all duration-300 border ${
                  isActive
                    ? 'bg-[#1d1d1f] text-white border-[#1d1d1f]'
                    : 'bg-white text-ink border-border hover:border-champagne/50 hover:text-champagne'
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                {label}
              </motion.button>
            );
          })}
        </div>

        <div className="rounded-3xl bg-white/80 backdrop-blur-sm border border-border/60 shadow-[0_24px_60px_-20px_rgba(29,29,31,0.12)] p-4 sm:p-6 md:p-10 lg:p-12">
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 ${
              isHairStyling ? 'lg:grid-cols-2 max-w-5xl mx-auto' : 'lg:grid-cols-3'
            }`}
          >
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.35) }}
                className={`group relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100 shadow-[0_16px_44px_-18px_rgba(29,29,31,0.22)] ring-1 ${
                  isHairStyling
                    ? 'ring-black/[0.06] sm:rounded-[1.25rem]'
                    : 'ring-ink/[0.06]'
                }`}
              >
                <img
                  src={item.image || PLACEHOLDER_IMAGE}
                  alt=""
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = PLACEHOLDER_IMAGE;
                  }}
                  className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] ${
                    isHairStyling ? 'object-top' : 'object-center'
                  }`}
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>

          {!filtered.length && (
            <p className="text-sm text-muted text-center py-16 col-span-full">
              No images in this category yet.
            </p>
          )}
        </div>
      </div>
    </motion.section>
  );
}
