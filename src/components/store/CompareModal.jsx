import React from 'react';
import { X, GitCompareArrows, Trash2, ShoppingCart, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/formatters';

export const CompareModal = () => {
  const {
    isCompareOpen,
    setIsCompareOpen,
    compareList,
    toggleCompare,
    setCompareList,
    addToCart,
    currency,
    lang
  } = useStore();

  if (!isCompareOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsCompareOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 z-10 animate-fade-in max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400 flex items-center justify-center">
              <GitCompareArrows size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {lang === 'bn' ? 'পণ্য তুলনা ম্যাট্রিক্স' : 'Side-by-Side Product Comparison'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'bn' ? 'সেলুন আইটেম ও ইকুইপমেন্টের স্পেসিফিকেশন ও মূল্য তুলনা করুন' : 'Compare technical specs, motor speed, steel quality, and pricing'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {compareList.length > 0 && (
              <button
                onClick={() => setCompareList([])}
                className="text-xs text-rose-500 hover:text-rose-600 font-semibold px-2 py-1 rounded-md"
              >
                {lang === 'bn' ? 'সব মুছুন' : 'Clear All'}
              </button>
            )}
            <button
              onClick={() => setIsCompareOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {compareList.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 mt-6">
            <GitCompareArrows size={36} className="text-slate-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {lang === 'bn' ? 'তুলনা করার তালিকায় কোনো পণ্য নেই' : 'No items added for comparison yet'}
            </p>
            <p className="text-[11px] text-slate-400 mt-1 max-w-sm mx-auto">
              {lang === 'bn' ? 'প্রোডাক্ট কার্ডের কম্পেয়ার আইকনে ক্লিক করে সর্বোচ্চ ৪টি পণ্য একসাথে তুলনা করতে পারবেন।' : 'Tap the compare icon on product cards to add them to this side-by-side spec matrix.'}
            </p>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="p-3 font-bold text-slate-400 uppercase tracking-wider w-36">
                    {lang === 'bn' ? 'বৈশিষ্ট্য' : 'Feature'}
                  </th>
                  {compareList.map((p) => (
                    <th key={p.id} className="p-3 min-w-[200px] align-top">
                      <div className="relative group">
                        <button
                          onClick={() => toggleCompare(p)}
                          className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center hover:bg-rose-200 transition-colors shadow-xs"
                          title="Remove from compare"
                        >
                          <Trash2 size={12} />
                        </button>
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-24 h-24 rounded-xl object-cover mx-auto mb-2 border border-slate-200 dark:border-slate-700"
                        />
                        <p className="font-bold text-slate-900 dark:text-white line-clamp-2 text-center text-xs">
                          {lang === 'bn' ? p.nameBn || p.name : p.name}
                        </p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {/* Price */}
                <tr>
                  <td className="p-3 font-semibold text-slate-500">
                    {lang === 'bn' ? 'মূল্য' : 'Price'}
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-3 font-mono font-bold text-teal-700 dark:text-teal-400 text-sm">
                      {formatPrice(p.discountPrice || p.price, currency, lang)}
                      {p.discountPrice && (
                        <span className="text-[11px] text-slate-400 line-through ml-1.5 font-normal">
                          {formatPrice(p.price, currency, lang)}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Brand */}
                <tr>
                  <td className="p-3 font-semibold text-slate-500">
                    {lang === 'bn' ? 'ব্র্যান্ড' : 'Brand'}
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-3 font-medium text-slate-800 dark:text-slate-200">
                      {p.brand}
                    </td>
                  ))}
                </tr>

                {/* Rating */}
                <tr>
                  <td className="p-3 font-semibold text-slate-500">
                    {lang === 'bn' ? 'রেটিং' : 'Rating'}
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-3">
                      <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-bold text-[11px]">
                        ★ {p.rating || '5.0'} ({p.reviewsCount || 40}+)
                      </span>
                    </td>
                  ))}
                </tr>

                {/* SKU */}
                <tr>
                  <td className="p-3 font-semibold text-slate-500">SKU Code</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-3 font-mono text-[11px] text-slate-500">
                      {p.sku}
                    </td>
                  ))}
                </tr>

                {/* Stock Status */}
                <tr>
                  <td className="p-3 font-semibold text-slate-500">
                    {lang === 'bn' ? 'স্টক অবস্থা' : 'Stock'}
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        (p.stock || 0) > 0 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' 
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300'
                      }`}>
                        {(p.stock || 0) > 0 ? (lang === 'bn' ? `স্টকে আছে (${p.stock})` : `In Stock (${p.stock})`) : (lang === 'bn' ? 'স্টক শেষ' : 'Out of Stock')}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Technical Specs Key Highlights */}
                <tr>
                  <td className="p-3 font-semibold text-slate-500">
                    {lang === 'bn' ? 'স্পেক্স নোটস' : 'Key Specs'}
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-3 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {p.trustNotes || 'High performance salon pro specification'}
                    </td>
                  ))}
                </tr>

                {/* Action CTA */}
                <tr>
                  <td className="p-3 font-semibold text-slate-500">
                    {lang === 'bn' ? 'অ্যাকশন' : 'Action'}
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-3">
                      <button
                        onClick={() => {
                          addToCart(p, 1);
                        }}
                        className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm transition-all"
                      >
                        <ShoppingCart size={13} />
                        <span>{lang === 'bn' ? 'কার্টে যোগ' : 'Add to Cart'}</span>
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
