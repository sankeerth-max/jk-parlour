import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBookingModal } from '../context/BookingModalContext.jsx';
import SitePreFooterCta from '../components/SitePreFooterCta.jsx';

const CATEGORY_COLLECTIONS = [
  {
    title: 'Hair',
    image: '/hair-essential.png',
  },
  {
    title: 'Skin Care',
    image:
      '/skincare-essential.jpg',
  },
  {
    title: 'Makeup',
    image:
      '/makeup-essential.jpg',
  },
  {
    title: 'Bridal',
    image:
      '/bridal-essential.jpg',
  },
];

/** Home “Signature Experiences” — 3 featured cards only */
const SIGNATURE_EXPERIENCES = [
  {
    title: 'Hair Services',
    image: '/services-hair.jpg',
    description: 'Cuts, styling, and restorative care tailored to you.',
  },
  {
    title: 'Skin Care',
    image: '/services-skincare.jpg',
    description: 'Facials and rituals for a calm, radiant complexion.',
  },
  {
    title: 'Makeup & Bridal',
    image: '/makeup-bridal-signature.png',
    description: 'Soft glam, bridal artistry, and celebration-ready looks.',
  },
];

const BRIDAL_SHOWCASE = [
  '/bridal-1.jpg',
  '/bridal-3.jpg',
  '/bridal-2.jpg',
  '/bridal-4.jpg',
];

const BEFORE_AFTER_IMAGES = {
  before: '/before-look.jpg',
  after: '/after-look.jpg',
};

const INSTAGRAM_GRID = [
  '/insta-1.jpg',
  '/insta-2.jpg',
  '/insta-3.jpg',
  '/insta-4.jpg',
  '/insta-5.jpg',
  '/insta-6.jpg',
];

const SERVICE_PREVIEW = [
  { name: 'Hair Services', to: '/services' },
  { name: 'Skin Care', to: '/services' },
  { name: 'Waxing', to: '/services' },
  { name: 'Bridal', to: '/services' },
];

const TESTIMONIALS = [
  {
    name: 'Priya',
    review:
      'This was the best bridal experience. The team made me feel confident and beautiful from trial to the final look.',
    rating: 5,
  },
  {
    name: 'Meenakshi',
    review:
      'The skincare glow is unreal. Everything felt premium, clean, and personalized for my skin type.',
    rating: 5,
  },
  {
    name: 'Ananya',
    review:
      'Professional makeup and hair styling with a calm, luxury vibe. I loved how natural and elegant the final result looked.',
    rating: 5,
  },
];

