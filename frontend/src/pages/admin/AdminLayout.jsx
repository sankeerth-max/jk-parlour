import { Navigate, Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

function useAuth() {
  const token = localStorage.getItem('adminToken');
  return !!token;
}

function AdminLayout() {
  const isAuthed = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAuthed) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-beige">
      <aside className="hidden md:flex w-60 flex-col bg-deepCharcoal text-white">
        <div className="px-6 py-5 border-b border-white/10">
          <p className="font-display text-lg">Admin Panel</p>
          <p className="text-[11px] text-white/60 mt-1">Sri Karthika Bridal Studio</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
          {[
            { to: '/admin', label: 'Dashboard' },
            { to: '/admin/appointments', label: 'Appointments' },
            { to: '/admin/services', label: 'Services' },
            { to: '/admin/offers', label: 'Offers' },
            { to: '/admin/gallery', label: 'Gallery' },
            { to: '/admin/testimonials', label: 'Testimonials' },
            { to: '/admin/settings', label: 'Website Settings' },
          ].map((item) => {
            const active =
              item.to === '/admin'
                ? location.pathname === '/admin'
                : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`block px-3 py-2 rounded-full ${
                  active ? 'bg-roseGold text-white' : 'text-white/80 hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={handleLogout}
          className="m-4 mt-auto px-4 py-2 rounded-full text-xs border border-white/30 text-white/80 hover:bg-white/10"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 min-h-screen bg-gradient-to-b from-softPink/40 via-beige to-white">
        <div className="md:hidden px-4 py-3 flex items-center justify-between bg-deepCharcoal text-white">
          <p className="font-display text-base">Admin</p>
          <button
            type="button"
            onClick={handleLogout}
            className="text-xs border border-white/30 rounded-full px-3 py-1"
          >
            Logout
          </button>
        </div>
        <div className="lux-container py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;

