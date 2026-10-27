import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ShoppingBag, 
  Heart, 
  Check, 
  Sparkles,
  Zap,
  Share2
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice, calculateDiscount } from '../../utils/formatters';

export const ProductDetailModal = () => {
  const {
    selectedProductForDetail,
    setSelectedProductForDetail,
    addToCart,
    wishlist,
    toggleWishlist,
    setIsCheckoutOpen,
    currency,
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
  const [activeTab, setActiveTab] = useState('description'); // 'description' | 'ingredients' | 'howToUse' | 'trust'

  const isWishlisted = wishlist.includes(product.id);
  const discountPct = calculateDiscount(product.price, product.discountPrice);

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant);
    setSelectedProductForDetail(null);
    setIsCheckoutOpen(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on Soft-Dew Salon & Beauty!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => setSelectedProductForDetail(null)}>
      <div 
        className="modal-container product-detail-modal animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={() => setSelectedProductForDetail(null)}
          className="modal-close-btn"
          aria-label="Close details"
        >
          <X size={20} />
        </button>

        <div className="detail-grid">
          {/* Left: Image Gallery */}
          <div className="detail-media-col">
            <div className="detail-main-img-box">
              <img src={activeImg} alt={product.name} className="detail-main-img" />
              {product.badge && (
                <div className="detail-badge-pill">
                  <ShieldCheck size={14} className="inline mr-1 text-emerald" />
                  <span>{product.badge}</span>
                </div>
              )}
            </div>

            {/* Thumbnails row */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="detail-thumbs-row">
                {product.gallery.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(imgUrl)}
                    className={`thumb-btn ${activeImg === imgUrl ? 'active' : ''}`}
                  >
                    <img src={imgUrl} alt={`Thumb ${i}`} />
                  </button>
                ))}
              </div>
            )}

            {/* Authenticity Guarantee Card */}
            <div className="detail-trust-card glass-panel">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={18} className="text-emerald" />
                <strong className="text-emerald text-sm">Soft-Dew Authenticity Guarantee</strong>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {product.trustNotes || 'Direct from certified laboratory importers. Micro-hologram seal and batch inspection code guaranteed.'}
              </p>
            </div>
          </div>

          {/* Right: Product Meta, Variants, Actions */}
          <div className="detail-info-col">
            <div className="detail-header-row">
              <span className="detail-brand-badge">{product.brand}</span>
              <button onClick={handleShare} className="detail-share-btn" title="Share product">
                <Share2 size={16} />
              </button>
            </div>

            <h2 className="detail-title">{product.name}</h2>

            {/* Ratings & SKU */}
            <div className="detail-meta-line">
              <div className="detail-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                ))}
                <span className="detail-rating-text">{product.rating || '5.0'}</span>
                <span className="detail-reviews-count">({product.reviewsCount || 120} verified reviews)</span>
              </div>
              <span className="detail-sku">SKU: {product.sku}</span>
            </div>

            {/* Price Box */}
            <div className="detail-pricing-box">
              <div className="detail-prices">
                <span className="detail-current-price">
                  {formatPrice(product.discountPrice || product.price, currency)}
                </span>
                {product.discountPrice && (
                  <span className="detail-orig-price">
                    {formatPrice(product.price, currency)}
                  </span>
                )}
              </div>
              {discountPct > 0 && (
                <span className="detail-save-badge">Save {discountPct}%</span>
              )}
            </div>

            {/* In-Stock & Dispatch Status */}
            <div className="detail-stock-alert">
              <div className="stock-dot"></div>
              <span>
                <strong>In Stock</strong> ({product.stock} units left) • Dispatches within 24 Hours
              </span>
            </div>

            {/* Variants / Shades Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="detail-variants-section">
                <label className="variants-label">
                  Select Specification / Shade: <strong>{selectedVariant}</strong>
                </label>
                <div className="variants-options-grid">
                  {product.variants.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedVariant(v)}
                      className={`variant-option-chip ${selectedVariant === v ? 'active' : ''}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Main Buttons */}
            <div className="detail-actions-section">
              <div className="quantity-stepper">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="step-btn"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="qty-value">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="step-btn"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantity, selectedVariant)}
                className="btn btn-primary btn-add-bag"
              >
                <ShoppingBag size={18} />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`btn btn-icon-round ${isWishlisted ? 'wishlisted' : ''}`}
                title="Save to Wishlist"
              >
                <Heart size={20} className={isWishlisted ? 'fill-rose text-rose' : ''} />
              </button>
            </div>

            {/* Direct Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="btn btn-buy-now"
            >
              <Zap size={18} className="text-amber-400" />
              <span>Instant Buy with 1-Click</span>
            </button>

            {/* Delivery & Returns Mini Badges */}
            <div className="detail-perks-strip">
              <div className="perk-item">
                <Truck size={16} className="text-rose" />
                <span>Free delivery over ৳2,500</span>
              </div>
              <div className="perk-item">
                <RotateCcw size={16} className="text-rose" />
                <span>7 Days Hassle-Free Return</span>
              </div>
            </div>

            {/* Information Tabs: Description, Ingredients, How to Use */}
            <div className="detail-tabs-wrapper">
              <div className="detail-tabs-header">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`tab-link ${activeTab === 'description' ? 'active' : ''}`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`tab-link ${activeTab === 'ingredients' ? 'active' : ''}`}
                >
                  Key Ingredients
                </button>
                <button
                  onClick={() => setActiveTab('howToUse')}
                  className={`tab-link ${activeTab === 'howToUse' ? 'active' : ''}`}
                >
                  Salon Expert Tips
                </button>
              </div>

              <div className="detail-tab-pane">
                {activeTab === 'description' && (
                  <p className="tab-text">{product.description}</p>
                )}
                {activeTab === 'ingredients' && (
                  <div className="ingredients-box">
                    <p className="tab-text mb-2"><strong>Dermatologist active formula:</strong></p>
                    <p className="tab-text text-slate-700">{product.ingredients || 'Hydrolyzed Marine Peptides, Niacinamide, Pure Plant Botanicals, Hyaluronic Acid.'}</p>
                  </div>
                )}
                {activeTab === 'howToUse' && (
                  <div className="usage-box">
                    <p className="tab-text mb-2"><strong>Professional Application Steps:</strong></p>
                    <p className="tab-text text-slate-700">{product.howToUse || 'Use on clean skin. Gently tap into skin with upward movements. Suitable for morning and night routines.'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
