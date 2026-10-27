import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/formatters';

export const WishlistDrawer = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    products,
    toggleWishlist,
    addToCart,
    currency
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="drawer-backdrop" onClick={() => setIsWishlistOpen(false)}>
      <div 
        className="cart-drawer-panel animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-header">
          <div className="flex items-center gap-2">
            <Heart size={18} className="fill-rose text-rose" />
            <h3 className="drawer-title">Saved Items</h3>
            <span className="drawer-count-badge">{wishlist.length}</span>
          </div>
          <button 
            onClick={() => setIsWishlistOpen(false)}
            className="drawer-close-btn"
            aria-label="Close Wishlist"
          >
            <X size={20} />
          </button>
        </div>

        <div className="cart-items-container">
          {wishlistedProducts.length === 0 ? (
            <div className="cart-empty-state">
              <div className="empty-cart-icon">
                <Heart size={44} className="text-rose-300" />
              </div>
              <h4 className="serif text-lg font-bold">Your Wishlist is Empty</h4>
              <p className="text-slate-500 text-xs max-w-xs mx-auto mt-1 mb-4">
                Save your favorite luxury serums, hair treatments, and salon tools to purchase later.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="btn btn-primary btn-sm"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {wishlistedProducts.map((product) => (
                <div key={product.id} className="cart-item-card">
                  <img src={product.image} alt={product.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <div className="flex justify-between items-start gap-1">
                      <div>
                        <span className="cart-item-brand">{product.brand}</span>
                        <h5 className="cart-item-name">{product.name}</h5>
                      </div>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="cart-remove-btn"
                        title="Remove from wishlist"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="cart-item-footer mt-2">
                      <span className="cart-item-subtotal">
                        {formatPrice(product.discountPrice || product.price, currency)}
                      </span>

                      <button
                        onClick={() => {
                          addToCart(product, 1);
                          toggleWishlist(product.id);
                        }}
                        className="btn btn-primary btn-sm"
                      >
                        <ShoppingBag size={14} />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
