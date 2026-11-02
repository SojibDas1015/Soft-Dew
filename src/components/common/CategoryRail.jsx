import React from 'react';
import { 
  X, 
  Home, 
  Zap, 
  Award, 
  Truck, 
  Heart, 
  Gift, 
  Sun, 
  Moon, 
  Scissors, 
  ChevronRight, 
  Layers, 
  Palette, 
  Droplets, 
  Wind, 
  Smile, 
  Shield, 
  Cpu, 
  Armchair,
  Flame,
  LayoutDashboard
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/categories';

export const CategoryRail = () => {
  const {
    isCategoryRailOpen,
    setIsCategoryRailOpen,
    selectedCategory,
    setSelectedCategory,
    activeView,
    setActiveView,
    lang,
    toggleLang,
    theme,
    toggleTheme,
    setIsTrackOrderOpen,
    setIsWishlistOpen
  } = useStore();

  if (!isCategoryRailOpen) return null;

  const iconMap = {
    Sparkles: Layers,
    Scissors: Scissors,
    Zap: Zap,
    Palette: Palette,
    Droplets: Droplets,
    Wind: Wind,
    Flame: Flame,
    Layers: Layers,
    Smile: Smile,
    Shield: Shield,
    Cpu: Cpu,
    Armchair: Armchair
  };

  const handleSelectCat = (catId) => {
    setSelectedCategory(catId);
    setActiveView('store');
    setIsCategoryRailOpen(false);
    const prodEl = document.getElementById('products-catalog-section');
    if (prodEl) {
      prodEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCategoryRailOpen(false)}
      />

      {/* Rail Panel */}
      <aside className="relative w-80 max-w-[85vw] h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col z-10 animate-slide-right">
        {/* Rail Top Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-teal-500/20">
              ✂
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white text-sm tracking-tight">
                {lang === 'bn' ? 'সফট ডিউ বিডি' : 'Soft Dew BD'}
              </h3>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                {lang === 'bn' ? 'সেলুন আইটেমের নির্ভরযোগ্য শপ' : 'Reliable Salon Equipment'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsCategoryRailOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Nav Shortcut Bar */}
        <div className="p-3 grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800 text-xs">
          <button
            onClick={() => {
              setIsCategoryRailOpen(false);
              const flashEl = document.getElementById('flash-deals-section');
              if (flashEl) flashEl.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-medium hover:bg-amber-100 transition-colors"
          >
            <Zap size={14} className="text-amber-500" />
            <span>{lang === 'bn' ? 'ফ্ল্যাশ ডিল' : 'Flash Deals'}</span>
          </button>

          <button
            onClick={() => {
              setIsCategoryRailOpen(false);
              setIsTrackOrderOpen(true);
            }}
            className="flex items-center gap-2 p-2 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 font-medium hover:bg-teal-100 transition-colors"
          >
            <Truck size={14} className="text-teal-600" />
            <span>{lang === 'bn' ? 'অর্ডার ট্র্যাক' : 'Track Order'}</span>
          </button>

          <button
            onClick={() => {
              setIsCategoryRailOpen(false);
              setIsWishlistOpen(true);
            }}
            className="flex items-center gap-2 p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 font-medium hover:bg-rose-100 transition-colors"
          >
            <Heart size={14} className="text-rose-500" />
            <span>{lang === 'bn' ? 'উইশলিস্ট' : 'Wishlist'}</span>
          </button>

          <button
            onClick={() => {
              setIsCategoryRailOpen(false);
              setActiveView('dashboard');
            }}
            className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-semibold hover:bg-emerald-100 transition-colors"
          >
            <LayoutDashboard size={14} className="text-emerald-600" />
            <span>{lang === 'bn' ? 'ক্লায়েন্ট প্যানেল' : 'Client Admin'}</span>
          </button>
        </div>

        {/* Scrollable Categories List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
          <div className="px-2 py-1 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {lang === 'bn' ? 'ক্যাটাগরি সমূহ' : 'Product Categories'}
          </div>

          {CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.icon] || Scissors;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCat(cat.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all text-xs font-medium ${
                  isSelected 
                    ? 'bg-teal-700 text-white shadow-sm font-semibold' 
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-teal-700 dark:text-teal-400'
                  }`}>
                    <Icon size={15} />
                  </div>
                  <span className="truncate">{lang === 'bn' ? cat.nameBn : cat.nameEn}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {cat.count}
                  </span>
                  <ChevronRight size={13} className="opacity-40" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Preferences (Lang & Theme) */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between gap-2 text-xs">
          {/* Language Toggle */}
          <div className="flex items-center bg-slate-200 dark:bg-slate-700 rounded-lg p-0.5">
            <button
              onClick={() => toggleLang()}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                lang === 'bn' ? 'bg-emerald-700 text-white shadow-xs font-bold' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              বাংলা
            </button>
            <button
              onClick={() => toggleLang()}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                lang === 'en' ? 'bg-emerald-700 text-white shadow-xs font-bold' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              EN
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-medium hover:border-slate-300 transition-colors shadow-xs"
          >
            {theme === 'dark' ? (
              <>
                <Sun size={14} className="text-amber-400" />
                <span>{lang === 'bn' ? 'লাইট' : 'Light'}</span>
              </>
            ) : (
              <>
                <Moon size={14} className="text-slate-600" />
                <span>{lang === 'bn' ? 'ডার্ক' : 'Dark'}</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </div>
  );
};
