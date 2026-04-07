import { Link } from 'react-router-dom';
import {
  SALON_EMAIL,
  STUDIO_ADDRESS,
  salonPhoneDisplay,
  salonTelHref,
  whatsappWaMeUrl,
} from '../constants/contact.js';

const INSTAGRAM_URL = 'https://www.instagram.com/jk.makeoverartistry';


export default function PremiumFooter({ settings }) {
  const s = settings || {};

  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/contact', label: 'Contact' },
  ];

  const whatsappHref = whatsappWaMeUrl(s.whatsapp);
  const phoneLine = salonPhoneDisplay(s.phone, s.whatsapp);
  const phoneHref = salonTelHref(s.phone, s.whatsapp);
  const email = (s.email && String(s.email).trim()) || SALON_EMAIL;
  const location = (s.address && String(s.address).trim()) || STUDIO_ADDRESS;

  const iconWrap =
    'h-10 w-10 rounded-full border border-[#E5E5E5] flex items-center justify-center text-[#1D1D1F] bg-white hover:bg-[#FAFAFA] transition-transform duration-300 hover:scale-110';

  return (
    <footer className="bg-white border-t border-[#E5E5E5]">
      <div className="lux-container py-12 sm:py-14 md:py-[60px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-9 md:gap-12 lg:gap-[60px] items-start">
          {/* Column 1 — Brand */}
          <div className="text-center md:text-left">
            <Link
              to="/"
              className="inline-block text-lg font-bold text-[#1D1D1F] tracking-tight hover:opacity-80 transition-opacity"
              style={{ fontFamily: "var(--font-display), 'Playfair Display', serif" }}
            >
              Sri Karthika Bridal Studio
            </Link>
            <p className="mt-4 text-[13px] leading-relaxed text-[#6E6E73] max-w-[280px] mx-auto md:mx-0">
              Luxury bridal &amp; beauty studio dedicated to creating timeless, elegant looks.
            </p>
            <p className="mt-4 text-[13px] italic text-[#6E6E73]">&ldquo;Crafting beauty with perfection&rdquo;</p>
          </div>

          {/* Column 2 — Quick links */}
          <div className="text-center md:text-left">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1D1D1F] mb-4">
              Quick links
            </h3>
            <nav className="flex flex-col gap-2.5">
              {quickLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-[13px] text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3 — Contact */}
          <div className="text-center md:text-left">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1D1D1F] mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-[13px] text-[#6E6E73]">
              <li>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E93] block mb-0.5">
                  Phone
                </span>
                <a href={phoneHref} className="hover:text-[#1D1D1F] transition-colors">
                  {phoneLine}
                </a>
              </li>
              <li>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E93] block mb-0.5">
                  Email
                </span>
                <a href={`mailto:${email}`} className="hover:text-[#1D1D1F] transition-colors break-all">
                  {email}
                </a>
              </li>
              <li>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E93] block mb-0.5">
                  Location
                </span>
                <span>{location}</span>
              </li>
            </ul>
            <div className="flex items-center justify-center md:justify-start gap-3 mt-6">
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className={iconWrap} aria-label="Instagram">
                <svg className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className={iconWrap} aria-label="WhatsApp">
                <svg className="w-[17px] h-[17px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-12 pt-7 md:pt-8 border-t border-[#E5E5E5] text-center">
          <p className="text-[11px] sm:text-[12px] text-[#8E8E93] tracking-wide">
            © 2026 Sri Karthika Bridal Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
