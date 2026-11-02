import React, { useState } from 'react';
import { 
  Phone, 
  Truck, 
  HelpCircle, 
  Search, 
  Camera, 
  Menu, 
  Heart, 
  ShoppingBag, 
  LayoutDashboard, 
  Sun, 
  Moon, 
  X, 
  GitCompareArrows,
  Sparkles,
  Scissors
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/formatters';

export const Navbar = () => {
  const {
    activeView,
    setActiveView,
    cartCount,
    cartSubtotal,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    compareList,
    setIsCompareOpen,
    setIsCategoryRailOpen,
    setIsTrackOrderOpen,
    setIsVisualSearchOpen,
    searchQuery,
    setSearchQuery,
    lang,
    toggleLang,
    theme,
    toggleTheme,
    currency
  } = useStore();

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors shadow-xs">
      {/* 1. Top Utility Bar (Matching SalonixBD) */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 border-b border-slate-800">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Hotline & WhatsApp */}
          <div className="flex items-center gap-4">
            <a 
              href="tel:+8801511008100" 
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            >
              <Phone size={12} className="text-emerald-400" />
              <span>
                <strong className="text-white">{lang === 'bn' ? 'হটলাইন:' : 'Hotline:'}</strong> +880 1511-008100
              </span>
            </a>
            <a 
              href="https://wa.me/8801511008100" 
              target="_blank" 
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1 text-emerald-400 hover:underline font-semibold"
            >
              <span>WhatsApp Order</span>
            </a>
          </div>

          {/* Utility Right Links */}
          <div className="flex items-center gap-3.5">
            <button
              onClick={() => setIsTrackOrderOpen(true)}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Truck size={12} />
              <span>{lang === 'bn' ? 'অর্ডার ট্র্যাক' : 'Track Order'}</span>
            </button>

            <span className="text-slate-700">|</span>

            {/* Compare Counter if active */}
            {compareList.length > 0 && (
              <button
                onClick={() => setIsCompareOpen(true)}
                className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold"
              >
                <GitCompareArrows size={12} />
                <span>{lang === 'bn' ? `তুলনা (${compareList.length})` : `Compare (${compareList.length})`}</span>
              </button>
            )}

            {/* Language Switch */}
            <div className="flex items-center bg-slate-800 rounded-md p-0.5 text-[10px]">
              <button
                onClick={toggleLang}
                className={`px-1.5 py-0.5 rounded transition-all ${
                  lang === 'bn' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                বাং
              </button>
              <button
                onClick={toggleLang}
                className={`px-1.5 py-0.5 rounded transition-all ${
                  lang === 'en' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1 rounded text-slate-400 hover:text-amber-400 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Header Top */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3 md:gap-6">
        {/* Left: Rail Toggle & Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsCategoryRailOpen(true)}
            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors"
            aria-label="Open Categories Rail"
            title="Open Categories Sidebar"
          >
            <Menu size={20} />
          </button>

          <div
            onClick={() => { setActiveView('store'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-800 via-teal-700 to-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Scissors size={20} />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                  Soft<span className="text-emerald-700 dark:text-emerald-400">Dew</span>
                </span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono text-[9px] font-bold">
                  BD
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                {lang === 'bn' ? 'সেলুন আইটেমের অনলাইন শপ' : 'Pro Salon & Barber Marketplace'}
              </p>
            </div>
          </div>
        </div>

        {/* Center: Live Search with Visual Camera Search */}
        <div className="flex-1 max-w-2xl relative">
          <div className={`relative flex items-center w-full rounded-2xl border transition-all ${
            isSearchFocused
              ? 'border-emerald-600 ring-2 ring-emerald-500/20 bg-white dark:bg-slate-800'
              : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:border-slate-300'
          }`}>
            <span className="pl-3.5 text-slate-400">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder={lang === 'bn' ? "আপনার সেলুনের প্রয়োজনীয় আইটেম সমূহ খুঁজুন....." : "Search hair colors, clippers, chairs, scissors, keratin..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full px-3 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 bg-transparent focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={14} />
              </button>
            )}
            {/* Camera Visual Search Trigger */}
            <button
              onClick={() => setIsVisualSearchOpen(true)}
              className="pr-3.5 pl-2 text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 flex items-center gap-1 text-xs font-semibold"
              title="Search by image / ছবি দিয়ে খুঁজুন"
            >
              <Camera size={17} />
              <span className="hidden lg:inline text-[11px]">
                {lang === 'bn' ? 'ছবি দিয়ে খুঁজুন' : 'Photo Search'}
              </span>
            </button>
          </div>
        </div>

        {/* Right: Actions (Admin Switcher, Wishlist, Cart) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Admin Dashboard Switcher Button */}
          <button
            onClick={() => setActiveView(activeView === 'dashboard' ? 'store' : 'dashboard')}
            className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeView === 'dashboard'
                ? 'bg-slate-900 text-white shadow-sm ring-2 ring-emerald-500'
                : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100'
            }`}
          >
            <LayoutDashboard size={15} />
            <span>
              {activeView === 'dashboard'
                ? (lang === 'bn' ? 'স্টোরফ্রন্টে ফিরুন' : 'Back to Store')
                : (lang === 'bn' ? 'ক্লায়েন্ট ড্যাশবোর্ড' : 'Client Dashboard')}
            </span>
          </button>

          {/* Wishlist */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors"
            title="Wishlist"
          >
            <Heart size={18} className={wishlist.length > 0 ? "fill-rose-500 text-rose-500" : ""} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white transition-all shadow-md shadow-teal-700/20 active:scale-95"
            title="Cart Drawer"
          >
            <div className="relative">
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-amber-400 text-slate-900 text-[10px] font-extrabold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-mono font-bold text-xs">
              {formatPrice(cartSubtotal, currency, lang)}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
