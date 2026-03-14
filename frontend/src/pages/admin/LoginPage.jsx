import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage({ apiBase }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Enter email and password.');
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('adminToken', data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-softPink via-beige to-white">
      <div className="card-luxe p-8 w-full max-w-md">
        <h1 className="font-display text-2xl mb-2 text-deepCharcoal">Admin Login</h1>
        <p className="text-xs text-neutral-600 mb-6">
          Sign in to manage bookings, services, offers, gallery and website settings.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-full border border-neutral-200 bg-white/70 px-4 py-2 text-sm focus:outline-none focus:border-roseGold focus:ring-1 focus:ring-roseGold/40"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-full border border-neutral-200 bg-white/70 px-4 py-2 text-sm focus:outline-none focus:border-roseGold focus:ring-1 focus:ring-roseGold/40"
            />
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;

