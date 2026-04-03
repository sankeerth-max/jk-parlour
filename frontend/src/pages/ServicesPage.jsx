import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { whatsappWaMeDigits } from '../constants/contact.js';

/**
 * Images match HomePage "Beauty Services at a Glance" (`SERVICES_WITH_IMAGES`).
 * Home Signature "Makeup & Bridal" and Bridal Services both use `makeup-bridal-signature.png`.
 */
const SERVICES = [
  {
    title: 'Hair Services',
    description: 'Precision cuts, styling, and restorative care in a calm salon setting.',
    startsFrom: '₹150',
    image: '/services-hair.jpg',
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
    startsFrom: '₹300',
    image: '/services-skincare.jpg',
    details: [
      'Basic & Advanced Facials (Gold, Diamond, Hydra)',
      'Clean-Up & Detan Treatments',
      'Skin Polishing',
      'Anti-Aging & Brightening Facials',
      'Acne Treatment',
      'Under Eye Care',
    ],
  },
  {
    title: 'Makeup & Makeovers',
    description: 'Soft glam and event-ready looks with a refined, natural finish.',
    startsFrom: '₹3,000',
    image: '/services-makeup.jpg',
    details: [
      'Party Makeup',
      'Engagement & Reception Makeup',
      'HD & Airbrush Makeup',
      'Natural & Glam Makeup Looks',
      'Hairstyling for Events',
      'Saree Draping',
    ],
  },
  {
    title: 'Nail Care',
    description: 'Manicure and pedicure care for polished, healthy nails.',
    startsFrom: '₹100',
    image: '/services-nails.jpg',
    details: [
      'Manicure & Spa Manicure',
      'Pedicure & Spa Pedicure',
      'Gel Polish',
      'Nail Art & Nail Extensions',
      'Nail Refill & Removal',
    ],
  },
  {
    title: 'Waxing',
    description: 'Smooth, hygienic waxing from face to body.',
    startsFrom: '₹80',
    image: '/services-waxing.jpg',
    details: [
      'Full Body Waxing',
      'Arms & Legs Waxing',
      'Underarms Waxing',
      'Face Waxing',
      'Bikini Waxing',
      'Rica & Chocolate Wax',
    ],
  },
  {
    title: 'Bridal Services',
    description: 'Complete bridal looks with premium finishing for your celebration.',
    startsFrom: '₹4,999',
    image: '/makeup-bridal-signature.png',
    details: [
      'Bridal Makeup Packages',
      'Pre-Bridal Skincare Packages',
      'Bridal Hair Styling',
      'Trial Makeup Session',
      'Mehandi for Bride',
      'Family Makeup Services',
    ],
  },
  {
    title: 'Mehendi Services',
    description: 'Intricate henna designs for weddings and special occasions.',
    startsFrom: '₹500',
    image: '/services-mehendi.jpg',
    details: ['Bridal Mehendi', 'Party Mehendi', 'Custom Motifs', 'Aftercare Guidance'],
  },
];

function buildServiceWhatsAppUrl(serviceName, settingsWhatsapp) {
  const text = `Hello, I would like to book ${serviceName} at Sri Karthika Bridal Studio. Please share details.`;
  const digits = whatsappWaMeDigits(settingsWhatsapp);
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

function ServicesPage({ settings }) {
  const [expandedId, setExpandedId] = useState(null);

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
            {SERVICES.map((service, index) => {
              const isOpen = expandedId === service.title;
              return (
                <motion.article
                  key={service.title}
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
                        onClick={() => setExpandedId(isOpen ? null : service.title)}
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
                            {service.details.map((item) => (
                              <li key={item} className="flex gap-2">
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
