import { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase.js';
import { mapTestimonialsSnapshot } from '../../lib/realtimeContent.js';

const TESTIMONIALS_COLLECTION = 'testimonials';

function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({
    name: '',
    message: '',
    rating: 5,
    source: 'Direct',
  });

  useEffect(() => {
    const colRef = collection(db, TESTIMONIALS_COLLECTION);
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => setTestimonials(mapTestimonialsSnapshot(snapshot)),
      () => setTestimonials([])
    );
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'rating' ? Number(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      alert('Please enter name and message.');
      return;
    }
    try {
      await addDoc(collection(db, TESTIMONIALS_COLLECTION), {
        name: form.name.trim(),
        message: form.message.trim(),
        rating: Number(form.rating) || 5,
        source: form.source.trim() || 'Direct',
        createdAt: serverTimestamp(),
      });
      setForm({
        name: '',
        message: '',
        rating: 5,
        source: 'Direct',
      });
    } catch {
      alert('Could not add testimonial. Check Firestore rules and your connection.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await deleteDoc(doc(db, TESTIMONIALS_COLLECTION, id));
    } catch {
      alert('Could not delete testimonial.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="font-display text-2xl text-deepCharcoal">Testimonials</h1>
            <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide">
              Live Sync
            </span>
          </div>
          <p className="text-xs text-neutral-600">
            Add and manage customer reviews displayed on the website.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="card-luxe p-5 space-y-3">
          <p className="text-sm font-medium text-deepCharcoal">Add New Testimonial</p>
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
            <label className="block text-[11px] text-neutral-600 mb-1">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-2xl border border-neutral-200 bg-white/70 px-3 py-2 text-xs"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-neutral-600 mb-1">Rating (1–5)</label>
              <input
                type="number"
                min={1}
                max={5}
                name="rating"
                value={form.rating}
                onChange={handleChange}
                className="w-full rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] text-neutral-600 mb-1">Source</label>
              <input
                name="source"
                value={form.source}
                onChange={handleChange}
                className="w-full rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 text-xs"
              />
            </div>
          </div>
          <button type="submit" className="btn-primary text-xs px-4 py-2">
            Add Testimonial
          </button>
        </form>

        <div className="space-y-3 max-h-[520px] overflow-auto pr-1">
          {testimonials.map((t) => (
            <div key={t.id} className="card-luxe p-4 text-xs flex justify-between gap-3">
              <div>
                <p className="font-medium text-deepCharcoal mb-1">{t.name}</p>
                <p className="text-[11px] text-roseGold mb-1">
                  {'★'.repeat(t.rating || 5)}
                </p>
                <p className="text-[11px] text-neutral-700 line-clamp-3">{t.message}</p>
                {t.source && (
                  <p className="text-[10px] text-neutral-500 mt-1">Source: {t.source}</p>
                )}
              </div>
                <button
                type="button"
                  onClick={() => handleDelete(t.id)}
                className="h-7 px-3 rounded-full border border-red-200 text-red-500 text-[11px] self-start hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          ))}
          {!testimonials.length && (
            <p className="text-xs text-neutral-500">No testimonials added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TestimonialsAdminPage;

