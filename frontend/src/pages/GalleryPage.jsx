import { useEffect, useState } from 'react';

const CATEGORIES = [
  'Bridal Makeup',
  'Hair Styling',
  'Skin Care',
  'Salon Interior',
  'Before & After',
];

function GalleryPage({ apiBase }) {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Bridal Makeup');

  useEffect(() => {
    fetch(`${apiBase}/gallery`)
      .then((res) => res.json())
      .then(setItems)
      .catch(() => {});
  }, [apiBase]);

  const filtered = items.filter((i) => i.category === activeCategory);

  return (
    <section className="section-padding">
      <div className="lux-container">
        <div className="mb-8">
          <p className="section-title">Gallery</p>
          <h1 className="section-heading">Studio Gallery</h1>
          <p className="section-subtitle">
            Browse through our bridal transformations, hairstyles, skincare results, and the
            ambience of our studio.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm border transition-all ${
                activeCategory === cat
                  ? 'bg-roseGold text-white border-roseGold'
                  : 'bg-white/70 text-neutral-700 border-neutral-200 hover:bg-softPink/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="relative overflow-hidden rounded-3xl group bg-softPink/40 aspect-[3/4]"
            >
              <img
                src={item.imageUrl}
                alt={item.caption || item.category}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {item.caption && (
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent text-xs text-white">
                  {item.caption}
                </div>
              )}
            </div>
          ))}
          {!filtered.length && (
            <p className="text-sm text-neutral-500 col-span-full">
              Images will appear here once added.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default GalleryPage;

