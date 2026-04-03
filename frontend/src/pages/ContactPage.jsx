import { motion } from 'framer-motion';
import {
  SALON_EMAIL,
  STUDIO_ADDRESS,
  salonPhoneDisplay,
  salonTelHref,
  whatsappLocalNumber,
  whatsappWaMeUrl,
} from '../constants/contact.js';

function ContactPage({ settings }) {
  const s = settings || {};
  const mapsQuery = encodeURIComponent(STUDIO_ADDRESS);
  const mapsOpenUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

  return (
    <motion.section
      className="section-padding-lg bg-cream"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className="lux-container grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-start">
        <div className="space-y-8 text-center md:text-left">
          <p className="section-title">Contact</p>
          <h1 className="section-heading mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Visit The Studio
          </h1>
          <p className="section-subtitle mx-auto md:mx-0">
            Reach out to us for beauty and salon services, appointment support, or customised packages.
          </p>

          <div className="card-luxe p-6 md:p-8 text-left">
            <div className="space-y-5 text-sm">
              <div className="pb-4 border-b border-border/70">
                <p className="font-medium text-ink mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>Address</p>
                <p className="text-muted leading-relaxed">{s.address || STUDIO_ADDRESS}</p>
              </div>
              <div className="pb-4 border-b border-border/70">
                <p className="font-medium text-ink mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>Phone</p>
                <a
                  href={salonTelHref(s.phone, s.whatsapp)}
                  className="text-muted hover:text-champagne transition-colors"
                >
                  {salonPhoneDisplay(s.phone, s.whatsapp)}
                </a>
              </div>
              <div className="pb-4 border-b border-border/70">
                <p className="font-medium text-ink mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>WhatsApp</p>
                <a
                  href={whatsappWaMeUrl(s.whatsapp)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-champagne hover:text-btn-hover transition-colors"
                >
                  +91 {whatsappLocalNumber(s.whatsapp)} — Chat on WhatsApp
                </a>
              </div>
              <div className="pb-4 border-b border-border/70">
                <p className="font-medium text-ink mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>Email</p>
                <a href={`mailto:${s.email || SALON_EMAIL}`} className="text-champagne hover:text-btn-hover transition-colors">
                  {s.email || SALON_EMAIL}
                </a>
              </div>
              <div className="pb-4 border-b border-border/70">
                <p className="font-medium text-ink mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>Working Hours</p>
                <p className="text-muted">{s.workingHours || '9:30 AM – 8:00 PM'}</p>
              </div>
              <div>
                <p className="font-medium text-ink mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>Instagram</p>
                <a href={s.instagram || 'https://www.instagram.com/jk.makeoverartistry'} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-champagne hover:text-btn-hover transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                  @jk.makeoverartistry
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 md:space-y-5">
          <a
            href={mapsOpenUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-outline w-full sm:w-auto justify-center"
          >
            Open in Maps
          </a>

          <div className="rounded-[18px] overflow-hidden bg-white shadow-[0_16px_40px_-18px_rgba(29,29,31,0.22)]">
            <iframe
              title="Studio Location"
              src={mapsEmbedUrl}
              className="w-full h-[310px] md:h-[320px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default ContactPage;
