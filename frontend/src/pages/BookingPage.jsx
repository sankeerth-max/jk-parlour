import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.js';
import { mapVisibleServicesFromSnapshot } from '../lib/serviceDocuments.js';

const SERVICE_OPTIONS = [
  'Threading',
  'Hair Services',
  'Waxing',
  'Skin Care',
  'Hair Coloring',
  'Facials',
  'Pedicure & Manicure',
  'Makeup Services',
  'Mehendi',
  'Package Services',
];

const inputBase =
  'w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/20 transition-colors';

function BookingPage() {
  const location = useLocation();
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    category: '',
    price: '',
    date: '',
    timeSlot: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    const colRef = collection(db, 'services');
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        const rows = mapVisibleServicesFromSnapshot(snapshot);
        setServices(rows);
      },
      () => setServices([])
    );
    return () => unsubscribe();
  }, []);

  const serviceOptions = useMemo(() => {
    if (services.length) {
      return services.map((service) => ({
        value: service.title,
        label: service.title,
        category: service.title || '',
        price: service.price !== undefined && service.price !== null ? String(service.price) : '',
      }));
    }
    return SERVICE_OPTIONS.map((name) => ({
      value: name,
      label: name,
      category: name,
      price: '',
    }));
  }, [services]);

  const serviceOptionByValue = useMemo(() => {
    const m = new Map();
    for (const opt of serviceOptions) m.set(opt.value, opt);
    return m;
  }, [serviceOptions]);

  useEffect(() => {
    const selected = location.state?.selectedService;
    if (!selected) return;

    const requestedName = String(selected.title ?? selected.name ?? selected.service ?? '').trim();
    if (!requestedName) return;

    const matched =
      serviceOptions.find(
        (opt) => opt.value.toLowerCase() === requestedName.toLowerCase()
      ) || serviceOptionByValue.get(requestedName);

    const serviceName = matched?.value || requestedName;
    const category = String(selected.category ?? matched?.category ?? '').trim();

    const selectedPriceRaw =
      selected.price ?? selected.startingPrice ?? selected.priceFrom ?? matched?.price;
    const price =
      selectedPriceRaw !== undefined && selectedPriceRaw !== null && String(selectedPriceRaw).trim() !== ''
        ? String(selectedPriceRaw)
        : '';

    setForm((prev) => ({
      ...prev,
      service: serviceName,
      category: category || prev.category,
      price: price || prev.price,
    }));
  }, [location.state, serviceOptions, serviceOptionByValue]);

  const selectedSummary = useMemo(() => {
    if (!form.service) return null;
    return {
      service: form.service,
      price: form.price ? `₹${form.price}` : 'On request',
      category: form.category || 'General Services',
    };
  }, [form.service, form.price, form.category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'service') {
      const selected = serviceOptions.find((option) => option.value === value);
      setForm((prev) => ({
        ...prev,
        service: value,
        category: selected?.category || '',
        price: selected?.price || '',
      }));
      return;
    }
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWhatsAppBooking = (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (!form.name || !form.phone || !form.service || !form.date || !form.timeSlot) {
      setStatus({ type: 'error', message: 'Please fill all required fields.' });
      return;
    }

    const whatsappText = `Hello 👋
I would like to book an appointment at *Sri Karthika Bridal Studio*.

*Customer Details*
Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email || '-'}

*Service Details*
Service: ${form.service}
Category: ${form.category || 'General Services'}
Price: ₹${form.price || '-'}

*Appointment Details*
Date: ${form.date}
Time: ${form.timeSlot}

*Additional Message*
${form.message || '-'}

Please confirm my booking. Thank you 😊`;

    const url = `https://wa.me/918072965181?text=${encodeURIComponent(whatsappText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.section
      className="section-padding-lg bg-cream"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className="lux-container grid md:grid-cols-2 gap-12 md:gap-24 items-start">
        <div className="space-y-8 text-center md:text-left">
          <p className="section-title">Book Appointment</p>
          <h1 className="section-heading mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Book Appointment
          </h1>
          <p className="section-subtitle mx-auto md:mx-0">
            Fill in the details below to request an appointment. Our team will reach out to confirm
            availability, timing, and service details.
          </p>
          <div className="pt-1 md:pt-2 space-y-4 lead-text text-muted text-left">
            <p className="font-medium text-ink">Booking Guidelines</p>
            <ul className="space-y-3">
              <li>· We accommodate appointments based on service duration and team availability.</li>
              <li>· Please select the primary service you are interested in.</li>
              <li>· For bridal bookings, you can also book a consultation.</li>
            </ul>
          </div>
        </div>

        <form onSubmit={handleWhatsAppBooking} className="card-luxe p-6 md:p-8 space-y-5 w-full">
          {selectedSummary && (
            <div className="rounded-2xl border border-border bg-warmbeige/35 px-5 py-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-2">Selected Service</p>
              <p className="text-ink font-medium" style={{ fontFamily: 'var(--font-display)' }}>
                {selectedSummary.service}
              </p>
              <p className="text-sm text-muted mt-1">
                Price: {selectedSummary.price}
              </p>
              <p className="text-xs text-muted mt-1">
                Category: {selectedSummary.category}
              </p>
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-ink mb-1.5">Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={inputBase}
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink mb-1.5">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={inputBase}
                placeholder="Phone number"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-ink mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={inputBase}
                placeholder="Email (optional)"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink mb-1.5">Select Service *</label>
              <select name="service" value={form.service} onChange={handleChange} className={inputBase}>
                <option value="">Select a service</option>
                {serviceOptions.map((service) => (
                  <option key={`${service.value}-${service.category}`} value={service.value}>
                    {service.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-ink mb-1.5">Category</label>
              <input
                type="text"
                name="category"
                value={form.category}
                readOnly
                className={`${inputBase} bg-warmbeige/20`}
                placeholder="Category"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink mb-1.5">Price</label>
              <input
                type="text"
                name="price"
                value={form.price ? `₹${form.price}` : ''}
                readOnly
                className={`${inputBase} bg-warmbeige/20`}
                placeholder="Auto-filled from selected service"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-ink mb-1.5">Date *</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className={inputBase}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink mb-1.5">Time Slot *</label>
              <select name="timeSlot" value={form.timeSlot} onChange={handleChange} className={inputBase}>
                <option value="">Select a time slot</option>
                <option value="9:30 AM – 11:30 AM">9:30 AM – 11:30 AM</option>
                <option value="12:00 PM – 2:00 PM">12:00 PM – 2:00 PM</option>
                <option value="3:00 PM – 5:00 PM">3:00 PM – 5:00 PM</option>
                <option value="5:30 PM – 8:00 PM">5:30 PM – 8:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              className={`${inputBase} resize-none`}
              placeholder="Share details like events, functions, preferred style, or any specific requests."
            />
          </div>

          {status.message && (
            <p
              className={`text-sm ${
                status.type === 'error' ? 'text-red-600' : 'text-emerald-600'
              }`}
            >
              {status.message}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <motion.a
              href="#"
              target="_blank"
              rel="noreferrer"
              onClick={handleWhatsAppBooking}
              className="btn-primary w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              Confirm on WhatsApp
            </motion.a>
          </div>
        </form>
      </div>
    </motion.section>
  );
}

export default BookingPage;
