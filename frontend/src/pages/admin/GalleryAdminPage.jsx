import { useEffect, useState } from 'react';

const CATEGORIES = [
  'Bridal Makeup',
  'Hair Styling',
  'Skin Care',
  'Salon Interior',
  'Before & After',
];

function GalleryAdminPage({ apiBase }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    imageUrl: '',
    category: 'Bridal Makeup',
    caption: '',
  });

  const load = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;
    const res = await fetch(`${apiBase}/gallery`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    load().catch(() => {});
  }, [apiBase]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    if (!token) return;
    await fetch(`${apiBase}/gallery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    setForm({
      imageUrl: '',
      category: form.category,
      caption: '',
    });
    await load();
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;
    if (!window.confirm('Delete this image?')) return;
    await fetch(`${apiBase}/gallery/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    await load();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-deepCharcoal mb-1">Gallery</h1>
        <p className="text-xs text-neutral-600">
          Upload and manage images that appear in the website gallery.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="card-luxe p-5 space-y-3">
          <p className="text-sm font-medium text-deepCharcoal">Add New Image</p>
          <div>
            <label className="block text-[11px] text-neutral-600 mb-1">Image URL</label>
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              className="w-full rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 text-xs"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-3">
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
          <div>
            <label className="block text-[11px] text-neutral-600 mb-1">Caption</label>
            <textarea
              name="caption"
              value={form.caption}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-2xl border border-neutral-200 bg-white/70 px-3 py-2 text-xs"
            />
          </div>
          <button type="submit" className="btn-primary text-xs px-4 py-2">
            Add Image
          </button>
        </form>

        <div className="grid grid-cols-2 gap-3 max-h-[520px] overflow-auto pr-1">
          {items.map((item) => (
            <div key={item._id} className="card-luxe overflow-hidden relative group">
              <img
                src={item.imageUrl}
                alt={item.caption || item.category}
                className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-2 text-[10px]">
                <p className="font-medium text-deepCharcoal">{item.category}</p>
                {item.caption && (
                  <p className="text-[10px] text-neutral-600 line-clamp-2">{item.caption}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleDelete(item._id)}
                className="absolute top-2 right-2 bg-white/80 text-[10px] px-2 py-1 rounded-full text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
          {!items.length && (
            <p className="text-xs text-neutral-500 col-span-full">No images added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GalleryAdminPage;

