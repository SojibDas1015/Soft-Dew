import React, { useState } from 'react';
import { X, Truck, Search, CheckCircle2, Clock, MapPin, Package, Phone, AlertCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/formatters';

export const TrackOrderModal = () => {
  const {
    isTrackOrderOpen,
    setIsTrackOrderOpen,
    orders,
    lang,
    currency
  } = useStore();

  const [searchVal, setSearchVal] = useState('SLX-9042');
  const [searchedOrder, setSearchedOrder] = useState(() => orders[0] || null);
  const [searched, setSearched] = useState(false);

  if (!isTrackOrderOpen) return null;

  const handleSearch = (e) => {
    e?.preventDefault();
    const clean = searchVal.trim().toLowerCase();
    const match = orders.find(
      (o) =>
        o.id.toLowerCase() === clean ||
        o.customerPhone.replace(/[^0-9]/g, '').includes(clean.replace(/[^0-9]/g, ''))
    );
    setSearchedOrder(match || null);
    setSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsTrackOrderOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 z-10 animate-fade-in max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400 flex items-center justify-center">
              <Truck size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {lang === 'bn' ? 'অর্ডার ট্র্যাকিং সিস্টেম' : 'Live Order Tracking'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'bn' ? 'অর্ডার আইডি অথবা ফোন নম্বর দিয়ে লাইভ কুরিয়ার স্ট্যাটাস জানুন' : 'Enter your Order ID or phone number to track live delivery timeline'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsTrackOrderOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={handleSearch} className="mt-5 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder={lang === 'bn' ? "যেমন: SLX-9042 অথবা 01711234567" : "e.g., SLX-9042 or 01711234567"}
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-all shadow-sm shadow-teal-700/20"
          >
            {lang === 'bn' ? 'ট্র্যাক করুন' : 'Track Status'}
          </button>
        </form>

        {/* Quick Demo Badges */}
        <div className="mt-2.5 flex items-center gap-2 text-[11px] text-slate-500">
          <span>{lang === 'bn' ? 'টেস্ট করতে চাপুন:' : 'Try sample orders:'}</span>
          <button
            type="button"
            onClick={() => { setSearchVal('SLX-9042'); setSearchedOrder(orders[0]); }}
            className="underline text-teal-600 font-semibold"
          >
            SLX-9042 (In Transit)
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => { setSearchVal('SLX-9018'); setSearchedOrder(orders[1]); }}
            className="underline text-teal-600 font-semibold"
          >
            SLX-9018 (Delivered)
          </button>
        </div>

        {/* Tracking Details Card */}
        {searchedOrder ? (
          <div className="mt-6 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 bg-slate-50/50 dark:bg-slate-800/40 animate-fade-in">
            {/* Top Details */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                    {searchedOrder.id}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    searchedOrder.status === 'Delivered' 
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
                      : 'bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300'
                  }`}>
                    {searchedOrder.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                  <MapPin size={12} className="text-teal-600" />
                  <span>{searchedOrder.deliveryAddress}</span>
                </p>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">
                  {lang === 'bn' ? 'আনুমানিক ডেলিভারি' : 'Estimated Delivery'}
                </span>
                <span className="text-xs font-bold text-teal-700 dark:text-teal-400">
                  {searchedOrder.estimatedDelivery || 'Within 24 Hours'}
                </span>
              </div>
            </div>

            {/* Courier Info */}
            <div className="my-3.5 p-3 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/50 flex items-center justify-between text-xs text-teal-900 dark:text-teal-200">
              <div className="flex items-center gap-2">
                <Truck size={15} className="text-teal-600" />
                <span className="font-semibold">{searchedOrder.courier || 'Pathao Express Logistics'}</span>
              </div>
              <span className="text-[11px] text-teal-700 dark:text-teal-300 font-mono">
                {searchedOrder.paymentMethod}
              </span>
            </div>

            {/* Timeline Stepper */}
            <div className="mt-5 space-y-4">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                {lang === 'bn' ? 'ডেলিভারি টাইমলাইন' : 'Delivery Stepper'}
              </h4>

              <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
                {(searchedOrder.trackingTimeline || [
                  { stage: 'Order Placed', time: 'Completed', done: true },
                  { stage: 'Order Confirmed', time: 'Completed', done: true },
                  { stage: 'Packed at Hub', time: 'Completed', done: true },
                  { stage: 'Handed to Courier Rider', time: 'Live', done: true },
                  { stage: 'Delivered', time: 'Pending', done: false }
                ]).map((step, idx) => (
                  <div key={idx} className="relative flex items-center justify-between text-xs">
                    <div className={`absolute -left-6 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                      step.done 
                        ? 'bg-teal-600 border-teal-600 text-white' 
                        : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-transparent'
                    }`}>
                      <CheckCircle2 size={10} className="stroke-[3]" />
                    </div>

                    <span className={`font-semibold ${step.done ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400'}`}>
                      {step.stage}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {step.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Items summary */}
            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                {lang === 'bn' ? 'অর্ডারকৃত পণ্য সমূহ:' : 'Ordered Items:'}
              </div>
              <div className="space-y-1.5">
                {searchedOrder.items.map((it, i) => (
                  <div key={i} className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                    <span className="truncate pr-2">• {it.name} x {it.quantity}</span>
                    <span className="font-mono font-semibold shrink-0">
                      {formatPrice(it.price * it.quantity, currency, lang)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-2 border-t border-dashed border-slate-200 dark:border-slate-700 flex justify-between font-bold text-xs text-slate-900 dark:text-white">
                <span>{lang === 'bn' ? 'সর্বমোট (ডেলিভারিসহ):' : 'Grand Total (incl. delivery):'}</span>
                <span className="text-teal-700 dark:text-teal-400 font-mono">
                  {formatPrice(searchedOrder.total, currency, lang)}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 text-center py-10 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700">
            <AlertCircle size={32} className="text-amber-500 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {lang === 'bn' ? 'কোনো অর্ডার রেকর্ড পাওয়া যায়নি' : 'No order record found matching this query'}
            </p>
            <p className="text-[11px] text-slate-400 max-w-xs mx-auto mt-1">
              {lang === 'bn' ? 'অনুগ্রহ করে অর্ডার আইডি সঠিক কিনা চেক করুন অথবা আমাদের হেল্পলাইনে কল করুন।' : 'Please verify your Order ID or call our hotline for assistance.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
