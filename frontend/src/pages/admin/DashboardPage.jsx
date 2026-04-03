import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl text-deepCharcoal">Admin Dashboard</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="shrink-0 text-xs font-medium rounded-full border border-neutral-300 bg-white px-4 py-2 text-deepCharcoal hover:bg-neutral-50 transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="card-luxe p-6">
        <p className="text-sm text-neutral-600">Welcome to the admin panel.</p>
      </div>
    </div>
  );
}
