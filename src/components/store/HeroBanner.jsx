import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Scissors, Phone, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/formatters';

export const HeroBanner = () => {
  const { setActiveView, setSelectedCategory, setSelectedProductForDetail, products, lang, currency } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'slide-1',
      badgeBn: 'ফ্ল্যাশ অফার • ৩৪% ছাড়',
      badgeEn: 'Flash Deal • 34% OFF',
      titleBn: 'সেলুনের প্রয়োজনীয় সবকিছু এখন এক জায়গায়',
      titleEn: 'Everything for Your Salon in One Place',
      subtitleBn: 'বাংলাদেশের সর্ববৃহৎ সেলুন আইটেম ও ইকুইপমেন্টের নির্ভরযোগ্য অনলাইন শপ। সরাসরি ফ্যাক্টরি ইমপোর্টেড অরিজিনাল পণ্য ও ক্যাশ অন ডেলিভারি।',
      subtitleEn: "Bangladesh's largest reliable marketplace for salon chairs, clippers, Japanese scissors, hair colors & spa cosmetics.",
      ctaBn: 'ফ্ল্যাশ ডিল দেখুন',
      ctaEn: 'Explore Flash Deals',
      categoryTarget: 'hair-color',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85',
      featuredId: 'slx-001'
    },
    {
      id: 'slide-2',
      badgeBn: 'প্রফেশনাল বারবার টুলস',
      badgeEn: 'Master Barber Tools',
      titleBn: 'জাপানিজ স্টিল কাঁচি ও পাওয়ারফুল ট্রিমার',
      titleEn: 'Japanese 440C Shears & Pro Rotary Clippers',
      subtitleBn: 'BS VIP গোল্ড ফিনিশ কাটিং কাঁচি, কেমেই ও ভিজিআর ক্লিপারসহ সব ধরণের বারবার এক্সেসরিজ এখন ডিসকাউন্ট মূল্যে।',
      subtitleEn: 'High-precision titanium haircutting scissors, fade clippers, and barber accessories with warranty.',
      ctaBn: 'টুলস কালেকশন',
      ctaEn: 'View Pro Tools',
      categoryTarget: 'scissors-razors',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=85',
      featuredId: 'slx-002'
    },
    {
      id: 'slide-3',
      badgeBn: 'কমপ্লিট সেটআপ ও ফার্নিচার',
      badgeEn: 'Salon Furniture Setup',
      titleBn: 'লাক্সারি হাইড্রোলিক চেয়ার ও পার্লার প্যাকেজ',
      titleEn: 'Hydraulic Reclining Barber Thrones & Beds',
      subtitleBn: 'নতুন সেলুন ও পার্লার সেটআপের জন্য হেভি-ডিউটি হাইড্রোলিক চেয়ার, শ্যাম্পু স্টেশন এবং ট্রলি কার্ট পাইকারি মূল্যে।',
      subtitleEn: 'Heavy-duty 300kg capacity salon styling chairs and parlor furniture ready for rapid dispatch.',
      ctaBn: 'ফার্নিচার দেখুন',
      ctaEn: 'Salon Furniture',
      categoryTarget: 'salon-furniture',
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=85',
      featuredId: 'slx-012'
    }
  ];

  // Auto slide rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  const handleCtaClick = () => {
    setSelectedCategory(slide.categoryTarget);
    const prodSection = document.getElementById('products-catalog-section');
    if (prodSection) prodSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white min-h-[460px] md:min-h-[520px] flex items-center">
      {/* Background Slides with crossfade */}
      {slides.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentSlide ? 'opacity-40 scale-105' : 'opacity-0 scale-100'
          } transition-transform duration-[6000ms] ease-out`}
        >
          <img
            src={s.image}
            alt={s.titleEn}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Luxury Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 z-10" />

      {/* Main Slide Content */}
      <div className="container mx-auto px-4 py-12 relative z-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold mb-4 backdrop-blur-md">
            <Zap size={14} className="text-amber-400 fill-amber-400" />
            <span>{lang === 'bn' ? slide.badgeBn : slide.badgeEn}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4 text-white drop-shadow-sm">
            {lang === 'bn' ? slide.titleBn : slide.titleEn}
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
            {lang === 'bn' ? slide.subtitleBn : slide.subtitleEn}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCtaClick}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs md:text-sm flex items-center gap-2 shadow-lg shadow-emerald-700/30 active:scale-95 transition-all"
            >
              <span>{lang === 'bn' ? slide.ctaBn : slide.ctaEn}</span>
              <ArrowRight size={16} />
            </button>

            <a
              href="tel:+8801511008100"
              className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-xs md:text-sm flex items-center gap-2 transition-all"
            >
              <Phone size={15} className="text-emerald-400" />
              <span>{lang === 'bn' ? '+৮৮০১৫১১০-০৮১০০' : '+8801511008100'}</span>
            </a>
          </div>

          {/* Social Proof Metric Counters */}
          <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg">
            <div>
              <div className="text-lg md:text-2xl font-black text-white font-mono">12,000+</div>
              <div className="text-[11px] text-slate-400">
                {lang === 'bn' ? 'সন্তুষ্ট সেলুন পার্টনার' : 'Salons in Bangladesh'}
              </div>
            </div>
            <div>
              <div className="text-lg md:text-2xl font-black text-emerald-400 font-mono">100%</div>
              <div className="text-[11px] text-slate-400">
                {lang === 'bn' ? 'জেনুইন ইমপোর্ট' : 'Direct Factory Import'}
              </div>
            </div>
            <div>
              <div className="text-lg md:text-2xl font-black text-amber-400 font-mono">24-48h</div>
              <div className="text-[11px] text-slate-400">
                {lang === 'bn' ? 'দ্রুত হোম ডেলিভারি' : 'Nationwide Dispatch'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute right-4 bottom-6 z-20 flex items-center gap-2">
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white flex items-center justify-center transition-colors"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-1.5 px-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentSlide ? 'w-6 bg-emerald-500' : 'w-2 bg-white/30'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white flex items-center justify-center transition-colors"
          aria-label="Next Slide"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
};
