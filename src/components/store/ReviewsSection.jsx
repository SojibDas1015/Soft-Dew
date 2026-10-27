import React from 'react';
import { Star, ShieldCheck, Heart, Quote } from 'lucide-react';

export const ReviewsSection = () => {
  const reviews = [
    {
      id: 1,
      name: 'Dr. Sabrina Haque',
      role: 'Aesthetic Dermatologist, Dhaka',
      rating: 5,
      comment: 'As a dermatologist, authentic formulations are non-negotiable. Soft-Dew is my go-to recommendation for clients seeking genuine Korean peptides and genuine salon hair repair in Bangladesh. Zero counterfeit risk.',
      product: 'Glass Skin Peptide Serum',
      date: '2 days ago',
      avatar: 'https://images.unsplash.com/photo-1594824813511-13c54c3798ef?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 2,
      name: 'Nuzhat Shormi',
      role: 'Fashion & Bridal Stylist',
      rating: 5,
      comment: 'Booked the Royal Bridal HD Airbrush session at the Banani lounge and also bought their Keratin Botox mask. My hair has never felt so silky! Same-day delivery inside Dhaka is unmatched.',
      product: 'Salon Keratin Botox Mask',
      date: '1 week ago',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 3,
      name: 'Mehnaz Parveen',
      role: 'Verified Buyer, Chattogram',
      rating: 5,
      comment: 'Soft-Dew is pure luxury. Packaging arrived with an authentic hologram seal and batch number that I could verify. The Velvet Silk foundation blends like a dream without creasing!',
      product: 'Velvet Cloud Foundation',
      date: '3 weeks ago',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
    }
  ];

  return (
    <section className="reviews-section">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-pill">
            <ShieldCheck size={14} className="text-emerald inline mr-1" />
            <span>Real Verified Client Experiences</span>
          </div>
          <h2 className="section-heading">
            Loved by Doctors, Stylists & Over 50,000 Patrons
          </h2>
          <p className="section-subtext max-w-xl mx-auto">
            Discover why beauty enthusiasts and salon experts across Bangladesh trust Soft-Dew for their most vital skin and hair routines.
          </p>
        </div>

        <div className="reviews-grid">
          {reviews.map((rev) => (
            <div key={rev.id} className="review-card">
              <div className="review-card-top">
                <div className="review-stars">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="review-date">{rev.date}</span>
              </div>

              <div className="review-quote-icon">
                <Quote size={24} className="text-rose-200" />
              </div>

              <p className="review-text">"{rev.comment}"</p>

              <div className="review-product-tag">
                <span>Verified Purchase: <strong>{rev.product}</strong></span>
              </div>

              <div className="review-author-row">
                <img src={rev.avatar} alt={rev.name} className="review-avatar" />
                <div>
                  <h5 className="review-author-name">{rev.name}</h5>
                  <span className="review-author-role">{rev.role}</span>
                </div>
                <div className="verified-badge-mini" title="Verified Customer">
                  <ShieldCheck size={16} className="text-emerald" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
