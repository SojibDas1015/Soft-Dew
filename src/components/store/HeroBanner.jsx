import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Star, ChevronRight, Award } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const HeroBanner = () => {
  const { setActiveView, setIsQuizOpen, setSelectedProductForDetail, products } = useStore();

  const featuredProduct = products.find((p) => p.isFeatured) || products[0];

  return (
    <section className="hero-banner-section">
      <div className="container hero-container">
        {/* Left Column: Apple Headline & Action Links */}
        <div className="hero-content">
          <div className="hero-badge animate-fade-in">
            <span>New • The 2026 Clinical Collection</span>
          </div>

          <h1 className="hero-title">
            Soft-Dew Atelier.<br />
            Pure. Clinical. Luminous.
          </h1>

          <p className="hero-subtitle">
            Cellular-grade Korean peptide serums, formaldehyde-free hair botox, and bespoke salon artistry. Guaranteed 100% authentic with verifiable batch holograms.
          </p>

          {/* Action CTAs: Apple Primary Pill + Apple Chevron Link */}
          <div className="hero-actions">
            <a 
              href="#products-section" 
              className="btn btn-primary"
            >
              <span>Explore Collection</span>
            </a>

            <button 
              onClick={() => setActiveView('services')} 
              className="btn btn-outline"
            >
              <span>Salon Services</span>
              <ChevronRight size={15} />
            </button>

            <button 
              onClick={() => setIsQuizOpen(true)} 
              className="btn btn-soft"
            >
              <span>Skin Diagnostic Quiz</span>
              <ChevronRight size={15} />
            </button>
          </div>

          {/* Social Proof / Apple Spec Counter */}
          <div className="hero-stats-row">
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Clients in Bangladesh</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Hologram Verified</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number flex items-center">
                <span>4.9</span>
                <Star size={14} className="fill-amber-400 text-amber-400 inline ml-1" />
              </div>
              <div className="stat-label">Clinical Rating</div>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual with Apple Floating Cards */}
        <div className="hero-visual-wrapper">
          <div className="hero-image-frame">
            <img 
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=85" 
              alt="Soft-Dew Atelier" 
              className="hero-main-img"
            />
            <div className="hero-image-overlay"></div>

            {/* Floating Trust Card 1: Verified Authentic */}
            <div className="floating-card trust-float animate-fade-in">
              <div className="float-icon-box">
                <ShieldCheck size={20} className="text-emerald" />
              </div>
              <div>
                <span className="float-tag">Authentic</span>
                <h5 className="float-title">Dermatologist Verified</h5>
              </div>
            </div>

            {/* Floating Card 2: Featured Bestseller Preview */}
            {featuredProduct && (
              <div 
                className="floating-card product-float"
                onClick={() => setSelectedProductForDetail(featuredProduct)}
              >
                <img 
                  src={featuredProduct.image} 
                  alt={featuredProduct.name} 
                  className="float-prod-thumb"
                />
                <div className="float-prod-info">
                  <span className="float-badge">Featured Formulation</span>
                  <h5 className="float-prod-name">{featuredProduct.name}</h5>
                  <span className="float-prod-price">৳{featuredProduct.discountPrice || featuredProduct.price}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
