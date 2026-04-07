import { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase.js';
import { mapOffersSnapshot } from '../../lib/realtimeContent.js';

const OFFERS_COLLECTION = 'offers';

function OffersAdminPage() {
  const [offers, setOffers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    discountPercentage: '',
    startDate: '',
    endDate: '',
    isActive: true,
  });

  useEffect(() => {
    const colRef = collection(db, OFFERS_COLLECTION);
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => setOffers(mapOffersSnapshot(snapshot)),
      () => setOffers([])
    );
    return () => unsubscribe();
  }, []);

  const startNew = () => {
    setEditing(null);
    setForm({
      title: '',
      description: '',
      discountPercentage: '',
      startDate: '',
      endDate: '',
      isActive: true,
    });
  };

  const startEdit = (offer) => {
    setEditing(offer.id);
    setForm({
      title: offer.title || '',
      description: offer.description || '',
      discountPercentage: offer.discountPercentage || '',
      startDate: offer.startDate ? offer.startDate.slice(0, 10) : '',
      endDate: offer.endDate ? offer.endDate.slice(0, 10) : '',
      isActive: offer.isActive ?? true,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      discountPercentage: Number(form.discountPercentage || 0),
    };
    try {
      if (editing) {
        await updateDoc(doc(db, OFFERS_COLLECTION, editing), payload);
      } else {
        await addDoc(collection(db, OFFERS_COLLECTION), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      }
      startNew();
    } catch {
      alert('Could not save offer. Check Firestore rules and your connection.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this offer?')) return;
    try {
      await deleteDoc(doc(db, OFFERS_COLLECTION, id));
    } catch {
      alert('Could not delete offer.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="font-display text-2xl text-deepCharcoal">Offers</h1>
            <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide">
              Live Sync
            </span>
          </div>
          <p className="text-xs text-neutral-600">
            Create and manage promotional offers shown on the site.
          </p>
        </div>
        <button type="button" onClick={startNew} className="btn-outline text-xs">
          + New Offer
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="card-luxe p-5 space-y-3">
          <p className="text-sm font-medium text-deepCharcoal">
            {editing ? 'Edit Offer' : 'Add New Offer'}
          </p>
          <div>
            <label className="block text-[11px] text-neutral-600 mb-1">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 text-xs"
            />
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
          <div className="grid md:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] text-neutral-600 mb-1">Discount %</label>
              <input
                name="discountPercentage"
                type="number"
                value={form.discountPercentage}
                onChange={handleChange}
                className="w-full rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] text-neutral-600 mb-1">Start Date</label>
              <input
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
                className="w-full rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] text-neutral-600 mb-1">End Date</label>
              <input
                name="endDate"
                type="date"
                value={form.endDate}
                onChange={handleChange}
                className="w-full rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 text-xs"
              />
            </div>
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
            {editing ? 'Update Offer' : 'Add Offer'}
          </button>
        </form>

        <div className="space-y-3 max-h-[520px] overflow-auto pr-1">
          {offers.map((o) => (
            <div
              key={o.id}
              className="card-luxe p-4 flex items-start justify-between gap-3 text-xs"
            >
              <div>
                <p className="font-medium text-deepCharcoal">{o.title}</p>
                <p className="text-[11px] text-neutral-500 mb-1">
                  {o.discountPercentage}% •{' '}
                  {o.startDate ? o.startDate.slice(0, 10) : 'No date'} -{' '}
                  {o.endDate ? o.endDate.slice(0, 10) : 'No date'}
                </p>
                {o.description && (
                  <p className="text-[11px] text-neutral-600 line-clamp-2">{o.description}</p>
                )}
                {!o.isActive && (
                  <p className="text-[11px] text-red-500 mt-1">Inactive (hidden)</p>
                )}
              </div>
              <div className="flex flex-col items-end gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(o)}
                  className="text-[11px] px-3 py-1 rounded-full border border-neutral-200 hover:bg-softPink/60"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(o.id)}
                  className="text-[11px] px-3 py-1 rounded-full border border-red-200 text-red-500 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {!offers.length && <p className="text-xs text-neutral-500">No offers added yet.</p>}
        </div>
      </div>
    </div>
  );
}

export default OffersAdminPage;

