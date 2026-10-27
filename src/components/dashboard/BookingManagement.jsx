import React from 'react';
import { Scissors, Calendar, Clock, MapPin, User, Phone, CheckCircle2, AlertCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/formatters';

export const BookingManagement = () => {
  const { bookings, updateBookingStatus, currency } = useStore();

  return (
    <div className="booking-management-wrapper animate-fade-in">
      <div className="table-controls-bar">
        <div>
          <h4 className="text-lg font-bold">Salon Appointments</h4>
          <p className="text-xs text-slate-500">
            Client bookings across Gulshan, Banani, and Dhanmondi ateliers
          </p>
        </div>
      </div>

      <div className="table-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Service Name</th>
                <th>Client Contact</th>
                <th>Branch Lounge</th>
                <th>Schedule Slot</th>
                <th>Est. Fee</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-500">
                    No salon appointments booked yet.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <strong className="font-mono text-rose-600">{b.id}</strong>
                    </td>
                    <td>
                      <strong className="text-slate-800">{b.serviceName}</strong>
                    </td>
                    <td>
                      <div>
                        <span className="block font-medium text-xs">{b.clientName}</span>
                        <span className="text-xs text-slate-400">{b.clientPhone}</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-xs text-slate-700 flex items-center gap-1">
                        <MapPin size={11} className="text-rose-600" />
                        {b.branch}
                      </span>
                    </td>
                    <td>
                      <span className="text-xs font-medium text-slate-800">
                        {b.date}
                      </span>
                    </td>
                    <td>
                      <strong className="text-xs text-slate-900 font-bold">
                        {formatPrice(b.price, currency)}
                      </strong>
                    </td>
                    <td>
                      <span className={`status-pill ${b.status === 'Confirmed' ? 'status-processing' : b.status === 'Completed' ? 'status-delivered' : 'status-cancelled'}`}>
                        {b.status}
                      </span>
                    </td>
                    <td>
                      <select
                        value={b.status}
                        onChange={(e) => updateBookingStatus(b.id, e.target.value)}
                        className="status-change-select"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Rescheduled">Rescheduled</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
