import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Lenis from 'lenis';
import './index.css';
import App from './App.jsx';

export function SmoothApp() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      wheelMultiplier: 0.9,
      touchMultiplier: 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <App />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SmoothApp />
  </StrictMode>,
);
