import { useEffect, useState } from 'react';
import {
  loadSettings,
  persistSettings,
  notifySettingsUpdated,
} from '../../lib/settingsStorage.js';

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState(() => loadSettings());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    persistSettings(settings);
    notifySettingsUpdated();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-deepCharcoal mb-1">Website Settings</h1>
        <p className="text-xs text-neutral-600">
          Update studio contact details, social links, and working hours shown on the site. Saved on this device.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card-luxe p-6 space-y-4 max-w-2xl">
        <div>
          <label className="block text-[11px] text-neutral-600 mb-1">Address</label>
          <textarea
            name="address"
            value={settings.address}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-2xl border border-neutral-200 bg-white/70 px-3 py-2 text-xs"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] text-neutral-600 mb-1">Phone</label>
            <input
              name="phone"
              value={settings.phone}
              onChange={handleChange}
              className="w-full rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 text-xs"
            />
          </div>
          <div>
            <label className="block text-[11px] text-neutral-600 mb-1">WhatsApp Number</label>
            <input
              name="whatsapp"
              value={settings.whatsapp}
              onChange={handleChange}
              placeholder="8072965181 or 918072965181"
              className="w-full rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 text-xs"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] text-neutral-600 mb-1">Email</label>
            <input
              name="email"
              value={settings.email}
              onChange={handleChange}
              className="w-full rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 text-xs"
            />
          </div>
          <div>
            <label className="block text-[11px] text-neutral-600 mb-1">Instagram Link</label>
            <input
              name="instagram"
              value={settings.instagram}
              onChange={handleChange}
              className="w-full rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 text-xs"
            />
          </div>
        </div>
        <div>
          <label className="block text-[11px] text-neutral-600 mb-1">Working Hours</label>
          <input
            name="workingHours"
            value={settings.workingHours}
            onChange={handleChange}
            className="w-full rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 text-xs"
          />
        </div>
        <div className="flex items-center gap-3">
          <button type="submit" className="btn-primary text-xs px-4 py-2">
            Save Settings
          </button>
          {saved && <span className="text-[11px] text-emerald-600">Saved.</span>}
        </div>
      </form>
    </div>
  );
}
