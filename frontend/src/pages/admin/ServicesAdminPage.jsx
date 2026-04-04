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

const SERVICES_COLLECTION = 'services';
const PLACEHOLDER_IMAGE = '/services-makeup.jpg';

function millisFromCreatedAt(createdAt) {
  if (!createdAt) return 0;
  if (typeof createdAt.toMillis === 'function') return createdAt.toMillis();
  if (typeof createdAt.seconds === 'number') return createdAt.seconds * 1000;
  return 0;
}

function normalizeDetails(raw) {
  if (!raw || !Array.isArray(raw)) return [];
  return raw.map((x) => String(x).trim()).filter(Boolean);
}

function linesToDetails(text) {
  return String(text)
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
}

function mapServiceDocs(snapshot) {
  const rows = snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    const priceRaw = data.price;
    const price =
      typeof priceRaw === 'number' && !Number.isNaN(priceRaw)
        ? priceRaw
        : Number(priceRaw) || 0;
    return {
      id: docSnap.id,
      title: String(data.title ?? ''),
      description: String(data.description ?? ''),
      price,
      image: String(data.image ?? '').trim(),
      details: normalizeDetails(data.details),
      createdAt: data.createdAt ?? null,
    };
  });
  rows.sort((a, b) => millisFromCreatedAt(b.createdAt) - millisFromCreatedAt(a.createdAt));
  return rows;
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
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const colRef = collection(db, SERVICES_COLLECTION);
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        setServices(mapServiceDocs(snapshot));
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
    setStatusMessage('');
  };

  const handleDelete = async (id) => {
    if (!id || !window.confirm('Delete this service?')) return;
    try {
      await deleteDoc(doc(db, SERVICES_COLLECTION, id));
      if (editingId === id) resetForm();
      setStatusMessage('Service removed.');
      window.setTimeout(() => setStatusMessage(''), 2500);
    } catch {
      alert('Could not delete. Check Firestore rules and your connection.');
    }
  };

  /** Add Service or Save Changes — writes only to Firestore */
  const handleAddOrSave = async () => {
    const built = buildPayloadFromForm(form);
    if (built.error) {
      alert(built.error);
      return;
    }

    const { payload } = built;

    try {
      if (editingId) {
        await updateDoc(doc(db, SERVICES_COLLECTION, editingId), payload);
        setStatusMessage('Changes saved.');
      } else {
        await addDoc(collection(db, SERVICES_COLLECTION), {
          ...payload,
          createdAt: serverTimestamp(),
        });
        setStatusMessage('Service added.');
      }
      resetForm();
      window.setTimeout(() => setStatusMessage(''), 2500);
    } catch {
      alert('Could not save. Check your connection and Firestore rules.');
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1>Admin - Services</h1>
      <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
        Data is stored in Firebase Firestore and updates here in real time.
      </p>

      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontSize: '14px', marginBottom: '8px' }}>
          {editingId ? 'Edit service' : 'New service'}
        </p>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          style={{ display: 'block', marginBottom: '10px', width: '100%', maxWidth: '400px' }}
        />

        <input
          name="price"
          placeholder="Price (number)"
          value={form.price}
          onChange={handleChange}
          style={{ display: 'block', marginBottom: '10px', width: '100%', maxWidth: '400px' }}
        />

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          style={{ display: 'block', marginBottom: '10px', width: '100%', maxWidth: '400px' }}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          style={{ display: 'block', marginBottom: '10px', width: '100%', maxWidth: '400px' }}
        />

        <textarea
          name="details"
          placeholder="Details (one line per bullet)"
          value={form.details}
          onChange={handleChange}
          rows={5}
          style={{ display: 'block', marginBottom: '10px', width: '100%', maxWidth: '400px' }}
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
          <button type="button" onClick={handleAddOrSave}>
            {editingId ? 'Save Changes' : 'Add Service'}
          </button>
          {(editingId ||
            form.title ||
            form.price ||
            form.description ||
            form.image ||
            form.details) && (
            <button type="button" onClick={resetForm}>
              Cancel
            </button>
          )}
          {statusMessage ? (
            <span style={{ fontSize: '13px', color: '#0d7d4d' }}>{statusMessage}</span>
          ) : null}
        </div>
      </div>

      {services.map((s) => (
        <div
          key={s.id}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '10px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            alignItems: 'flex-start',
          }}
        >
          {s.image ? (
            <img
              src={s.image}
              alt=""
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = PLACEHOLDER_IMAGE;
              }}
              style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
            />
          ) : (
            <div
              style={{
                width: '80px',
                height: '80px',
                background: '#eee',
                borderRadius: '8px',
                flexShrink: 0,
              }}
              aria-hidden
            />
          )}
          <div style={{ flex: '1', minWidth: '200px' }}>
            <h3 style={{ margin: '0 0 4px' }}>{s.title}</h3>
            <p style={{ margin: '0 0 4px' }}>{s.description}</p>
            <p style={{ margin: '0 0 4px' }}>₹{s.price}</p>
            {s.details.length > 0 && (
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                {s.details.length} detail line(s)
              </p>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <button type="button" onClick={() => handleEdit(s)}>
              Edit
            </button>
            <button type="button" onClick={() => handleDelete(s.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
