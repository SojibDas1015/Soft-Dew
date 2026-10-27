import React from 'react';
import { Heart, Star, ShoppingBag, Eye, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice, calculateDiscount } from '../../utils/formatters';

export const ProductCard = ({ product }) => {
  const {
    addToCart,
    wishlist,
    toggleWishlist,
    setSelectedProductForDetail,
    currency
  } = useStore();

  const isWishlisted = wishlist.includes(product.id);
  const discountPct = calculateDiscount(product.price, product.discountPrice);

  const getBadgeStyle = (badge) => {
    switch (badge) {
      case '100% Authentic':
        return 'badge-authentic';
      case 'Salon Pro Grade':
        return 'badge-salon';
      case 'Derm Tested':
        return 'badge-derm';
      case 'Best Seller':
        return 'badge-bestseller';
      default:
        return 'badge-default';
    }
  };

  return (
    <div className="product-card">
      {/* Thumbnail area with Badges & Wishlist button */}
      <div className="card-thumb-area">
        <div 
          className="thumb-click-layer"
          onClick={() => setSelectedProductForDetail(product)}
        >
          <img
            src={product.image}
            alt={product.name}
            className="product-main-img"
            loading="lazy"
          />
        </div>

        {/* Top Left: Authentic / Certification Badge */}
        {product.badge && (
          <div className={`card-badge ${getBadgeStyle(product.badge)}`}>
            <span>{product.badge}</span>
          </div>
        )}

        {/* Top Right: Discount Percentage */}
        {discountPct > 0 && (
          <span className="card-discount-pill">-{discountPct}%</span>
        )}

        {/* Wishlist Icon Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          title="Save to Wishlist"
        >
          <Heart 
            size={15} 
            className={isWishlisted ? 'fill-rose text-rose' : 'text-slate-500'} 
          />
        </button>

        {/* Quick View Floating Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProductForDetail(product);
          }}
          className="card-quick-view-btn"
          title="Quick View"
        >
          <Eye size={13} />
          <span>Quick Look</span>
        </button>
      </div>

      {/* Product Content Details */}
      <div className="card-content-area">
        <div className="card-brand-row">
          <span className="card-brand">{product.brand}</span>
          <div className="card-rating">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            <span>{product.rating || '5.0'}</span>
          </div>
        </div>

        <h3 
          className="card-title"
          onClick={() => setSelectedProductForDetail(product)}
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Skin Type / Category Pill */}
        {product.skinType && product.skinType.length > 0 && (
          <div className="card-specs-row">
            <span className="card-spec-tag">{product.skinType[0]}</span>
            {product.variants && product.variants.length > 1 && (
              <span className="card-spec-tag muted">
                {product.variants.length} sizes
              </span>
            )}
          </div>
        )}

        {/* Price & Add to Bag row */}
        <div className="card-footer-row">
          <div className="card-pricing">
            <span className="card-price-current">
              {formatPrice(product.discountPrice || product.price, currency)}
            </span>
            {product.discountPrice && (
              <span className="card-price-original">
                {formatPrice(product.price, currency)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="card-add-btn"
            title="Add to Shopping Bag"
            aria-label="Add to Bag"
          >
            <span>Buy</span>
          </button>
        </div>
      </div>
    </div>
  );
};
