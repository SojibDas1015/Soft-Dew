import React from 'react';
import { Scissors, Star, Clock, Check, Sparkles, MapPin, Calendar } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/formatters';

export const SalonServices = () => {
  const { 
    services, 
    setSelectedServiceForBooking, 
    setIsBookingModalOpen, 
    currency 
  } = useStore();

  const handleOpenBooking = (service) => {
    setSelectedServiceForBooking(service);
    setIsBookingModalOpen(true);
  };

  return (
    <section className="salon-services-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-pill">
            <Scissors size={14} className="text-rose-600 inline mr-1" />
            <span>Soft-Dew Salon & Parlor Atelier</span>
          </div>
          <h2 className="section-heading">
            Expert Aesthetic Services & VIP Makeovers
          </h2>
          <p className="section-subtext max-w-xl mx-auto">
            Experience bespoke salon therapies administered by board-certified aesthetic practitioners using our 100% genuine clinical products.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-thumb-wrap">
                <img src={service.image} alt={service.name} className="service-img" />
                <span className="service-category-tag">{service.category}</span>
                <span className="service-duration-tag">
                  <Clock size={12} className="inline mr-1" />
                  {service.duration}
                </span>
              </div>

              <div className="service-content">
                <div className="service-rating-row">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={14} className="fill-amber-400" />
                    <span className="font-bold text-xs">{service.rating}</span>
                  </div>
                  <span className="service-booked-count">
                    {service.bookedCount}+ clients serviced
                  </span>
                </div>

                <h3 className="service-title">{service.name}</h3>
                <p className="service-description">{service.description}</p>

                {/* Included highlights */}
                <div className="service-includes-list">
                  {service.includes && service.includes.map((inc, i) => (
                    <div key={i} className="service-include-chip">
                      <Check size={12} className="text-emerald shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>

                {/* Footer price & booking action */}
                <div className="service-footer">
                  <div className="service-price-block">
                    <span className="text-xs text-slate-500">Treatment Fee</span>
                    <span className="service-price">
                      {formatPrice(service.price, currency)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleOpenBooking(service)}
                    className="btn btn-primary btn-sm service-book-btn"
                  >
                    <Calendar size={15} />
                    <span>Book Session</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
