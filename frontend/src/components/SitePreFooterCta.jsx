import { motion } from 'framer-motion';
import { useBookingModal } from '../context/BookingModalContext.jsx';

const defaultMotion = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 },
};

/**
 * Unified CTA above the site footer (Home, About, etc.)
 */
export default function SitePreFooterCta({ motionProps = defaultMotion }) {
  const { openBookingModal } = useBookingModal();

  return (
    <motion.section className="bg-[#F8F8F8] pt-[100px] pb-[80px]" {...motionProps}>
      <div className="mx-auto max-w-3xl px-5 flex flex-col items-center text-center gap-4 md:gap-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#6E6E73]">
          BOOK YOUR EXPERIENCE
        </p>
        <h2
          className="text-[1.85rem] sm:text-3xl md:text-[2.65rem] font-bold text-[#1D1D1F] leading-[1.12] tracking-[-0.02em] w-full"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Experience Beauty Like Never Before
        </h2>
        <p className="text-[15px] sm:text-base text-[#6E6E73] leading-relaxed max-w-xl">
          Book your visit and enjoy personalized luxury beauty care.
        </p>
        <motion.button
          type="button"
          onClick={() => openBookingModal()}
          className="inline-flex items-center justify-center rounded-full bg-black px-10 py-3.5 text-[15px] font-medium text-white shadow-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          Book Appointment
        </motion.button>
        <p className="text-[13px] text-[#6E6E73] tracking-wide">✨ Trusted by 1000+ happy clients</p>
      </div>
    </motion.section>
  );
}
