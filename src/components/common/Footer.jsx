import React from 'react';
import { Sparkles, Phone, Mail, MapPin, ShieldCheck, Heart, Clock } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Footer = () => {
  const { setActiveView, setSelectedCategory } = useStore();

  return (
    <footer className="site-footer">
      <div className="footer-top-strip">
        <div className="container">
          <div className="strip-grid">
            <div className="strip-item">
              <ShieldCheck className="strip-icon text-emerald" size={24} />
              <div>
                <h5>Hologram Verified</h5>
                <p>Every beauty item carries verifiable batch authenticity codes</p>
              </div>
            </div>
            <div className="strip-item">
              <Sparkles className="strip-icon text-champagne" size={24} />
              <div>
                <h5>Dermatologist Approved</h5>
                <p>Curated clinical formulations safe for all sensitive skin types</p>
              </div>
            </div>
            <div className="strip-item">
              <Clock className="strip-icon text-rose" size={24} />
              <div>
                <h5>24-Hour Express Dispatch</h5>
                <p>Same-day Dhaka deliveries and fast nationwide air-shipping</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-main">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <div className="logo-icon-badge mini">
                <Sparkles size={18} className="text-rose-600" />
              </div>
              <span className="footer-brand-name">Soft-Dew</span>
            </div>
            <p className="footer-description">
              Bangladesh's premier luxury salon boutique and clinical beauty atelier. Bridging professional salon treatments with world-class, 100% authentic skincare and haircare.
            </p>
            <div className="footer-contact-items">
              <div className="contact-item">
                <Phone size={15} className="text-rose" />
                <span>+880 1700-SOFTDEW (763-833)</span>
              </div>
              <div className="contact-item">
                <Mail size={15} className="text-rose" />
                <span>concierge@softdew-beauty.com</span>
              </div>
            </div>
          </div>

          {/* Quick Shop */}
          <div className="footer-col">
            <h4 className="footer-heading">Beauty Categories</h4>
            <ul className="footer-menu">
              <li>
                <button onClick={() => { setActiveView('store'); setSelectedCategory('skincare'); window.scrollTo({ top: 400, behavior: 'smooth' }); }}>
                  Dewy Skincare & Peptides
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('store'); setSelectedCategory('haircare'); window.scrollTo({ top: 400, behavior: 'smooth' }); }}>
                  Salon Keratin & Botox
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('store'); setSelectedCategory('makeup'); window.scrollTo({ top: 400, behavior: 'smooth' }); }}>
                  Silk Foundations & Tints
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('store'); setSelectedCategory('salon-tools'); window.scrollTo({ top: 400, behavior: 'smooth' }); }}>
                  Salon Pro Equipment
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('store'); setSelectedCategory('spa-bath'); window.scrollTo({ top: 400, behavior: 'smooth' }); }}>
                  Organic Spa & Hammam
                </button>
              </li>
            </ul>
          </div>

          {/* Salon Branches */}
          <div className="footer-col">
            <h4 className="footer-heading">Salon Lounges</h4>
            <div className="branch-list">
              <div className="branch-card">
                <strong><MapPin size={13} className="inline mr-1 text-rose" /> Gulshan 2 Flagship</strong>
                <p>Road 45, Avenue Suites, Gulshan-2, Dhaka</p>
              </div>
              <div className="branch-card">
                <strong><MapPin size={13} className="inline mr-1 text-rose" /> Banani Pro Studio</strong>
                <p>Plot 74, Block D, Road 11, Banani, Dhaka</p>
              </div>
              <div className="branch-card">
                <strong><MapPin size={13} className="inline mr-1 text-rose" /> Dhanmondi Pavilion</strong>
                <p>Satmasjid Road, Dhanmondi 27, Dhaka</p>
              </div>
            </div>
          </div>

          {/* Trust and Payment methods */}
          <div className="footer-col">
            <h4 className="footer-heading">Trusted Payments</h4>
            <p className="payment-note">Secure encrypted transactions with instant confirmation:</p>
            <div className="payment-badges-row">
              <span className="pay-tag bkash">bKash</span>
              <span className="pay-tag nagad">Nagad</span>
              <span className="pay-tag card">VISA</span>
              <span className="pay-tag card">Mastercard</span>
              <span className="pay-tag cod">Cash on Delivery</span>
            </div>
            <div className="admin-shortcut-box">
              <button 
                onClick={() => { setActiveView('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="admin-link-btn"
              >
                Access Seller & Admin Dashboard →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Soft-Dew Salon & Beauty Ltd. All rights reserved.</p>
          <p className="made-with">Crafted with <Heart size={13} className="inline text-rose-500 fill-rose" /> for authentic beauty</p>
        </div>
      </div>
    </footer>
  );
};
