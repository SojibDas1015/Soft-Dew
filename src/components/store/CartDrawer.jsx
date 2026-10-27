import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Tag, 
  Sparkles 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/formatters';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    freeShippingThreshold,
    isFreeShipping,
    shippingFee,
    cartTotal,
    setIsCheckoutOpen,
    currency,
    showToast
  } = useStore();

  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [promoDiscountAmount, setPromoDiscountAmount] = useState(0);

  if (!isCartOpen) return null;

  // Free shipping progress calculation
  const progressPct = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'SOFTDEW10') {
      const discount = Math.round(cartSubtotal * 0.1);
      setDiscountApplied(true);
      setPromoDiscountAmount(discount);
      showToast('🎉 Promo code SOFTDEW10 applied! 10% discount subtracted.', 'success');
    } else {
      showToast('Invalid promo code. Try "SOFTDEW10"', 'error');
    }
  };

  const finalTotal = Math.max(0, cartTotal - promoDiscountAmount);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="drawer-backdrop" onClick={() => setIsCartOpen(false)}>
      <div 
        className="cart-drawer-panel animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} />
            <h3 className="drawer-title">Review Bag</h3>
            <span className="drawer-count-badge">{cart.reduce((s, i) => s + i.quantity, 0)}</span>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="drawer-close-btn"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="shipping-progress-banner">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            <span className="flex items-center gap-1 text-slate-700">
              <Truck size={14} className="text-rose-600" />
              {isFreeShipping ? (
                <strong className="text-emerald font-semibold">
                  You unlocked FREE VIP Express Shipping!
                </strong>
              ) : (
                <span>
                  Add <strong>{formatPrice(amountNeeded, currency)}</strong> more for <strong>FREE Delivery</strong>
                </span>
              )}
            </span>
            <span className="font-mono text-slate-500">{progressPct}%</span>
          </div>
          <div className="progress-track">
            <div 
              className={`progress-bar ${isFreeShipping ? 'complete' : ''}`}
              style={{ width: `${progressPct}%` }}
            ></div>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="cart-items-container">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <div className="empty-cart-icon">
                <ShoppingBag size={48} className="text-rose-300" />
              </div>
              <h4 className="serif text-lg font-bold">Your bag is empty</h4>
              <p className="text-slate-500 text-xs max-w-xs mx-auto mt-1 mb-4">
                Explore our authentic salon serums, hair botox, and luxury skincare cosmetics.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn btn-primary btn-sm"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.cartItemId} className="cart-item-card">
                  <img src={item.image} alt={item.name} className="cart-item-img" />

                  <div className="cart-item-details">
                    <div className="flex justify-between items-start gap-1">
                      <div>
                        <span className="cart-item-brand">{item.brand}</span>
                        <h5 className="cart-item-name">{item.name}</h5>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="cart-remove-btn"
                        title="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    {item.variant && (
                      <span className="cart-item-variant">Option: {item.variant}</span>
                    )}

                    <div className="cart-item-footer">
                      <div className="cart-qty-stepper">
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                          className="qty-btn"
                        >
                          -
                        </button>
                        <span className="qty-number">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                          className="qty-btn"
                        >
                          +
                        </button>
                      </div>

                      <div className="cart-item-pricing">
                        <span className="cart-item-subtotal">
                          {formatPrice(item.effectivePrice * item.quantity, currency)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Drawer Footer: Voucher, Calculations, Checkout CTA */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="promo-form">
              <div className="promo-input-box">
                <Tag size={15} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Promo Code (SOFTDEW10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="promo-input"
                />
              </div>
              <button type="submit" className="btn btn-outline btn-sm">
                Apply
              </button>
            </form>

            {discountApplied && (
              <div className="discount-applied-pill">
                <Sparkles size={13} className="text-emerald" />
                <span>10% VIP Voucher Applied (-{formatPrice(promoDiscountAmount, currency)})</span>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="summary-lines">
              <div className="summary-line">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-medium">{formatPrice(cartSubtotal, currency)}</span>
              </div>
              {discountApplied && (
                <div className="summary-line text-emerald font-medium">
                  <span>Voucher Discount</span>
                  <span>-{formatPrice(promoDiscountAmount, currency)}</span>
                </div>
              )}
              <div className="summary-line">
                <span className="text-slate-600">Standard Shipping</span>
                <span className="font-medium">
                  {isFreeShipping ? (
                    <span className="text-emerald font-bold">FREE</span>
                  ) : (
                    formatPrice(shippingFee, currency)
                  )}
                </span>
              </div>
              <div className="summary-line total-line">
                <span className="text-base font-bold">Estimated Total</span>
                <span className="text-lg font-bold text-rose-600">
                  {formatPrice(finalTotal, currency)}
                </span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={handleProceedToCheckout}
              className="btn btn-primary btn-checkout w-full"
            >
              <span>Proceed to Secure Checkout</span>
              <ArrowRight size={17} />
            </button>

            {/* Trust badge note */}
            <div className="cart-trust-footer">
              <ShieldCheck size={14} className="text-emerald inline mr-1" />
              <span>100% Authentic Guaranteed • Cash On Delivery & bKash Available</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
