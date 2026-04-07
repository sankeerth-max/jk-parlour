import { useEffect, useState } from 'react';
import { collection, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.js';
import { mapAppointmentsSnapshot } from '../../lib/realtimeContent.js';

const STATUS_OPTIONS = ['Pending', 'Confirmed', 'Cancelled', 'Completed'];
const APPOINTMENTS_COLLECTION = 'appointments';

function AppointmentsAdminPage() {
  const [appointments, setAppointments] = useState([]);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    const q = query(collection(db, APPOINTMENTS_COLLECTION));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => setAppointments(mapAppointmentsSnapshot(snapshot)),
      () => setAppointments([])
    );
    return () => unsubscribe();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, APPOINTMENTS_COLLECTION, id), { status });
    } catch {
      alert('Could not update appointment status.');
    }
  };

  const visibleAppointments = filterDate
    ? appointments.filter((a) => String(a.date) === filterDate)
    : appointments;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="font-display text-2xl text-deepCharcoal">Appointments</h1>
            <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide">
              Live Sync
            </span>
          </div>
          <p className="text-xs text-neutral-600">
            View, confirm, cancel or mark bookings as completed.
          </p>
        </div>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 text-xs"
        />
      </div>

      <div className="card-luxe overflow-hidden">
        <div className="max-h-[520px] overflow-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-softPink/50">
              <tr className="text-left text-[11px] text-neutral-600">
                <th className="px-3 py-2 font-medium">Customer</th>
                <th className="px-3 py-2 font-medium">Contact</th>
                <th className="px-3 py-2 font-medium">Service</th>
                <th className="px-3 py-2 font-medium">Date</th>
                <th className="px-3 py-2 font-medium">Time Slot</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleAppointments.map((a) => (
                <tr key={a.id} className="border-t border-neutral-100">
                  <td className="px-3 py-2">
                    <p className="font-medium text-deepCharcoal">{a.name}</p>
                    {a.message && (
                      <p className="text-[10px] text-neutral-500 line-clamp-2">{a.message}</p>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <p className="text-[11px] text-neutral-700">{a.phone}</p>
                    {a.email && (
                      <p className="text-[10px] text-neutral-500">{a.email}</p>
                    )}
                  </td>
                  <td className="px-3 py-2 text-[11px] text-neutral-700">
                    {a.service}
                  </td>
                  <td className="px-3 py-2 text-[11px] text-neutral-700">
                    {a.date}
                  </td>
                  <td className="px-3 py-2 text-[11px] text-neutral-700">
                    {a.timeSlot}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] ${
                        a.status === 'Confirmed'
                          ? 'bg-emerald-50 text-emerald-600'
                          : a.status === 'Cancelled'
                            ? 'bg-red-50 text-red-500'
                            : a.status === 'Completed'
                              ? 'bg-neutral-900 text-white'
                              : 'bg-amber-50 text-amber-600'
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex flex-wrap gap-1">
                      {STATUS_OPTIONS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => updateStatus(a.id, s)}
                          className="text-[10px] px-2 py-0.5 rounded-full border border-neutral-200 hover:bg-softPink/60"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
              {!visibleAppointments.length && (
                <tr>
                  <td colSpan={7} className="px-3 py-4 text-center text-xs text-neutral-500">
                    No appointments found for the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AppointmentsAdminPage;

