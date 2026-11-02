import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  X, 
  Filter, 
  SlidersHorizontal,
  Scissors,
  CheckCircle2,
  Package,
  Layers,
  Phone,
  Flame,
  Award
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { HeroBanner } from './HeroBanner';
import { TrustBanner } from '../common/TrustBanner';
import { CategoryScroller } from './CategoryScroller';
import { FlashDeals } from './FlashDeals';
import { ProductCard } from './ProductCard';
import { BRANDS } from '../../data/categories';
import { toBengaliDigits } from '../../utils/formatters';

export const Storefront = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    selectedBrand,
    setSelectedBrand,
    searchQuery, 
    setSearchQuery,
    setSelectedProductForDetail,
    lang 
  } = useStore();

  const [sortBy, setSortBy] = useState('featured');

  // Filter products by search, category, and brand
  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchBrand = selectedBrand === 'all' || (p.brand && p.brand.toLowerCase().includes(selectedBrand.toLowerCase()));
    const matchSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.nameBn && p.nameBn.includes(searchQuery)) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchCategory && matchBrand && matchSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return (a.discountPrice || a.price) - (b.discountPrice || b.price);
    }
    if (sortBy === 'price-high') {
      return (b.discountPrice || b.price) - (a.discountPrice || a.price);
    }
    if (sortBy === 'rating') {
      return (b.rating || 5) - (a.rating || 5);
    }
    return 0; // Default featured
  });

  // Best Sellers subset (SalonixBD: "সবচেয়ে বেশি বিক্রি হয়েছে")
  const bestSellers = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      {/* 1. Hero Luxury Slider */}
      <HeroBanner />

      {/* 2. Trust Assurance Strip */}
      <TrustBanner />

      {/* 3. Category Grid & Promo Split Cards */}
      <CategoryScroller />

      {/* 4. Live Flash Deals Neon Bar (Matching SalonixBD) */}
      {!searchQuery && selectedCategory === 'all' && <FlashDeals />}

      {/* 5. Combo Offers & All-in-One Max Bundle Strip */}
      {!searchQuery && selectedCategory === 'all' && (
        <section className="py-10 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
          <div className="container mx-auto px-4">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-950 p-6 sm:p-10 text-white shadow-xl">
              <div className="relative z-10 max-w-xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase mb-3">
                  <Flame size={14} className="fill-slate-950" />
                  {lang === 'bn' ? 'অল ইন ওয়ান ম্যাক্স কম্বো' : 'All-in-One Max Bundle'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black mb-2.5 leading-tight">
                  {lang === 'bn' ? 'সম্পূর্ণ নতুন সেলুন সেটআপ সুপার প্যাকেজ' : 'Complete Master Salon Launch Package'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 mb-6 leading-relaxed">
                  {lang === 'bn' 
                    ? '২টি হাইড্রোলিক চেয়ার, ১টি হেভি হেয়ার ড্রায়ার, ১টি কেমেই রিচার্জেবল ক্লিপার, ২টি কাঁচি এবং ১টি হেয়ার কালার কিট সহ বিশেষ পাইকারি অফার!'
                    : '2 Hydraulic Chairs, 1 AC Hair Dryer, 1 Kemei Turbo Clipper, 2 Japanese Shears and Hair Color Starter Kit with factory warranty.'}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://wa.me/8801511008100?text=Hello%20SoftDew%2C%20I%20am%20interested%20in%20the%20All-in-One%20Salon%20Setup%20Package"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-400/20 transition-all active:scale-95"
                  >
                    <Phone size={15} />
                    <span>{lang === 'bn' ? 'প্যাকেজ কোটেশন নিন (হোয়াটসঅ্যাপ)' : 'Get Wholesale Quote'}</span>
                  </a>
                  <button
                    onClick={() => {
                      setSelectedCategory('salon-furniture');
                      const prodSection = document.getElementById('products-catalog-section');
                      if (prodSection) prodSection.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all"
                  >
                    {lang === 'bn' ? 'ফার্নিচার দেখুন' : 'Explore Furniture'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. Main Products Catalog Section (All Products, Best Sellers & Brand Filter) */}
      <section id="products-catalog-section" className="py-12">
        <div className="container mx-auto px-4">
          {/* Section Header with Category & Sort Controls */}
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-1">
                <Scissors size={14} />
                <span>{lang === 'bn' ? 'অরিজিনাল সেলুন সামগ্রী' : 'Authentic Salon Equipment'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {selectedCategory === 'all'
                  ? (lang === 'bn' ? 'সবচেয়ে বেশি বিক্রি হয়েছে ও নির্বাচিত পণ্য' : 'Bestsellers & Complete Collection')
                  : (lang === 'bn' ? `${selectedCategory.toUpperCase()} কালেকশন` : `${selectedCategory.toUpperCase()} Selection`)}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {lang === 'bn' 
                  ? `মোট ${toBengaliDigits(sortedProducts.length)} টি ভেরিফাইড সেলুন আইটেম প্রদর্শিত হচ্ছে` 
                  : `Displaying ${sortedProducts.length} verified salon tools & products`}
              </p>
            </div>

            {/* Sort & Filter Controls */}
            <div className="flex items-center gap-2.5">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              >
                <option value="featured">{lang === 'bn' ? 'বাছাইকৃত পণ্য' : 'Sort: Featured'}</option>
                <option value="price-low">{lang === 'bn' ? 'মূল্য: কম থেকে বেশি' : 'Price: Low to High'}</option>
                <option value="price-high">{lang === 'bn' ? 'মূল্য: বেশি থেকে কম' : 'Price: High to Low'}</option>
                <option value="rating">{lang === 'bn' ? 'টপ রেটিং ★' : 'Highest Rated ★'}</option>
              </select>

              {(searchQuery || selectedCategory !== 'all' || selectedBrand !== 'all') && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedBrand('all');
                    setSearchQuery('');
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1 hover:bg-slate-300 transition-colors"
                >
                  <X size={14} />
                  <span>{lang === 'bn' ? 'রিসেট' : 'Reset'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Brand Filter Pills Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 custom-scrollbar text-xs">
            <span className="font-bold text-slate-400 shrink-0 text-[11px] uppercase tracking-wider mr-1">
              {lang === 'bn' ? 'ব্র্যান্ড ফিল্টার:' : 'Filter Brand:'}
            </span>
            <button
              onClick={() => setSelectedBrand('all')}
              className={`px-3 py-1.5 rounded-xl font-semibold shrink-0 transition-all ${
                selectedBrand === 'all'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              {lang === 'bn' ? 'সব ব্র্যান্ড' : 'All Brands'}
            </button>
            {BRANDS.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBrand(b.name)}
                className={`px-3 py-1.5 rounded-xl font-semibold shrink-0 transition-all flex items-center gap-1 ${
                  selectedBrand === b.name
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <span>{b.logo}</span>
                <span>{b.name}</span>
              </button>
            ))}
          </div>

          {/* Active Search / Filter Indicator */}
          {searchQuery && (
            <div className="mb-6 p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/60 flex items-center justify-between text-xs text-teal-900 dark:text-teal-200">
              <span>
                {lang === 'bn' ? 'অনুসন্ধান ফলাফল:' : 'Search results for:'} "<strong>{searchQuery}</strong>" ({sortedProducts.length} matches)
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="font-bold underline ml-2"
              >
                {lang === 'bn' ? 'মুছে ফেলুন' : 'Clear'}
              </button>
            </div>
          )}

          {/* Products Grid */}
          {sortedProducts.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <Scissors size={44} className="text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                {lang === 'bn' ? 'কোনো পণ্য পাওয়া যায়নি' : 'No matching salon items found'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                {lang === 'bn' ? 'অন্য কোনো নাম লিখে সার্চ করুন অথবা অন্য ক্যাটাগরি বেছে নিন।' : 'Try clearing your search query or choosing another category from above.'}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedBrand('all');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs"
              >
                {lang === 'bn' ? 'সব কালেকশন দেখুন' : 'View All Collection'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 7. Brand Partners Grid (SalonixBD: আমাদের ব্র্যান্ড পার্টনার) */}
      <section className="py-12 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider block mb-1">
              {lang === 'bn' ? '১০০% অরিজিনাল ব্র্যান্ড' : 'Direct Manufacturer Partners'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {lang === 'bn' ? 'আমাদের অফিসিয়াল ব্র্যান্ড পার্টনার' : 'Our Trusted Brand Partners'}
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {BRANDS.map((brand) => (
              <div
                key={brand.id}
                onClick={() => {
                  setSelectedBrand(brand.name);
                  const prodSection = document.getElementById('products-catalog-section');
                  if (prodSection) prodSection.scrollIntoView({ behavior: 'smooth' });
                }}
                className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:border-teal-500 hover:shadow-md transition-all cursor-pointer text-center group"
              >
                <div className="text-2xl mb-1.5 group-hover:scale-110 transition-transform">{brand.logo}</div>
                <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 group-hover:text-teal-600 transition-colors">
                  {brand.name}
                </h4>
                <span className="text-[10px] text-slate-400">{brand.origin}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
