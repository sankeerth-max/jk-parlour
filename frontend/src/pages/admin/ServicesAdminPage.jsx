import { useEffect, useState } from 'react';

const CATEGORIES = [
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

function ServicesAdminPage({ apiBase }) {
  const [services, setServices] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: '',
    category: 'Bridal Makeup',
    description: '',
    priceFrom: '',
    imageUrl: '',
    isActive: true,
  });

  const load = async () => {
    if (!apiBase) return;
    const token = localStorage.getItem('adminToken');
    if (!token) return;
    const res = await fetch(`${apiBase}/services/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setServices(data);
  };

  useEffect(() => {
    if (!apiBase) return;
    load().catch(() => {});
  }, [apiBase]);

  const startNew = () => {
    setEditing(null);
    setForm({
      name: '',
      category: 'Bridal Makeup',
      description: '',
      priceFrom: '',
      imageUrl: '',
      isActive: true,
    });
  };

  const startEdit = (service) => {
    setEditing(service._id);
    setForm({
      name: service.name || '',
      category: service.category || 'Bridal Makeup',
      description: service.description || '',
      priceFrom: service.priceFrom || '',
      imageUrl: service.imageUrl || '',
      isActive: service.isActive ?? true,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    if (!token) return;
    const payload = { ...form, priceFrom: Number(form.priceFrom || 0) };
    const url = editing ? `${apiBase}/services/${editing}` : `${apiBase}/services`;
    const method = editing ? 'PUT' : 'POST';
    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    await load();
    startNew();
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;
    if (!window.confirm('Delete this service?')) return;
    await fetch(`${apiBase}/services/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    await load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-deepCharcoal mb-1">Services</h1>
          <p className="text-xs text-neutral-600">
            Manage all salon and bridal services shown on the website.
          </p>
        </div>
        <button type="button" onClick={startNew} className="btn-outline text-xs">
          + New Service
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="card-luxe p-5 space-y-3">
          <p className="text-sm font-medium text-deepCharcoal">
            {editing ? 'Edit Service' : 'Add New Service'}
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-neutral-600 mb-1">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] text-neutral-600 mb-1">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 text-xs"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-neutral-600 mb-1">Starting Price (₹)</label>
              <input
                name="priceFrom"
                type="number"
                value={form.priceFrom}
                onChange={handleChange}
                className="w-full rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] text-neutral-600 mb-1">Image URL</label>
              <input
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                className="w-full rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 text-xs"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] text-neutral-600 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-2xl border border-neutral-200 bg-white/70 px-3 py-2 text-xs"
            />
          </div>
          <label className="inline-flex items-center gap-2 text-[11px] text-neutral-700">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            Active (show on website)
          </label>
          <button type="submit" className="btn-primary text-xs px-4 py-2">
            {editing ? 'Update Service' : 'Add Service'}
          </button>
        </form>

        <div className="space-y-3 max-h-[520px] overflow-auto pr-1">
          {services.map((s) => (
            <div
              key={s._id}
              className="card-luxe p-4 flex items-start justify-between gap-3 text-xs"
            >
              <div>
                <p className="font-medium text-deepCharcoal">{s.name}</p>
                <p className="text-[11px] text-neutral-500 mb-1">
                  {s.category} • From ₹{s.priceFrom}
                </p>
                {s.description && (
                  <p className="text-[11px] text-neutral-600 line-clamp-2">{s.description}</p>
                )}
                {!s.isActive && (
                  <p className="text-[11px] text-red-500 mt-1">Disabled (hidden on website)</p>
                )}
              </div>
              <div className="flex flex-col items-end gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(s)}
                  className="text-[11px] px-3 py-1 rounded-full border border-neutral-200 hover:bg-softPink/60"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(s._id)}
                  className="text-[11px] px-3 py-1 rounded-full border border-red-200 text-red-500 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {!services.length && (
            <p className="text-xs text-neutral-500">No services added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServicesAdminPage;

