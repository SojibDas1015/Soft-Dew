import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, User, Phone, CheckCircle2, Scissors, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/formatters';

export const BookingModal = () => {
  const {
    isBookingModalOpen,
    setIsBookingModalOpen,
    selectedServiceForBooking,
    bookSalonService,
    currency
  } = useStore();

  const service = selectedServiceForBooking;

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [branch, setBranch] = useState('Gulshan 2 Flagship Lounge');
  const [date, setDate] = useState('Tomorrow');
  const [timeSlot, setTimeSlot] = useState('3:00 PM - 4:30 PM');
  const [notes, setNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState('');

  if (!isBookingModalOpen || !service) return null;

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      alert('Please provide your name and contact phone number');
      return;
    }

    const bookingRecord = {
      serviceName: service.name,
      clientName,
      clientPhone,
      branch,
      date: `${date}, ${timeSlot}`,
      notes,
      price: service.price
    };

    bookSalonService(bookingRecord);
    setConfirmedBookingId(`BKG-${Math.floor(1000 + Math.random() * 9000)}`);
    setBookingSuccess(true);
  };

  const handleClose = () => {
    setIsBookingModalOpen(false);
    setBookingSuccess(false);
    setClientName('');
    setClientPhone('');
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div 
        className="modal-container booking-modal animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleClose} className="modal-close-btn" aria-label="Close booking">
          <X size={20} />
        </button>

        {!bookingSuccess ? (
          <div>
            <div className="modal-header-compact">
              <div className="flex items-center gap-2 mb-1">
                <Scissors size={20} className="text-rose-600" />
                <span className="text-xs uppercase tracking-wider font-bold text-rose-600">
                  Salon Appointment Booking
                </span>
              </div>
              <h2 className="modal-title">{service.name}</h2>
              <div className="flex items-center gap-4 text-xs text-slate-600 mt-1">
                <span>⏱ Duration: <strong>{service.duration}</strong></span>
                <span>•</span>
                <span>Fee: <strong className="text-rose-600 font-bold">{formatPrice(service.price, currency)}</strong></span>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="booking-form">
              <div className="form-group">
                <label className="form-label">
                  <User size={14} className="inline mr-1 text-slate-500" /> Client Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samira Rahman"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Phone size={14} className="inline mr-1 text-slate-500" /> Contact Number (bKash/WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="017XX-XXXXXX"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <MapPin size={14} className="inline mr-1 text-slate-500" /> Select Atelier Branch
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="form-select"
                >
                  <option value="Gulshan 2 Flagship Lounge">Gulshan 2 Flagship Lounge (Avenue 45)</option>
                  <option value="Banani Pro Studio">Banani Pro Studio (Road 11)</option>
                  <option value="Dhanmondi Pavilion">Dhanmondi Pavilion (Satmasjid Rd)</option>
                  <option value="Chattogram GEC Studio">Chattogram Lounge (GEC Circle)</option>
                </select>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">
                    <Calendar size={14} className="inline mr-1 text-slate-500" /> Date
                  </label>
                  <select
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="form-select"
                  >
                    <option value="Today">Today (Same-day Priority)</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This Friday">This Friday (Weekend Salon Slot)</option>
                    <option value="This Saturday">This Saturday</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Clock size={14} className="inline mr-1 text-slate-500" /> Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="form-select"
                  >
                    <option value="11:30 AM - 1:00 PM">11:30 AM - 1:00 PM</option>
                    <option value="2:00 PM - 3:30 PM">2:00 PM - 3:30 PM</option>
                    <option value="4:00 PM - 5:30 PM">4:00 PM - 5:30 PM</option>
                    <option value="6:30 PM - 8:00 PM">6:30 PM - 8:00 PM (Evening Dew)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Special Beautician Notes (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Sensitive scalp, bridal consultation, preference for female beautician"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="booking-notice-card">
                <Sparkles size={16} className="text-amber-500" />
                <p>Pay at the salon counter after your treatment via Cash, Card, or bKash.</p>
              </div>

              <div className="form-actions mt-4">
                <button type="button" onClick={handleClose} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <span>Confirm Appointment Reservation</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="booking-success-screen animate-fade-in text-center py-6">
            <div className="success-icon-wrap">
              <CheckCircle2 size={54} className="text-emerald" />
            </div>
            <h2 className="text-2xl font-bold mt-3 mb-2">Appointment Confirmed!</h2>
            <p className="text-slate-600 text-sm max-w-md mx-auto mb-4">
              Your appointment for <strong>{service.name}</strong> at <strong>{branch}</strong> has been scheduled.
            </p>

            <div className="booking-ticket-box glass-panel text-left max-w-sm mx-auto mb-6 p-4">
              <div className="flex justify-between items-center border-b pb-2 mb-2">
                <span className="text-xs text-slate-500">Booking Pass #</span>
                <strong className="text-rose-600 font-mono text-sm">{confirmedBookingId}</strong>
              </div>
              <div className="space-y-1 text-xs text-slate-700">
                <p><strong>Client:</strong> {clientName} ({clientPhone})</p>
                <p><strong>Time:</strong> {date}, {timeSlot}</p>
                <p><strong>Estimated Fee:</strong> {formatPrice(service.price, currency)}</p>
              </div>
            </div>

            <button onClick={handleClose} className="btn btn-primary">
              Done & Return to Store
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
