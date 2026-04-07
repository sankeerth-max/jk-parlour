import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.js';
import { useBookingModal } from '../context/BookingModalContext.jsx';
import { mapVisibleServicesFromSnapshot } from '../lib/serviceDocuments.js';

const SERVICES_COLLECTION = 'services';
const PLACEHOLDER_IMAGE = '/services-makeup.jpg';

function formatStartingFromRupee(price) {
  const n = typeof price === 'number' && !Number.isNaN(price) ? price : Number(price) || 0;
  const num = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: n % 1 === 0 ? 0 : 2,
  }).format(n);
  return `Starting from ₹${num}`;
}

function detailLinesForService(service) {
  if (service.details.length > 0) return service.details;
  const fromDesc = String(service.description ?? '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  return fromDesc.length ? fromDesc : ['Contact us for package details.'];
}

/** Single card — one Firestore service document */
function ServiceCard({ service, isOpen, onToggleDetails, onBook }) {
  const imgSrc = service.image || PLACEHOLDER_IMAGE;
  const lines = detailLinesForService(service);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_40px_-12px_rgba(29,29,31,0.15)] ring-1 ring-ink/[0.06] hover:shadow-[0_20px_50px_-16px_rgba(29,29,31,0.18)] transition-shadow duration-300"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-warmbeige">
        <img
          src={imgSrc}
          alt=""
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = PLACEHOLDER_IMAGE;
          }}
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7 text-left">
        {service.offerPercentage > 0 && (
          <p className="inline-flex self-start items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 text-[11px] font-medium mb-3">
            🔥 {service.offerPercentage}% OFF
          </p>
        )}
        <h2
          className="text-lg font-semibold text-ink leading-snug mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {service.title}
        </h2>
        <p className="text-sm text-muted leading-relaxed line-clamp-3 mb-4">{service.description}</p>
        <p className="text-sm font-medium text-champagne mb-5">{formatStartingFromRupee(service.price)}</p>

        <div className="mt-auto flex flex-col gap-3">
          <button
            type="button"
            onClick={() => onBook(service.title)}
            className="w-full rounded-full bg-[#1d1d1f] px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-black transition-colors duration-200"
          >
            Book Now
          </button>
          <button
            type="button"
            onClick={onToggleDetails}
            className="self-start text-sm font-medium text-muted hover:text-ink transition-colors"
            aria-expanded={isOpen}
          >
            {isOpen ? 'Hide details' : 'View Details'}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <ul className="mt-4 space-y-2 border-t border-border pt-4 text-sm text-muted">
                {lines.map((line, idx) => (
                  <li key={`${service.id}-line-${idx}`} className="flex gap-2 pl-0.5">
                    <span className="text-champagne shrink-0" aria-hidden>
                      ·
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export default function ServicesPage() {
  const { openBookingModal } = useBookingModal();
  const [services, setServices] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const colRef = collection(db, SERVICES_COLLECTION);
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        setServices(mapVisibleServicesFromSnapshot(snapshot));
      },
      () => {
        setServices([]);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <section className="section-padding-lg bg-cream min-h-screen">
      <div className="lux-container max-w-7xl mx-auto">
        <div className="text-center md:text-left mb-12 md:mb-16">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted mb-3">
            Our Services
          </p>
          <h1
            className="text-3xl sm:text-4xl md:text-[2.75rem] font-semibold text-ink tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Signature treatments
          </h1>
          <p className="text-muted text-sm sm:text-base max-w-2xl mx-auto md:mx-0 leading-relaxed">
            Curated beauty experiences with premium products and a calm, refined studio atmosphere.
          </p>
        </div>

        {services.length === 0 ? (
          <p className="text-center text-muted py-16 text-sm">No services available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                isOpen={expandedId === service.id}
                onToggleDetails={() =>
                  setExpandedId((id) => (id === service.id ? null : service.id))
                }
                onBook={openBookingModal}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
