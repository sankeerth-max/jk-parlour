import { useEffect, useState } from 'react';

function DashboardPage({ apiBase }) {
  const [stats, setStats] = useState({
    totalBookings: 0,
    todaysBookings: 0,
    totalServices: 0,
    activeOffers: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token || !apiBase) return;

    const fetchStats = async () => {
      try {
        const [servicesRes, offersRes, apptRes] = await Promise.all([
          fetch(`${apiBase}/services/all`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${apiBase}/offers/all`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${apiBase}/appointments`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        const [services, offers, appointments] = await Promise.all([
          servicesRes.json(),
          offersRes.json(),
          apptRes.json(),
        ]);
        const today = new Date().toISOString().slice(0, 10);
        const todaysBookings = appointments.filter((a) => a.date === today).length;
        const activeOffers = offers.filter((o) => o.isActive).length;
        setStats({
          totalBookings: appointments.length,
          todaysBookings,
          totalServices: services.length,
          activeOffers,
        });
      } catch {
        // ignore errors on overview
      }
    };

    fetchStats();
  }, [apiBase]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-deepCharcoal mb-1">Dashboard Overview</h1>
        <p className="text-xs text-neutral-600">
          Quick snapshot of bookings, services, and offers.
        </p>
      </div>
      <div className="grid md:grid-cols-4 gap-4">
        <div className="card-luxe p-4">
          <p className="text-xs text-neutral-500 mb-1">Total Bookings</p>
          <p className="font-display text-2xl text-roseGold">{stats.totalBookings}</p>
        </div>
        <div className="card-luxe p-4">
          <p className="text-xs text-neutral-500 mb-1">Today&apos;s Bookings</p>
          <p className="font-display text-2xl text-roseGold">{stats.todaysBookings}</p>
        </div>
        <div className="card-luxe p-4">
          <p className="text-xs text-neutral-500 mb-1">Total Services</p>
          <p className="font-display text-2xl text-roseGold">{stats.totalServices}</p>
        </div>
        <div className="card-luxe p-4">
          <p className="text-xs text-neutral-500 mb-1">Active Offers</p>
          <p className="font-display text-2xl text-roseGold">{stats.activeOffers}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

