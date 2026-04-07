import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { WHATSAPP_STANDARD_MESSAGE, whatsappWaMeUrl } from '../constants/contact.js';
import { BOOKING_SERVICE_OPTIONS } from '../constants/bookingModalOptions.js';

const TIME_OPTIONS = ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM'];

const inputClass =
  'w-full min-h-[48px] rounded-[10px] border border-[#E5E5E5] bg-white px-4 py-3 text-[15px] text-[#1D1D1F] placeholder:text-[#8E8E93] focus:outline-none focus:border-black focus:ring-2 focus:ring-black/[0.06] transition-[border-color,box-shadow] duration-200';

const labelClass = 'block text-[11px] font-medium uppercase tracking-[0.12em] text-[#6E6E73] mb-2';

export default function WhatsAppBookingModal({ open, onClose, initialService, settingsWhatsapp }) {
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const resetForm = useCallback(() => {
    setService('');
    setDate('');
    setTime('');
    setName('');
    setPhone('');
    setErrors({});
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setLoading(false);
    setDate('');
    setTime('');
    setName('');
    setPhone('');
    setService(
      initialService && BOOKING_SERVICE_OPTIONS.includes(initialService) ? initialService : ''
    );
  }, [open, initialService]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const validate = () => {
    const next = {};
    if (!service.trim()) next.service = 'Please select a service';
    if (!date.trim()) next.date = 'Please choose a date';
    if (!time.trim()) next.time = 'Please choose a time';
    if (!name.trim()) next.name = 'Please enter your name';
    if (!phone.trim()) next.phone = 'Please enter your phone number';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const url = whatsappWaMeUrl(settingsWhatsapp, WHATSAPP_STANDARD_MESSAGE);
    window.open(url, '_blank', 'noopener,noreferrer');
    setTimeout(() => {
      setLoading(false);
      onClose();
      resetForm();
    }, 600);
  };

  const today = new Date().toISOString().split('T')[0];

  const modal = (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="whatsapp-booking-title"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
            aria-label="Close booking"
            onClick={onClose}
          />
          <motion.div
            className="relative w-full max-w-[500px] max-h-[min(92vh,720px)] overflow-y-auto rounded-[20px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.12),0_8px_24px_rgba(0,0,0,0.06)]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#F0F0F0] bg-white px-5 py-4 rounded-t-[20px]">
              <h2 id="whatsapp-booking-title" className="text-lg font-semibold text-[#1D1D1F] tracking-tight">
                Book via WhatsApp
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#6E6E73] hover:bg-[#F5F5F7] hover:text-[#1D1D1F] transition-colors"
                aria-label="Close"
              >
                <span className="text-xl leading-none">×</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-5 pb-6 pt-5 sm:px-6 sm:pb-7 space-y-5">
              <div>
                <label htmlFor="wb-service" className={labelClass}>
                  Service
                </label>
                <select
                  id="wb-service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select a service</option>
                  {BOOKING_SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.service && <p className="mt-1.5 text-xs text-red-600">{errors.service}</p>}
              </div>

              <div>
                <label htmlFor="wb-date" className={labelClass}>
                  Preferred date
                </label>
                <input
                  id="wb-date"
                  type="date"
                  min={today}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={inputClass}
                />
                {errors.date && <p className="mt-1.5 text-xs text-red-600">{errors.date}</p>}
              </div>

              <div>
                <label htmlFor="wb-time" className={labelClass}>
                  Preferred time
                </label>
                <select
                  id="wb-time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select a time</option>
                  {TIME_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.time && <p className="mt-1.5 text-xs text-red-600">{errors.time}</p>}
              </div>

              <div>
                <label htmlFor="wb-name" className={labelClass}>
                  Name
                </label>
                <input
                  id="wb-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className={inputClass}
                />
                {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="wb-phone" className={labelClass}>
                  Phone number
                </label>
                <input
                  id="wb-phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 98765 43210"
                  className={inputClass}
                />
                {errors.phone && <p className="mt-1.5 text-xs text-red-600">{errors.phone}</p>}
              </div>

              {loading && (
                <p className="text-center text-sm text-[#6E6E73] animate-pulse">Redirecting to WhatsApp…</p>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-black py-3.5 px-6 text-[15px] font-medium text-white disabled:opacity-60"
                whileHover={loading ? {} : { scale: 1.03 }}
                whileTap={loading ? {} : { scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                Continue to WhatsApp
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(modal, document.body);
}
