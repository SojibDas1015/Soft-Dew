import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  ShoppingBag, 
  Heart, 
  LayoutDashboard, 
  Scissors, 
  Store,
  X,
  Menu
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/formatters';

export const Navbar = () => {
  const {
    activeView,
    setActiveView,
    cartCount,
    cartSubtotal,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    setIsQuizOpen,
    searchQuery,
    setSearchQuery,
    currency,
    setCurrency
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="site-header">
      {/* Top Apple Announcement Ribbon */}
      <div className="announcement-bar">
        <div className="container announcement-inner">
          <div className="announcement-item">
            <span>Special Offer: Use code <strong>SOFTDEW10</strong> for 10% off clinical beauty & salon services.</span>
          </div>
          <div className="announcement-links">
            <span className="announcement-contact">
              Concierge: <strong>+880 1700-SOFTDEW</strong>
            </span>
            <button
              onClick={() => setCurrency(currency === 'BDT' ? 'USD' : 'BDT')}
              className="currency-toggle-btn"
              title="Toggle Currency"
            >
              {currency}
            </button>
          </div>
        </div>
      </div>

      {/* Main Apple Translucent Navbar */}
      <nav className="main-nav">
        <div className="container nav-content">
          {/* Logo */}
          <div className="logo-wrapper" onClick={() => { setActiveView('store'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="logo-icon-badge">
              <Sparkles size={16} />
            </div>
            <div className="logo-text-group">
              <span className="brand-name">Soft-Dew</span>
              <span className="brand-tagline">Clinical Atelier</span>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="search-bar-wrapper">
            <div className="search-input-box">
              <Search size={14} className="search-icon" />
              <input
                type="text"
                placeholder="Search peptide serums, salon keratin, silk foundations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="search-clear-btn"
                  title="Clear search"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="nav-links desktop-only">
            <button
              onClick={() => setActiveView('store')}
              className={`nav-link ${activeView === 'store' ? 'active' : ''}`}
            >
              <span>Store</span>
            </button>

            <button
              onClick={() => setActiveView('services')}
              className={`nav-link ${activeView === 'services' ? 'active' : ''}`}
            >
              <span>Salon Services</span>
            </button>

            <button
              onClick={() => setIsQuizOpen(true)}
              className="nav-link quiz-highlight-btn"
            >
              <span>Skin Quiz</span>
            </button>

            {/* Switch to Admin Dashboard */}
            <button
              onClick={() => setActiveView('dashboard')}
              className={`dashboard-switcher-btn ${activeView === 'dashboard' ? 'active' : ''}`}
            >
              <LayoutDashboard size={14} />
              <span>Studio Admin</span>
            </button>
          </div>

          {/* User Action Icons */}
          <div className="nav-actions">
            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="action-icon-btn"
              title="Saved Items"
              aria-label="Wishlist"
            >
              <Heart size={18} className={wishlist.length > 0 ? "fill-rose text-rose" : ""} />
              {wishlist.length > 0 && (
                <span className="icon-badge">{wishlist.length}</span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="cart-trigger-btn"
              title="Shopping Bag"
              aria-label="Shopping Bag"
            >
              <div className="cart-icon-wrap">
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="icon-badge">{cartCount}</span>
                )}
              </div>
              <div className="cart-total-text desktop-only">
                <span className="cart-amount">{formatPrice(cartSubtotal, currency)}</span>
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Row (Visible on small screens) */}
        <div className="mobile-search-row">
          <div className="container">
            <div className="search-input-box mobile-search-box">
              <Search size={14} className="search-icon" />
              <input
                type="text"
                placeholder="Search formulations & treatments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="search-clear-btn">
                  <X size={13} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="mobile-dropdown-menu animate-fade-in">
            <button
              onClick={() => { setActiveView('store'); setMobileMenuOpen(false); }}
              className={`mobile-nav-item ${activeView === 'store' ? 'active' : ''}`}
            >
              <Store size={16} />
              <span>Explore Collection</span>
            </button>
            <button
              onClick={() => { setActiveView('services'); setMobileMenuOpen(false); }}
              className={`mobile-nav-item ${activeView === 'services' ? 'active' : ''}`}
            >
              <Scissors size={16} />
              <span>Salon & Parlor Appointments</span>
            </button>
            <button
              onClick={() => { setIsQuizOpen(true); setMobileMenuOpen(false); }}
              className="mobile-nav-item"
            >
              <Sparkles size={16} />
              <span>Skin & Hair Diagnostic Quiz</span>
            </button>
            <button
              onClick={() => { setActiveView('dashboard'); setMobileMenuOpen(false); }}
              className={`mobile-nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
            >
              <LayoutDashboard size={16} />
              <span>Studio & Inventory Dashboard</span>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};
