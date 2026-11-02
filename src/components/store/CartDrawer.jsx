import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Tag, 
  Sparkles,
  Check
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice, toBengaliDigits } from '../../utils/formatters';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    setIsCheckoutOpen,
    currency,
    lang,
    showToast
  } = useStore();

  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [promoDiscountAmount, setPromoDiscountAmount] = useState(0);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 2500;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;
  const shippingFee = cart.length === 0 ? 0 : (isFreeShipping ? 0 : 60);
  const progressPct = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'SALON10' || clean === 'SOFTDEW10') {
      const discount = Math.round(cartSubtotal * 0.1);
      setDiscountApplied(true);
      setPromoDiscountAmount(discount);
      showToast(lang === 'bn' ? '🎉 ১০% প্রোমোকোড সফলভাবে প্রয়োগ করা হয়েছে!' : '10% discount applied!', 'success');
    } else {
      showToast(lang === 'bn' ? 'ভুল কুপন কোড! "SALON10" ট্রাই করুন।' : 'Invalid promo. Try "SALON10"', 'error');
    }
  };

  const finalTotal = Math.max(0, cartSubtotal + shippingFee - promoDiscountAmount);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Drawer Panel */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col z-10 animate-slide-left border-l border-slate-200 dark:border-slate-800">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-teal-700 dark:text-teal-400" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              {lang === 'bn' ? 'আপনার শপিং কার্ট' : 'Shopping Cart'}
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-mono text-xs font-bold">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Delivery Meter */}
        <div className="p-3.5 bg-teal-50 dark:bg-teal-950/40 border-b border-teal-100 dark:border-teal-900/40 text-xs">
          <div className="flex items-center justify-between mb-1.5 font-medium text-teal-900 dark:text-teal-200">
            <span className="flex items-center gap-1.5">
              <Truck size={14} className="text-teal-600" />
              {isFreeShipping ? (
                <strong className="text-emerald-600 dark:text-emerald-400">
                  {lang === 'bn' ? '🎉 অভিনন্দন! আপনি ফ্রি ডেলিভারি পাচ্ছেন!' : 'You unlocked FREE Nationwide Delivery!'}
                </strong>
              ) : (
                <span>
                  {lang === 'bn' ? (
                    <>আর মাত্র <strong>{formatPrice(amountNeeded, currency, lang)}</strong> যোগ করলে ফ্রি ডেলিভারি!</>
                  ) : (
                    <>Add <strong>{formatPrice(amountNeeded, currency, lang)}</strong> more for <strong>FREE Delivery</strong></>
                  )}
                </span>
              )}
            </span>
            <span className="font-mono font-bold text-teal-700">{progressPct}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-teal-200 dark:bg-teal-900 overflow-hidden">
            <div
              className="h-full bg-teal-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag size={42} className="text-slate-300 mx-auto mb-3" />
              <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm">
                {lang === 'bn' ? 'আপনার কার্ট এখন খালি' : 'Your cart is empty'}
              </h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1 mb-4">
                {lang === 'bn' ? 'সেলুনের প্রয়োজনীয় কাঁচি, ট্রিমার বা হেয়ার কালার আইটেম কার্টে যোগ করুন।' : 'Add scissors, trimmers, hair colors, or furniture from our catalog.'}
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs"
              >
                {lang === 'bn' ? 'কেনাকাটা শুরু করুন' : 'Start Shopping'}
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartItemId}
                className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center gap-3 relative group"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                      {lang === 'bn' ? item.nameBn || item.name : item.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  <span className="text-[11px] text-slate-400 block mb-1.5">{item.variant}</span>

                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-teal-800 dark:text-teal-300">
                      {formatPrice(item.effectivePrice * item.quantity, currency, lang)}
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800">
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-l-md font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="w-7 text-center font-mono text-xs font-bold">
                        {lang === 'bn' ? toBengaliDigits(item.quantity) : item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-r-md font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Checkout Section */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder={lang === 'bn' ? "কুপন কোড (যেমন: SALON10)" : "Promo code (try SALON10)"}
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white uppercase focus:outline-none"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs"
              >
                {lang === 'bn' ? 'প্রয়োগ' : 'Apply'}
              </button>
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex justify-between">
                <span>{lang === 'bn' ? 'সাবটোটাল:' : 'Subtotal:'}</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                  {formatPrice(cartSubtotal, currency, lang)}
                </span>
              </div>

              {discountApplied && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>{lang === 'bn' ? 'কুপন ছাড় (১০%):' : 'Promo Discount (10%):'}</span>
                  <span className="font-mono">
                    -{formatPrice(promoDiscountAmount, currency, lang)}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span>{lang === 'bn' ? 'ডেলিভারি চার্জ:' : 'Delivery Fee:'}</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                  {shippingFee === 0 ? (lang === 'bn' ? 'ফ্রি' : 'FREE') : formatPrice(shippingFee, currency, lang)}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between text-sm font-bold text-slate-900 dark:text-white">
                <span>{lang === 'bn' ? 'সর্বমোট প্রদেয়:' : 'Total Payable:'}</span>
                <span className="font-mono text-teal-700 dark:text-teal-400 text-base">
                  {formatPrice(finalTotal, currency, lang)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 px-4 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-700/20 active:scale-98 transition-all"
            >
              <span>{lang === 'bn' ? 'চেকআউট করুন (ক্যাশ অন ডেলিভারি)' : 'Proceed to Checkout'}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
