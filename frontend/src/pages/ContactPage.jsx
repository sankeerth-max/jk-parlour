function ContactPage({ settings }) {
  const s = settings || {};

  return (
    <section className="section-padding">
      <div className="lux-container grid md:grid-cols-2 gap-10 items-start">
        <div className="space-y-5">
          <p className="section-title">Contact</p>
          <h1 className="section-heading">Visit The Studio</h1>
          <p className="section-subtitle">
            Reach out to us for bridal bookings, salon services, or customised bridal packages.
          </p>

          <div className="grid gap-4 text-sm">
            <div className="card-luxe p-4">
              <p className="font-medium text-deepCharcoal mb-1">Address</p>
              <p className="text-neutral-700">
                {s.address || 'Sri Karthika Bridal Studio, Your studio address here'}
              </p>
            </div>
            <div className="card-luxe p-4 grid gap-2">
              <div>
                <p className="font-medium text-deepCharcoal mb-1">Phone</p>
                <p className="text-neutral-700">{s.phone || '00000 00000'}</p>
              </div>
              <div>
                <p className="font-medium text-deepCharcoal mb-1">WhatsApp</p>
                <a
                  href={
                    s.whatsapp ? `https://wa.me/${s.whatsapp}` : 'https://wa.me/0000000000'
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="text-roseGold hover:underline"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
            <div className="card-luxe p-4">
              <p className="font-medium text-deepCharcoal mb-1">Email</p>
              <a
                href={`mailto:${s.email || 'sivanga285@gmail.com'}`}
                className="text-roseGold hover:underline"
              >
                {s.email || 'sivanga285@gmail.com'}
              </a>
            </div>
            <div className="card-luxe p-4">
              <p className="font-medium text-deepCharcoal mb-1">Working Hours</p>
              <p className="text-neutral-700">
                {s.workingHours || '9:30 AM – 8:00 PM'}
              </p>
            </div>
            <div className="card-luxe p-4">
              <p className="font-medium text-deepCharcoal mb-1">Instagram</p>
              <a
                href={s.instagram || 'https://www.instagram.com/jk.makeoverartistry'}
                target="_blank"
                rel="noreferrer"
                className="text-roseGold hover:underline"
              >
                @jk.makeoverartistry
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card-luxe overflow-hidden">
            <iframe
              title="Studio Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.482932381934!2d77.0!3d11.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAwJzAwLjAiTiA3N8KwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
              className="w-full h-80 border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;

