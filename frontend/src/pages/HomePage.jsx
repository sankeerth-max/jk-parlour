import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HomePage({ settings, apiBase }) {
  const [offers, setOffers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch(`${apiBase}/offers`)
      .then((res) => res.json())
      .then(setOffers)
      .catch(() => {});

    fetch(`${apiBase}/testimonials`)
      .then((res) => res.json())
      .then(setTestimonials)
      .catch(() => {});
  }, [apiBase]);

  return (
    <>
      <section className="section-padding">
        <div className="lux-container grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <p className="section-title">Luxury Bridal Beauty Studio</p>
            <h1 className="font-display text-4xl md:text-5xl leading-tight text-deepCharcoal">
              Sri Karthika
              <br />
              Bridal Studio
            </h1>
            <p className="text-neutral-600 text-sm md:text-base max-w-xl">
              With over 15+ years of bridal makeup and beauty expertise, Sri Karthika Bridal Studio
              crafts timeless, elegant looks for your most special moments. From traditional South
              Indian bridal glam to modern, minimal makeovers, every bride is styled with
              perfection.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/book" className="btn-primary">
                Book Appointment
              </Link>
              <Link to="/services" className="btn-outline">
                View Services
              </Link>
            </div>
            <div className="flex gap-8 pt-4 text-sm">
              <div>
                <p className="font-display text-2xl text-roseGold">15+</p>
                <p className="text-neutral-600">Years of Experience</p>
              </div>
              <div>
                <p className="font-display text-2xl text-roseGold">Bridal</p>
                <p className="text-neutral-600">Specialised Studio</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-br from-softPink/60 via-roseGold/20 to-white rounded-[2.5rem] blur-2xl opacity-60" />
            <div className="relative card-luxe p-4 md:p-6 overflow-hidden">
              <div className="aspect-[4/5] rounded-[2rem] bg-cover bg-center bg-[url('https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg')]" />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section-padding bg-white/60">
        <div className="lux-container grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 space-y-4">
            <p className="section-title">About The Studio</p>
            <h2 className="section-heading">Where Elegance Meets Artistry</h2>
            <p className="section-subtitle">
              Sri Karthika Bridal Studio is dedicated to making every bride feel like royalty. From
              flawless base to intricate eye detailing, every look is customised to enhance your
              natural features, skin tone, and personal style.
            </p>
            <p className="text-sm md:text-base text-neutral-600">
              The studio specialises in HD and airbrush bridal makeup, long-lasting hairstyles,
              saree draping, pre-bridal skincare, mehendi, and complete bridal packages that ensure
              you look picture-perfect from engagement to reception.
            </p>
          </div>
          <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
            <div className="card-luxe h-44 md:h-52 flex flex-col items-center justify-center text-center p-4">
              <p className="font-display text-3xl text-roseGold">Bridal</p>
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 mt-2">
                Makeup Studio
              </p>
            </div>
            <div className="card-luxe h-44 md:h-52 flex flex-col items-center justify-center text-center p-4">
              <p className="font-display text-3xl text-roseGold">Beauty</p>
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 mt-2">
                Salon & Skin
              </p>
            </div>
            <div className="card-luxe h-44 md:h-52 flex flex-col items-center justify-center text-center p-4 col-span-2">
              <p className="font-display text-3xl text-roseGold">Luxury</p>
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 mt-2">
                Experience • Comfort • Care
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="lux-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="section-title">Featured Services</p>
              <h2 className="section-heading">Signature Bridal & Beauty Services</h2>
              <p className="section-subtitle">
                From pre-bridal skincare to your final wedding day look, every service is crafted to
                bring out your most radiant self.
              </p>
            </div>
            <Link to="/services" className="btn-outline self-start">
              View all services
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Bridal Makeup',
                description: 'Customised HD & airbrush bridal looks for every ceremony.',
              },
              {
                title: 'Hair Styling',
                description: 'Elegant bridal buns, braids, and contemporary hairstyles.',
              },
              {
                title: 'Skin Care & Facials',
                description: 'Glow-boosting facials and skin prep for wedding events.',
              },
              {
                title: 'Mehendi',
                description: 'Intricate bridal mehendi designs with deep, rich stain.',
              },
              {
                title: 'Bridal Packages',
                description: 'End-to-end packages from engagement to reception.',
              },
              {
                title: 'Salon Services',
                description: 'Threading, waxing, hair colouring, pedicure, manicure and more.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="card-luxe p-6 hover:-translate-y-1 hover:shadow-luxe transition-all duration-300"
              >
                <h3 className="font-display text-xl mb-2 text-deepCharcoal">{item.title}</h3>
                <p className="text-sm text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {!!offers.length && (
        <section className="section-padding bg-white/70">
          <div className="lux-container">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <p className="section-title">Current Offers</p>
                <h2 className="section-heading">Bridal & Salon Offers</h2>
                <p className="section-subtitle">
                  Limited-time packages and special pricing on select bridal and beauty services.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {offers.map((offer) => (
                <div
                  key={offer._id}
                  className="card-luxe p-5 hover:-translate-y-1 hover:shadow-luxe transition-all"
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-roseGold mb-2">
                    Limited Offer
                  </p>
                  <h3 className="font-display text-xl text-deepCharcoal mb-2">{offer.title}</h3>
                  {offer.discountPercentage ? (
                    <p className="text-sm text-roseGold font-semibold mb-2">
                      Save {offer.discountPercentage}% on select services
                    </p>
                  ) : null}
                  {offer.description && (
                    <p className="text-sm text-neutral-600 mb-3">{offer.description}</p>
                  )}
                  {(offer.startDate || offer.endDate) && (
                    <p className="text-[11px] text-neutral-500">
                      {offer.startDate ? offer.startDate.slice(0, 10) : 'Now'} –{' '}
                      {offer.endDate ? offer.endDate.slice(0, 10) : 'Limited time'}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-softPink/40">
        <div className="lux-container grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <p className="section-title">Before & After</p>
            <h2 className="section-heading">Bridal Transformations</h2>
            <p className="section-subtitle">
              Soft glam, bold bridal, or minimal elegance – explore the transformations that speak
              for our work.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="card-luxe overflow-hidden">
              <div className="aspect-[3/4] bg-cover bg-center bg-[url('https://images.pexels.com/photos/3760852/pexels-photo-3760852.jpeg')]" />
            </div>
            <div className="card-luxe overflow-hidden mt-6">
              <div className="aspect-[3/4] bg-cover bg-center bg-[url('https://images.pexels.com/photos/3762876/pexels-photo-3762876.jpeg')]" />
            </div>
          </div>
        </div>
      </section>

      {!!testimonials.length && (
        <section className="section-padding">
          <div className="lux-container">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div>
                <p className="section-title">Testimonials</p>
                <h2 className="section-heading">What Brides Are Saying</h2>
                <p className="section-subtitle">
                  Real stories from brides who trusted Sri Karthika Bridal Studio for their big day.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.slice(0, 6).map((t) => (
                <div
                  key={t._id}
                  className="card-luxe p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-luxe transition-all"
                >
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    &ldquo;{t.message}&rdquo;
                  </p>
                  <div className="mt-4">
                    <p className="font-medium text-roseGold">– {t.name}</p>
                    {t.rating && (
                      <p className="text-xs text-roseGold/80 mt-1">
                        {'★'.repeat(t.rating)}{' '}
                        <span className="text-neutral-400">
                          {'★'.repeat(Math.max(0, 5 - t.rating))}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-white/70">
        <div className="lux-container grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-3">
            <p className="section-title">Instagram</p>
            <h2 className="section-heading">See Live Bridal Looks</h2>
            <p className="section-subtitle">
              Follow our Instagram for latest bridal makeovers, real brides, and beauty tips.
            </p>
            <a
              href="https://www.instagram.com/jk.makeoverartistry"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              View Instagram Feed
            </a>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-2xl bg-softPink/60 aspect-square"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-roseGold/20 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-roseGold text-white">
        <div className="lux-container flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl md:text-4xl mb-2">
              Book Your Bridal Appointment Today
            </h2>
            <p className="text-sm md:text-base text-white/80 max-w-xl">
              Secure your dates in advance for engagement, muhurtham, reception and pre-wedding
              events.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/book" className="btn-primary bg-white text-roseGold hover:bg-white/90">
              Book Appointment
            </Link>
            <Link to="/contact" className="btn-outline border-white text-white hover:bg-white/10">
              Contact Studio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;

