import { useEffect, useState } from 'react';

const SERVICE_CATEGORIES = [
  'Threading',
  'Hair Services',
  'Waxing',
  'Skin Care',
  'Hair Coloring',
  'Facials',
  'Pedicure & Manicure',
  'Bridal Makeup',
  'Mehendi',
  'Bridal Packages',
];

function ServicesPage({ apiBase }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${apiBase}/services`)
      .then((res) => res.json())
      .then(setServices)
      .catch(() => {});
  }, [apiBase]);

  return (
    <section className="section-padding">
      <div className="lux-container">
        <div className="mb-10">
          <p className="section-title">Services</p>
          <h1 className="section-heading">Bridal & Beauty Services</h1>
          <p className="section-subtitle">
            Explore our complete range of bridal, beauty, and salon services. Prices mentioned are
            indicative and may vary based on customisation.
          </p>
        </div>
        <div className="space-y-10">
          {SERVICE_CATEGORIES.map((category) => {
            const items = services.filter((s) => s.category === category);
            if (!items.length) return null;
            return (
              <div key={category}>
                <h2 className="font-display text-2xl mb-4 text-deepCharcoal">{category}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {items.map((s) => (
                    <div
                      key={s._id}
                      className="card-luxe p-4 flex items-start gap-4 hover:-translate-y-0.5 hover:shadow-luxe transition-all"
                    >
                      {s.imageUrl && (
                        <div className="h-16 w-16 rounded-2xl bg-cover bg-center shrink-0"
                          style={{ backgroundImage: `url(${s.imageUrl})` }}
                        />
                      )}
                      <div>
                        <div className="flex items-center justify-between gap-3 mb-1">
                          <h3 className="font-medium text-deepCharcoal">{s.name}</h3>
                          <p className="text-roseGold text-sm font-semibold">
                            From ₹{s.priceFrom}
                          </p>
                        </div>
                        {s.description && (
                          <p className="text-xs md:text-sm text-neutral-600">{s.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesPage;

