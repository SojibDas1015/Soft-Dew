import React from 'react';
import { 
  Sparkles, 
  Droplets, 
  Scissors, 
  Palette, 
  Zap, 
  Wind, 
  Smile, 
  Shield, 
  Cpu, 
  Armchair,
  Layers,
  Flame,
  ArrowRight
} from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { useStore } from '../../context/StoreContext';
import { toBengaliDigits } from '../../utils/formatters';

export const CategoryScroller = () => {
  const { selectedCategory, setSelectedCategory, products, lang } = useStore();

  const iconMap = {
    Sparkles: Sparkles,
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

  const getCount = (catId) => {
    if (catId === 'all') return products.length;
    return products.filter((p) => p.category === catId).length;
  };

  const handleSelect = (catId) => {
    setSelectedCategory(catId);
    const prodEl = document.getElementById('products-catalog-section');
    if (prodEl) {
      prodEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200/60 dark:border-slate-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-1">
              <Sparkles size={14} />
              <span>{lang === 'bn' ? 'এক্সক্লুসিভ কালেকশন' : 'Curated Aisles'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {lang === 'bn' ? 'ক্যাটাগরি অনুযায়ী কিনুন' : 'Shop by Category'}
            </h2>
          </div>
          <button
            onClick={() => handleSelect('all')}
            className="text-xs font-bold text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-1"
          >
            <span>{lang === 'bn' ? 'সব দেখুন →' : 'View All →'}</span>
          </button>
        </div>

        {/* 1. Category Visual Grid Cards (Like SalonixBD's cw-rail) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
            const count = getCount(cat.id);
            const isSelected = selectedCategory === cat.id;
            const Icon = iconMap[cat.icon] || Scissors;

            return (
              <div
                key={cat.id}
                onClick={() => handleSelect(cat.id)}
                className={`group relative overflow-hidden rounded-2xl border transition-all cursor-pointer bg-white dark:bg-slate-800 p-3 flex flex-col items-center text-center ${
                  isSelected
                    ? 'border-teal-600 ring-2 ring-teal-500/20 shadow-md'
                    : 'border-slate-200/80 dark:border-slate-700/80 hover:border-teal-500 hover:shadow-lg hover:-translate-y-1'
                }`}
              >
                {/* Image Wrap */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2.5 bg-slate-100 dark:bg-slate-700">
                  <img
                    src={cat.image || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80'}
                    alt={cat.nameEn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  <div className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs flex items-center justify-center text-teal-700 dark:text-teal-400 shadow-xs">
                    <Icon size={14} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-xs text-slate-800 dark:text-slate-200 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors line-clamp-1">
                  {lang === 'bn' ? cat.nameBn : cat.nameEn}
                </h3>

                {/* Subtitle / Count */}
                <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                  {lang === 'bn' ? `${toBengaliDigits(count)} টি পণ্য` : `${count} Products`}
                </span>
              </div>
            );
          })}
        </div>

        {/* 2. Promo Split Banners (SalonixBD: "বিউটি & K-Beauty", "সেলুন — সেরা ব্র্যান্ড") */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {/* Banner 1: K-Beauty & Facial */}
          <div 
            onClick={() => handleSelect('scrubs-facial')}
            className="group relative overflow-hidden rounded-3xl h-44 sm:h-52 cursor-pointer shadow-md"
          >
            <img
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
              alt="Beauty & K-Beauty"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-900/60 to-transparent" />
            <div className="relative z-10 h-full p-6 flex flex-col justify-center max-w-sm text-white">
              <span className="text-[11px] uppercase tracking-wider font-bold text-teal-300 mb-1">
                {lang === 'bn' ? 'অর্গানিক ফেসিয়াল কেয়ার' : 'Organic Skin Aesthetics'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black mb-2">
                {lang === 'bn' ? 'বিউটি & K-Beauty ট্রিটমেন্ট' : 'Beauty & K-Beauty Glow'}
              </h3>
              <p className="text-xs text-slate-200 line-clamp-2 mb-3">
                {lang === 'bn' ? 'কোরিয়ান হাইড্রো-এক্সফোলিয়েটিং স্ক্রাব ও স্পা ফেস প্যাক' : 'Clinical scrubs and hydra-gel masks for parlor facial treatments.'}
              </p>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-300 group-hover:translate-x-1 transition-transform">
                <span>{lang === 'bn' ? 'অর্ডার করুন' : 'Explore Now'}</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>

          {/* Banner 2: Pro Barber & Tools */}
          <div 
            onClick={() => handleSelect('scissors-razors')}
            className="group relative overflow-hidden rounded-3xl h-44 sm:h-52 cursor-pointer shadow-md"
          >
            <img
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80"
              alt="Salon Best Brands"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent" />
            <div className="relative z-10 h-full p-6 flex flex-col justify-center max-w-sm text-white">
              <span className="text-[11px] uppercase tracking-wider font-bold text-amber-400 mb-1">
                {lang === 'bn' ? 'প্রফেশনাল গ্রেড' : 'Barbershop Grade'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black mb-2">
                {lang === 'bn' ? 'সেলুন — সেরা ব্র্যান্ড পার্টনার' : 'Master Salon Shears & Tools'}
              </h3>
              <p className="text-xs text-slate-200 line-clamp-2 mb-3">
                {lang === 'bn' ? 'BS VIP গোল্ড কাঁচি, টনি অ্যান্ড গাই ও কেমেই অরিজিনাল টুলস' : 'Precision convex shears and heavy duty fade clippers direct from source.'}
              </p>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                <span>{lang === 'bn' ? 'কালেকশন দেখুন' : 'View Shears'}</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
