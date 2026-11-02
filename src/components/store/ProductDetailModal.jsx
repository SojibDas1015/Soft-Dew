import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ShoppingBag, 
  Heart, 
  Phone, 
  Check, 
  Share2, 
  Sparkles,
  Zap,
  MapPin,
  Banknote
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice, calculateDiscount, toBengaliDigits } from '../../utils/formatters';

export const ProductDetailModal = () => {
  const {
    selectedProductForDetail,
    setSelectedProductForDetail,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCheckoutOpen,
    currency,
    lang,
    showToast
  } = useStore();

  const product = selectedProductForDetail;

  if (!product) return null;

  const [activeImg, setActiveImg] = useState(
    product.gallery && product.gallery.length > 0 ? product.gallery[0] : product.image
  );
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'desc' | 'howToUse'

  const isWishlisted = isInWishlist(product.id);
  const discountPct = calculateDiscount(product.price, product.discountPrice);

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant);
    setSelectedProductForDetail(null);
    setIsCheckoutOpen(true);
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Hello Soft Dew, I want to order this product:\nProduct: ${product.name}\nPrice: BDT ${product.discountPrice || product.price}\nQuantity: ${quantity}\nVariant: ${selectedVariant}`
    );
    window.open(`https://wa.me/8801511008100?text=${text}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on Soft Dew!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast(lang === 'bn' ? 'পণ্য লিঙ্ক কপি করা হয়েছে!' : 'Product link copied!', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setSelectedProductForDetail(null)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 z-10 animate-fade-in max-h-[92vh] overflow-y-auto custom-scrollbar">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductForDetail(null)}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center transition-colors z-20"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Left Column: Image Gallery */}
          <div>
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-3">
              <img
                src={activeImg}
                alt={product.name}
                className="w-full h-full object-cover transition-all"
              />
              {discountPct > 0 && (
                <span className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-rose-600 text-white font-extrabold text-xs shadow-md">
                  -{discountPct}% OFF
                </span>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.gallery.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(imgUrl)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImg === imgUrl
                        ? 'border-teal-600 ring-2 ring-teal-500/20'
                        : 'border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Assurances */}
            <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <ShieldCheck size={16} className="text-teal-600" />
                <span>{lang === 'bn' ? '১০০% অরিজিনাল ও অথেনটিক সেলুন প্রোডাক্ট' : '100% Guaranteed Authentic Importer Stock'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Truck size={16} className="text-teal-600" />
                <span>{lang === 'bn' ? 'ঢাকায় ২৪-৪৮ ঘন্টায় এবং সারা দেশে ৩ দিনে ডেলিভারি' : 'Inside Dhaka 24-48h, Nationwide 2-3 Days'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Banknote size={16} className="text-teal-600" />
                <span>{lang === 'bn' ? 'পণ্য হাতে পেয়ে মূল্য পরিশোধ (ক্যাশ অন ডেলিভারি)' : 'Cash on Delivery Available Nationwide'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Information & Ordering */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Brand, SKU & Share */}
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 font-bold text-xs uppercase tracking-wider">
                  {product.brand}
                </span>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-slate-400">SKU: {product.sku}</span>
                  <button
                    onClick={handleShare}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    title="Share product"
                  >
                    <Share2 size={15} />
                  </button>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug mb-2">
                {lang === 'bn' ? product.nameBn || product.name : product.name}
              </h1>

              {/* Rating & Stock */}
              <div className="flex items-center gap-3 mb-4 text-xs">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star size={14} className="fill-amber-400" />
                  <span>{product.rating || '4.9'}</span>
                  <span className="text-slate-400 font-normal">({product.reviewsCount || 85} reviews)</span>
                </div>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className={`font-semibold ${
                  (product.stock || 0) > 0 ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {(product.stock || 0) > 0 
                    ? (lang === 'bn' ? `স্টকে আছে (${toBengaliDigits(product.stock)}টি)` : `In Stock (${product.stock} units)`)
                    : (lang === 'bn' ? 'স্টক শেষ' : 'Out of Stock')}
                </span>
              </div>

              {/* Pricing Box */}
              <div className="p-4 rounded-2xl bg-teal-50/60 dark:bg-slate-800/80 border border-teal-200/80 dark:border-teal-900/40 mb-5 flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 block">
                    {lang === 'bn' ? 'অফার মূল্য:' : 'Special Price:'}
                  </span>
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono font-black text-2xl text-teal-900 dark:text-teal-200">
                      {formatPrice(product.discountPrice || product.price, currency, lang)}
                    </span>
                    {product.discountPrice && (
                      <span className="font-mono text-sm text-slate-400 line-through">
                        {formatPrice(product.price, currency, lang)}
                      </span>
                    )}
                  </div>
                </div>

                {product.discountPrice && (
                  <span className="px-2.5 py-1 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs">
                    {lang === 'bn' ? `সাশ্রয় ৳${toBengaliDigits(product.price - product.discountPrice)}` : `Save ৳${product.price - product.discountPrice}`}
                  </span>
                )}
              </div>

              {/* Variants Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-4">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                    {lang === 'bn' ? 'ভ্যারিয়েন্ট / সাইজ সিলেক্ট করুন:' : 'Select Variant / Size:'}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          selectedVariant === v
                            ? 'border-teal-600 bg-teal-600 text-white shadow-xs'
                            : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Counter */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {lang === 'bn' ? 'পরিমাণ:' : 'Quantity:'}
                </span>
                <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 rounded-l-xl"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-xs">
                    {lang === 'bn' ? toBengaliDigits(quantity) : quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 rounded-r-xl"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="space-y-2.5 mb-6">
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => addToCart(product, quantity, selectedVariant)}
                    className="py-3 px-4 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-teal-700/20 active:scale-98 transition-all"
                  >
                    <ShoppingBag size={16} />
                    <span>{lang === 'bn' ? 'কার্টে যোগ করুন' : 'Add to Cart'}</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 active:scale-98 transition-all"
                  >
                    <Zap size={16} />
                    <span>{lang === 'bn' ? 'অর্ডার করুন (Buy Now)' : 'Direct Buy Now'}</span>
                  </button>
                </div>

                {/* Direct WhatsApp Order Button */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-2.5 px-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Phone size={15} />
                  <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপে সরাসরি অর্ডার করুন' : 'Order via WhatsApp Chat'}</span>
                </button>
              </div>

              {/* Tab Navigation for Specs & Details */}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                <div className="flex border-b border-slate-200 dark:border-slate-800 gap-4 mb-3 text-xs">
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-2 font-bold transition-colors ${
                      activeTab === 'specs'
                        ? 'border-b-2 border-teal-600 text-teal-700 dark:text-teal-400'
                        : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    {lang === 'bn' ? 'স্পেসিফিকেশন' : 'Technical Specs'}
                  </button>
                  <button
                    onClick={() => setActiveTab('desc')}
                    className={`pb-2 font-bold transition-colors ${
                      activeTab === 'desc'
                        ? 'border-b-2 border-teal-600 text-teal-700 dark:text-teal-400'
                        : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    {lang === 'bn' ? 'বিবরণ' : 'Description'}
                  </button>
                  <button
                    onClick={() => setActiveTab('howToUse')}
                    className={`pb-2 font-bold transition-colors ${
                      activeTab === 'howToUse'
                        ? 'border-b-2 border-teal-600 text-teal-700 dark:text-teal-400'
                        : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    {lang === 'bn' ? 'ব্যবহারবিধি' : 'How to Use'}
                  </button>
                </div>

                {/* Tab Content */}
                <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {activeTab === 'specs' && (
                    <div className="space-y-1.5">
                      {product.specs ? (
                        Object.entries(product.specs).map(([k, v]) => (
                          <div key={k} className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                            <span className="font-semibold text-slate-500 capitalize">{k.replace(/([A-Z])/g, ' $1')}:</span>
                            <span className="text-slate-800 dark:text-slate-200 font-medium">{v}</span>
                          </div>
                        ))
                      ) : (
                        <p>{product.trustNotes || 'High performance salon specification standard.'}</p>
                      )}
                    </div>
                  )}

                  {activeTab === 'desc' && (
                    <p>{lang === 'bn' ? product.description || product.descriptionEn : product.descriptionEn || product.description}</p>
                  )}

                  {activeTab === 'howToUse' && (
                    <p>{product.howToUse || 'Apply as per salon professional instructions for best results.'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
