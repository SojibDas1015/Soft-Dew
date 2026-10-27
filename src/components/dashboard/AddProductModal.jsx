import React, { useState, useEffect } from 'react';
import { X, Plus, Sparkles, Image, ShieldCheck, Tag, DollarSign, Layers } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PRESET_IMAGE_OPTIONS } from '../../data/initialProducts';
import { CATEGORIES } from '../../data/categories';

export const AddProductModal = () => {
  const {
    isAddProductModalOpen,
    setIsAddProductModalOpen,
    editingProduct,
    setEditingProduct,
    addProduct,
    updateProduct
  } = useStore();

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('Soft-Dew Atelier');
  const [category, setCategory] = useState('skincare');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [stock, setStock] = useState('25');
  const [sku, setSku] = useState('');
  const [badge, setBadge] = useState('100% Authentic');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [howToUse, setHowToUse] = useState('');
  const [skinTypeStr, setSkinTypeStr] = useState('All Skin Types, Dullness');
  const [variantsStr, setVariantsStr] = useState('30ml Bottle, 50ml Pro Pump');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isFlashDeal, setIsFlashDeal] = useState(false);

  // Populate when editing
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name || '');
      setBrand(editingProduct.brand || 'Soft-Dew Atelier');
      setCategory(editingProduct.category || 'skincare');
      setPrice(editingProduct.price ? String(editingProduct.price) : '');
      setDiscountPrice(editingProduct.discountPrice ? String(editingProduct.discountPrice) : '');
      setStock(editingProduct.stock ? String(editingProduct.stock) : '20');
      setSku(editingProduct.sku || '');
      setBadge(editingProduct.badge || '100% Authentic');
      setImage(editingProduct.image || '');
      setDescription(editingProduct.description || '');
      setIngredients(editingProduct.ingredients || '');
      setHowToUse(editingProduct.howToUse || '');
      setSkinTypeStr(editingProduct.skinType ? editingProduct.skinType.join(', ') : 'All Skin Types');
      setVariantsStr(editingProduct.variants ? editingProduct.variants.join(', ') : 'Standard');
      setIsFeatured(editingProduct.isFeatured || false);
      setIsFlashDeal(editingProduct.isFlashDeal || false);
    } else {
      resetForm();
    }
  }, [editingProduct, isAddProductModalOpen]);

  const resetForm = () => {
    setName('');
    setBrand('Soft-Dew Atelier');
    setCategory('skincare');
    setPrice('');
    setDiscountPrice('');
    setStock('25');
    setSku('');
    setBadge('100% Authentic');
    setImage(PRESET_IMAGE_OPTIONS[0].url);
    setDescription('');
    setIngredients('');
    setHowToUse('');
    setSkinTypeStr('All Skin Types');
    setVariantsStr('30ml Bottle, 50ml Pro Pump');
    setIsFeatured(false);
    setIsFlashDeal(false);
  };

  if (!isAddProductModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !price) {
      alert('Product name and price are required');
      return;
    }

    const skinTypeArray = skinTypeStr.split(',').map((s) => s.trim()).filter(Boolean);
    const variantsArray = variantsStr.split(',').map((v) => v.trim()).filter(Boolean);

    const productPayload = {
      name,
      brand,
      category,
      price: Number(price),
      discountPrice: discountPrice ? Number(discountPrice) : null,
      stock: Number(stock) || 0,
      sku: sku.trim() || `SDW-${category.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      badge,
      image: image || PRESET_IMAGE_OPTIONS[0].url,
      gallery: [image || PRESET_IMAGE_OPTIONS[0].url],
      description: description || 'Clinical salon formula curated for optimal radiance and purity.',
      ingredients: ingredients || 'Clinical Active Botanicals, Peptides, Hyaluronic Complex.',
      howToUse: howToUse || 'Apply onto clean skin or hair as directed by salon aesthetician.',
      skinType: skinTypeArray.length > 0 ? skinTypeArray : ['All Skin Types'],
      variants: variantsArray.length > 0 ? variantsArray : ['Standard'],
      isFeatured,
      isFlashDeal
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productPayload);
    } else {
      addProduct(productPayload);
    }

    setIsAddProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleClose = () => {
    setIsAddProductModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div 
        className="modal-container add-product-modal animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleClose} className="modal-close-btn" aria-label="Close form">
          <X size={20} />
        </button>

        <div className="modal-header-compact">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={20} className="text-rose-600" />
            <span className="text-xs uppercase tracking-wider font-bold text-rose-600">
              Salon Inventory & Seller Catalog
            </span>
          </div>
          <h2 className="modal-title">
            {editingProduct ? 'Edit Beauty Product' : 'Add New Salon Product'}
          </h2>
          <p className="text-xs text-slate-500">
            Products added here will be immediately live on the Soft-Dew customer storefront.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="product-form-body">
          {/* Row 1: Title & Brand */}
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Product Name / Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Hydra-Dew Rose Peptide Infusion"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Brand / Laboratory *</label>
              <input
                type="text"
                required
                placeholder="e.g. Soft-Dew Atelier, Kerastase Pro"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Row 2: Category & Authenticity Badge */}
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Product Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-select"
              >
                <option value="skincare">Dewy Skincare (Serums, Creams)</option>
                <option value="haircare">Salon Hair Care (Keratin, Botox, Oils)</option>
                <option value="makeup">Luxury Makeup (Foundation, Lip Tint)</option>
                <option value="salon-tools">Pro Salon Equipment (Dryers, LED Masks)</option>
                <option value="spa-bath">Organic Spa & Hammam Soak</option>
                <option value="nail-studio">Nail Art & Pro UV Gels</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Authenticity Badge / Seal</label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="form-select"
              >
                <option value="100% Authentic">100% Authentic (Verified Import)</option>
                <option value="Salon Pro Grade">Salon Pro Grade</option>
                <option value="Derm Tested">Dermatologist Tested</option>
                <option value="Best Seller">Best Seller</option>
                <option value="100% Organic">100% Organic / Botanical</option>
                <option value="Trending">Trending Aesthetic</option>
              </select>
            </div>
          </div>

          {/* Row 3: Pricing & Inventory */}
          <div className="form-row-3">
            <div className="form-group">
              <label className="form-label">Original Price (৳) *</label>
              <input
                type="number"
                required
                placeholder="2500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Discount Price (৳) (Optional)</label>
              <input
                type="number"
                placeholder="1950"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Stock Units *</label>
              <input
                type="number"
                required
                min="0"
                placeholder="25"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Row 4: Image URL with 1-Click Preset Selector */}
          <div className="form-group">
            <label className="form-label flex justify-between">
              <span>Image URL *</span>
              <span className="text-xs text-rose-600 font-semibold">Or pick a beauty preset below</span>
            </label>
            <input
              type="url"
              required
              placeholder="https://images.unsplash.com/..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="form-input mb-2"
            />

            {/* Visual Presets Selector */}
            <div className="preset-images-scroll">
              {PRESET_IMAGE_OPTIONS.map((opt, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setImage(opt.url)}
                  className={`preset-thumb-btn ${image === opt.url ? 'active' : ''}`}
                  title={opt.label}
                >
                  <img src={opt.url} alt={opt.label} />
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Row 5: Variants & Skin Type Tags */}
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Variants / Shades (Comma separated)</label>
              <input
                type="text"
                placeholder="e.g. 30ml Bottle, 50ml Jar OR #01 Ivory, #02 Beige"
                value={variantsStr}
                onChange={(e) => setVariantsStr(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Skin/Hair Concerns (Comma separated)</label>
              <input
                type="text"
                placeholder="e.g. Dry, Anti-Aging, Sensitive, Bleached Hair"
                value={skinTypeStr}
                onChange={(e) => setSkinTypeStr(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Row 6: Description */}
          <div className="form-group">
            <label className="form-label">Product Description</label>
            <textarea
              rows={2}
              placeholder="Detailed benefits, sensory experience, and texture..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
            />
          </div>

          {/* Row 7: Ingredients & Usage */}
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Key Active Ingredients</label>
              <input
                type="text"
                placeholder="e.g. Copper Peptides, Niacinamide, Pure Argan"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Salon Expert Usage Tips</label>
              <input
                type="text"
                placeholder="e.g. Apply 3-4 drops onto damp skin every morning..."
                value={howToUse}
                onChange={(e) => setHowToUse(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Checkboxes: Featured & Flash Deal */}
          <div className="form-checkboxes-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
              />
              <span>Feature on Storefront Hero</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={isFlashDeal}
                onChange={(e) => setIsFlashDeal(e.target.checked)}
              />
              <span>Include in Limited Flash Deals with Countdown</span>
            </label>
          </div>

          {/* Form Actions */}
          <div className="form-actions mt-5">
            <button type="button" onClick={handleClose} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Plus size={16} />
              <span>{editingProduct ? 'Save Product Changes' : 'Publish Product to Catalog'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
