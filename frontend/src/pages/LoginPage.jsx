import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      alert('Wrong credentials');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-softPink via-beige to-white px-4 py-12">
      <div className="card-luxe p-8 w-full max-w-md shadow-card">
        <h1 className="font-display text-2xl text-deepCharcoal mb-1">Admin Login</h1>
        <p className="text-xs text-neutral-600 mb-6">Sign in to access the admin panel.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-username" className="block text-xs font-medium text-neutral-600 mb-1.5">
              Username
            </label>
            <input
              id="admin-username"
              name="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-full border border-neutral-200 bg-white/70 px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-roseGold focus:ring-1 focus:ring-roseGold/40"
              placeholder="Username"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="block text-xs font-medium text-neutral-600 mb-1.5">
              Password
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-full border border-neutral-200 bg-white/70 px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-roseGold focus:ring-1 focus:ring-roseGold/40"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn-primary w-full justify-center mt-2">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
