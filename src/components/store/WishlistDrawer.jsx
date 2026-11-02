import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/formatters';

export const WishlistDrawer = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    currency,
    lang
  } = useStore();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col z-10 animate-slide-left border-l border-slate-200 dark:border-slate-800">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2">
            <Heart size={18} className="fill-rose-500 text-rose-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              {lang === 'bn' ? 'সংরক্ষিত পণ্য (উইশলিস্ট)' : 'Saved Items (Wishlist)'}
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-mono text-xs font-bold">
              {wishlist.length}
            </span>
          </div>
          <button 
            onClick={() => setIsWishlistOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {wishlist.length === 0 ? (
            <div className="text-center py-16">
              <Heart size={44} className="text-slate-300 mx-auto mb-3" />
              <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm">
                {lang === 'bn' ? 'আপনার উইশলিস্ট খালি' : 'Your Wishlist is Empty'}
              </h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1 mb-4">
                {lang === 'bn' ? 'পণ্য কার্ডের হার্ট আইকনে ক্লিক করে পছন্দের সেলুন আইটেম সংরক্ষণ করুন।' : 'Save your favorite salon items by clicking the heart button on product cards.'}
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs"
              >
                {lang === 'bn' ? 'ক্যাটালগ দেখুন' : 'Explore Catalog'}
              </button>
            </div>
          ) : (
            wishlist.map((product) => (
              <div 
                key={product.id} 
                className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center gap-3 relative"
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700" 
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-1">
                    <h5 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                      {lang === 'bn' ? product.nameBn || product.name : product.name}
                    </h5>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                      title="Remove from wishlist"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  <span className="text-[11px] text-teal-700 dark:text-teal-400 font-semibold block mb-1">
                    {product.brand}
                  </span>

                  <div className="flex justify-between items-center mt-2">
                    <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">
                      {formatPrice(product.discountPrice || product.price, currency, lang)}
                    </span>

                    <button
                      onClick={() => {
                        addToCart(product, 1);
                        toggleWishlist(product);
                      }}
                      className="px-3 py-1 rounded-xl bg-teal-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs"
                    >
                      <ShoppingBag size={12} />
                      <span>{lang === 'bn' ? 'কার্টে নিন' : 'Move to Bag'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
