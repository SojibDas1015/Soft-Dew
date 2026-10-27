import React from 'react';
import { Store, Scissors, Sparkles, ShoppingBag, LayoutDashboard } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const MobileBottomNav = () => {
  const {
    activeView,
    setActiveView,
    cartCount,
    setIsCartOpen,
    setIsQuizOpen
  } = useStore();

  return (
    <div className="mobile-bottom-dock">
      <div className="dock-container">
        {/* Shop */}
        <button
          onClick={() => { setActiveView('store'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`dock-btn ${activeView === 'store' ? 'active' : ''}`}
        >
          <div className="dock-icon-wrap">
            <Store size={20} />
          </div>
          <span className="dock-label">Shop</span>
        </button>

        {/* Salon Services */}
        <button
          onClick={() => { setActiveView('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`dock-btn ${activeView === 'services' ? 'active' : ''}`}
        >
          <div className="dock-icon-wrap">
            <Scissors size={20} />
          </div>
          <span className="dock-label">Services</span>
        </button>

        {/* Beauty Quiz Center button */}
        <button
          onClick={() => setIsQuizOpen(true)}
          className="dock-center-action-btn"
          aria-label="Skin Diagnostic Quiz"
        >
          <div className="center-action-glow">
            <Sparkles size={22} className="text-white" />
          </div>
          <span className="dock-center-label">Skin Quiz</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="dock-btn"
        >
          <div className="dock-icon-wrap">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="dock-badge">{cartCount}</span>
            )}
          </div>
          <span className="dock-label">Bag</span>
        </button>

        {/* Dashboard */}
        <button
          onClick={() => { setActiveView('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`dock-btn ${activeView === 'dashboard' ? 'active' : ''}`}
        >
          <div className="dock-icon-wrap">
            <LayoutDashboard size={20} />
          </div>
          <span className="dock-label">Admin</span>
        </button>
      </div>
    </div>
  );
};
