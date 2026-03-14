import { useState } from 'react';

const SERVICE_OPTIONS = [
  'Threading',
  'Hair Services',
  'Waxing',
  'Skin Care',
  'Hair Coloring',
  'Facials',
  'Pedicure & Manicure',
  'Bridal Makeup',
  'Mehendi',
  'Bridal Packages',
];

function BookingPage({ apiBase }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    timeSlot: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (!form.name || !form.phone || !form.service || !form.date || !form.timeSlot) {
      setStatus({ type: 'error', message: 'Please fill all required fields.' });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to book appointment');
      }
      setStatus({
        type: 'success',
        message:
          'Thank you! Your appointment request has been received. We will confirm your booking shortly.',
      });
      setForm({
        name: '',
        phone: '',
        email: '',
        service: '',
        date: '',
        timeSlot: '',
        message: '',
      });
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-padding">
      <div className="lux-container grid md:grid-cols-2 gap-10 items-start">
        <div>
          <p className="section-title">Book Appointment</p>
          <h1 className="section-heading">Schedule Your Visit</h1>
          <p className="section-subtitle">
            Fill in the details below to request an appointment. Our team will reach out to confirm
            availability, timing, and any bridal package customisations.
          </p>
          <div className="mt-6 space-y-3 text-sm text-neutral-700">
            <p className="font-medium">Booking Guidelines</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Maximum of 3–4 bridal bookings are accepted per time slot.</li>
              <li>Please select the primary service you are interested in.</li>
              <li>For bridal packages, mention events and dates in the message box.</li>
            </ul>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="card-luxe p-6 md:p-8 space-y-4 w-full"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-full border border-neutral-200 bg-white/70 px-4 py-2 text-sm focus:outline-none focus:border-roseGold focus:ring-1 focus:ring-roseGold/40"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-full border border-neutral-200 bg-white/70 px-4 py-2 text-sm focus:outline-none focus:border-roseGold focus:ring-1 focus:ring-roseGold/40"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-full border border-neutral-200 bg-white/70 px-4 py-2 text-sm focus:outline-none focus:border-roseGold focus:ring-1 focus:ring-roseGold/40"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">
                Select Service *
              </label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full rounded-full border border-neutral-200 bg-white/70 px-4 py-2 text-sm focus:outline-none focus:border-roseGold focus:ring-1 focus:ring-roseGold/40"
              >
                <option value="">Select a service</option>
                {SERVICE_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full rounded-full border border-neutral-200 bg-white/70 px-4 py-2 text-sm focus:outline-none focus:border-roseGold focus:ring-1 focus:ring-roseGold/40"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">
                Time Slot *
              </label>
              <select
                name="timeSlot"
                value={form.timeSlot}
                onChange={handleChange}
                className="w-full rounded-full border border-neutral-200 bg-white/70 px-4 py-2 text-sm focus:outline-none focus:border-roseGold focus:ring-1 focus:ring-roseGold/40"
              >
                <option value="">Select a time slot</option>
                <option value="9:30 AM – 11:30 AM">9:30 AM – 11:30 AM</option>
                <option value="12:00 PM – 2:00 PM">12:00 PM – 2:00 PM</option>
                <option value="3:00 PM – 5:00 PM">3:00 PM – 5:00 PM</option>
                <option value="5:30 PM – 8:00 PM">5:30 PM – 8:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-3xl border border-neutral-200 bg-white/70 px-4 py-2 text-sm focus:outline-none focus:border-roseGold focus:ring-1 focus:ring-roseGold/40"
              placeholder="Share details like events, functions, preferred style, or any specific requests."
            />
          </div>

          {status.message && (
            <p
              className={`text-xs ${
                status.type === 'error' ? 'text-red-600' : 'text-emerald-600'
              }`}
            >
              {status.message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full md:w-auto justify-center disabled:opacity-60"
          >
            {loading ? 'Booking...' : 'Submit Booking Request'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default BookingPage;

