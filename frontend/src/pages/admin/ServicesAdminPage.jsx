import { useState } from 'react';
import {
  loadServices,
  persistServices,
  notifyServicesUpdated,
} from '../../lib/servicesStorage.js';

const emptyForm = () => ({
  title: '',
  price: '',
  description: '',
});

function descriptionToDetails(text) {
  const lines = String(text)
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  return lines.length ? lines : ['Details on request'];
}

export default function ServicesAdminPage() {
  const [services, setServices] = useState(() => loadServices());
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const commit = (next) => {
    persistServices(next);
    setServices(next);
    notifyServicesUpdated();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm());
  };

  const handleAddService = () => {
    resetForm();
  };

  const handleEdit = (service) => {
    setEditingId(service.id);
    setForm({
      title: service.title,
      price: service.startsFrom ?? service.price ?? '',
      description: service.description,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = form.title.trim();
    if (!title) return;

    const desc = form.description.trim();
    const startsFrom = form.price.trim() || '—';
    const details = descriptionToDetails(form.description);

    if (editingId) {
      const next = services.map((s) => {
        if (s.id !== editingId) return s;
        return {
          ...s,
          title,
          description: desc,
          startsFrom,
          details,
        };
      });
      commit(next);
    } else {
      commit([
        ...services,
        {
          id: crypto.randomUUID(),
          title,
          description: desc,
          startsFrom,
          image: '/services-makeup.jpg',
          details,
        },
      ]);
    }
    resetForm();
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this service?')) return;
    const next = services.filter((s) => s.id !== id);
    commit(next);
    if (editingId === id) resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-deepCharcoal mb-1">Services</h1>
          <p className="text-xs text-neutral-600">
            Changes save to this device and appear on the public Services page.
          </p>
        </div>
        <button type="button" onClick={handleAddService} className="btn-primary text-xs px-5 py-2.5">
          Add Service
        </button>
      </div>

      <div className="grid lg:grid-cols-5 gap-6 items-start">
        <form onSubmit={handleSubmit} className="card-luxe p-5 space-y-4 lg:col-span-2">
          <p className="text-sm font-medium text-deepCharcoal">
            {editingId ? 'Edit service' : 'New service'}
          </p>
          <div>
            <label htmlFor="svc-title" className="block text-[11px] font-medium text-neutral-600 mb-1.5">
              Title
            </label>
            <input
              id="svc-title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Bridal Makeup"
              className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:border-roseGold focus:ring-1 focus:ring-roseGold/30"
            />
          </div>
          <div>
            <label htmlFor="svc-price" className="block text-[11px] font-medium text-neutral-600 mb-1.5">
              Price (shown as &quot;Starting from&quot;)
            </label>
            <input
              id="svc-price"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="e.g. ₹5,000"
              className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:border-roseGold focus:ring-1 focus:ring-roseGold/30"
            />
          </div>
          <div>
            <label htmlFor="svc-desc" className="block text-[11px] font-medium text-neutral-600 mb-1.5">
              Description
            </label>
            <textarea
              id="svc-desc"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Short intro. Use separate lines for bullet-style detail items."
              className="w-full resize-y rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:border-roseGold focus:ring-1 focus:ring-roseGold/30"
            />
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <button type="submit" className="btn-primary text-xs px-4 py-2">
              {editingId ? 'Save changes' : 'Add Service'}
            </button>
            {(editingId || form.title || form.price || form.description) && (
              <button type="button" onClick={resetForm} className="btn-outline text-xs px-4 py-2">
                Cancel
              </button>
            )}
          </div>
        </form>

        <ul className="space-y-3 lg:col-span-3 w-full min-w-0">
          {services.map((s) => (
            <li
              key={s.id}
              className={`card-luxe p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 ${
                editingId === s.id ? 'ring-2 ring-roseGold/40' : ''
              }`}
            >
              <div className="min-w-0 flex-1">
                <p className="font-display text-base text-deepCharcoal">{s.title}</p>
                <p className="text-sm font-medium text-roseGold mt-1">{s.startsFrom ?? s.price}</p>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">{s.description}</p>
              </div>
              <div className="flex sm:flex-col gap-2 shrink-0 sm:items-end">
                <button
                  type="button"
                  onClick={() => handleEdit(s)}
                  className="text-xs font-medium rounded-full border border-neutral-200 bg-white px-4 py-2 text-deepCharcoal hover:bg-neutral-50 transition-colors"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(s.id)}
                  className="text-xs font-medium rounded-full border border-red-200 bg-white px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
