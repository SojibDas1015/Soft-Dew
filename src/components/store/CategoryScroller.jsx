import React from 'react';
import { 
  Sparkles, 
  Droplets, 
  Scissors, 
  Palette, 
  Zap, 
  Flower2, 
  Heart 
} from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { useStore } from '../../context/StoreContext';

export const CategoryScroller = () => {
  const { selectedCategory, setSelectedCategory, products } = useStore();

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Droplets':
        return <Droplets size={18} />;
      case 'Scissors':
        return <Scissors size={18} />;
      case 'Palette':
        return <Palette size={18} />;
      case 'Zap':
        return <Zap size={18} />;
      case 'Flower2':
        return <Flower2 size={18} />;
      case 'Heart':
        return <Heart size={18} />;
      default:
        return <Sparkles size={18} />;
    }
  };

  const getCount = (catId) => {
    if (catId === 'all') return products.length;
    return products.filter((p) => p.category === catId).length;
  };

  return (
    <section className="category-scroller-section">
      <div className="container">
        <div className="section-header-compact">
          <span className="section-sub">Curated Aisles</span>
          <h3 className="section-title-sm">Browse by Category</h3>
        </div>

        <div className="categories-pill-track">
          {CATEGORIES.map((cat) => {
            const count = getCount(cat.id);
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`category-pill ${isSelected ? 'active' : ''}`}
              >
                <div className="cat-icon-circle">
                  {getCategoryIcon(cat.icon)}
                </div>
                <div className="cat-text-group">
                  <span className="cat-name">{cat.name}</span>
                  <span className="cat-count">{count} Items</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
