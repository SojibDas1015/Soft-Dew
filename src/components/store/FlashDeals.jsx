import React, { useState, useEffect } from 'react';
import { Zap, Clock, ShoppingCart, Heart, Flame, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice, calculateDiscount, toBengaliDigits } from '../../utils/formatters';

export const FlashDeals = () => {
  const { 
    products, 
    addToCart, 
    setSelectedProductForDetail, 
    toggleWishlist, 
    isInWishlist, 
    currency, 
    lang 
  } = useStore();

  const flashProducts = products.filter((p) => p.isFlashDeal);

  // Live countdown timer state (e.g., 08h : 35m : 12s)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 35,
    seconds: 12
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (flashProducts.length === 0) return null;

  return (
    <section id="flash-deals-section" className="py-12 bg-gradient-to-b from-teal-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background Neon Glow Rings */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Flash Header (Matching SalonixBD Neon Bar) */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-amber-400/30 animate-pulse">
              <Zap size={22} className="fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {lang === 'bn' ? 'ফ্ল্যাশ ডিল' : 'Flash Deals'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold uppercase tracking-widest animate-pulse">
                  {lang === 'bn' ? 'লাইভ' : 'LIVE'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {lang === 'bn' ? 'সীমিত সময়ের জন্য বিশেষ ছাড়যুক্ত সেলুন আইটেম' : 'Limited-time super discounts on professional salon gear'}
              </p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-300 font-medium hidden sm:inline flex items-center gap-1">
              <Clock size={13} className="text-amber-400" />
              <span>{lang === 'bn' ? 'অফার শেষ হতে বাকি:' : 'Ends In:'}</span>
            </span>

            <div className="flex items-center gap-1 font-mono">
              <div className="bg-slate-950 border border-emerald-500/40 rounded-xl px-2.5 py-1.5 text-center min-w-[42px] shadow-inner">
                <span className="text-base font-black text-amber-400 block leading-none">
                  {lang === 'bn' ? toBengaliDigits(String(timeLeft.hours).padStart(2, '0')) : String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-slate-400 uppercase font-sans">hrs</span>
              </div>
              <span className="text-amber-400 font-bold">:</span>
              <div className="bg-slate-950 border border-emerald-500/40 rounded-xl px-2.5 py-1.5 text-center min-w-[42px] shadow-inner">
                <span className="text-base font-black text-amber-400 block leading-none">
                  {lang === 'bn' ? toBengaliDigits(String(timeLeft.minutes).padStart(2, '0')) : String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-slate-400 uppercase font-sans">min</span>
              </div>
              <span className="text-amber-400 font-bold">:</span>
              <div className="bg-slate-950 border border-emerald-500/40 rounded-xl px-2.5 py-1.5 text-center min-w-[42px] shadow-inner">
                <span className="text-base font-black text-amber-400 block leading-none">
                  {lang === 'bn' ? toBengaliDigits(String(timeLeft.seconds).padStart(2, '0')) : String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-slate-400 uppercase font-sans">sec</span>
              </div>
            </div>
          </div>
        </div>

        {/* Flash Deals Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {flashProducts.map((p) => {
            const discountPct = calculateDiscount(p.price, p.discountPrice);
            const soldPct = p.soldPercent || 65;

            return (
              <div
                key={p.id}
                className="group relative bg-slate-900/90 rounded-2xl border border-white/10 hover:border-emerald-500/60 p-4 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/50 flex flex-col justify-between"
              >
                <div>
                  {/* Image Wrap */}
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3 bg-slate-950 cursor-pointer">
                    <img
                      src={p.image}
                      alt={p.name}
                      onClick={() => setSelectedProductForDetail(p)}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />

                    {/* Discount Badge */}
                    <span className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-rose-600 text-white font-black text-xs shadow-md">
                      -{discountPct}%
                    </span>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(p)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white flex items-center justify-center transition-colors shadow-xs"
                      aria-label="Wishlist"
                    >
                      <Heart
                        size={15}
                        className={isInWishlist(p.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-300'}
                      />
                    </button>
                  </div>

                  {/* Brand & Category */}
                  <div className="flex items-center justify-between text-[11px] text-emerald-400 font-semibold mb-1">
                    <span>{p.brand}</span>
                    <span className="text-slate-400 font-mono text-[10px]">{p.sku}</span>
                  </div>

                  {/* Product Title */}
                  <h3
                    onClick={() => setSelectedProductForDetail(p)}
                    className="font-bold text-sm text-white line-clamp-2 cursor-pointer hover:text-emerald-300 transition-colors mb-2.5 leading-snug"
                  >
                    {lang === 'bn' ? p.nameBn || p.name : p.name}
                  </h3>

                  {/* Price Row */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="font-mono font-black text-lg text-amber-400">
                      {formatPrice(p.discountPrice || p.price, currency, lang)}
                    </span>
                    {p.discountPrice && (
                      <span className="font-mono text-xs text-slate-400 line-through">
                        {formatPrice(p.price, currency, lang)}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  {/* Stock Progress Bar (SalonixBD: sx-sold) */}
                  <div className="mb-3">
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden relative">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full transition-all duration-1000"
                        style={{ width: `${soldPct}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1 font-medium">
                      <span>{lang === 'bn' ? `বিক্রি ${toBengaliDigits(soldPct)}% চলছে` : `${soldPct}% Claimed`}</span>
                      <span className="text-amber-400 font-bold">{lang === 'bn' ? 'স্টক সীমিত' : 'Selling Fast'}</span>
                    </div>
                  </div>

                  {/* Direct Add to Cart */}
                  <button
                    onClick={() => addToCart(p, 1)}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 active:scale-98 transition-all"
                  >
                    <ShoppingCart size={14} />
                    <span>{lang === 'bn' ? 'কার্টে যোগ করুন' : 'Add to Cart'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
