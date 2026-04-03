import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { whatsappWaMeDigits } from '../constants/contact.js';
import {
  loadServices,
  SERVICES_UPDATED_EVENT,
} from '../lib/servicesStorage.js';

function buildServiceWhatsAppUrl(serviceName, settingsWhatsapp) {
  const text = `Hello, I would like to book ${serviceName} at Sri Karthika Bridal Studio. Please share details.`;
  const digits = whatsappWaMeDigits(settingsWhatsapp);
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

function ServicesPage({ settings }) {
  const [services, setServices] = useState(() => loadServices());
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const sync = () => {
      setServices(loadServices());
      setExpandedId(null);
    };
    window.addEventListener('storage', sync);
    window.addEventListener(SERVICES_UPDATED_EVENT, sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener(SERVICES_UPDATED_EVENT, sync);
    };
  }, []);

  const openWhatsAppBook = (serviceName) => {
    const url = buildServiceWhatsAppUrl(serviceName, settings?.whatsapp);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-white pt-[84px] sm:pt-[92px] md:pt-[100px] pb-[48px] sm:pb-[56px] md:pb-[60px] px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="mx-auto max-w-[1200px] flex flex-col items-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#6E6E73] mb-5 text-center">
            OUR SERVICES
          </p>
          <div className="w-full max-w-2xl text-left">
            <h1
              className="text-[2rem] sm:text-4xl md:text-[2.75rem] font-bold text-[#1D1D1F] leading-[1.1] tracking-[-0.02em] mb-4 ml-2 sm:ml-5 md:ml-8"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Beauty Services at a Glance
            </h1>
            <p className="text-[15px] sm:text-base text-[#6E6E73] leading-relaxed max-w-xl ml-auto text-right">
              Curated treatments, premium products, flawless results.
            </p>
          </div>
        </div>
      </section>

      <div className="h-px max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 bg-[#E5E5E5]" aria-hidden="true" />

      <section className="bg-white pb-20 md:pb-24 pt-10 md:pt-12 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[35px] items-stretch">
            {services.map((service, index) => {
              const rowKey = service.id ?? service.title;
              const isOpen = expandedId === rowKey;
              return (
                <motion.article
                  key={rowKey}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
                  className="group flex h-full min-h-0 flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_10px_25px_rgba(0,0,0,0.05)] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.1)]"
                >
                  <div className="relative h-[200px] w-full shrink-0 overflow-hidden rounded-t-[20px]">
                    <img
                      src={service.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.12] via-transparent to-transparent"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5 text-left">
                    <h2
                      className="text-lg font-bold text-[#1D1D1F] leading-snug"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {service.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-[#6E6E73] line-clamp-2">{service.description}</p>
                    <p className="mt-3 text-sm font-medium text-[#C89B3C]">Starting from {service.startsFrom}</p>

                    <div className="mt-5 flex flex-1 flex-col gap-3">
                      <motion.button
                        type="button"
                        onClick={() => openWhatsAppBook(service.title)}
                        className="w-full rounded-full bg-black px-5 py-2.5 text-[13px] font-medium text-white shadow-sm"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      >
                        Book Now
                      </motion.button>
                      <button
                        type="button"
                        onClick={() => setExpandedId(isOpen ? null : rowKey)}
                        className="self-start text-[13px] font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
                      >
                        View Details
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
                          <ul className="mt-4 space-y-2 border-t border-[#F0F0F0] pt-4 text-[13px] text-[#6E6E73]">
                            {service.details.map((item, i) => (
                              <li key={`${rowKey}-d-${i}`} className="flex gap-2">
                                <span className="text-[#C89B3C]" aria-hidden="true">
                                  ·
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;
