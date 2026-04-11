import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useBookingModal } from '../context/BookingModalContext.jsx';
import SitePreFooterCta from '../components/SitePreFooterCta.jsx';

const WHY_CHOOSE_US = [
  'Experienced Professionals',
  'Premium Products',
  'Personalized Services',
  'Clean & Comfortable Environment',
];

function AboutPage() {
  const { openBookingModal } = useBookingModal();
  const sectionAnimation = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.5 },
  };

  return (
    <>
      <section className="relative h-[72vh] sm:h-[80vh] md:h-[88vh] min-h-[500px] sm:min-h-[560px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/about-studio-new.jpg"
            alt="Studio interior"
            className="h-full w-full object-cover object-center scale-105 blur-[0.35px] transform-gpu"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.2))',
            }}
          />
        </div>

        <div className="relative z-10 flex h-full items-center">
          <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
            <div className="max-w-[560px]">
              <h1 className="text-[2rem] sm:text-[2.6rem] md:text-[3rem] font-bold text-white leading-[1.1] tracking-[-0.02em] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                About Our Studio
              </h1>
              <p className="text-[15px] sm:text-lg text-[#E5E5E5] leading-relaxed mb-8 md:mb-10">
                A luxury destination for beauty, elegance, and confidence.
              </p>

              <motion.button
                type="button"
                onClick={() => openBookingModal()}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-[15px] font-medium text-black shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                Book Appointment
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      <motion.section className="bg-cream py-16 sm:py-20 md:py-[100px]" {...sectionAnimation}>
        <div className="lux-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
            {/* LEFT — Text */}
            <div className="flex flex-col items-start">
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#6E6E73] mb-6">
                OUR STORY
              </p>
              <h2
                className="text-[2.4rem] md:text-[3rem] font-semibold text-[#1D1D1F] leading-[1.1] tracking-[-0.02em] mb-5"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Crafted Around Care & Elegance
              </h2>
              <p className="text-[15px] sm:text-lg text-[#6E6E73] leading-relaxed max-w-[500px]">
                We are dedicated to delivering premium beauty services with a focus on quality,
                comfort, and elegance. Our studio blends modern techniques with personalized care
                to create refined results for every occasion, from skincare and styling to complete
                bridal preparation.
              </p>

              <div className="mt-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to="/services"
                    className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3.5 text-[15px] font-medium text-white shadow-sm transition-transform"
                  >
                    Explore Services
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* RIGHT — Image */}
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3738349/pexels-photo-3738349.jpeg?auto=compress&cs=tinysrgb&w=1400"
                alt="Facial and skincare consultation"
                loading="lazy"
                className="w-full aspect-[16/10] object-cover rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
              />

              {/* Premium stat */}
              <div className="absolute top-6 left-6">
                <div className="rounded-full bg-white/95 border border-[#E5E5EA] px-5 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
                  <p className="text-[13px] font-medium text-[#1D1D1F] tracking-tight">
                    15+ Years Experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="section-padding-lg bg-white" {...sectionAnimation}>
        <div className="lux-container">
          <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center">
            <div className="media-frame">
              <img
                src="/founder.png"
                alt="Sri Karthika"
                className="w-full h-[360px] md:h-[500px] object-cover img-zoom-hover"
              />
            </div>
            <div className="space-y-6 md:space-y-8">
              <p className="section-title">Meet the Founder</p>
              <h2 className="section-heading" style={{ fontFamily: 'var(--font-display)' }}>
                Sri Karthika
              </h2>
              <p className="section-subtitle">
                Sri Karthika leads the studio with a refined approach to beauty and a focus on
                comfort, precision, and detail. Her commitment is to help every client feel
                confident and beautifully taken care of from start to finish.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="section-padding-lg bg-cream" {...sectionAnimation}>
        <div className="lux-container">
          <p className="section-title text-center">Why Choose Us</p>
          <h2 className="section-heading text-center mb-10" style={{ fontFamily: 'var(--font-display)' }}>
            Trusted Luxury Experience
          </h2>
          <div className="max-w-3xl mx-auto divide-y divide-border/80 border-y border-border/80">
            {WHY_CHOOSE_US.map((item) => (
              <div key={item} className="flex items-center justify-between py-5 md:py-6">
                <p className="text-lg text-ink" style={{ fontFamily: 'var(--font-display)' }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <SitePreFooterCta motionProps={sectionAnimation} />
    </>
  );
}

export default AboutPage;
