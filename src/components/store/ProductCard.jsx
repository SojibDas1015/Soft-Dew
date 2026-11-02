import React from 'react';
import { Heart, Star, ShoppingCart, GitCompareArrows, Eye, Plus, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice, calculateDiscount } from '../../utils/formatters';

export const ProductCard = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    setSelectedProductForDetail,
    currency,
    lang
  } = useStore();

  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);
  const discountPct = calculateDiscount(product.price, product.discountPrice);

  return (
    <div className="group relative bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-teal-500/50 hover:-translate-y-1 transition-all duration-300">
      <div>
        {/* Thumbnail area */}
        <div 
          onClick={() => setSelectedProductForDetail(product)}
          className="relative w-full aspect-square bg-slate-100 dark:bg-slate-900 overflow-hidden cursor-pointer"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
            loading="lazy"
          />

          {/* Discount Tag */}
          {discountPct > 0 && (
            <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-rose-600 text-white font-extrabold text-[11px] shadow-sm">
              -{discountPct}%
            </span>
          )}

          {/* Right Floating Actions Column (Wishlist & Compare) */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
            {/* Wishlist */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product);
              }}
              className="w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 hover:bg-white text-slate-700 dark:text-slate-200 flex items-center justify-center transition-transform active:scale-90 shadow-sm"
              title="Add to Wishlist"
            >
              <Heart
                size={15}
                className={isWishlisted ? 'fill-rose-500 text-rose-500' : ''}
              />
            </button>

            {/* Compare */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleCompare(product);
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-90 shadow-sm ${
                isCompared
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'bg-white/90 dark:bg-slate-900/90 hover:bg-white text-slate-700 dark:text-slate-200'
              }`}
              title="Compare Specifications / পণ্য তুলনা"
            >
              <GitCompareArrows size={15} />
            </button>
          </div>

          {/* Quick View Strip on Hover */}
          <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
            <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 text-[11px] font-bold text-slate-800 dark:text-white flex items-center gap-1 shadow-xs">
              <Eye size={12} />
              <span>{lang === 'bn' ? 'বিস্তারিত দেখুন' : 'Quick View'}</span>
            </span>
          </div>
        </div>

        {/* Content area */}
        <div className="p-3.5">
          {/* Brand & Stock */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 mb-1">
            <span className="font-semibold text-teal-700 dark:text-teal-400 truncate max-w-[120px]">
              {product.brand}
            </span>
            <div className="flex items-center gap-1">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {product.rating || '5.0'}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => setSelectedProductForDetail(product)}
            className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 hover:text-teal-700 dark:hover:text-teal-400 transition-colors cursor-pointer leading-snug mb-2"
          >
            {lang === 'bn' ? product.nameBn || product.name : product.name}
          </h3>

          {/* Price Row */}
          <div className="flex items-baseline gap-2">
            <span className="font-mono font-black text-sm sm:text-base text-teal-800 dark:text-teal-300">
              {formatPrice(product.discountPrice || product.price, currency, lang)}
            </span>
            {product.discountPrice && (
              <span className="font-mono text-xs text-slate-400 line-through">
                {formatPrice(product.price, currency, lang)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer with Quick Add Button */}
      <div className="p-3.5 pt-0">
        <button
          onClick={() => addToCart(product, 1)}
          className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-teal-700 dark:bg-slate-700 dark:hover:bg-teal-700 text-slate-800 hover:text-white dark:text-slate-200 dark:hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-98 shadow-xs"
        >
          <ShoppingCart size={13} />
          <span>{lang === 'bn' ? 'কার্টে যোগ করুন' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
};
