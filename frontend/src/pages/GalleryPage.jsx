import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.js';
import { GALLERY_CATEGORIES } from '../constants/galleryCategories.js';
import {
  GALLERY_BEFORE_AFTER_PAIRS,
  GALLERY_LOCAL_ITEMS_BY_CATEGORY,
} from '../constants/galleryLocalAssets.js';

const GALLERY_COLLECTION = 'gallery';

const PLACEHOLDER_IMAGE = '/gallery/makeup/01.png';

const CATEGORY_BEFORE_AFTER = 'Before & After';

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
  const [lightboxSrc, setLightboxSrc] = useState(null);

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

  useEffect(() => {
    if (!lightboxSrc) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxSrc(null);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxSrc]);

  const beforeAfterPairUrls = useMemo(() => {
    const s = new Set();
    for (const p of GALLERY_BEFORE_AFTER_PAIRS) {
      s.add(p.before);
      s.add(p.after);
    }
    return s;
  }, []);

  const categoryItems = useMemo(
    () => items.filter((item) => item.category === activeCategory),
    [items, activeCategory]
  );

  const filtered = useMemo(() => {
    if (activeCategory === CATEGORY_BEFORE_AFTER) return categoryItems;
    const localPaths = GALLERY_LOCAL_ITEMS_BY_CATEGORY[activeCategory];
    if (!localPaths?.length) return categoryItems;

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
    for (const item of categoryItems) {
      if (item.image && !seen.has(item.image)) {
        merged.push(item);
        seen.add(item.image);
      }
    }
    return merged;
  }, [activeCategory, categoryItems]);

  const beforeAfterExtras = useMemo(() => {
    if (activeCategory !== CATEGORY_BEFORE_AFTER) return [];
    return filtered.filter((i) => i.image && !beforeAfterPairUrls.has(i.image));
  }, [activeCategory, filtered, beforeAfterPairUrls]);

  const isEmptyStandard = activeCategory !== CATEGORY_BEFORE_AFTER && !filtered.length;
  const isEmptyBeforeAfter =
    activeCategory === CATEGORY_BEFORE_AFTER &&
    GALLERY_BEFORE_AFTER_PAIRS.length === 0 &&
    !filtered.length;

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

        <div className="rounded-3xl bg-white/80 backdrop-blur-sm border border-border/60 shadow-[0_24px_60px_-20px_rgba(29,29,31,0.12)] p-4 sm:p-5 md:p-8 lg:p-10">
          {activeCategory === CATEGORY_BEFORE_AFTER ? (
            <>
              <div className="space-y-10 md:space-y-12">
                {GALLERY_BEFORE_AFTER_PAIRS.map((pair, pairIdx) => (
                  <motion.div
                    key={`ba-pair-${pairIdx}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{ duration: 0.45, delay: Math.min(pairIdx * 0.08, 0.3) }}
                    className="max-w-5xl mx-auto"
                  >
                    <p className="text-center text-[11px] font-medium uppercase tracking-[0.22em] text-muted mb-4 md:mb-5">
                      Transformation {pairIdx + 1}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                      {[
                        { src: pair.before, label: 'Before' },
                        { src: pair.after, label: 'After' },
                      ].map((tile) => (
                        <div key={tile.label} className="flex flex-col gap-2">
                          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/80">
                            {tile.label}
                          </p>
                          <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-neutral-100 shadow-sm ring-1 ring-ink/[0.06]">
                            <button
                              type="button"
                              onClick={() => setLightboxSrc(tile.src)}
                              className="absolute inset-0 flex items-center justify-center p-2 cursor-zoom-in text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2"
                              aria-label={`View ${tile.label} full screen`}
                            >
                              <img
                                src={tile.src}
                                alt=""
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = PLACEHOLDER_IMAGE;
                                }}
                                className="max-h-full max-w-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                                loading="lazy"
                                draggable={false}
                              />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {beforeAfterExtras.length > 0 ? (
                <div className="mt-10 md:mt-12 border-t border-border/50 pt-8 md:pt-10">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted text-center mb-6">
                    More
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {beforeAfterExtras.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.12 }}
                        transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.35) }}
                        className="group relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-neutral-100 shadow-sm ring-1 ring-ink/[0.06]"
                      >
                        <button
                          type="button"
                          onClick={() => setLightboxSrc(item.image || PLACEHOLDER_IMAGE)}
                          className="absolute inset-0 flex items-center justify-center p-2 cursor-zoom-in text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2"
                          aria-label="View image full screen"
                        >
                          <img
                            src={item.image || PLACEHOLDER_IMAGE}
                            alt=""
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = PLACEHOLDER_IMAGE;
                            }}
                            className="max-h-full max-w-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                            loading="lazy"
                            draggable={false}
                          />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filtered.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.35) }}
                  className="group relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-neutral-100 shadow-sm ring-1 ring-ink/[0.06]"
                >
                  <button
                    type="button"
                    onClick={() => setLightboxSrc(item.image || PLACEHOLDER_IMAGE)}
                    className="absolute inset-0 flex items-center justify-center p-2 cursor-zoom-in text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2"
                    aria-label="View image full screen"
                  >
                    <img
                      src={item.image || PLACEHOLDER_IMAGE}
                      alt=""
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = PLACEHOLDER_IMAGE;
                      }}
                      className="max-h-full max-w-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      loading="lazy"
                      draggable={false}
                    />
                  </button>
                </motion.div>
              ))}
            </div>
          )}

          {(isEmptyStandard || isEmptyBeforeAfter) && (
            <p className="text-sm text-muted text-center py-16 col-span-full">
              No images in this category yet.
            </p>
          )}
        </div>
      </div>

      {lightboxSrc ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/93 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Full screen image"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            type="button"
            className="absolute right-3 top-3 z-[102] rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-wide text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:right-5 sm:top-5"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxSrc(null);
            }}
          >
            Close
          </button>
          <img
            src={lightboxSrc}
            alt=""
            className="max-h-[min(92vh,92vw)] max-w-full object-contain select-none"
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />
        </div>
      ) : null}
    </motion.section>
  );
}
