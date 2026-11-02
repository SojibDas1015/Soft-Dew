import React from 'react';
import { Store, Menu, Truck, ShoppingBag, LayoutDashboard, Heart } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const MobileBottomNav = () => {
  const {
    activeView,
    setActiveView,
    cartCount,
    setIsCartOpen,
    setIsCategoryRailOpen,
    setIsTrackOrderOpen,
    lang
  } = useStore();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/80 dark:border-slate-800 py-1.5 px-3 shadow-lg">
      <div className="flex items-center justify-around">
        {/* Home / Shop */}
        <button
          onClick={() => { setActiveView('store'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
            activeView === 'store' 
              ? 'text-teal-700 dark:text-teal-400 font-bold' 
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Store size={19} />
          <span className="text-[10px] mt-0.5">{lang === 'bn' ? 'হোম' : 'Shop'}</span>
        </button>

        {/* Categories Rail */}
        <button
          onClick={() => setIsCategoryRailOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-all"
        >
          <Menu size={19} />
          <span className="text-[10px] mt-0.5">{lang === 'bn' ? 'ক্যাটাগরি' : 'Categories'}</span>
        </button>

        {/* Center Floating Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center -mt-4"
          aria-label="Cart"
        >
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-800 to-emerald-500 text-white flex items-center justify-center shadow-lg shadow-teal-700/30 active:scale-95 transition-transform">
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-slate-900 font-black text-[10px] flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold text-teal-800 dark:text-teal-400 mt-1">
            {lang === 'bn' ? 'কার্ট' : 'Cart'}
          </span>
        </button>

        {/* Track Order */}
        <button
          onClick={() => setIsTrackOrderOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-all"
        >
          <Truck size={19} />
          <span className="text-[10px] mt-0.5">{lang === 'bn' ? 'ট্র্যাকিং' : 'Track'}</span>
        </button>

        {/* Dashboard / Admin */}
        <button
          onClick={() => { setActiveView('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
            activeView === 'dashboard' 
              ? 'text-teal-700 dark:text-teal-400 font-bold' 
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <LayoutDashboard size={19} />
          <span className="text-[10px] mt-0.5">{lang === 'bn' ? 'অ্যাডমিন' : 'Admin'}</span>
        </button>
      </div>
    </div>
  );
};
