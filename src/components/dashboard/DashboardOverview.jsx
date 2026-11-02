import React from 'react';
import { 
  DollarSign, 
  ShoppingBag, 
  Layers, 
  Scissors, 
  TrendingUp, 
  AlertTriangle, 
  Plus, 
  ArrowRight,
  ShieldCheck,
  Star,
  Truck,
  Sparkles
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice, toBengaliDigits } from '../../utils/formatters';

export const DashboardOverview = () => {
  const { 
    products, 
    orders, 
    bookings, 
    setDashboardTab, 
    setIsAddProductModalOpen, 
    setEditingProduct,
    currency,
    lang 
  } = useStore();

  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.total || 0), 0);
  const lowStockCount = products.filter((p) => (p.stock || 0) < 15).length;
  const inTransitCount = orders.filter((o) => o.status === 'In Transit' || o.status === 'Processing').length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 4 Main Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Revenue */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {lang === 'bn' ? 'মোট বিক্রয় আয়' : 'Total Revenue'}
            </span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center font-bold">
              ৳
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mb-1">
            {formatPrice(totalRevenue, currency, lang)}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold">
            <TrendingUp size={13} />
            <span>+24.5% {lang === 'bn' ? 'এই সপ্তাহে বৃদ্ধি' : 'growth this week'}</span>
          </div>
        </div>

        {/* Stat 2: Orders */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {lang === 'bn' ? 'মোট অর্ডার' : 'Total Orders'}
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
              <ShoppingBag size={18} />
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mb-1">
            {lang === 'bn' ? `${toBengaliDigits(orders.length)} টি অর্ডার` : `${orders.length} Orders`}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-blue-600 font-semibold">
            <Truck size={13} />
            <span>{inTransitCount} {lang === 'bn' ? 'ডেলিভারি প্রক্রিয়ায় আছে' : 'active deliveries'}</span>
          </div>
        </div>

        {/* Stat 3: Products */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {lang === 'bn' ? 'সক্রিয় সেলুন আইটেম' : 'Active SKUs'}
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center">
              <Layers size={18} />
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mb-1">
            {lang === 'bn' ? `${toBengaliDigits(products.length)} টি পণ্য` : `${products.length} Products`}
          </div>
          <div className={`flex items-center gap-1 text-[11px] font-semibold ${
            lowStockCount > 0 ? 'text-amber-600' : 'text-slate-400'
          }`}>
            {lowStockCount > 0 ? (
              <>
                <AlertTriangle size={13} />
                <span>{lowStockCount} {lang === 'bn' ? 'পণ্যের স্টক সীমিত' : 'items low on stock'}</span>
              </>
            ) : (
              <span>{lang === 'bn' ? 'পর্যাপ্ত স্টক রয়েছে' : 'Healthy inventory'}</span>
            )}
          </div>
        </div>

        {/* Stat 4: Inquiries & Setups */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {lang === 'bn' ? 'সেলুন সেটআপ ইনকোয়ারি' : 'Setup Inquiries'}
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
              <Scissors size={18} />
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mb-1">
            {lang === 'bn' ? `${toBengaliDigits(bookings.length)} টি প্রজেক্ট` : `${bookings.length} Inquiries`}
          </div>
          <div className="text-[11px] text-teal-600 font-semibold">
            {lang === 'bn' ? 'পাইকারি সেটআপ কনসাল্টেশন' : 'Wholesale salon setup packages'}
          </div>
        </div>
      </div>

      {/* Quick Action Banner for Client: ADD PRODUCT */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-900 to-emerald-800 text-white flex flex-wrap items-center justify-between gap-4 shadow-lg shadow-teal-900/20">
        <div className="max-w-lg">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-xs font-bold mb-2">
            <Sparkles size={13} />
            <span>{lang === 'bn' ? 'ক্লায়েন্ট কুইক অ্যাকশন' : 'Client Quick Action'}</span>
          </div>
          <h3 className="text-xl font-black mb-1">
            {lang === 'bn' ? 'আপনার স্টোরে নতুন পণ্য যুক্ত করতে চান?' : 'Need to add a new salon product to your store?'}
          </h3>
          <p className="text-xs text-teal-100">
            {lang === 'bn' 
              ? 'কাঁচি, ট্রিমার, হেয়ার কালার বা ফার্নিচারের বিস্তারিত লিখে সাবমিট করলেই তাত্ক্ষণিক স্টোরফ্রন্টে লাইভ হবে।'
              : 'Add shears, clippers, colors, or chairs with instant customer storefront synchronization.'}
          </p>
        </div>

        <button
          onClick={() => {
            setEditingProduct(null);
            setIsAddProductModalOpen(true);
          }}
          className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-400/20 active:scale-95 transition-all"
        >
          <Plus size={16} />
          <span>{lang === 'bn' ? '+ নতুন পণ্য যোগ করুন' : '+ Add New Product'}</span>
        </button>
      </div>

      {/* Recent Orders Preview */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            {lang === 'bn' ? 'সাম্প্রতিক কাস্টমার অর্ডার' : 'Recent Customer Orders'}
          </h3>
          <button
            onClick={() => setDashboardTab('orders')}
            className="text-xs font-bold text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-1"
          >
            <span>{lang === 'bn' ? 'সব অর্ডার দেখুন' : 'View All Orders'}</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="space-y-3">
          {orders.slice(0, 3).map((ord) => (
            <div
              key={ord.id}
              className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex flex-wrap items-center justify-between gap-3 text-xs"
            >
              <div>
                <span className="font-mono font-bold text-teal-700 dark:text-teal-400 block">
                  {ord.id}
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {ord.customerName}
                </span>
                <span className="text-slate-400 text-[11px] block">{ord.customerPhone}</span>
              </div>

              <div className="text-right">
                <span className="font-mono font-bold text-slate-900 dark:text-white text-sm block">
                  {formatPrice(ord.total, currency, lang)}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  ord.status === 'Delivered' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-teal-100 text-teal-800'
                }`}>
                  {ord.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