function HomePage() {
  const { openBookingModal } = useBookingModal();
  const [selectedBridalImage, setSelectedBridalImage] = useState(null);
  const sectionAnimation = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.5 },
  };

  return (
    <>
      {/* Hero (full-width background image) */}
      <section className="relative h-[78vh] sm:h-[85vh] md:h-[90vh] min-h-[540px] sm:min-h-[600px] md:min-h-[640px] overflow-hidden">
        {/* Background image layer (slightly blurred behind text) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/hero-main.png')",
            backgroundPosition: 'center 24%',
            transform: 'scale(1.01)',
          }}
          aria-hidden="true"
        />

        {/* Left-side readability gradient */}
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.35) 38%, rgba(0,0,0,0) 72%)',
          }}
        />

        <div className="relative z-10 h-full flex items-center">
          <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="max-w-[500px] text-center md:text-left mx-auto md:mx-0">
              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="text-[34px] sm:text-[44px] md:text-[56px] lg:text-[64px] leading-[1.06] md:leading-[1.03] font-bold text-white tracking-[-0.02em] md:tracking-[-0.03em] mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Experience the Art of Timeless Beauty
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12 }}
                className="text-[15px] sm:text-base md:text-lg text-[#E5E5E5] leading-[1.7] font-light mb-5 md:mb-5"
              >
                Luxury beauty services designed to enhance your natural glow.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.22 }}
                className="flex justify-center md:justify-start translate-y-[6px]"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    type="button"
                    onClick={() => openBookingModal()}
                    className="inline-flex items-center justify-center rounded-full bg-white text-ink px-6 py-3 text-sm font-medium"
                    style={{ minWidth: 180 }}
                  >
                    Book Appointment
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Category / Collection */}
      <motion.section className="section-padding-lg bg-cream" {...sectionAnimation}>
        <div className="lux-container flex flex-col items-center text-center">
          <p className="section-title text-center w-full mb-2.5">Collections</p>
          <h2 className="section-heading text-center w-full mb-1.5 md:mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Beauty Essentials
          </h2>
          <p className="section-subtitle text-center mx-auto -mt-1 md:-mt-1.5 mb-12 md:mb-14 max-w-2xl w-full px-1">
            Curated beauty categories crafted for timeless elegance.
          </p>
          <div className="grid w-full sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {CATEGORY_COLLECTIONS.map((category) => (
              <Link key={category.title} to="/services" className="group block">
                <div className="relative media-frame">
                  <img
                    src={category.image}
                    alt={category.title}
                    loading="lazy"
                    className="w-full h-[320px] md:h-[360px] object-cover img-zoom-hover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                  <p
                    className="absolute left-5 bottom-5 text-white text-lg tracking-[0.02em]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {category.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Image + Text (left image) */}
      <motion.section className="section-padding-lg bg-white" {...sectionAnimation}>
        <div className="lux-container">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="media-frame">
              <img
                src="/signature-experience.jpg"
                alt="Beauty service session"
                loading="lazy"
                className="w-full h-[380px] md:h-[520px] object-cover img-zoom-hover"
              />
            </div>
            <div className="space-y-6 md:space-y-8">
              <p className="section-title">Signature Experience</p>
              <h2 className="section-heading" style={{ fontFamily: 'var(--font-display)' }}>
                Signature Beauty Experience
              </h2>
              <p className="section-subtitle text-muted">
                A curated blend of precision hair styling, luminous skin rituals, and elegant finishing touches,
                tailored to your glow.
              </p>
              <motion.div
                className="translate-y-[6px]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <Link to="/services" className="btn-primary">
                  Explore Services
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Signature Bridal Experience */}
      <motion.section className="section-padding-lg bg-white" {...sectionAnimation}>
        <div className="lux-container">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            {/* LEFT: text */}
            <div className="space-y-6 md:space-y-8">
              <p className="text-xs font-medium tracking-[0.22em] uppercase text-ink">
                BRIDAL SPECIALIST
              </p>
              <h2
                className="text-[32px] sm:text-[40px] md:text-[52px] font-semibold text-ink leading-[1.07] md:leading-[1.05] tracking-[-0.02em]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Bridal Perfection
              </h2>
              <p className="text-muted text-[15px] sm:text-base leading-[1.7] max-w-[520px]">
                Crafting timeless bridal looks with precision, elegance, and artistry tailored to your special
                day.
              </p>
              <motion.div
                className="translate-y-[10px]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  type="button"
                  onClick={() => openBookingModal('Makeup')}
                  className="btn-primary inline-flex items-center justify-center px-6 py-3 rounded-full"
                >
                  Book Now
                </button>
              </motion.div>
            </div>

            {/* RIGHT: image */}
            <div className="rounded-[16px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <img
                src="/bridal-specialist.jpg"
                alt="Bridal makeup close-up"
                loading="lazy"
                className="w-full h-[380px] md:h-[520px] object-cover img-zoom-hover"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Premium Skin Care Banner */}
      <motion.section className="section-padding-lg bg-white" {...sectionAnimation}>
        <div className="lux-container-wide">
          <div className="relative overflow-hidden rounded-[16px] min-h-[380px] sm:min-h-[420px] md:min-h-[520px] flex items-center shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <img
              src="/radiant-skin-care.jpg"
              alt="Facial treatment skincare service"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover img-zoom-hover"
            />

            {/* Soft readability overlay (stronger on left) */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.30) 38%, rgba(0,0,0,0) 72%)',
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 p-6 sm:p-8 md:p-16 w-full">
              <div className="max-w-[560px] text-left">
                <p className="text-xs font-medium tracking-[0.22em] uppercase text-white/90 mb-3">
                  SKINCARE SPECIALIST
                </p>
                <h2
                  className="text-[32px] sm:text-[40px] md:text-[52px] font-semibold text-white leading-[1.07] md:leading-[1.05] tracking-[-0.02em] mb-4"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Radiant Skin Care
                </h2>
                <p className="text-[#E5E5E5] text-[15px] sm:text-base leading-[1.7] font-light max-w-[520px] mb-7">
                  Experience rejuvenating skin treatments designed to restore glow, hydration, and
                  natural beauty.
                </p>

                <motion.div
                  className="translate-y-[10px]"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    type="button"
                    onClick={() => openBookingModal('Skin Care')}
                    className="btn-primary"
                  >
                    Book Now
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Signature Experiences — 3 featured services */}
      <motion.section className="bg-white pt-16 sm:pt-20 md:pt-[100px] pb-16 sm:pb-20 md:pb-[80px]" {...sectionAnimation}>
        <div className="lux-container max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#6E6E73] mb-5">
              OUR SIGNATURE
            </p>
            <h2
              className="text-[2rem] sm:text-[2.35rem] md:text-[2.65rem] font-semibold text-[#1D1D1F] leading-[1.12] tracking-[-0.02em] mb-5"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Signature Experiences
            </h2>
            <p className="text-[15px] sm:text-base text-[#6E6E73] leading-relaxed">
              Curated beauty services designed to bring out your most confident self.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-5xl mx-auto">
            {SIGNATURE_EXPERIENCES.map((item) => (
              <Link
                key={item.title}
                to="/services"
                className="group block rounded-[16px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.07)] transition-shadow duration-300 ease-out hover:shadow-[0_20px_50px_rgba(0,0,0,0.11)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D1D1F]/20 focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[16px]">
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover object-center transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[16px]"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
                    }}
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-left">
                    <h3
                      className="text-lg md:text-xl font-bold text-white leading-tight drop-shadow-sm"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[13px] md:text-sm text-white/90 leading-relaxed max-w-[240px]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 md:mt-14 flex flex-col items-center gap-6">
            <Link
              to="/services"
              className="text-[14px] font-medium text-[#1D1D1F] border-b border-transparent hover:border-[#1D1D1F] transition-colors pb-0.5"
            >
              View All Services →
            </Link>
            <p className="text-[13px] text-[#6E6E73] tracking-wide">✨ Trusted by 1000+ happy clients</p>
          </div>
        </div>
      </motion.section>

      {/* Bridal showcase */}
      <motion.section className="section-padding-lg bg-cream" {...sectionAnimation}>
        <div className="lux-container">
          <p className="section-title text-center">Bridal Showcase</p>
          <h2 className="section-heading text-center mb-8" style={{ fontFamily: 'var(--font-display)' }}>
            Signature Bridal Looks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {BRIDAL_SHOWCASE.map((image, idx) => (
              <button
                type="button"
                key={image}
                onClick={() => setSelectedBridalImage(image)}
                className="media-frame text-left"
                aria-label={`Open bridal image ${idx + 1}`}
              >
                <img
                  src={image}
                  alt={`Bridal showcase ${idx + 1}`}
                  loading="lazy"
                  className="h-[360px] sm:h-[340px] lg:h-[300px] w-full object-cover bridal-showcase-img"
                />
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Before / After */}
      <motion.section className="section-padding-lg bg-white" {...sectionAnimation}>
        <div className="lux-container">
          <h2 className="section-heading text-center mb-8" style={{ fontFamily: 'var(--font-display)' }}>
            Before & After
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="media-frame relative">
              <img
                src={BEFORE_AFTER_IMAGES.before}
                alt="Before makeover"
                loading="lazy"
                className="h-[420px] md:h-[500px] w-full object-cover img-zoom-hover"
              />
              <p className="absolute top-4 left-4 bg-black/45 text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full">
                Before
              </p>
            </div>
            <div className="media-frame relative">
              <img
                src={BEFORE_AFTER_IMAGES.after}
                alt="After makeover"
                loading="lazy"
                className="h-[420px] md:h-[500px] w-full object-cover img-zoom-hover"
              />
              <p className="absolute top-4 left-4 bg-black/45 text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full">
                After
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Services Preview */}
      <motion.section className="section-padding-lg bg-cream" {...sectionAnimation}>
        <div className="lux-container">
          <p className="section-title text-center">Service Overview</p>
          <h2 className="section-heading text-center mb-8" style={{ fontFamily: 'var(--font-display)' }}>
            Signature Services
          </h2>
          <div className="max-w-3xl mx-auto divide-y divide-border/80 border-y border-border/80">
            {SERVICE_PREVIEW.map((service) => (
              <Link
                key={service.name}
                to={service.to}
                className="flex items-center justify-between py-5 md:py-6 group"
              >
                <p className="text-lg text-ink" style={{ fontFamily: 'var(--font-display)' }}>
                  {service.name}
                </p>
                <span className="text-sm text-champagne group-hover:translate-x-1 transition-transform duration-200">
                  Explore
                </span>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Instagram */}
      <motion.section className="section-padding-lg bg-cream" {...sectionAnimation}>
        <div className="lux-container">
          <p className="section-title text-center">Instagram</p>
          <h2 className="section-heading text-center mb-8" style={{ fontFamily: 'var(--font-display)' }}>
            Follow Our Latest Looks
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {INSTAGRAM_GRID.map((image, idx) => (
              <a
                key={image}
                href="https://www.instagram.com/jk.makeoverartistry"
                target="_blank"
                rel="noreferrer"
                className="media-frame block"
              >
                <img
                  src={image}
                  alt={`Instagram beauty post ${idx + 1}`}
                  loading="lazy"
                  className="aspect-square h-full w-full object-cover img-zoom-hover"
                />
              </a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section className="section-padding-lg bg-white" {...sectionAnimation}>
        <div className="lux-container">
          <p className="section-title text-center">Testimonials</p>
          <h2 className="section-heading text-center mb-10" style={{ fontFamily: 'var(--font-display)' }}>
            What Our Clients Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="media-frame bg-white border border-border/70 p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex gap-1" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < t.rating ? 'text-champagne' : 'text-border'} aria-hidden="true">
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs tracking-[0.35em] uppercase text-muted" style={{ fontFamily: 'var(--font-display)' }}>
                    Verified
                  </span>
                </div>

                <p className="mt-5 text-ink/90 leading-relaxed text-sm md:text-base">
                  “{t.review}”
                </p>
                <p className="mt-6 text-ink font-medium" style={{ fontFamily: 'var(--font-display)' }}>
                  — {t.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <SitePreFooterCta motionProps={sectionAnimation} />

      {selectedBridalImage && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/75 p-4 md:p-8 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setSelectedBridalImage(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/90 hover:text-white text-3xl leading-none"
            onClick={() => setSelectedBridalImage(null)}
            aria-label="Close image preview"
          >
            ×
          </button>
          <motion.img
            src={selectedBridalImage}
            alt="Bridal preview"
            className="max-h-[88vh] max-w-[92vw] object-contain rounded-xl"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </>
  );
}

export default HomePage;
