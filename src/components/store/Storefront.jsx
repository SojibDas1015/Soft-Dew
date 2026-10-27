import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  X, 
  Filter, 
  SlidersHorizontal,
  Scissors
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { HeroBanner } from './HeroBanner';
import { TrustBanner } from '../common/TrustBanner';
import { CategoryScroller } from './CategoryScroller';
import { FlashDeals } from './FlashDeals';
import { ProductCard } from './ProductCard';
import { SalonServices } from './SalonServices';
import { ReviewsSection } from './ReviewsSection';

export const Storefront = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    setIsQuizOpen
  } = useStore();

  const [concernFilter, setConcernFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Filter products by search, category, and skin/hair concerns
  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchConcern =
      concernFilter === 'all' ||
      (p.skinType && p.skinType.some((st) => st.toLowerCase().includes(concernFilter.toLowerCase())));

    return matchCategory && matchSearch && matchConcern;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return (a.discountPrice || a.price) - (b.discountPrice || b.price);
    }
    if (sortBy === 'price-high') {
      return (b.discountPrice || b.price) - (a.discountPrice || a.price);
    }
    if (sortBy === 'rating') {
      return (b.rating || 5) - (a.rating || 5);
    }
    return 0; // Default featured
  });

  return (
    <div className="storefront-page animate-fade-in">
      {/* 1. Hero Luxury Banner */}
      <HeroBanner />

      {/* 2. Trust Assurance Strip */}
      <TrustBanner />

      {/* 3. Category Horizontal Pills */}
      <CategoryScroller />

      {/* 4. Flash Deals with live countdown */}
      {!searchQuery && selectedCategory === 'all' && <FlashDeals />}

      {/* 5. Main Products Catalog Section */}
      <section id="products-section" className="store-products-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={16} className="text-rose-600" />
                <span className="text-xs uppercase tracking-wider font-bold text-rose-600">
                  Direct Laboratory Imports
                </span>
              </div>
              <h2 className="section-heading">
                {selectedCategory === 'all' 
                  ? 'The Complete Collection' 
                  : `${selectedCategory.toUpperCase()} Selection`}
              </h2>
              <p className="text-slate-500 text-xs">
                Showing {sortedProducts.length} verified products with authentic holograms
              </p>
            </div>

            {/* Sort & Filter Controls */}
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select text-xs"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated ★</option>
              </select>

              {(searchQuery || selectedCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="btn btn-outline btn-sm text-xs flex items-center gap-1"
                >
                  <X size={14} />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Active Search Notification */}
          {searchQuery && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center justify-between text-xs text-rose-800">
              <span>
                Searching for "<strong>{searchQuery}</strong>" ({sortedProducts.length} matches found)
              </span>
              <button 
                onClick={() => setSearchQuery('')}
                className="font-bold underline ml-2"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Products Grid */}
          {sortedProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <Sparkles size={40} className="text-rose-300 mx-auto mb-3" />
              <h3 className="serif text-xl font-bold text-slate-800">No matching beauty items found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                Try clearing your search query or selecting a different category from above.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="btn btn-primary btn-sm"
              >
                View All Collection
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. Salon & Parlor Services Section */}
      <SalonServices />

      {/* 7. Verified Reviews and Doctor Testimonials */}
      <ReviewsSection />
    </div>
  );
};
