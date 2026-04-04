import { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase.js';
import { GALLERY_CATEGORIES } from '../../constants/galleryCategories.js';

const GALLERY_COLLECTION = 'gallery';

function mapGalleryDocs(snapshot) {
  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      image: String(data.image ?? '').trim(),
      category: String(data.category ?? '').trim(),
    };
  });
}

export default function GalleryAdminPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    image: '',
    category: GALLERY_CATEGORIES[0],
  });

  useEffect(() => {
    const colRef = collection(db, GALLERY_COLLECTION);
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        setItems(mapGalleryDocs(snapshot));
      },
      () => {
        setItems([]);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const image = form.image.trim();
    if (!image) {
      alert('Please enter an image URL.');
      return;
    }
    try {
      await addDoc(collection(db, GALLERY_COLLECTION), {
        image,
        category: form.category,
        createdAt: serverTimestamp(),
      });
      setForm({ image: '', category: form.category });
      alert('Image added.');
    } catch {
      alert('Could not add image. Check Firestore rules.');
    }
  };

  const handleDelete = async (id) => {
    if (!id || !window.confirm('Delete this image?')) return;
    try {
      await deleteDoc(doc(db, GALLERY_COLLECTION, id));
    } catch {
      alert('Could not delete.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-deepCharcoal mb-1">Gallery</h1>
        <p className="text-xs text-neutral-600">
          Images sync to the public gallery in real time (Firestore collection &quot;gallery&quot;).
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="card-luxe p-5 space-y-3">
          <p className="text-sm font-medium text-deepCharcoal">Add image</p>
          <div>
            <label className="block text-[11px] text-neutral-600 mb-1">Image URL</label>
            <input
              name="image"
              value={form.image}
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
              {GALLERY_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn-primary text-xs px-4 py-2">
            Add Image
          </button>
        </form>

        <div className="grid grid-cols-2 gap-3 max-h-[520px] overflow-auto pr-1">
          {items.map((item) => (
            <div key={item.id} className="card-luxe overflow-hidden relative group">
              <img
                src={item.image}
                alt=""
                className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-2 text-[10px]">
                <p className="font-medium text-deepCharcoal">{item.category}</p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="absolute top-2 right-2 bg-white/80 text-[10px] px-2 py-1 rounded-full text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
          {!items.length && (
            <p className="text-xs text-neutral-500 col-span-full">No images yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
