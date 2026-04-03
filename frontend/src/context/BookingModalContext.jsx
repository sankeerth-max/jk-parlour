/* eslint-disable react-refresh/only-export-components -- provider + hook pattern */
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import WhatsAppBookingModal from '../components/WhatsAppBookingModal.jsx';
import { mapToBookingServiceOption } from '../constants/bookingModalOptions.js';

const BookingModalContext = createContext(null);

export function BookingModalProvider({ children, settingsWhatsapp }) {
  const [open, setOpen] = useState(false);
  const [initialService, setInitialService] = useState('');

  const openBookingModal = useCallback((serviceTitle) => {
    setInitialService(mapToBookingServiceOption(serviceTitle));
    setOpen(true);
  }, []);

  const closeBookingModal = useCallback(() => {
    setOpen(false);
  }, []);

  const value = useMemo(
    () => ({ openBookingModal, closeBookingModal }),
    [openBookingModal, closeBookingModal]
  );

  return (
    <BookingModalContext.Provider value={value}>
      {children}
      <WhatsAppBookingModal
        open={open}
        onClose={closeBookingModal}
        initialService={initialService || undefined}
        settingsWhatsapp={settingsWhatsapp}
      />
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const ctx = useContext(BookingModalContext);
  if (!ctx) {
    throw new Error('useBookingModal must be used within BookingModalProvider');
  }
  return ctx;
}
