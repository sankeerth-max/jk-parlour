import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import BookingPage from './pages/BookingPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import DashboardPage from './pages/admin/DashboardPage.jsx';
import ServicesAdminPage from './pages/admin/ServicesAdminPage.jsx';
import OffersAdminPage from './pages/admin/OffersAdminPage.jsx';
import GalleryAdminPage from './pages/admin/GalleryAdminPage.jsx';
import AppointmentsAdminPage from './pages/admin/AppointmentsAdminPage.jsx';
import SettingsAdminPage from './pages/admin/SettingsAdminPage.jsx';
import LoginPage from './pages/admin/LoginPage.jsx';
import TestimonialsAdminPage from './pages/admin/TestimonialsAdminPage.jsx';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

function App() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/settings`)
      .then((res) => res.json())
      .then(setSettings)
      .catch(() => {});
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-softPink/40 via-beige to-white">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-white/60">
          <div className="lux-container flex items-center justify-between py-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-roseGold/10 border border-roseGold/40 flex items-center justify-center">
                <span className="font-display text-2xl text-roseGold">SK</span>
              </div>
              <div>
                <p className="font-display text-lg md:text-xl tracking-wide text-deepCharcoal">
                  Sri Karthika Bridal Studio
                </p>
                <p className="text-xs text-neutral-500 uppercase tracking-[0.25em]">
                  Bridal Makeup & Beauty
                </p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-700">
              <Link to="/" className="hover:text-roseGold transition-colors">
                Home
              </Link>
              <a href="#about" className="hover:text-roseGold transition-colors">
                About
              </a>
              <Link to="/services" className="hover:text-roseGold transition-colors">
                Services
              </Link>
              <Link to="/gallery" className="hover:text-roseGold transition-colors">
                Gallery
              </Link>
              <Link to="/book" className="hover:text-roseGold transition-colors">
                Book Appointment
              </Link>
              <Link to="/contact" className="hover:text-roseGold transition-colors">
                Contact
              </Link>
            </nav>
            <div className="hidden md:block">
              <Link to="/book" className="btn-primary">
                Book Now
              </Link>
            </div>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage settings={settings} apiBase={API_BASE} />} />
            <Route path="/services" element={<ServicesPage apiBase={API_BASE} />} />
            <Route path="/gallery" element={<GalleryPage apiBase={API_BASE} />} />
            <Route path="/book" element={<BookingPage apiBase={API_BASE} />} />
            <Route path="/contact" element={<ContactPage settings={settings} />} />
            <Route path="/admin/login" element={<LoginPage apiBase={API_BASE} />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<DashboardPage apiBase={API_BASE} />} />
              <Route path="services" element={<ServicesAdminPage apiBase={API_BASE} />} />
              <Route path="offers" element={<OffersAdminPage apiBase={API_BASE} />} />
              <Route path="gallery" element={<GalleryAdminPage apiBase={API_BASE} />} />
              <Route path="appointments" element={<AppointmentsAdminPage apiBase={API_BASE} />} />
              <Route path="settings" element={<SettingsAdminPage apiBase={API_BASE} />} />
              <Route path="testimonials" element={<TestimonialsAdminPage apiBase={API_BASE} />} />
            </Route>
          </Routes>
        </main>

        <a
          href={settings?.whatsapp ? `https://wa.me/${settings.whatsapp}` : 'https://wa.me/0000000000'}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full bg-green-500 shadow-luxe flex items-center justify-center text-white text-2xl hover:scale-105 transition-transform"
        >
          W
        </a>
      </div>
    </Router>
  );
}

export default App;
