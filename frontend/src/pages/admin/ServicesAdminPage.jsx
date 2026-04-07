/**
 * Admin services — Firestore collection "services" only.
 * No localStorage, no REST API. Real-time list via onSnapshot.
 */
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
import { canonicalTitleKey, mapVisibleServicesFromSnapshot } from '../../lib/serviceDocuments.js';

const SERVICES_COLLECTION = 'services';
const PLACEHOLDER_IMAGE = '/services-makeup.jpg';

function linesToDetails(text) {
  return String(text)
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
}

function buildPayloadFromForm(form) {
  const title = form.title.trim();
  const priceStr = form.price.trim();
  const description = form.description.trim();
  const image = form.image.trim();
  const details = linesToDetails(form.details);

  if (!title || !priceStr) {
    return { error: 'Please enter title and price.' };
  }

  const price = Number(priceStr.replace(/,/g, ''));
  if (Number.isNaN(price)) {
    return { error: 'Please enter a valid numeric price.' };
  }

  return {
    payload: {
      title,
      description,
      price,
      image,
      details,
    },
  };
}

const emptyForm = () => ({
  title: '',
  price: '',
  description: '',
  image: '',
  details: '',
});

export default function ServicesAdminPage() {
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    const colRef = collection(db, SERVICES_COLLECTION);
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        setServices(mapVisibleServicesFromSnapshot(snapshot));
      },
      () => {
        setServices([]);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm());
  };

  const handleEdit = (service) => {
    setEditingId(service.id);
    setForm({
      title: service.title,
      price: String(service.price ?? ''),
      description: service.description ?? '',
      image: service.image ?? '',
      details: (service.details ?? []).join('\n'),
    });
  };

  const handleDelete = async (id) => {
    if (!id || !window.confirm('Delete this service?')) return;
    try {
      await deleteDoc(doc(db, SERVICES_COLLECTION, id));
      if (editingId === id) resetForm();
    } catch {
      alert('Could not delete. Check Firestore rules and your connection.');
    }
  };

  const handleAddOrSave = async (e) => {
    e.preventDefault();
    const built = buildPayloadFromForm(form);
    if (built.error) {
      alert(built.error);
      return;
    }

    const { payload } = built;
    const titleKey = canonicalTitleKey(payload.title);
    const hasDuplicateTitle = services.some(
      (s) => canonicalTitleKey(s.title) === titleKey && (!editingId || s.id !== editingId)
    );
    if (hasDuplicateTitle) {
      alert('Service already exists');
      return;
    }

    try {
      if (editingId) {
        await updateDoc(doc(db, SERVICES_COLLECTION, editingId), payload);
      } else {
        await addDoc(collection(db, SERVICES_COLLECTION), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      }
      resetForm();
    } catch {
      alert('Could not save. Check your connection and Firestore rules.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="font-display text-2xl text-deepCharcoal">Services</h1>
          <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide">
            Live Sync
          </span>
        </div>
        <p className="text-sm text-neutral-600">Add or edit services. Changes update live.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <form onSubmit={handleAddOrSave} className="lg:col-span-2 card-luxe p-5 space-y-3 h-fit lg:sticky lg:top-6">
          <p className="text-sm font-medium text-deepCharcoal">
            {editingId ? 'Edit service' : 'Add service'}
          </p>

          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm"
          />

          <input
            name="price"
            placeholder="Starting price"
            value={form.price}
            onChange={handleChange}
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm"
          />

          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm resize-y"
          />

          <textarea
            name="details"
            placeholder="Sub-services (one per line)"
            value={form.details}
            onChange={handleChange}
            rows={5}
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm resize-y"
          />

          <div className="flex flex-wrap gap-2">
            <button type="submit" className="btn-primary text-xs px-5 py-2.5">
              {editingId ? 'Update' : 'Add Service'}
            </button>
            {(editingId || form.title || form.price || form.description || form.image || form.details) && (
              <button type="button" onClick={resetForm} className="btn-outline text-xs px-4 py-2.5">
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="lg:col-span-3 space-y-3">
          <p className="text-sm font-medium text-deepCharcoal">Services ({services.length})</p>

          {services.length === 0 ? (
            <div className="card-luxe p-8 text-center text-sm text-neutral-500">No services yet.</div>
          ) : (
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.id} className="card-luxe p-4 flex gap-4 items-start">
                  {s.image ? (
                    <img
                      src={s.image}
                      alt=""
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = PLACEHOLDER_IMAGE;
                      }}
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-neutral-100 border border-neutral-200 shrink-0" />
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-deepCharcoal">{s.title}</p>
                    <p className="text-sm text-neutral-600 line-clamp-2">{s.description}</p>
                    <p className="text-sm font-semibold text-roseGold mt-1">₹{s.price}</p>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <button type="button" onClick={() => handleEdit(s)} className="btn-outline text-xs px-3 py-1.5">
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(s.id)}
                      className="text-xs px-3 py-1.5 rounded-full border border-red-200 text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
