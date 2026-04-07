import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { motion } from 'framer-motion';
import { doc, onSnapshot } from 'firebase/firestore';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import BookingPage from './pages/BookingPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import DashboardPage from './pages/admin/DashboardPage.jsx';
import ServicesAdminPage from './pages/admin/ServicesAdminPage.jsx';
import GalleryAdminPage from './pages/admin/GalleryAdminPage.jsx';
import SettingsAdminPage from './pages/admin/SettingsAdminPage.jsx';
import LoginPage from "./pages/LoginPage.jsx";
import TestimonialsAdminPage from './pages/admin/TestimonialsAdminPage.jsx';
import PremiumFooter from './components/PremiumFooter.jsx';
import { BookingModalProvider, useBookingModal } from './context/BookingModalContext.jsx';
import { whatsappWaMeUrl } from './constants/contact.js';
import { REST_API_BASE } from './config/api.js';
import { seedSalonServicesIfEmpty } from './lib/seedSalonServices.js';
import { db } from './firebase.js';
import { DEFAULT_SITE_SETTINGS } from './lib/realtimeContent.js';

function ProtectedRoute({ children }) {
  if (localStorage.getItem('isAdmin') !== 'true') {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

function NavHeader() {
  const { openBookingModal } = useBookingModal();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setMobileOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`sticky top-0 z-40 border-b nav-smooth ${isScrolled ? 'nav-scrolled border-border/80' : 'bg-white border-border/40'}`}>
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 py-3">
          {/* [LOGO + BRAND NAME] */}
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 sm:gap-3 min-w-0 shrink-0"
            aria-label="Sri Karthika Bridal Studio — Home"
          >
            <img
              src="/swan-mark-transparent.png"
              alt=""
              className="h-8 w-auto object-contain mix-blend-multiply shrink-0"
            />
            <div className="brand-lockup">
              <span className="brand-script">Sri Karthika</span>
              <span className="brand-tagline">Bridal Studio</span>
            </div>
          </Link>

          {/* [MENU] */}
          <nav className="hidden lg:flex flex-1 justify-center items-center gap-[28px] text-[11px] font-medium uppercase tracking-[0.14em] text-ink">
            <Link to="/" className="hover:text-muted transition-colors duration-200">Home</Link>
            <Link to="/about" className="hover:text-muted transition-colors duration-200">About</Link>
            <Link to="/services" className="hover:text-muted transition-colors duration-200">Services</Link>
            <Link to="/gallery" className="hover:text-muted transition-colors duration-200">Gallery</Link>
            <Link to="/book" className="hover:text-muted transition-colors duration-200">Booking</Link>
            <Link to="/contact" className="hover:text-muted transition-colors duration-200">Contact</Link>
          </nav>

          {/* [BOOK BUTTON + MOBILE MENU] */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden p-2 text-ink hover:text-muted transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={() => openBookingModal()}
              className="btn-primary hidden lg:inline-flex items-center justify-center py-[10px] px-[20px]"
            >
              Book Now
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-white py-4 px-4 sm:px-6 md:px-8">
            <nav className="flex flex-col gap-4 text-[11px] font-medium tracking-[0.18em] uppercase text-ink">
              <Link to="/" className="hover:text-muted transition-colors">Home</Link>
              <Link to="/about" className="hover:text-muted transition-colors">About</Link>
              <Link to="/services" className="hover:text-muted transition-colors">Services</Link>
              <Link to="/gallery" className="hover:text-muted transition-colors">Gallery</Link>
              <Link to="/book" className="hover:text-muted transition-colors">Booking</Link>
              <Link to="/contact" className="hover:text-muted transition-colors">Contact</Link>
            </nav>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openBookingModal();
              }}
              className="btn-primary mt-5 w-full py-3 text-sm font-medium"
            >
              Book Now
            </button>
          </div>
        )}
      </header>
    </>
  );
}

function AppLayout() {
  const [settings, setSettings] = useState(() => DEFAULT_SITE_SETTINGS);
  const [showLoader, setShowLoader] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const settingsRef = doc(db, 'siteSettings', 'main');
    const unsub = onSnapshot(
      settingsRef,
      (snap) => {
        const data = snap.data() || {};
        setSettings({ ...DEFAULT_SITE_SETTINGS, ...data });
      },
      () => setSettings(DEFAULT_SITE_SETTINGS)
    );
    return () => unsub();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    seedSalonServicesIfEmpty().catch(() => {});
  }, []);

  return (
    <BookingModalProvider settingsWhatsapp={settings.whatsapp}>
      <div className="min-h-screen bg-cream">
        <div className={`loading-screen ${showLoader ? '' : 'hide'}`} aria-hidden={!showLoader}>
          <p className="loading-brand">Sri Karthika Beauty Studio</p>
          <p className="text-[10px] tracking-[0.28em] uppercase text-muted">Luxury Salon Experience</p>
        </div>
        <NavHeader />

        <main>
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/book" element={<BookingPage settings={settings} />} />
          <Route path="/contact" element={<ContactPage settings={settings} />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage apiBase={REST_API_BASE} />} />
            <Route path="services" element={<ServicesAdminPage />} />
            <Route path="gallery" element={<GalleryAdminPage />} />
            <Route path="settings" element={<SettingsAdminPage />} />
            <Route path="testimonials" element={<TestimonialsAdminPage />} />
          </Route>
          </Routes>
        </main>

        {!location.pathname.startsWith('/admin') && <PremiumFooter settings={settings} />}

        <motion.a
          href={whatsappWaMeUrl(settings.whatsapp)}
          target="_blank"
          rel="noreferrer"
          className="whatsapp-fab fixed z-40 h-12 w-12 rounded-full bg-btn text-white shadow-card flex items-center justify-center hover:bg-btn-hover transition-all duration-200"
          aria-label="Chat on WhatsApp"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </motion.a>
      </div>
    </BookingModalProvider>
  );
}

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Keep admin pages' scroll behavior intact (tables/dashboards can be longer).
    if (location.pathname.startsWith('/admin')) return;
    window.scrollTo(0, 0); // instant scroll (no smooth)
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout />
    </Router>
  );
}

export default App;
