import React, { useState } from 'react';
import { 
  Scissors, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  CheckCircle2, 
  AlertCircle,
  Search
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/formatters';

export const BookingManagement = () => {
  const { bookings, updateBookingStatus, currency, lang } = useStore();
  const [search, setSearch] = useState('');

  const filteredBookings = bookings.filter((b) => {
    return (
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.clientName.toLowerCase().includes(search.toLowerCase()) ||
      b.clientPhone.includes(search) ||
      b.serviceName.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header and Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Scissors size={18} className="text-teal-700 dark:text-teal-400" />
            <span>{lang === 'bn' ? 'সেলুন সেটআপ ও কনসালটেন্সি ইনকোয়ারি' : 'Salon Setup Inquiries & Bookings'}</span>
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === 'bn' ? 'কাস্টমারদের সেলুন সেটআপ রিকোয়েস্ট ও বুকিং লিস্ট' : 'Client salon setup inquiries and showroom appointments'}
          </p>
        </div>

        <div className="relative min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder={lang === 'bn' ? "ক্লায়েন্টের নাম বা ফোন দিয়ে খুঁজুন..." : "Filter by client name or phone..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white focus:outline-none"
          />
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">{lang === 'bn' ? 'আইডি' : 'ID'}</th>
                <th className="p-4">{lang === 'bn' ? 'সার্ভিস / প্যাকেজ' : 'Service / Package'}</th>
                <th className="p-4">{lang === 'bn' ? 'ক্লায়েন্ট ও যোগাযোগ' : 'Client Details'}</th>
                <th className="p-4">{lang === 'bn' ? 'ব্রাঞ্চ ও তারিখ' : 'Branch & Date'}</th>
                <th className="p-4">{lang === 'bn' ? 'আনুমানিক বাজেট' : 'Estimated Value'}</th>
                <th className="p-4">{lang === 'bn' ? 'স্ট্যাটাস' : 'Status'}</th>
                <th className="p-4">{lang === 'bn' ? 'পরিবর্তন' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-400">
                    {lang === 'bn' ? 'কোনো ইনকোয়ারি রেকর্ড নেই।' : 'No appointments or inquiries found.'}
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-teal-700 dark:text-teal-400">
                      {b.id}
                    </td>
                    <td className="p-4">
                      <strong className="text-slate-900 dark:text-white block font-bold">
                        {b.serviceName}
                      </strong>
                      {b.notes && (
                        <p className="text-[11px] text-slate-400 max-w-xs truncate mt-0.5">
                          {b.notes}
                        </p>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">
                        {b.clientName}
                      </span>
                      <a 
                        href={`tel:${b.clientPhone}`}
                        className="text-[11px] text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <Phone size={10} />
                        <span>{b.clientPhone}</span>
                      </a>
                    </td>
                    <td className="p-4">
                      <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <MapPin size={11} className="text-teal-700 shrink-0" />
                        <span>{b.branch}</span>
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {b.date}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                      {formatPrice(b.price || 0, currency, lang)}
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        b.status === 'Confirmed'
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                          : b.status === 'Completed'
                            ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300'
                            : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <select
                        value={b.status}
                        onChange={(e) => updateBookingStatus(b.id, e.target.value)}
                        className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-white focus:outline-none"
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
