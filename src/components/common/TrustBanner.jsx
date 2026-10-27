import React from 'react';
import { ShieldCheck, Award, Truck, RotateCcw, Sparkles } from 'lucide-react';
import { TRUST_BADGES } from '../../data/categories';

export const TrustBanner = () => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="trust-icon text-emerald" size={26} />;
      case 'Award':
        return <Award className="trust-icon text-champagne" size={26} />;
      case 'Truck':
        return <Truck className="trust-icon text-rose" size={26} />;
      case 'RotateCcw':
        return <RotateCcw className="trust-icon text-indigo" size={26} />;
      default:
        return <Sparkles className="trust-icon text-rose" size={26} />;
    }
  };

  return (
    <section className="trust-banner-section">
      <div className="container">
        <div className="trust-grid">
          {TRUST_BADGES.map((badge, idx) => (
            <div key={idx} className="trust-card">
              <div className="trust-icon-box">{getIcon(badge.icon)}</div>
              <div className="trust-text">
                <h4 className="trust-title">{badge.title}</h4>
                <p className="trust-desc">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
