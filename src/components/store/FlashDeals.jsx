import React, { useState, useEffect } from 'react';
import { Flame, Clock, Sparkles, ShoppingBag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice, calculateDiscount } from '../../utils/formatters';

export const FlashDeals = () => {
  const { products, addToCart, setSelectedProductForDetail, currency } = useStore();

  // Filter flash deal items
  const flashProducts = products.filter((p) => p.isFlashDeal);

  // Live countdown timer state (e.g., 07h : 42m : 18s)
  const [timeLeft, setTimeLeft] = useState({
    hours: 7,
    minutes: 42,
    seconds: 35
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
    <section className="flash-deals-section">
      <div className="container">
        <div className="flash-header-card">
          <div className="flash-title-group">
            <div className="flash-badge">
              <Flame size={14} className="text-amber-500" />
              <span>Special Event • Limited Stock</span>
            </div>
            <h3 className="flash-headline">Clinical Flash Release</h3>
          </div>

          {/* Countdown Clock */}
          <div className="flash-timer-wrapper">
            <span className="timer-label">
              <Clock size={14} className="inline mr-1" /> Ends in:
            </span>
            <div className="timer-boxes">
              <div className="time-box">
                <span className="time-val">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="time-sub">HRS</span>
              </div>
              <span className="time-colon">:</span>
              <div className="time-box">
                <span className="time-val">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="time-sub">MIN</span>
              </div>
              <span className="time-colon">:</span>
              <div className="time-box">
                <span className="time-val">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="time-sub">SEC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Flash Deals Horizontal Carousel/Grid */}
        <div className="flash-products-grid">
          {flashProducts.map((product) => {
            const discountPct = calculateDiscount(product.price, product.discountPrice);
            const remainingPct = Math.min(100, Math.max(15, (product.stock / 50) * 100));

            return (
              <div key={product.id} className="flash-card">
                <div 
                  className="flash-card-img-wrap"
                  onClick={() => setSelectedProductForDetail(product)}
                >
                  <img src={product.image} alt={product.name} className="flash-img" />
                  <span className="flash-discount-tag">-{discountPct}% OFF</span>
                </div>

                <div className="flash-card-body">
                  <span className="flash-brand">{product.brand}</span>
                  <h4 
                    className="flash-prod-title"
                    onClick={() => setSelectedProductForDetail(product)}
                  >
                    {product.name}
                  </h4>

                  <div className="flash-pricing-row">
                    <span className="flash-price-current">
                      {formatPrice(product.discountPrice || product.price, currency)}
                    </span>
                    {product.discountPrice && (
                      <span className="flash-price-orig">
                        {formatPrice(product.price, currency)}
                      </span>
                    )}
                  </div>

                  {/* Stock urgency bar */}
                  <div className="stock-progress-wrap">
                    <div className="stock-bar-track">
                      <div 
                        className="stock-bar-fill" 
                        style={{ width: `${remainingPct}%` }}
                      ></div>
                    </div>
                    <span className="stock-label">
                      Only <strong>{product.stock} units</strong> left
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(product, 1)}
                    className="flash-add-btn"
                  >
                    <ShoppingBag size={15} />
                    <span>Quick Claim</span>
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
